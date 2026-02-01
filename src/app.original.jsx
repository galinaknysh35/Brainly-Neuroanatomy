import { useState } from 'react';
import Brain3D from './components/Brain3D/Brain3D';
import InfoPanel from './components/UI/InfoPanel';
import NetworkSelector from './components/UI/NetworkSelector';
import SearchBar from './components/UI/SearchBar';
import './App.css';

/**
 * App Component - Main Application Container
 * 
 * This is the root component that brings together all parts of Brainly.
 * It manages the global application state and layout.
 * 
 * LEARNING NOTES:
 * 
 * 1. APPLICATION ARCHITECTURE:
 *    - App component is the "single source of truth"
 *    - State flows DOWN to children via props
 *    - Events flow UP via callback functions
 *    - This is called "unidirectional data flow"
 * 
 * 2. LAYOUT STRATEGY:
 *    - CSS Grid for main layout
 *    - Responsive design principles
 *    - Sidebar for controls, main area for 3D view
 * 
 * 3. STATE MANAGEMENT:
 *    - selectedStructure: which structure the user clicked
 *    - activeNetwork: which functional network is being visualized
 *    - activeView: which UI panel to show (info vs networks)
 * 
 * 4. COMPONENT COMMUNICATION:
 *    - Parent (App) passes callbacks to children
 *    - Children call these callbacks when events happen
 *    - Parent updates state, triggering re-render
 */

function App() {
  // ============= STATE MANAGEMENT =============
  
  /**
   * Which brain structure is currently selected
   * Null when nothing is selected
   */
  const [selectedStructure, setSelectedStructure] = useState(null);
  
  /**
   * Which functional network is currently active
   * Null when no network is selected
   */
  const [activeNetwork, setActiveNetwork] = useState(null);
  
  /**
   * Which view is shown in the right sidebar
   * 'info' = structure details
   * 'networks' = network selector
   */
  const [activeView, setActiveView] = useState('info');

  // ============= EVENT HANDLERS =============

  /**
   * Called when user selects a structure (from 3D view or search)
   */
  const handleStructureSelect = (structure) => {
    setSelectedStructure(structure);
    setActiveView('info'); // Switch to info view to show details
    
    // Optional: clear active network when selecting individual structure
    // setActiveNetwork(null);
  };

  /**
   * Called when user selects a network
   */
  const handleNetworkSelect = (networkId) => {
    setActiveNetwork(networkId);
    
    // Optional: clear selected structure when selecting network
    // setSelectedStructure(null);
  };

  /**
   * Called when user clicks a view tab
   */
  const handleViewChange = (view) => {
    setActiveView(view);
  };

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
          Built with React & Three.js | 
          Educational Tool for Neuroscience Students
        </p>
      </footer>
    </div>
  );
}

export default App;