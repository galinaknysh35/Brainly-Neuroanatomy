import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const MRIMesh = ({ meshData }) => {
  const groupRef = useRef();
  const meshRef = useRef(null);

  useEffect(() => {
    if (!meshData || !groupRef.current) return;

    console.log('🎨 MRIMesh: Creating mesh from', meshData.vertices.length / 3, 'vertices');

    // Clean up previous mesh
    if (meshRef.current) {
      if (meshRef.current.geometry) meshRef.current.geometry.dispose();
      if (meshRef.current.material) meshRef.current.material.dispose();
      groupRef.current.remove(meshRef.current);
    }

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(meshData.vertices);
    const indices = new Uint32Array(meshData.indices);

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    // CRITICAL: Compute vertex normals for smooth shading
    geometry.computeVertexNormals();

    // Center and scale
    geometry.computeBoundingBox();
    const center = geometry.boundingBox.getCenter(new THREE.Vector3());
    geometry.translate(-center.x, -center.y, -center.z);

    geometry.computeBoundingBox();
    const size = new THREE.Vector3();
    geometry.boundingBox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 35 / maxDim;

    // Create material - SIMPLE and PROVEN to work
    const material = new THREE.MeshPhongMaterial({
      color: 0xFF6B9D,  // Use hex directly, not string
      emissive: 0x000000,
      shininess: 100,
      side: THREE.FrontSide,
      flatShading: false,
      wireframe: false,
      polygonOffset: false,
    });

    // Create mesh - explicitly THREE.Mesh, not Points
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(scale, scale, scale);
    mesh.position.set(0, 0, 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    groupRef.current.add(mesh);
    meshRef.current = mesh;

    console.log('✅ Mesh created - Triangles:', indices.length / 3);
    console.log('📐 Geometry stats:');
    console.log('  - Positions:', geometry.attributes.position.count);
    console.log('  - Normals:', geometry.attributes.normal ? 'YES' : 'NO');
    console.log('  - Indices:', geometry.index.count);
    console.log('🎨 Material: MeshPhongMaterial');
    console.log('🔍 Geometry type:', geometry.type);
    console.log('🔍 Mesh type:', mesh.type);

    // Verify the geometry is correct
    if (!geometry.attributes.normal) {
      console.error('❌ NO NORMALS FOUND!');
    }
    if (!geometry.index) {
      console.error('❌ NO INDICES FOUND!');
    }
    if (geometry.attributes.position.count === 0) {
      console.error('❌ NO POSITIONS FOUND!');
    }

    return () => {
      if (meshRef.current?.geometry) meshRef.current.geometry.dispose();
      if (meshRef.current?.material) meshRef.current.material.dispose();
      if (groupRef.current && meshRef.current) groupRef.current.remove(meshRef.current);
    };

  }, [meshData]);

  return <group ref={groupRef} />;
};

export default MRIMesh;