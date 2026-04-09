import React from 'react';
import { getNetworksByStructure } from '../../data/networkData';

const InfoPanel = ({ selectedStructure, onClose }) => {
  if (!selectedStructure) {
    return (
      <div style={styles.container}>
        <div style={styles.placeholder}>
          <div style={styles.iconContainer}>
            <span style={styles.icon}>🧠</span>
          </div>
          <h3 style={styles.placeholderTitle}>Click on a brain structure</h3>
          <p style={styles.placeholderText}>
            Select any region to learn about its function and role in functional networks
          </p>
        </div>
      </div>
    );
  }

  const networks = getNetworksByStructure(selectedStructure.id);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.regionBadge}>{selectedStructure.region}</div>
          <h2 style={styles.title}>{selectedStructure.name}</h2>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            style={styles.closeButton}
            onMouseOver={(e) => (e.target.style.background = '#ff4444')}
            onMouseOut={(e) => (e.target.style.background = 'rgba(255,255,255,0.1)')}
          >
            ✕
          </button>
        )}
      </div>

      {/* Color bar */}
      <div
        style={{
          ...styles.colorBar,
          background: selectedStructure.color
        }}
      />

      {/* Function */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Function</h3>
        <p style={styles.functionText}>{selectedStructure.function}</p>
      </div>

      {/* Clinical Relevance */}
      {selectedStructure.clinicalSignificance && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Clinical Relevance</h3>
          <p style={styles.functionText}>{selectedStructure.clinicalSignificance}</p>
        </div>
      )}

      {/* Discovery */}
      {selectedStructure.discoveredBy && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Discovery</h3>
          <p style={styles.functionText}>{selectedStructure.discoveredBy}</p>
        </div>
      )}

      {/* Networks */}
      {networks.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            Functional Networks ({networks.length})
          </h3>
          <div style={styles.networkList}>
            {networks.map((network) => (
              <div
                key={network.id}
                style={{
                  ...styles.networkBadge,
                  borderLeft: `3px solid ${network.color}`
                }}
              >
                <div style={styles.networkName}>{network.name}</div>
                <div style={styles.networkDesc}>{network.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.98)',
    overflowY: 'auto',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    color: '#1a1a1a'
  },

  placeholder: {
    padding: '60px 30px',
    textAlign: 'center',
    color: '#666'
  },

  iconContainer: {
    marginBottom: '20px'
  },

  icon: {
    fontSize: '64px',
    opacity: 0.3
  },

  placeholderTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#333'
  },

  placeholderText: {
    fontSize: '14px',
    lineHeight: '1.6',
    maxWidth: '300px',
    margin: '0 auto'
  },

  header: {
    padding: '25px 30px 20px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },

  regionBadge: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#666',
    background: '#f5f5f5',
    padding: '4px 10px',
    borderRadius: '12px',
    marginBottom: '8px'
  },

  title: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0',
    color: '#1a1a1a',
    lineHeight: '1.3'
  },

  closeButton: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    color: '#666',
    fontSize: '20px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  colorBar: {
    height: '4px',
    width: '100%'
  },

  section: {
    padding: '25px 30px',
    borderBottom: '1px solid #f0f0f0'
  },

  sectionTitle: {
    fontSize: '13px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#888',
    marginBottom: '12px'
  },

  functionText: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#333',
    margin: '0'
  },

  networkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  networkBadge: {
    background: '#f8f9fa',
    padding: '12px 15px',
    borderRadius: '8px',
    transition: 'transform 0.2s'
  },

  networkName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px'
  },

  networkDesc: {
    fontSize: '12px',
    color: '#666',
    lineHeight: '1.5'
  }
};

export default InfoPanel;