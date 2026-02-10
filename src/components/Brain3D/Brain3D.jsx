import React, { useState, useEffect } from 'react';
import Scene from './Scene';
import { brainStructures } from '../../data/brainData';
import { getStructuresInNetwork, getNetworkById } from '../../data/networkData';

const Brain3D = ({ 
  onStructureSelect,
  activeNetwork
}) => {
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [highlightedStructures, setHighlightedStructures] = useState([]);

  useEffect(() => {
    if (activeNetwork) {
      const structureIds = getStructuresInNetwork(activeNetwork);
      setHighlightedStructures(structureIds);
    } else {
      setHighlightedStructures([]);
    }
  }, [activeNetwork]);

  const handleStructureClick = (structure) => {
    setSelectedStructure(structure);
    if (onStructureSelect) {
      onStructureSelect(structure);
    }
  };

  const networkColor = activeNetwork 
    ? getNetworkById(activeNetwork)?.color 
    : null;

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
      />
    </div>
  );
};

export default Brain3D;