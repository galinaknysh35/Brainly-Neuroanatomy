import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const MRIMesh = ({ meshData }) => {
  const meshRef = useRef();

  console.log('🎨 MRIMesh rendered, meshData:', meshData ? 'EXISTS' : 'NULL');

  useEffect(() => {
    if (!meshData || !meshRef.current) return;

    console.log('🔨 Building geometry...', {
      vertices: meshData.vertices.length / 3,
      triangles: meshData.indices.length / 3
    });

    const geometry = new THREE.BufferGeometry();
    
    // Create position attribute
    const positions = new Float32Array(meshData.vertices);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Set indices
    geometry.setIndex(meshData.indices);
    
    // Compute normals
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    
    console.log('📦 Bounding box:', geometry.boundingBox);

    // Update mesh
    if (meshRef.current.geometry) {
      meshRef.current.geometry.dispose();
    }
    meshRef.current.geometry = geometry;

    console.log('✅ Geometry assigned to mesh');

  }, [meshData]);

  if (!meshData) return null;

  return (
    <mesh 
      ref={meshRef} 
      position={[10, 55, 0]}  // Same position as your brain target
      scale={[1500, 1500, 1500]}  // Scale up 100x (adjust as needed)
      rotation={[0, Math.PI / 2, 0]}  // Match your brain rotation if needed
    >
      <bufferGeometry />
      <meshStandardMaterial 
        color="#6bffb3"  // Pink
        transparent={false}
        opacity={0.7}
        side={THREE.DoubleSide}
        wireframe={true}  // Set to true to see structure
      />
    </mesh>
  );
};

export default MRIMesh;