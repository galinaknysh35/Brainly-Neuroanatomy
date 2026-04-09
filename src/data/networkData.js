/**
 * FUNCTIONAL NETWORKS DATA
 * 
 * Functional networks are groups of brain regions that work together to perform specific cognitive functions.
 * These networks are identified through functional neuroimaging (fMRI) studies.
 * 
 * Each network includes:
 * - id: Unique identifier
 * - name: Network name
 * - description: What the network does
 * - structures: Array of structure IDs that make up this network
 * - color: Theme color for visualization
 */

export const functionalNetworks = [
  {
    id: 'default-mode',
    name: 'Default Mode Network (DMN)',
    description: 'Active during rest and internal thought. Involved in self-referential thinking, memory retrieval, imagining the future, and theory of mind. Deactivates during goal-directed tasks.',
    structures: [
      'prefrontal-cortex',
      'posterior-cingulate',
      'hippocampus'
    ],
    color: '#2ECC71',
    discoveredBy: 'Marcus Raichle et al., 2001',
    clinicalRelevance: 'Disrupted in Alzheimer\'s disease, depression, and ADHD'
  },
  {
    id: 'executive-control',
    name: 'Executive Control Network',
    description: 'Controls goal-directed behavior, working memory, decision-making, and cognitive control. Essential for planning and problem-solving.',
    structures: [
      'prefrontal-cortex',
      'posterior-parietal',
      'anterior-cingulate',
      'basal-ganglia'
    ],
    color: '#3498DB',
    discoveredBy: 'Multiple researchers, formalized in 1990s-2000s',
    clinicalRelevance: 'Impaired in schizophrenia, ADHD, and addiction'
  },
  {
    id: 'salience',
    name: 'Salience Network',
    description: 'Detects and filters important stimuli from the environment. Switches between default mode and executive control networks. Processes emotional significance.',
    structures: [
      'Anterior_Cingulate_1',
      'insula',
      'amygdala'
    ],
    color: '#E91E63',
    discoveredBy: 'William Seeley and Vinod Menon, 2007',
    clinicalRelevance: 'Dysfunctional in anxiety disorders, PTSD, and autism'
  },
  {
    id: 'motor',
    name: 'Motor Network',
    description: 'Controls voluntary movement, motor planning, and coordination. Includes cortical and subcortical motor regions.',
    structures: [
      'Primary_Motor_Cortex',
      'Premotor_Cortex',
      'Basal_Ganglia',
      'Corpus_Cerebelli'
    ],
    color: '#E74C3C',
    discoveredBy: 'Classical neuroanatomy, refined with modern imaging',
    clinicalRelevance: 'Affected in Parkinson\'s disease, Huntington\'s disease, stroke'
  },

  {
  id: 'somatosensory',
  name: 'Somatosensory Network',
  description: 'Processes touch, pressure, pain, temperature, vibration, and body position (proprioception) from the entire body.',
  structures: [
    'Primary_Somatosensory_Cortex',
    'Somatosensory_Association_Cortex',
    'Thalamus_1'
  ],
  color: '#3bf312',
  discoveredBy: 'Classical sensory neuroscience and cortical mapping studies',
  clinicalRelevance: 'Damage causes sensory loss, impaired body awareness, difficulty localizing touch, or chronic pain syndromes.'
},
  {
    id: 'visual',
    name: 'Visual Network',
    description: 'Processes visual information from the eyes. Includes primary visual cortex and higher visual association areas.',
    structures: [
      'visual-cortex'
    ],
    color: '#3498DB',
    discoveredBy: 'Classical vision neuroscience',
    clinicalRelevance: 'Damage causes blindness or visual field defects'
  },
  {
    id: 'auditory',
    name: 'Auditory Network',
    description: 'Processes sound and auditory information. Essential for hearing and speech perception.',
    structures: [
      'auditory-cortex'
    ],
    color: '#1ABC9C',
    discoveredBy: 'Classical auditory neuroscience',
    clinicalRelevance: 'Damage causes hearing loss or auditory processing disorders'
  },
  {
    id: 'language',
    name: 'Language Network',
    description: 'Processes language comprehension and production. Includes both Broca\'s and Wernicke\'s areas.',
    structures: [
      'Brocas_Area',
      'Wernickes_Area'
    ],
    color: '#40d440',
    discoveredBy: 'Paul Broca (1861) and Carl Wernicke (1874)',
    clinicalRelevance: 'Damage causes aphasia (language impairment)'
  },
  {
    id: 'attention',
    name: 'Attention Network',
    description: 'Directs and maintains focus on relevant information. Includes dorsal and ventral attention systems.',
    structures: [
      'posterior-parietal',
      'thalamus'
    ],
    color: '#E67E22',
    discoveredBy: 'Formalized by Corbetta and Shulman, 2002',
    clinicalRelevance: 'Impaired in ADHD, neglect syndrome'
  },
  {
    id: 'memory',
    name: 'Memory Network',
    description: 'Forms and retrieves episodic memories. Critical for learning and long-term memory.',
    structures: [
      'hippocampus'
    ],
    color: '#27AE60',
    discoveredBy: 'Identified through patient H.M. studies (Brenda Milner, 1957)',
    clinicalRelevance: 'Damaged in Alzheimer\'s disease, amnesia'
  },
  {
    id: 'emotion',
    name: 'Emotion Network',
    description: 'Processes emotional responses, particularly fear and threat detection.',
    structures: [
      'amygdala'
    ],
    color: '#C0392B',
    discoveredBy: 'Joseph LeDoux and others, 1990s',
    clinicalRelevance: 'Hyperactive in anxiety disorders, PTSD'
  },
  {
    id: 'autonomic',
    name: 'Autonomic Network',
    description: 'Controls automatic body functions: breathing, heart rate, digestion, temperature regulation.',
    structures: [
      'hypothalamus',
      'brainstem'
    ],
    color: '#95A5A6',
    discoveredBy: 'Classical autonomic neuroscience',
    clinicalRelevance: 'Critical for survival; damage can be fatal'
  }
];

/**
 * Helper function to get network by ID
 */
export const getNetworkById = (id) => {
  return functionalNetworks.find(network => network.id === id);
};

/**
 * Helper function to get networks that include a specific structure
 */
export const getNetworksByStructure = (structureId) => {
  return functionalNetworks.filter(network => 
    network.structures.includes(structureId)
  );
};

/**
 * Helper function to get all structures in a network
 */
export const getStructuresInNetwork = (networkId) => {
  const network = getNetworkById(networkId);
  return network ? network.structures : [];
};