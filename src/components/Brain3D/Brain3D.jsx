import { useState, useEffect } from 'react';
import Scene from './Scene';
import { getStructuresInNetwork, getNetworkById } from '../../data/networkData';
import MRIMesh from '../MRI/MRIMesh';

const Brain3D = ({ 
  onStructureSelect,
  activeNetwork,
  selectedStructure,  // ← Receive from parent (App)
  mriMesh
}) => {
  const [highlightedStructures, setHighlightedStructures] = useState([]);

  // Update highlights when network changes
  useEffect(() => {
    if (activeNetwork) {
      const structureIds = getStructuresInNetwork(activeNetwork);
      setHighlightedStructures(structureIds);
    } else {
      setHighlightedStructures([]);
    }
  }, [activeNetwork]);

  // Handle structure click from 3D model
  const handleStructureClick = (structure) => {
    console.log('🔍 Brain3D - handleStructureClick:', structure);
    // Just notify parent - let parent manage the state
    if (onStructureSelect) {
      onStructureSelect(structure);
    }
  };

  const networkColor = activeNetwork 
    ? getNetworkById(activeNetwork)?.color 
    : null;

  console.log('🎨 Brain3D render - selectedStructure from parent:', selectedStructure);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      position: 'relative'
    }}>
      <Scene
        selectedStructure={selectedStructure}
        highlightedStructures={highlightedStructures}
        onStructureClick={handleStructureClick}
        networkColor={networkColor}
        mriMesh={mriMesh}
      />
      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        color: 'white',
        fontSize: '14px',
        background: 'rgba(0,0,0,0.5)',
        padding: '10px 15px',
        borderRadius: '8px',
        fontFamily: 'Inter, sans-serif',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ marginBottom: '5px', fontWeight: '600' }}>
          🖱️ Controls:
        </div>
        <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
          • <strong>Left Click + Drag:</strong> Rotate<br/>
          • <strong>Right Click + Drag:</strong> Pan<br/>
          • <strong>Scroll:</strong> Zoom<br/>
          • <strong>Click Brain:</strong> View Info
        </div>
      </div>
    </div>
  );
};

export default Brain3D;
