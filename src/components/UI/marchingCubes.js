// src/utils/marchingCubes.js
import * as THREE from 'three';

/**
 * Simplified Marching Cubes implementation
 * Converts 3D voxel data to triangle mesh
 */
export const volumeToMesh = async (imageData, header) => {
  const { dims } = header;
  const [, width, height, depth] = dims;

  console.log('🎲 Volume dimensions:', width, height, depth);

  // Create typed array from image data
  const data = new Uint8Array(imageData);

  // Threshold for isosurface (adjust based on MRI intensity)
  const threshold = 50;

  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const indices = [];

  // Simplified marching cubes - sample every Nth voxel for performance
  const step = 2; // Sample every 2 voxels

  for (let z = 0; z < depth - 1; z += step) {
    for (let y = 0; y < height - 1; y += step) {
      for (let x = 0; x < width - 1; x += step) {
        
        // Get voxel value
        const idx = x + y * width + z * width * height;
        const value = data[idx];

        // If above threshold, create a cube (simplified)
        if (value > threshold) {
          const px = (x - width / 2) * 0.1;
          const py = (y - height / 2) * 0.1;
          const pz = (z - depth / 2) * 0.1;

          // Add vertices for a small cube
          addCube(vertices, indices, px, py, pz, step * 0.1);
        }
      }
    }
    
    // Report progress
    if (z % 10 === 0) {
      console.log(`Processing: ${Math.round((z / depth) * 100)}%`);
    }
  }

  // Create geometry
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  console.log('✅ Mesh created:', vertices.length / 3, 'vertices');

  return geometry;
};

const addCube = (vertices, indices, x, y, z, size) => {
  const s = size / 2;
  const startIdx = vertices.length / 3;

  // 8 vertices of cube
  const cubeVertices = [
    [x - s, y - s, z - s], [x + s, y - s, z - s],
    [x + s, y + s, z - s], [x - s, y + s, z - s],
    [x - s, y - s, z + s], [x + s, y - s, z + s],
    [x + s, y + s, z + s], [x - s, y + s, z + s],
  ];

  cubeVertices.forEach(v => vertices.push(...v));

  // 12 triangles (6 faces * 2 triangles)
  const cubeIndices = [
    0, 1, 2, 0, 2, 3, // front
    4, 6, 5, 4, 7, 6, // back
    0, 4, 5, 0, 5, 1, // bottom
    2, 6, 7, 2, 7, 3, // top
    0, 3, 7, 0, 7, 4, // left
    1, 5, 6, 1, 6, 2, // right
  ];

  cubeIndices.forEach(i => indices.push(startIdx + i));
};