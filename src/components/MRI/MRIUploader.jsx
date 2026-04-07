import { useState } from 'react';
import * as nifti from 'nifti-reader-js';
import pako from 'pako';
import ndarray from 'ndarray';
import surfaceNets from 'surface-nets';

const MRIUploader = ({ onMeshGenerated }) => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    console.log('📁 File uploaded:', file.name, 'Size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
    setProcessing(true);
    setProgress(5);
    setError(null);

    try {
      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      console.log('✅ File read:', arrayBuffer.byteLength, 'bytes');
      setProgress(15);

      let data = arrayBuffer;

      // Check if file is gzipped
      const isGzipped = file.name.endsWith('.gz') || nifti.isCompressed(arrayBuffer);
      
      if (isGzipped) {
        console.log('📦 Decompressing gzipped file...');
        try {
          const compressed = new Uint8Array(arrayBuffer);
          const decompressed = pako.ungzip(compressed);
          data = decompressed.buffer;
          console.log('✅ Decompressed:', data.byteLength, 'bytes');
        } catch (decompressError) {
          console.error('❌ Decompression failed:', decompressError);
          data = nifti.decompress(arrayBuffer);
          console.log('✅ Decompressed (fallback):', data.byteLength, 'bytes');
        }
      }
      setProgress(30);

      // Parse NIfTI header
      console.log('📊 Reading NIfTI header...');
      const niftiHeader = nifti.readHeader(data);
      
      if (!niftiHeader) {
        throw new Error('Invalid NIfTI header');
      }

      console.log('✅ NIfTI Header:', {
        dims: niftiHeader.dims,
        pixDims: niftiHeader.pixDims,
        datatype: niftiHeader.datatypeCode,
      });

      setProgress(50);

      // Read image data
      console.log('📸 Reading image data...');
      const niftiImage = nifti.readImage(niftiHeader, data);
      
      if (!niftiImage) {
        throw new Error('Failed to read image data');
      }

      console.log('✅ Image data read:', niftiImage.byteLength, 'bytes');
      setProgress(60);

      // Convert to 3D mesh using Marching Cubes
      console.log('🔨 Generating smooth 3D mesh using Marching Cubes...');
      const mesh = await volumeToMesh(niftiImage, niftiHeader, (p) => {
        setProgress(60 + p * 0.35); // 60% to 95%
      });
      
      console.log('✅ Mesh generated!');
      setProgress(95);

      // Pass mesh to parent component
      if (onMeshGenerated) {
        onMeshGenerated(mesh);
      }
      
      setProgress(100);
      
      // Auto-close after success
      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1000);

    } catch (error) {
      console.error('❌ Error processing MRI:', error);
      console.error('Error stack:', error.stack);
      setError(error.message || 'Unknown error occurred');
      setProcessing(false);
      setProgress(0);
    }
  };

  // Marching Cubes implementation using surface-nets
  const volumeToMesh = async (imageData, header, onProgress) => {
    const { dims, datatypeCode } = header;
    const [, width, height, depth] = dims;

    console.log('🎲 Volume dimensions:', width, 'x', height, 'x', depth);
    console.log('📊 Datatype code:', datatypeCode);

    // Convert to appropriate typed array based on datatype
    let data;
    switch (datatypeCode) {
      case 2: // unsigned char
        data = new Uint8Array(imageData);
        break;
      case 4: // signed short
        data = new Int16Array(imageData);
        break;
      case 8: // signed int
        data = new Int32Array(imageData);
        break;
      case 16: // float
        data = new Float32Array(imageData);
        break;
      case 64: // double
        data = new Float64Array(imageData);
        break;
      default:
        data = new Uint8Array(imageData);
    }

    onProgress(0.1);

    // Calculate statistics for adaptive thresholding
    console.log('📊 Calculating data statistics...');
    let min = Infinity, max = -Infinity, sum = 0;
    for (let i = 0; i < data.length; i++) {
      const val = data[i];
      if (val < min) min = val;
      if (val > max) max = val;
      sum += val;
    }
    const mean = sum / data.length;
    
    // Adaptive threshold - find brain tissue
    const threshold = mean + (max - mean) * 0.25;
    
    console.log('📈 Data statistics:', { 
      min: min.toFixed(2), 
      max: max.toFixed(2), 
      mean: mean.toFixed(2), 
      threshold: threshold.toFixed(2) 
    });

    onProgress(0.3);

    // Create ndarray (required by surface-nets)
    console.log('🔧 Creating volume array...');
    const volume = ndarray(data, [width, height, depth]);

    onProgress(0.4);

    // Run Marching Cubes (surface-nets algorithm)
    console.log('🔨 Running Marching Cubes algorithm (this may take a moment)...');
    const surfaceMesh = surfaceNets(volume, threshold);

    console.log('✅ Surface extracted:', {
      vertices: surfaceMesh.positions.length,
      faces: surfaceMesh.cells.length
    });

    onProgress(0.8);

    // Convert to format our renderer expects
    const vertices = [];
    const indices = [];

    // Scale and center the mesh
    const scale = 0.3; // Adjust this to make brain bigger/smaller
    const centerX = width / 2;
    const centerY = height / 2;
    const centerZ = depth / 2;

    console.log('📐 Processing vertices...');
    // Add vertices with centering and scaling
    for (let i = 0; i < surfaceMesh.positions.length; i++) {
      const [x, y, z] = surfaceMesh.positions[i];
      vertices.push(
        (x - centerX) * scale,
        (y - centerY) * scale,
        (z - centerZ) * scale
      );
    }

    onProgress(0.9);

    console.log('🔺 Processing triangles...');
    // Add triangle indices
    for (let i = 0; i < surfaceMesh.cells.length; i++) {
      const [a, b, c] = surfaceMesh.cells[i];
      indices.push(a, b, c);
    }

    onProgress(0.95);

    console.log('✅ Mesh ready:', {
      vertices: vertices.length / 3,
      triangles: indices.length / 3,
      size: ((vertices.length * 4 + indices.length * 4) / 1024 / 1024).toFixed(2) + ' MB'
    });

    return { vertices, indices };
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload MRI Scan</h2>
      <p style={styles.description}>
        Upload a T1-weighted brain MRI in NIfTI format (.nii or .nii.gz)
      </p>

      <div style={styles.uploadBox}>
        <input
          type="file"
          accept=".nii,.nii.gz"
          onChange={handleFileUpload}
          style={styles.input}
          id="mri-upload"
          disabled={processing}
        />
        <label 
          htmlFor="mri-upload" 
          style={{
            ...styles.label,
            opacity: processing ? 0.5 : 1,
            cursor: processing ? 'not-allowed' : 'pointer'
          }}
        >
          {processing ? (
            <>
              <div style={styles.spinner} />
              <div style={styles.processingText}>
                Processing MRI... {Math.round(progress)}%
              </div>
              <div style={styles.hint}>
                Generating smooth brain surface using Marching Cubes algorithm
                <br/>
                This may take 30-90 seconds for large files
              </div>
            </>
          ) : (
            <>
              📁 Click to Upload MRI Scan
              <div style={styles.hint}>
                Accepts .nii, .nii.gz (NIfTI format)<br/>
                Max file size: 100 MB
              </div>
            </>
          )}
        </label>
      </div>

      {processing && (
        <div style={styles.progressBar}>
          <div style={{
            ...styles.progressFill, 
            width: `${progress}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      )}

      {error && (
        <div style={styles.error}>
          <strong>❌ Error:</strong> {error}
          <br/>
          <small>Please ensure the file is a valid NIfTI file (.nii or .nii.gz)</small>
        </div>
      )}

      <div style={styles.tips}>
        <h4 style={styles.tipsTitle}>💡 How it works:</h4>
        <ul style={styles.tipsList}>
          <li>Uploads your MRI scan (NIfTI format)</li>
          <li>Analyzes brain tissue using adaptive thresholding</li>
          <li>Generates smooth 3D surface using Marching Cubes algorithm</li>
          <li>Renders interactive 3D brain model in the viewer</li>
        </ul>
        <h4 style={styles.tipsTitle}>📊 Tips:</h4>
        <ul style={styles.tipsList}>
          <li>Works best with T1-weighted brain scans</li>
          <li>Files under 50MB process faster</li>
          <li>Get sample data from <a href="https://openneuro.org" target="_blank" rel="noopener noreferrer">OpenNeuro.org</a></li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#1a1a1a',
  },
  description: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '30px',
  },
  uploadBox: {
    border: '2px dashed #667eea',
    borderRadius: '12px',
    padding: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
    background: '#f8f9ff',
  },
  input: {
    display: 'none',
  },
  label: {
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    color: '#667eea',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    transition: 'opacity 0.3s',
  },
  hint: {
    fontSize: '12px',
    color: '#999',
    fontWeight: '400',
    marginTop: '5px',
    lineHeight: '1.6',
  },
  spinner: {
    border: '3px solid rgba(102, 126, 234, 0.1)',
    borderTop: '3px solid #667eea',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
  processingText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#667eea',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#f0f0f0',
    borderRadius: '4px',
    marginTop: '20px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
  },
  error: {
    marginTop: '20px',
    padding: '15px',
    background: '#fee',
    border: '1px solid #fcc',
    borderRadius: '8px',
    color: '#c33',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  tips: {
    marginTop: '30px',
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '8px',
  },
  tipsTitle: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '10px',
    marginTop: '15px',
    color: '#333',
  },
  tipsList: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.8',
  },
};

// Add CSS animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
if (!document.querySelector('style[data-mri-spinner]')) {
  styleSheet.setAttribute('data-mri-spinner', 'true');
  document.head.appendChild(styleSheet);
}

export default MRIUploader;