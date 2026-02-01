import { useState } from 'react';

const SketchfabBrain = ({ selectedStructure, activeNetwork, onStructureSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div style={styles.container}>
      {!isLoaded && (
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading 3D Brain Model...</p>
        </div>
      )}

      <iframe
  title="Human Brain 3D Model"
  frameBorder="0"
  allowFullScreen
  mozallowfullscreen="true"
  webkitallowfullscreen="true"
  allow="autoplay; fullscreen; xr-spatial-tracking"
  src="https://sketchfab.com/models/e073c2590bc24daaa7323f4daa5b7784/embed?autostart=1&ui_theme=dark&ui_infos=0"
  style={styles.iframe}
  onLoad={handleLoad}
/>
      <div style={styles.controls}>
        <div style={styles.controlsTitle}>🖱️ 3D Controls</div>
        <div style={styles.controlsList}>
          <strong>Left Click + Drag:</strong> Rotate<br />
          <strong>Right Click + Drag:</strong> Pan<br />
          <strong>Scroll:</strong> Zoom
        </div>
      </div>

      <div style={styles.credit}>
        Model by{' '}
        <a
          href="https://sketchfab.com/Yash_Dandavate"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.creditLink}
        >
          Yash_Dandavate
        </a>{' '}
        on Sketchfab
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '600px',
    position: 'relative',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    overflow: 'hidden'
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'block'
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
    zIndex: 10
  },
  loadingText: {
    color: 'white',
    fontSize: '16px'
  },
  spinner: {
    border: '4px solid rgba(255, 255, 255, 0.1)',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    margin: '0 auto 20px',
    animation: 'spin 1s linear infinite'
  },
  controls: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    padding: '12px 18px',
    borderRadius: '10px',
    fontSize: '13px',
    maxWidth: '250px'
  },
  controlsTitle: {
    fontWeight: '700',
    marginBottom: '8px',
    fontSize: '14px'
  },
  controlsList: {
    lineHeight: '1.8',
    fontSize: '12px',
    opacity: 0.9
  },
  credit: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'rgba(255, 255, 255, 0.7)',
    padding: '8px 15px',
    borderRadius: '8px',
    fontSize: '11px'
  },
  creditLink: {
    color: '#1CAAD9',
    textDecoration: 'none',
    fontWeight: '600'
  }
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default SketchfabBrain;