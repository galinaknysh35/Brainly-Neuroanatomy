import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * BrainRegion Component
 * 
 * This component renders a single brain structure as a 3D mesh.
 * 
 * LEARNING NOTES:
 * 
 * 1. THREE.JS MESHES:
 *    A mesh = geometry (shape) + material (appearance)
 *    - We use BoxGeometry for simplicity (you'll learn to import real brain models later)
 *    - Materials define how light interacts with the surface
 * 
 * 2. REACT THREE FIBER:
 *    - JSX elements like <mesh>, <boxGeometry> create Three.js objects
 *    - Props map directly to Three.js properties
 *    - 'args' prop passes constructor arguments to Three.js
 * 
 * 3. INTERACTIVITY:
 *    - onPointerOver/Out = hover detection
 *    - onClick = click detection
 *    - Works in 3D space through raycasting (automatic in R3F)
 * 
 * 4. ANIMATIONS:
 *    - useFrame hook runs every frame (~60 times per second)
 *    - We use it for smooth color transitions
 *    - lerp = linear interpolation (smooth transition between values)
 */

const BrainRegion = ({ 
  structure, 
  isSelected, 
  isHighlighted, 
  onClick, 
  networkColor 
}) => {
  // useRef gives us a reference to the 3D mesh object
  // We need this to manipulate the mesh directly
  const meshRef = useRef();
  
  // Local state for hover effect
  const [hovered, setHovered] = useState(false);

  /**
   * useFrame Hook - The Animation Loop
   * 
   * This runs on every frame render. We use it to smoothly
   * animate color changes instead of instant jumps.
   * 
   * Think of it like a game loop - it runs ~60 times per second
   */
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Determine what color we should be transitioning to
      let targetColor;
      
      if (isSelected) {
        // Selected structures get the brightest color
        targetColor = new THREE.Color(networkColor || structure.color);
      } else if (isHighlighted) {
        // Highlighted structures (part of active network) get network color
        targetColor = new THREE.Color(networkColor || structure.color);
      } else if (hovered) {
        // Hovered structures get a lightened version
        targetColor = new THREE.Color(structure.color).multiplyScalar(1.3);
      } else {
        // Default color
        targetColor = new THREE.Color(structure.color);
      }

      // Lerp (Linear Interpolation) smoothly transitions the color
      // Instead of jumping instantly to the new color, we move a little bit each frame
      // 0.1 = speed of transition (higher = faster)
      meshRef.current.material.color.lerp(targetColor, 0.1);
      
      // Adjust opacity based on state
      const targetOpacity = (isSelected || isHighlighted) ? 1.0 : (hovered ? 0.9 : 0.7);
      meshRef.current.material.opacity += (targetOpacity - meshRef.current.material.opacity) * 0.1;
    }
  });

  /**
   * Calculate scale for hover effect
   * When hovered, make it slightly larger for visual feedback
   */
  const scale = hovered ? 1.1 : 1.0;

  return (
    <mesh
      ref={meshRef}
      position={structure.position}
      scale={[scale, scale, scale]}
      onClick={(e) => {
        e.stopPropagation(); // Prevent click from passing through
        onClick(structure);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer'; // Change cursor on hover
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* 
        Geometry - The Shape
        
        For now, we use simple boxes. Later, you can replace this with
        real brain mesh geometries loaded from files.
        
        args = [width, height, depth]
        We use the structure's size data
      */}
      <boxGeometry args={structure.size} />
      
      {/* 
        Material - The Appearance
        
        MeshStandardMaterial is physically-based:
        - Responds to lights realistically
        - metalness: makes it look metallic (0-1)
        - roughness: makes surface rough vs smooth (0-1)
        - transparent: allows opacity to work
        - opacity: 0 = invisible, 1 = solid
        
        We start with the structure's default color
      */}
      <meshStandardMaterial
        color={structure.color}
        metalness={0.3}
        roughness={0.4}
        transparent={true}
        opacity={0.7}
      />
      
      {/* 
        Edge Highlighting
        
        This creates a wireframe outline around the shape
        Helps define the edges of each structure
      */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...structure.size)]} />
        <lineBasicMaterial 
          color={hovered ? '#ffffff' : '#000000'} 
          opacity={0.2}
          transparent={true}
        />
      </lineSegments>
    </mesh>
  );
};

export default BrainRegion;