import React, { useState, useEffect } from 'react';
import { brainStructures } from '../../data/brainData';

const SearchBar = ({ onStructureSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Normalize function - handles spaces, underscores, case
  const normalize = (str) => {
    return str.replace(/_/g, ' ').toLowerCase().trim();
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const query = normalize(searchQuery);

    // Filter structures that match the query
    const results = brainStructures.filter((structure) => {
      const nameMatch = normalize(structure.name).includes(query);
      const idMatch = normalize(structure.id).includes(query);
      const regionMatch = normalize(structure.region).includes(query);
      const functionMatch = normalize(structure.function).includes(query);
      
      return nameMatch || idMatch || regionMatch || functionMatch;
    });

    console.log('🔍 Search results for:', searchQuery, '→', results.length, 'matches');
    setSearchResults(results);
  }, [searchQuery]);

  const handleResultClick = (structure) => {
    console.log('🔍 SearchBar: Selected structure:', structure);
    onStructureSelect(structure);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchBox}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Search brain structures..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        {searchQuery && (
          <button 
            onClick={handleClear}
            style={styles.clearButton}
          >
            ✕
          </button>
        )}
      </div>

      {isSearching && (
        <div style={styles.resultsContainer}>
          {searchResults.length > 0 ? (
            <>
              <div style={styles.resultsHeader}>
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </div>
              <div style={styles.resultsList}>
                {searchResults.map((structure) => (
                  <div
                    key={structure.id}
                    onClick={() => handleResultClick(structure)}
                    style={styles.resultItem}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f0f7ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    <div style={{
                      ...styles.resultColor,
                      background: structure.color
                    }} />
                    
                    <div style={styles.resultInfo}>
                      <div style={styles.resultName}>{structure.name}</div>
                      <div style={styles.resultRegion}>{structure.region}</div>
                      <div style={styles.resultFunction}>
                        {structure.function.substring(0, 80)}...
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={styles.noResults}>
              No structures found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto'
  },
  
  searchBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    padding: '0 15px',
    transition: 'border-color 0.2s'
  },
  
  searchIcon: {
    fontSize: '18px',
    marginRight: '10px',
    opacity: 0.5
  },
  
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '14px 0',
    fontSize: '15px',
    fontFamily: 'inherit',
    background: 'transparent'
  },
  
  clearButton: {
    background: 'none',
    border: 'none',
    color: '#999',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '5px',
    marginLeft: '5px',
    transition: 'color 0.2s'
  },
  
  resultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '8px',
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    maxHeight: '400px',
    overflowY: 'auto',
    zIndex: 1000
  },
  
  resultsHeader: {
    padding: '12px 20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    borderBottom: '1px solid #f0f0f0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  
  resultsList: {
    padding: '5px'
  },
  
  resultItem: {
    padding: '12px 15px',
    cursor: 'pointer',
    borderRadius: '8px',
    margin: '2px 0',
    display: 'flex',
    gap: '12px',
    transition: 'background 0.2s'
  },
  
  resultColor: {
    width: '4px',
    borderRadius: '2px',
    flexShrink: 0
  },
  
  resultInfo: {
    flex: 1,
    minWidth: 0
  },
  
  resultName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '3px'
  },
  
  resultRegion: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '5px',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    fontWeight: '600'
  },
  
  resultFunction: {
    fontSize: '13px',
    color: '#999',
    lineHeight: '1.4',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  
  noResults: {
    padding: '40px 20px',
    textAlign: 'center',
    color: '#999',
    fontSize: '14px'
  }
};

export default SearchBar;