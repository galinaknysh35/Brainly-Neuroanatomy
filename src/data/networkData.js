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
    description: 'Active during rest and internal thought. Supports self-referential thinking, autobiographical memory, and internal mentation. Deactivates during goal-directed tasks.',
    structures: [
      'Medial_Prefrontal_Cortex',
      'Posterior_Cingulate_Cortex'
    ],
    color: '#2ECC71',
    discoveredBy: 'Marcus Raichle et al., 2001',
    clinicalRelevance: 'Disrupted in Alzheimer’s disease, depression, and ADHD.'
  },

  {
    id: 'somatosensory',
    name: 'Somatosensory Network',
    description: 'Processes touch, pressure, pain, temperature, vibration, and body position (proprioception).',
    structures: [
      'Primary_Somatosensory_Cortex',
      'Somatosensory_Association_Cortex',
      'Thalamus_1'
    ],
    color: '#F39C12',
    discoveredBy: 'Classical sensory neuroscience and cortical mapping studies',
    clinicalRelevance: 'Damage causes sensory loss, impaired body awareness, or chronic pain syndromes.'
  },

  {
    id: 'autonomic',
    name: 'Autonomic Network',
    description: 'Regulates essential involuntary functions including heart rate, breathing, digestion, temperature, and stress responses.',
    structures: [
      'Hypothalamus1',
      'Medulla_',
      'Pons',

    ],
    color: '#E74C3C',
    discoveredBy: 'Early physiological and neuroendocrine research',
    clinicalRelevance: 'Dysfunction leads to instability in blood pressure, breathing, temperature, and hormonal balance.'
  },

  {
    id: 'endocrine',
    name: 'Endocrine Network',
    description: 'Coordinates hormonal regulation of growth, metabolism, stress, reproduction, and circadian rhythms.',
    structures: [
      'Hypothalamus1',
      'Pituitary_Gland_1',
      'Pineal_Gland'
    ],
    color: '#9B59B6',
    discoveredBy: 'Classical neuroendocrinology',
    clinicalRelevance: 'Disruption causes hormonal imbalance, sleep disorders, infertility, and metabolic dysfunction.'
  },

  {
    id: 'olfactory',
    name: 'Olfactory Network',
    description: 'Processes odor information and links smell to memory, emotion, and survival behaviors.',
    structures: [
      'Olfactory_Bulb'
    ],
    color: '#27AE60',
    discoveredBy: 'Early sensory physiology',
    clinicalRelevance: 'Loss of smell is an early sign of neurodegenerative diseases such as Parkinson’s and Alzheimer’s.'
  },

  {
    id: 'motor',
    name: 'Motor Network',
    description: 'Controls voluntary movement, motor planning, and descending motor commands to the spinal cord.',
    structures: [
      'Primary_Motor_Cortex',
      'Cerebral_Peduncel',
      'Corpus_Cerebelli'
    ],
    color: '#3498DB',
    discoveredBy: 'Classical motor physiology and cortical stimulation studies',
    clinicalRelevance: 'Damage causes weakness, paralysis, or impaired motor coordination.'
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