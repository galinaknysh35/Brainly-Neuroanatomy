import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import BrainRegion from './BrainRegion';

/**
 * Scene Component
 * 
 * This component sets up the entire 3D scene including:
 * - Canvas (the WebGL rendering context)
 * - Camera (viewport)
 * - Lights (illumination)
 * - Controls (user interaction)
 * - All brain regions
 * 
 * LEARNING NOTES:
 * 
 * 1. CANVAS:
 *    - Creates a WebGL context for rendering 3D graphics
 *    - Everything 3D must be inside <Canvas>
 *    - Similar to how HTML needs a <body> tag
 * 
 * 2. CAMERA:
 *    - Defines the viewer's perspective
 *    - position: where the camera is in 3D space
 *    - fov (field of view): how wide the view is (like zoom)
 *    - near/far: rendering distance bounds
 * 
 * 3. LIGHTS:
 *    - ambientLight: soft light from all directions
 *    - directionalLight: like sunlight, from one direction
 *    - pointLight: like a light bulb, radiates from a point
 * 
 * 4. ORBIT CONTROLS:
 *    - Lets users rotate, pan, and zoom the camera
 *    - Left mouse: rotate
 *    - Right mouse: pan
 *    - Scroll: zoom
 */

const Scene = ({ 
  structures, 
  selectedStructure, 
  highlightedStructures, 
  onStructureClick,
  networkColor 
}) => {
  return (
    <Canvas
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
      }}
      // Enable shadows for more realistic rendering
      shadows
    >
      {/* 
        CAMERA SETUP
        
        Position the camera to get a good view of the brain
        [x, y, z] = [right/left, up/down, forward/back]
      */}
      <PerspectiveCamera
        makeDefault // Make this the primary camera
        position={[8, 3, 8]} // Position camera at an angle
        fov={50} // Field of view - moderate zoom
        near={0.1} // Don't render things closer than this
        far={1000} // Don't render things farther than this
      />

      {/* 
        ORBIT CONTROLS
        
        Allows users to interact with the 3D scene
        
        - enableDamping: smooth, physics-like camera movement
        - dampingFactor: how much "friction" the camera has
        - minDistance/maxDistance: zoom limits
        - target: point the camera focuses on (center of brain)
      */}
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={30}
        target={[0, 0, 0]} // Look at center of scene
      />

      {/* 
        LIGHTING SETUP
        
        Good lighting is crucial for 3D visualization
        We use a three-point lighting setup (industry standard):
        1. Key light (main light)
        2. Fill light (soften shadows)
        3. Ambient light (overall illumination)
      */}
      
      {/* Ambient Light - soft light from all directions */}
      <ambientLight intensity={0.4} color="#ffffff" />
      
      {/* Key Light - main directional light from top-right */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Fill Light - softer light from opposite side */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
        color="#b8d4ff"
      />
      
      {/* Rim Light - highlights edges from behind */}
      <directionalLight
        position={[0, -5, -10]}
        intensity={0.2}
        color="#ffebcd"
      />

      {/* 
        Point Lights - add visual interest
        These are like little light bulbs in the scene
      */}
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#4A90E2" />
      <pointLight position={[0, -5, 0]} intensity={0.2} color="#E91E63" />

      {/* 
        ENVIRONMENT
        
        Provides realistic reflections and ambient lighting
        'city' gives a subtle modern look
      */}
      <Environment preset="city" />

      {/* 
        RENDER ALL BRAIN STRUCTURES
        
        We map over our structures array and create a BrainRegion
        component for each one.
        
        Key concepts:
        - .map() creates a component for each item in array
        - 'key' helps React track which items changed
        - We pass down state and handlers as props
      */}
      {structures.map((structure) => {
        // Check if this structure is currently highlighted
        const isHighlighted = highlightedStructures.includes(structure.id);
        
        // Check if this structure is selected
        const isSelected = selectedStructure?.id === structure.id;

        return (
          <BrainRegion
            key={structure.id}
            structure={structure}
            isSelected={isSelected}
            isHighlighted={isHighlighted}
            onClick={onStructureClick}
            networkColor={networkColor}
          />
        );
      })}

      {/* 
        HELPER GRID (Optional - useful during development)
        
        Shows a grid on the ground plane to help visualize space
        Comment this out for production
      */}
      {/* <gridHelper args={[20, 20, '#444', '#222']} position={[0, -3, 0]} /> */}
      
      {/* 
        AXES HELPER (Optional - useful during development)
        
        Shows X (red), Y (green), Z (blue) axes
        Helps understand orientation
      */}
      {/* <axesHelper args={[5]} /> */}
    </Canvas>
  );
};

export default Scene;