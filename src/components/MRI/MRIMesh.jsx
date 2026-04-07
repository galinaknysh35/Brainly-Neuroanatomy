import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const MRIMesh = ({ meshData }) => {
  const groupRef = useRef();

  console.log('🎨 MRIMesh render:', meshData ? 'HAS DATA' : 'NO DATA');

  useEffect(() => {
    if (!meshData || !groupRef.current) return;

    console.log('🔨 Creating geometry from mesh data...');
    console.log('Vertices:', meshData.vertices.length / 3);
    console.log('Indices:', meshData.indices.length);

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    
    // Add vertices
    const positions = new Float32Array(meshData.vertices);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Add indices (faces/triangles)
    const indices = new Uint32Array(meshData.indices);
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    
    // Compute normals for smooth shading
    geometry.computeVertexNormals();
    
    console.log('✅ Geometry created');

    // Create material
    const material = new THREE.MeshStandardMaterial({
      color: '#FF6B9D',
      roughness: 0.7,
      metalness: 0.3,
      side: THREE.DoubleSide,
      flatShading: false,
    });

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(10, 55, 0);
    mesh.scale.set(5, 5, 5);

    // Clear previous mesh and add new one
    while (groupRef.current.children.length > 0) {
      const child = groupRef.current.children[0];
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
      groupRef.current.remove(child);
    }
    
    groupRef.current.add(mesh);
    
    console.log('✅ Mesh added to scene');

  }, [meshData]);

  return <group ref={groupRef} />;
};

export default MRIMesh;