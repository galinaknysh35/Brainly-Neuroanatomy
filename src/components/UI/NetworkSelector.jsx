import { functionalNetworks } from '../../data/networkData';

const NetworkSelector = ({ activeNetwork, onNetworkSelect }) => {
  
  console.log('🌐 NetworkSelector render:', { activeNetwork });

  const handleNetworkClick = (networkId) => {
    console.log('🖱️ Network clicked:', networkId);
    console.log('🖱️ Currently active:', activeNetwork);
    
    // Toggle: if clicking the same network, deselect it
    if (activeNetwork === networkId) {
      console.log('➡️ Deselecting network');
      onNetworkSelect(null);
    } else {
      console.log('➡️ Selecting network:', networkId);
      onNetworkSelect(networkId);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Functional Brain Networks</h3>
      <p style={styles.description}>
        Click a network to highlight all structures that participate in it
      </p>

      <div style={styles.grid}>
        {functionalNetworks.map((network) => {
          const isActive = activeNetwork === network.id;
          
          return (
            <div
              key={network.id}
              onClick={() => handleNetworkClick(network.id)}
              style={{
                ...styles.networkCard,
                borderColor: isActive ? network.color : '#e0e0e0',
                background: isActive ? `${network.color}15` : 'white',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <div
                style={{
                  ...styles.colorIndicator,
                  background: network.color,
                }}
              />
              <div style={styles.networkName}>{network.name}</div>
              <div style={styles.networkDescription}>
                {network.description}
              </div>
              {isActive && (
                <div style={styles.activeBadge}>ACTIVE</div>
              )}
            </div>
          );
        })}
      </div>

      {activeNetwork && (
        <button
          onClick={() => handleNetworkClick(null)}
          style={styles.clearButton}
        >
          Clear Network Selection
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#1a1a1a',
  },
  description: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
  },
  networkCard: {
    padding: '15px',
    borderRadius: '8px',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
  },
  colorIndicator: {
    width: '4px',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: '8px 0 0 8px',
  },
  networkName: {
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '5px',
    color: '#1a1a1a',
    marginLeft: '10px',
  },
  networkDescription: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.4',
    marginLeft: '10px',
  },
  activeBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '10px',
    fontWeight: '700',
    color: '#667eea',
    background: 'white',
    padding: '3px 8px',
    borderRadius: '12px',
    border: '1px solid #667eea',
  },
  clearButton: {
    marginTop: '20px',
    width: '100%',
    padding: '12px',
    background: '#999',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
};

export default NetworkSelector;
