import React, { useState } from 'react';
import { functionalNetworks } from '../../data/networkData';

/**
 * NetworkSelector Component
 * 
 * Allows users to select a functional network to visualize.
 * Shows all available networks with descriptions.
 * 
 * LEARNING NOTES:
 * 
 * 1. CONTROLLED COMPONENTS:
 *    - Parent component controls the active network
 *    - We notify parent when selection changes via callback
 *    - This is React's "lifting state up" pattern
 * 
 * 2. EVENT HANDLING:
 *    - onClick handlers on each network card
 *    - Toggle behavior: click again to deselect
 * 
 * 3. DYNAMIC STYLING:
 *    - Active network gets highlighted styling
 *    - Hover effects for better UX
 */

const NetworkSelector = ({ activeNetwork, onNetworkSelect }) => {
  // Track which network is being hovered for preview
  const [hoveredNetwork, setHoveredNetwork] = useState(null);

  /**
   * Handle network click
   * Toggle selection: if already active, deselect it
   */
  const handleNetworkClick = (networkId) => {
    if (activeNetwork === networkId) {
      // Clicking active network deselects it
      onNetworkSelect(null);
    } else {
      // Select new network
      onNetworkSelect(networkId);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Functional Networks</h2>
        <p style={styles.subtitle}>
          Select a network to see how brain regions work together
        </p>
      </div>

      {/* Network Grid */}
      <div style={styles.networkGrid}>
        {functionalNetworks.map((network) => {
          const isActive = activeNetwork === network.id;
          const isHovered = hoveredNetwork === network.id;

          return (
            <div
              key={network.id}
              onClick={() => handleNetworkClick(network.id)}
              onMouseEnter={() => setHoveredNetwork(network.id)}
              onMouseLeave={() => setHoveredNetwork(null)}
              style={{
                ...styles.networkCard,
                borderColor: isActive ? network.color : '#e0e0e0',
                background: isActive 
                  ? `linear-gradient(135deg, ${network.color}15, ${network.color}05)`
                  : isHovered 
                    ? '#f8f9fa' 
                    : 'white',
                transform: isActive ? 'translateY(-2px)' : 'none',
                boxShadow: isActive 
                  ? `0 4px 12px ${network.color}30`
                  : isHovered
                    ? '0 2px 8px rgba(0,0,0,0.08)'
                    : '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              {/* Color indicator */}
              <div style={{
                ...styles.colorDot,
                background: network.color,
                boxShadow: isActive ? `0 0 12px ${network.color}` : 'none'
              }} />

              {/* Network info */}
              <div style={styles.networkInfo}>
                <h3 style={styles.networkName}>{network.name}</h3>
                <p style={styles.networkDescription}>
                  {network.description}
                </p>
                
                {/* Structure count */}
                <div style={styles.structureCount}>
                  {network.structures.length} structure{network.structures.length !== 1 ? 's' : ''}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div style={styles.activeLabel}>
                    ✓ Active
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info box */}
      <div style={styles.infoBox}>
        <strong>💡 Tip:</strong> Functional networks show how different brain regions 
        collaborate to perform complex cognitive tasks. Click a network to highlight 
        its components in the 3D view.
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    background: 'white',
    overflowY: 'auto',
    fontFamily: '"Helvetica Neue", Arial, sans-serif'
  },
  
  header: {
    padding: '25px 30px 20px',
    borderBottom: '1px solid #e0e0e0'
  },
  
  title: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    color: '#1a1a1a'
  },
  
  subtitle: {
    fontSize: '14px',
    color: '#666',
    margin: '0',
    lineHeight: '1.5'
  },
  
  networkGrid: {
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px'
  },
  
  networkCard: {
    padding: '20px',
    border: '2px solid',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative'
  },
  
  colorDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    position: 'absolute',
    top: '20px',
    right: '20px',
    transition: 'box-shadow 0.2s'
  },
  
  networkInfo: {
    paddingRight: '30px'
  },
  
  networkName: {
    fontSize: '16px',
    fontWeight: '700',
    margin: '0 0 10px 0',
    color: '#1a1a1a',
    lineHeight: '1.3'
  },
  
  networkDescription: {
    fontSize: '13px',
    color: '#666',
    margin: '0 0 12px 0',
    lineHeight: '1.6'
  },
  
  structureCount: {
    fontSize: '12px',
    color: '#999',
    fontWeight: '600'
  },
  
  activeLabel: {
    marginTop: '10px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#27ae60',
    display: 'inline-block'
  },
  
  infoBox: {
    margin: '20px',
    padding: '15px 20px',
    background: '#f0f7ff',
    border: '1px solid #c2e0ff',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#0066cc',
    lineHeight: '1.6'
  }
};

export default NetworkSelector;