import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef, Suspense } from 'react';

function BrainModel({ selectedStructure, highlightedStructures, onStructureClick, networkColor }) {
  // Load the GLB file
  const { scene } = useGLTF('/src/components/Brain3D/brain3.glb');
  const brainRef = useRef();
  const { camera, gl } = useThree();

  // Raycaster for clicks
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // CLICK HANDLER
  useEffect(() => {
    const handleClick = (event) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      if (!brainRef.current) return;

      const intersects = raycaster.intersectObjects(brainRef.current.children, true);

      if (intersects.length > 0) {
        const mesh = intersects[0].object;
        console.log('Clicked mesh:', mesh.name);
        onStructureClick({ id: mesh.name, name: mesh.name });
      }
    };

    gl.domElement.addEventListener('click', handleClick);
    return () => gl.domElement.removeEventListener('click', handleClick);
  }, [camera, gl, onStructureClick]);

  // HIGHLIGHTING LOGIC
  useEffect(() => {
    if (!brainRef.current) return;

    brainRef.current.traverse((child) => {
      if (child.isMesh) {
        const name = child.name;

        // Clone material so each mesh has its own
        if (!child.material.userData.originalMaterial) {
          child.material = child.material.clone();
          child.material.userData.originalMaterial = true;
        }

        if (highlightedStructures.includes(name)) {
          child.material.color.set(networkColor || '#FFD700');
          child.material.emissive.set(networkColor || '#FFD700');
          child.material.emissiveIntensity = 0.3;
        } else if (selectedStructure === name) {
          child.material.color.set('#ffffff');
          child.material.emissive.set('#ffffff');
          child.material.emissiveIntensity = 0.5;
        } else {
          child.material.color.set('#cccccc');
          child.material.emissive.set('#000000');
          child.material.emissiveIntensity = 0;
        }
      }
    });
  }, [selectedStructure, highlightedStructures, networkColor]);

  return <primitive ref={brainRef} object={scene} scale={1.5} />;
}

// Loading fallback
function LoadingBrain() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#667eea" wireframe />
    </mesh>
  );
}

const Scene = ({
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
      shadows
    >
      <PerspectiveCamera 
        makeDefault 
        position={[8, 1, 8]} 
        fov={50} 
        near={0.1} 
        far={1000} 
      />
      
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05} 
        minDistance={317} 
        maxDistance={30} 
        target={[0, 32, 0]} 
      />

      {/* Lights */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} color="#b8d4ff" />
      <directionalLight position={[0, -5, -10]} intensity={0.2} color="#ffebcd" />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#4A90E2" />
      <pointLight position={[0, -5, 0]} intensity={0.2} color="#E91E63" />

      <Environment preset="city" />

      {/* Load the brain model with Suspense for loading state */}
      <Suspense fallback={<LoadingBrain />}>
        <BrainModel
          selectedStructure={selectedStructure?.id}
          highlightedStructures={highlightedStructures}
          onStructureClick={onStructureClick}
          networkColor={networkColor}
        />
      </Suspense>
    </Canvas>
  );
};

export default Scene;