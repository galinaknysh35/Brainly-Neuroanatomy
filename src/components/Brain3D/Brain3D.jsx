import React, { useState, useEffect } from 'react';
import Scene from './Scene';
import { brainStructures } from '../../data/brainData';
import { getStructuresInNetwork, getNetworkById } from '../../data/networkData';

/**
 * Brain3D Component
 * 
 * This is the main container for the 3D brain visualization.
 * It manages the state and coordinates between the 3D scene and UI components.
 * 
 * LEARNING NOTES:
 * 
 * 1. STATE MANAGEMENT:
 *    - useState is React's way of storing data that can change
 *    - When state changes, React re-renders the component
 *    - We track: selected structure, active network, highlighted structures
 * 
 * 2. PROPS:
 *    - Components receive data through props
 *    - Props flow DOWN from parent to child
 *    - We pass callbacks (functions) to allow children to communicate UP
 * 
 * 3. COMPONENT ARCHITECTURE:
 *    - This component orchestrates the whole visualization
 *    - It's like a conductor for an orchestra
 *    - Scene handles rendering, this handles logic
 */

const Brain3D = ({ 
  onStructureSelect, // Callback when user selects a structure
  activeNetwork // Currently active network (if any)
}) => {
  /**
   * STATE VARIABLES
   * 
   * useState returns [currentValue, functionToUpdateValue]
   * Example: const [count, setCount] = useState(0);
   */
  
  // Currently selected brain structure
  const [selectedStructure, setSelectedStructure] = useState(null);
  
  // Array of structure IDs that should be highlighted
  const [highlightedStructures, setHighlightedStructures] = useState([]);

  /**
   * EFFECT: Update highlights when active network changes
   * 
   * When a network is selected, we need to highlight all structures
   * that are part of that network.
   */
  useEffect(() => {
    if (activeNetwork) {
      // Get all structure IDs in this network
      const structureIds = getStructuresInNetwork(activeNetwork);
      setHighlightedStructures(structureIds);
    } else {
      // No network selected, clear highlights
      setHighlightedStructures([]);
    }
  }, [activeNetwork]); // Re-run when activeNetwork changes

  /**
   * HANDLER: Structure Click
   * 
   * Called when user clicks on a brain structure
   * Updates local state and notifies parent component
   */
  const handleStructureClick = (structure) => {
    // Update local state
    setSelectedStructure(structure);
    
    // Notify parent component (if callback provided)
    // This allows the info panel to update
    if (onStructureSelect) {
      onStructureSelect(structure);
    }
  };

  /**
   * Get network color for highlighting
   * If a network is active, use its color for highlighted structures
   */
  const networkColor = activeNetwork 
    ? getNetworkById(activeNetwork)?.color 
    : null;

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      position: 'relative'
    }}>
      {/* 
        Render the 3D Scene
        
        We pass down all necessary data and handlers as props
      */}
      <Scene
        structures={brainStructures}
        selectedStructure={selectedStructure}
        highlightedStructures={highlightedStructures}
        onStructureClick={handleStructureClick}
        networkColor={networkColor}
      />
      
      
      {/* 
        Optional: Instructions overlay
        Shows helpful hints to users
      */}
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
          • <strong>Click Structure:</strong> View Info
        </div>
      </div>
    </div>
  );
};

export default Brain3D;