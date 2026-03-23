import { useState, useEffect } from 'react';
import Brain3D from './components/Brain3D/Brain3D';
import MRIUploader from './components/MRI/MRIUploader';
import InfoPanel from './components/UI/InfoPanel';
import NetworkSelector from './components/UI/NetworkSelector';
import SearchBar from './components/UI/SearchBar';
import handleSickSalmon from './components/sicksalmon';
import './App.css';

function App() {
  // ===================== STATE =====================
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [activeNetwork, setActiveNetwork] = useState(null);
  const [activeView, setActiveView] = useState('info');

  // MRI upload state
  const [mriMesh, setMriMesh] = useState(null);
  const [showMRIUpload, setShowMRIUpload] = useState(false);

  // ===================== HANDLERS =====================
  const handleStructureSelect = (structure) => {
    console.log('📱 App - handleStructureSelect:', structure);
    setSelectedStructure(structure);
    setActiveView('info');
  };

  const handleNetworkSelect = (networkId) => {
    setActiveNetwork(networkId);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const handleMeshGenerated = (meshData) => {
  console.log('✅ MRI mesh generated!', meshData);
  setMriMesh(meshData);
  setShowMRIUpload(false);
};

  useEffect(() => {
    console.log('📱 App - selectedStructure changed:', selectedStructure);
  }, [selectedStructure]);

  // ===================== RENDER =====================
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

        {/* MRI Upload Button */}
        <button
          onClick={() => setShowMRIUpload(true)}
          style={{
            padding: '10px 20px',
            background: '#2ECC71',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginLeft: '20px'
          }}
        >
          📁 Upload MRI
        </button>
      </header>

      {/* MRI Upload Modal */}
      {showMRIUpload && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '40px',
              borderRadius: '16px',
              maxWidth: '600px',
            }}
          >
            <MRIUploader onMeshGenerated={handleMeshGenerated} />

            <button
              onClick={() => setShowMRIUpload(false)}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: '#999',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="main-content">

        {/* LEFT SIDEBAR */}
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
              💡 Start by exploring major lobes, then dive into specific structures.
            </div>
          </div>
        </aside>

        {/* CENTER - 3D Visualization */}
        <main className="visualization-area">
          <Brain3D
            onStructureSelect={handleStructureSelect}
            activeNetwork={activeNetwork}
            selectedStructure={selectedStructure}
            mriMesh={mriMesh}   // <-- MRI mesh passed here
          />
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="right-sidebar">
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
    </div>
  );
}

export default App;