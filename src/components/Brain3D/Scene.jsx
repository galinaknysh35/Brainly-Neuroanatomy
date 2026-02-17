import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef, Suspense } from 'react';
import { brainStructures, getStructureById } from '../../data/brainData';  // ← ADD THIS!


function BrainModel({ selectedStructure, highlightedStructures, onStructureClick, networkColor }) {
  const { scene } = useGLTF('/src/components/Brain3D/brain4 .glb');
  const brainRef = useRef();
  const { camera, gl } = useThree();

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // CLICK HANDLER - NOW LOOKS UP FULL STRUCTURE DATA
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

        // LOOK UP THE FULL STRUCTURE FROM brainData.js
        let matchedStructure = getStructureById(meshName);

        // Try case-insensitive match if exact match fails
        if (!matchedStructure) {
          matchedStructure = brainStructures.find(s => 
            s.id.toLowerCase() === meshName.toLowerCase() ||
            s.name.toLowerCase() === meshName.toLowerCase()
          );
        }

        if (matchedStructure) {
          console.log('✅ Matched structure:', matchedStructure.name);
          console.log('📝 Function:', matchedStructure.function);
          onStructureClick(matchedStructure);
        } else {
          console.log('❌ No match found for:', meshName);
          console.log('Available IDs:', brainStructures.map(s => s.id));
          // Create temporary structure for unmapped meshes
          onStructureClick({
            id: meshName,
            name: meshName,
            region: 'Unknown',
            function: `This structure ("${meshName}") is not yet mapped in the brain atlas. The mesh was clicked but no matching data was found.`,
            color: '#888888'
          });
        }
      }
    };

    gl.domElement.addEventListener('click', handleClick);
    return () => gl.domElement.removeEventListener('click', handleClick);
  }, [camera, gl, onStructureClick]);

  // ADD THIS NEW useEffect - Initial color setup
useEffect(() => {
  if (!brainRef.current) return;

  console.log('🎨 Setting initial pink colors');
  
  brainRef.current.traverse((child) => {
    if (child.isMesh) {
      // Clone material
      if (!child.material.userData.originalMaterial) {
        child.material = child.material.clone();
        child.material.userData.originalMaterial = true;
      }
      
      // Set initial pink color
      child.material.color.set('#e864be');
      child.material.emissive.set('#060606');
      child.material.emissiveIntensity = 0.1;
      child.material.transparent = false;
      child.material.opacity = 0.7;
      child.material.needsUpdate = true;
    }
  });
}, []); // Run once when component mounts

  // HIGHLIGHTING LOGIC - With Better ID Extraction
useEffect(() => {
  console.log('🔥 HIGHLIGHTING EFFECT TRIGGERED');
  console.log('🔥 selectedStructure:', selectedStructure);
  console.log('🔥 selectedStructure type:', typeof selectedStructure);
  
  if (!brainRef.current) {
    console.log('❌ brainRef.current is null');
    return;
  }

  // Extract ID from selectedStructure (could be object or string)
  const selectedId = typeof selectedStructure === 'object' 
    ? selectedStructure?.id 
    : selectedStructure;
  
    console.log('🔥 Extracted selectedId:', selectedId);

  if (!selectedId) {
    console.log('❌ No selectedId, skipping highlighting');
    return;
  }

  if (!selectedId) {
    console.log('🎨 No structure selected');
    // Reset all to default
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
  
  // Get the selected structure data
  const selectedData = brainStructures.find(s => s.id === selectedId);
  console.log('🔥 Found selectedData:', selectedData?.name);

  // Build list of all IDs that should be highlighted as "selected"
  const idsToHighlight = [selectedId];
  if (selectedData?.relatedStructures) {
    idsToHighlight.push(...selectedData.relatedStructures);
  }

  console.log('🔥 IDs to highlight:', idsToHighlight);

  console.log('🎨 Highlighting update:', {
    selectedStructure,
    selectedId,
    selectedData: selectedData?.name,
    relatedStructures: selectedData?.relatedStructures,
    idsToHighlight,
    highlightedStructures
  });

  // Function to apply material to a mesh and ALL its children
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

  // Traverse the entire brain model
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




  // DEBUG: Log all mesh names when model loads
  useEffect(() => {
    if (brainRef.current) {
      console.log('🧠 === BRAIN MODEL LOADED ===');
      console.log('📋 Mesh names in GLB:');
      brainRef.current.traverse((child) => {
        if (child.isMesh) {
          console.log('  -', child.name);
        }
      });
      console.log('📚 Structure IDs in brainData.js:');
      brainStructures.forEach(s => console.log('  -', s.id));
    }
  }, []);

  return <primitive ref={brainRef} object={scene} scale={1.5} rotation={[0,Math.PI / 2,0]}/>;
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
  networkColor
}) => {
  console.log('🎬 Scene received:', {
    selectedStructure,
    selectedStructureType: typeof selectedStructure,
    selectedStructureId: selectedStructure?.id
  });
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
        position={[8, 1, 400]} 
        fov={50} 
        near={0.1} 
        far={1000} 
      />
      
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05} 
        minDistance={200} 
        maxDistance={500} 
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
        />
      </Suspense>
    </Canvas>
  );
};

export default Scene;