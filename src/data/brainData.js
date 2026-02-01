/**
 * BRAIN STRUCTURES DATA
 * 
 * This file contains anatomical data for major brain structures based on the Harvard-Oxford Brain Atlas.
 * Each structure includes:
 * - id: Unique identifier
 * - name: Anatomical name
 * - position: 3D coordinates [x, y, z] in brain space
 * - size: Approximate dimensions [width, height, depth]
 * - function: What this structure does
 * - network: Which functional networks it participates in
 * - color: Default color for visualization
 * 
 * COORDINATE SYSTEM:
 * - X axis: Left (-) to Right (+)
 * - Y axis: Bottom (-) to Top (+)
 * - Z axis: Back (-) to Front (+)
 */

export const brainStructures = [
  // FRONTAL LOBE STRUCTURES
  {
    id: 'prefrontal-cortex',
    name: 'Prefrontal Cortex',
    region: 'Frontal Lobe',
    position: [0, 1.5, 2.5],
    size: [3, 1.5, 1.5],
    function: 'Executive functions including decision-making, planning, working memory, and impulse control. Often called the "CEO of the brain."',
    networks: ['executive-control', 'default-mode'],
    color: '#4A90E2'
  },
  {
    id: 'motor-cortex',
    name: 'Primary Motor Cortex',
    region: 'Frontal Lobe',
    position: [0, 2, 0.5],
    size: [3.5, 0.8, 1],
    function: 'Controls voluntary movement of muscles throughout the body. Organized somatotopically (body map).',
    networks: ['motor'],
    color: '#E94B3C'
  },
  {
    id: 'premotor-cortex',
    name: 'Premotor Cortex',
    region: 'Frontal Lobe',
    position: [0, 1.8, 1.2],
    size: [3, 0.8, 0.8],
    function: 'Plans and prepares movements, integrates sensory information for motor control.',
    networks: ['motor'],
    color: '#F08080'
  },
  {
    id: 'brocas-area',
    name: "Broca's Area",
    region: 'Frontal Lobe',
    position: [-1.8, 0.8, 1.8],
    size: [0.8, 0.7, 0.7],
    function: 'Speech production and language processing. Damage causes expressive aphasia.',
    networks: ['language'],
    color: '#9B59B6'
  },

  // PARIETAL LOBE STRUCTURES
  {
    id: 'somatosensory-cortex',
    name: 'Primary Somatosensory Cortex',
    region: 'Parietal Lobe',
    position: [0, 2, -0.5],
    size: [3.5, 0.8, 1],
    function: 'Processes touch, temperature, pain, and proprioception from the body. Organized somatotopically.',
    networks: ['sensory'],
    color: '#F39C12'
  },
  {
    id: 'posterior-parietal',
    name: 'Posterior Parietal Cortex',
    region: 'Parietal Lobe',
    position: [0, 1.5, -1.5],
    size: [3, 1.2, 1],
    function: 'Spatial awareness, attention, and sensorimotor integration. Critical for reaching and grasping.',
    networks: ['attention', 'sensory'],
    color: '#E67E22'
  },

  // TEMPORAL LOBE STRUCTURES
  {
    id: 'auditory-cortex',
    name: 'Primary Auditory Cortex',
    region: 'Temporal Lobe',
    position: [-2.2, -0.5, 0],
    size: [0.8, 1, 0.8],
    function: 'Processes auditory information and sound perception.',
    networks: ['auditory'],
    color: '#1ABC9C'
  },
  {
    id: 'wernickes-area',
    name: "Wernicke's Area",
    region: 'Temporal Lobe',
    position: [-2.5, -0.3, -0.5],
    size: [1, 0.8, 0.8],
    function: 'Language comprehension and understanding. Damage causes receptive aphasia.',
    networks: ['language'],
    color: '#8E44AD'
  },
  {
    id: 'hippocampus',
    name: 'Hippocampus',
    region: 'Temporal Lobe (Medial)',
    position: [-1.5, -1, -0.5],
    size: [0.6, 0.4, 1.2],
    function: 'Critical for forming new memories and spatial navigation. Heavily affected in Alzheimer\'s disease.',
    networks: ['default-mode', 'memory'],
    color: '#27AE60'
  },
  {
    id: 'amygdala',
    name: 'Amygdala',
    region: 'Temporal Lobe (Medial)',
    position: [-1.2, -0.8, 0.8],
    size: [0.5, 0.5, 0.5],
    function: 'Processes emotions, especially fear and threat detection. Part of the limbic system.',
    networks: ['salience', 'emotion'],
    color: '#E74C3C'
  },

  // OCCIPITAL LOBE STRUCTURES
  {
    id: 'visual-cortex',
    name: 'Primary Visual Cortex (V1)',
    region: 'Occipital Lobe',
    position: [0, 0.5, -3],
    size: [2.5, 1.5, 0.8],
    function: 'Processes basic visual information like edges, orientation, and movement. First cortical area to receive visual input.',
    networks: ['visual'],
    color: '#3498DB'
  },

  // SUBCORTICAL STRUCTURES
  {
    id: 'thalamus',
    name: 'Thalamus',
    region: 'Diencephalon',
    position: [0, 0, 0],
    size: [1.2, 1, 1.5],
    function: 'Relay station for sensory and motor signals to the cortex. Also regulates consciousness and sleep.',
    networks: ['attention', 'sensory'],
    color: '#95A5A6'
  },
  {
    id: 'hypothalamus',
    name: 'Hypothalamus',
    region: 'Diencephalon',
    position: [0, -0.8, 0.5],
    size: [0.8, 0.6, 0.6],
    function: 'Regulates homeostasis: hunger, thirst, body temperature, circadian rhythms, and hormone release.',
    networks: ['autonomic'],
    color: '#E67E22'
  },
  {
    id: 'basal-ganglia',
    name: 'Basal Ganglia',
    region: 'Subcortical',
    position: [-1, 0, 0.3],
    size: [1.5, 1.2, 1],
    function: 'Motor control, procedural learning, habit formation, and reward processing. Affected in Parkinson\'s disease.',
    networks: ['motor', 'executive-control'],
    color: '#C0392B'
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    region: 'Hindbrain',
    position: [0, -1.5, -2],
    size: [3, 1.5, 1.5],
    function: 'Coordinates movement, balance, and posture. Also involved in motor learning and some cognitive functions.',
    networks: ['motor'],
    color: '#16A085'
  },
  {
    id: 'brainstem',
    name: 'Brainstem',
    region: 'Hindbrain',
    position: [0, -2, -0.5],
    size: [1, 1.5, 1],
    function: 'Controls vital functions: breathing, heart rate, consciousness. Connects brain to spinal cord.',
    networks: ['autonomic'],
    color: '#7F8C8D'
  },

  // ADDITIONAL IMPORTANT STRUCTURES
  {
    id: 'anterior-cingulate',
    name: 'Anterior Cingulate Cortex',
    region: 'Limbic System',
    position: [0, 0.5, 1],
    size: [1.2, 0.6, 1.5],
    function: 'Error detection, conflict monitoring, emotional regulation, and pain processing.',
    networks: ['salience', 'executive-control'],
    color: '#D35400'
  },
  {
    id: 'posterior-cingulate',
    name: 'Posterior Cingulate Cortex',
    region: 'Limbic System',
    position: [0, 0.3, -1],
    size: [1.2, 0.6, 1],
    function: 'Default mode processing, self-referential thought, memory retrieval, and spatial awareness.',
    networks: ['default-mode'],
    color: '#2ECC71'
  },
  {
    id: 'insula',
    name: 'Insular Cortex',
    region: 'Deep Cortex',
    position: [-1.8, 0, 0],
    size: [0.8, 1.2, 1],
    function: 'Interoception (internal body awareness), emotion, empathy, and taste processing.',
    networks: ['salience'],
    color: '#E91E63'
  }
];

/**
 * Helper function to get structure by ID
 */
export const getStructureById = (id) => {
  return brainStructures.find(structure => structure.id === id);
};

/**
 * Helper function to get structures by region
 */
export const getStructuresByRegion = (region) => {
  return brainStructures.filter(structure => structure.region === region);
};

/**
 * Helper function to get all unique regions
 */
export const getAllRegions = () => {
  return [...new Set(brainStructures.map(s => s.region))];
};