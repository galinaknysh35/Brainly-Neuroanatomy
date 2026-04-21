import { useState, useEffect } from 'react';
import Brain3D from './components/Brain3D/Brain3D';
import MRIUploader from './components/MRI/MRIUploader';
import InfoPanel from './components/UI/InfoPanel';
import NetworkSelector from './components/UI/NetworkSelector';
import SearchBar from './components/UI/SearchBar';
import QuizPanel from './components/Quiz/QuizPanel';
import './App.css';

function App() {
  // ===================== STATE =====================
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [activeNetwork, setActiveNetwork] = useState(null);
  const [activeView, setActiveView] = useState('info');
  const [highlightedStructures, setHighlightedStructures] = useState([]);
  const [networkColor, setNetworkColor] = useState(null);

  // MRI upload state
  const [mriMesh, setMriMesh] = useState(null);
  const [showMRIUpload, setShowMRIUpload] = useState(false);

  // Brain model state
  const [brainModel, setBrainModel] = useState('full');

  // Quiz state
  const [quizClickHandler, setQuizClickHandler] = useState(null);

  // ===================== HANDLERS =====================
  const handleStructureSelect = (structure) => {
    console.log('📱 App - handleStructureSelect:', structure);
    
    // If quiz is active, let quiz handle the click
    if (activeView === 'quiz' && quizClickHandler) {
      console.log('📝 Quiz is active - routing click to quiz handler');
      quizClickHandler(structure);
      return;
    }

    // Otherwise, handle as normal selection
    setSelectedStructure(structure);
    setActiveView('info');
  };

  const handleNetworkSelect = (networkId) => {
    setActiveNetwork(networkId);
    setHighlightedStructures(networkId ? getStructuresInNetwork(networkId) : []);
    setNetworkColor(networkId ? getNetworkById(networkId)?.color : '#FFD700');
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const handleMeshGenerated = (meshData) => {
    console.log('✅ MRI mesh generated!', meshData);
    setMriMesh(meshData);
    setShowMRIUpload(false);
  };

  const handleBrainModelToggle = () => {
    const newModel = brainModel === 'full' ? 'midsagittal' : 'full';
    console.log('🧠 Switching brain model to:', newModel);
    setBrainModel(newModel);
  };

  const handleQuizClickCallback = (clickHandler) => {
    console.log('📝 Quiz click handler registered');
    setQuizClickHandler(() => clickHandler);
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
            Interactive 3D Brain Model for Students
          </p>
        </div>

        {/* Header Controls */}
        <div className="header-controls">
          <button
            onClick={handleBrainModelToggle}
            className="model-toggle-btn"
            title={brainModel === 'full' ? 'Switch to Midsagittal View' : 'Switch to Full Brain View'}
          >
            {brainModel === 'full' ? '↔️ Midsagittal' : '🧠 Full Brain'}
          </button>

          <button
            onClick={() => setShowMRIUpload(true)}
            className="mri-upload-btn"
          >
            📁 Upload MRI
          </button>
        </div>
      </header>

      {/* MRI Upload Modal */}
      {showMRIUpload && (
        <div className="modal-overlay">
          <div className="modal-content">
            <MRIUploader onMeshGenerated={handleMeshGenerated} />

            <button
              onClick={() => setShowMRIUpload(false)}
              className="modal-close-btn"
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
            <h3 className="sidebar-title">View</h3>
            <div className="view-indicator">
              <span className="badge">
                {brainModel === 'full' ? '🧠 Full Brain' : '↔️ Midsagittal'}
              </span>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">About the Model</h3>
            <div className="tip-box">
              🎨 This is a realistic 3D brain model.
              Click on different parts to learn about their functions!
            </div>
          </div>
        </aside>

        {/* CENTER - 3D Visualization */}
        <main className="visualization-area">
          <Brain3D
            onStructureSelect={handleStructureSelect}
            activeNetwork={activeNetwork}
            selectedStructure={selectedStructure}
            mriMesh={mriMesh}
            brainModel={brainModel}
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
            <button
              className={`view-tab ${activeView === 'quiz' ? 'active' : ''}`}
              onClick={() => handleViewChange('quiz')}
              title="Test your knowledge"
            >
              📝 Quiz
            </button>
          </div>

          <div className="view-content">
            {activeView === 'info' ? (
              <InfoPanel
                selectedStructure={selectedStructure}
                onClose={() => setSelectedStructure(null)}
              />
            ) : activeView === 'networks' ? (
              <NetworkSelector
                activeNetwork={activeNetwork}
                onNetworkSelect={handleNetworkSelect}
              />
            ) : (
              <QuizPanel onStructureClick={handleQuizClickCallback} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;