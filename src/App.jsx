import { useState,useEffect } from 'react';
import Brain3D from './components/Brain3D/Brain3D';
import InfoPanel from './components/UI/InfoPanel';
import NetworkSelector from './components/UI/NetworkSelector';
import SearchBar from './components/UI/SearchBar';
import handleSickSalmon from './components/sicksalmon';
import './App.css';

/**
 * App Component - Main Application Container
 * 
 * This is the root component that brings together all parts of Brainly.
 * It manages the global application state and layout.
 */

function App() {
  // ============= STATE MANAGEMENT =============
  
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [activeNetwork, setActiveNetwork] = useState(null);
  const [activeView, setActiveView] = useState('info');

  // ============= EVENT HANDLERS =============

  const handleStructureSelect = (structure) => {
    console.log('📱 App - handleStructureSelect called with:', structure);
    setSelectedStructure(structure);
    setActiveView('info');
  };
  

  const handleNetworkSelect = (networkId) => {
    setActiveNetwork(networkId);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  // Add useEffect to watch selectedStructure changes
useEffect(() => {
  console.log('📱 App - selectedStructure changed to:', selectedStructure);
}, [selectedStructure]);


  // ============= RENDER =============

  return (
    <div className="app">
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🧠</span>
            <h1 className="logo-text">Brainly</h1>
          </div>
          <p className="tagline">
            Interactive 3D Brain Atlas for Neuroscience Students
          </p>
        </div>
      </header>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="main-content">
        
        {/* LEFT SIDEBAR - Controls */}
        <aside className="left-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Search</h3>
            <SearchBar onStructureSelect={handleStructureSelect} />
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Quick Info</h3>
            <div className="info-cards">
              <div className="info-card">
                <div className="info-card-number">
                  {selectedStructure ? '1' : '0'}
                </div>
                <div className="info-card-label">Structure Selected</div>
              </div>
              <div className="info-card">
                <div className="info-card-number">
                  {activeNetwork ? '1' : '0'}
                </div>
                <div className="info-card-label">Network Active</div>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">About the Model</h3>
            <div className="tip-box">
              🎨 This is a realistic 3D brain model. 
              Click on different parts to learn about their functions!
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Learning Tip</h3>
            <div className="tip-box">
              💡 Start by exploring major lobes (Frontal, Parietal, Temporal, 
              Occipital), then dive into specific structures and their networks.
            </div>
          </div>
        </aside>

        {/* CENTER - 3D Visualization */}
        <main className="visualization-area">
          <Brain3D
            onStructureSelect={handleStructureSelect}
            activeNetwork={activeNetwork}
            selectedStructure={selectedStructure}
          />
        </main>

        {/* RIGHT SIDEBAR - Information Display */}
        <aside className="right-sidebar">
          {/* View Tabs */}
          <div className="view-tabs">
            <button
              className={`view-tab ${activeView === 'info' ? 'active' : ''}`}
              onClick={() => handleViewChange('info')}
            >
              Structure Info
            </button>
            <button
              className={`view-tab ${activeView === 'networks' ? 'active' : ''}`}
              onClick={() => handleViewChange('networks')}
            >
              Networks
            </button>
          </div>

          {/* Dynamic Content Based on Active View */}
          <div className="view-content">
            {activeView === 'info' ? (
              <InfoPanel 
                selectedStructure={selectedStructure}
                onClose={() => setSelectedStructure(null)}
              />
            ) : (
              <NetworkSelector
                activeNetwork={activeNetwork}
                onNetworkSelect={handleNetworkSelect}
              />
            )}
          </div>
        </aside>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>
          Based on Harvard–Oxford Brain Atlas | 
          3D Brain Model | 
          Built with React & Three.js | 
          Educational Tool for Neuroscience Students
        </p>

      </footer>
    </div>
  );
}

export default App;
