import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef, Suspense, useMemo } from 'react';
import MRIMesh from '../MRI/MRIMesh';
import { brainStructures, getStructureById } from '../../data/brainData';

function BrainModel({ 
  selectedStructure, 
  highlightedStructures, 
  onStructureClick, 
  networkColor,
  brainModel = 'full'
}) {
  // Load both models
  const { scene: fullBrainScene } = useGLTF('/models/brain.blend .glb');
  const { scene: midsagittalScene } = useGLTF('/models/mid.brain.glb');
  
  // Use the appropriate scene based on brainModel prop
  const sourceScene = brainModel === 'midsagittal' ? midsagittalScene : fullBrainScene;
  
  // Clone only when source scene changes, memoized
  const clonedScene = useMemo(() => {
    if (sourceScene) {
      console.log('🔄 Cloning scene for:', brainModel);
      return sourceScene.clone(true);
    }
    return null;
  }, [sourceScene, brainModel]);
  
  const brainRef = useRef();
  const { camera, gl } = useThree();

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
        const meshName = mesh.name;
        
        console.log('🖱️ Clicked mesh:', meshName);

        let matchedStructure = getStructureById(meshName);

        if (!matchedStructure) {
          matchedStructure = brainStructures.find(s => 
            s.id.toLowerCase() === meshName.toLowerCase() ||
            s.name.toLowerCase() === meshName.toLowerCase()
          );
        }

        if (matchedStructure) {
          console.log('✅ Matched structure:', matchedStructure.name);
          onStructureClick(matchedStructure);
        } else {
          console.log('❌ No match found for:', meshName);
          onStructureClick({
            id: meshName,
            name: meshName,
            region: 'Unknown',
            function: `This structure ("${meshName}") is not yet mapped in the brain atlas.`,
            color: '#888888'
          });
        }
      }
    };

    gl.domElement.addEventListener('click', handleClick);
    return () => gl.domElement.removeEventListener('click', handleClick);
  }, [camera, gl, onStructureClick]);

  // Initial pink color setup
  useEffect(() => {
    if (!brainRef.current) return;

    console.log('🎨 Setting initial pink colors');
    
    brainRef.current.traverse((child) => {
      if (child.isMesh) {
        if (!child.material.userData.originalMaterial) {
          child.material = child.material.clone();
          child.material.userData.originalMaterial = true;
        }
        
        child.material.color.set('#e864be');
        child.material.emissive.set('#262020');
        child.material.emissiveIntensity = 0.1;
        child.material.transparent = false;
        child.material.opacity = 0.7;
        child.material.needsUpdate = true;
      }
    });
  }, [brainModel]);

  // HIGHLIGHTING LOGIC
  useEffect(() => {
    if (!brainRef.current) return;

    const selectedId = typeof selectedStructure === 'object' 
      ? selectedStructure?.id 
      : selectedStructure;

    if (!selectedId && highlightedStructures.length === 0) {
      // No selection and no highlights - reset to pink
      brainRef.current.traverse((child) => {
        if (child.isMesh) {
          if (!child.material.userData.originalMaterial) {
            child.material = child.material.clone();
            child.material.userData.originalMaterial = true;
          }
          child.material.color.set('#e864be');
          child.material.emissive.set('#000000');
          child.material.emissiveIntensity = 0;
          child.material.needsUpdate = true;
        }
      });
      return;
    }
    
    const selectedData = brainStructures.find(s => s.id === selectedId);

    const idsToHighlight = [selectedId];
    if (selectedData?.relatedStructures) {
      idsToHighlight.push(...selectedData.relatedStructures);
    }

    const applyMaterialToMeshAndChildren = (object, color, emissive, intensity) => {
      if (object.isMesh) {
        if (!object.material.userData.originalMaterial) {
          object.material = object.material.clone();
          object.material.userData.originalMaterial = true;
        }

        object.material.color.set(color);
        object.material.emissive.set(emissive);
        object.material.emissiveIntensity = intensity;
        object.material.needsUpdate = true;
      }

      object.children.forEach(child => {
        applyMaterialToMeshAndChildren(child, color, emissive, intensity);
      });
    };

    brainRef.current.traverse((child) => {
      const meshName = child.name;

      const isSelected = idsToHighlight.includes(meshName);
      const isHighlighted = highlightedStructures.includes(meshName);

      if (isSelected) {
        console.log(`  ✅ SELECTING: ${meshName}`);
        applyMaterialToMeshAndChildren(child, '#0080ff', '#0080ff', 0.5);
      } else if (isHighlighted) {
        console.log(`  ✨ HIGHLIGHTING: ${meshName}`);
        applyMaterialToMeshAndChildren(child, networkColor || '#FFD700', networkColor || '#FFD700', 0.3);
      } else if (child.isMesh) {
        if (!child.material.userData.originalMaterial) {
          child.material = child.material.clone();
          child.material.userData.originalMaterial = true;
        }
        child.material.color.set('#ef59bf');
        child.material.emissive.set('#e857bc');
        child.material.emissiveIntensity = 0;
        child.material.needsUpdate = true;
      }
    });
  }, [selectedStructure, highlightedStructures, networkColor]);

  // Debug: Log mesh names
  useEffect(() => {
    if (brainRef.current) {
      console.log(`🧠 === ${brainModel.toUpperCase()} BRAIN MODEL LOADED ===`);
      brainRef.current.traverse((child) => {
        if (child.isMesh) {
          console.log('  -', child.name);
        }
      });
    }
  }, [brainModel]);

  const modelScale = brainModel === 'midsagittal' ? 128 : 1.5;

  // Don't render if scene isn't ready
  if (!clonedScene) {
    return null;
  }

  return (
    <primitive
      ref={brainRef}
      object={clonedScene}
      scale={modelScale}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
}
  

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
  networkColor,
  mriMesh,
  brainModel = 'full'
}) => {
  console.log('🎬 Scene - mriMesh:', mriMesh);
  console.log('🎬 Brain model:', brainModel);

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
        position={[0, 0, 400]} 
        fov={50} 
        near={0.1} 
        far={1000} 
      />
      
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05} 
        minDistance={100} 
        maxDistance={1000} 
        target={[10, 55, 0]} 
      />

      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} color="#b8d4ff" />
      <directionalLight position={[0, -5, -10]} intensity={0.2} color="#ffebcd" />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#4A90E2" />
      <pointLight position={[0, -5, 0]} intensity={0.2} color="#E91E63" />

      <Environment preset="city" />

      <Suspense fallback={<LoadingBrain />}>
        <BrainModel
          selectedStructure={selectedStructure}
          highlightedStructures={highlightedStructures}
          onStructureClick={onStructureClick}
          networkColor={networkColor}
          brainModel={brainModel}
        />
        
        <MRIMesh meshData={mriMesh} />
      </Suspense>
    </Canvas>
  );
};

export default Scene;

// Preload both models
useGLTF.preload('/models/brain.blend .glb');
useGLTF.preload('/models/mid.brain.glb');