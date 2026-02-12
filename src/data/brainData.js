/**
 * BRAIN STRUCTURES DATA - Updated for GLB Model
 */

export const brainStructures = [
  // CEREBRAL LOBES
  {
    id: 'Frontal_Lobe',
    name: 'Frontal Lobe',
    region: 'Cerebrum',
    function: 'The frontal lobe is responsible for executive functions including reasoning, planning, problem-solving, decision-making, and controlling behavior and emotions. It contains the primary motor cortex (controlling voluntary movement) and areas critical for speech production (Broca\'s area). This lobe is what makes humans capable of complex thought, personality expression, and voluntary movement control.',
    networks: ['executive-control', 'motor', 'language'],
    color: '#4A90E2',
    clinicalSignificance: 'Damage can cause personality changes, difficulty with planning, impulsive behavior, or motor deficits. Famous case: Phineas Gage.'
  },
  {
    id: 'Parietal_Lobe',
    name: 'Parietal Lobe',
    region: 'Cerebrum',
    function: 'The parietal lobe processes sensory information from the body including touch, temperature, pain, and spatial awareness. It contains the primary somatosensory cortex and is crucial for integrating sensory input with motor output. This lobe helps you understand where your body is in space and process mathematical and spatial reasoning.',
    networks: ['sensory', 'attention', 'spatial'],
    color: '#E67E22',
    clinicalSignificance: 'Damage can cause difficulty with spatial awareness, problems with reading or math, or neglect syndrome (ignoring one side of space).'
  },
  {
    id: 'Temporal_Lobe',
    name: 'Temporal Lobe',
    region: 'Cerebrum',
    function: 'The temporal lobe is essential for processing auditory information, language comprehension, memory formation, and emotion. It contains the primary auditory cortex, Wernicke\'s area (language understanding), and the hippocampus (memory formation). This lobe helps you understand speech, recognize faces, form new memories, and process emotions.',
    networks: ['auditory', 'language', 'memory', 'emotion'],
    color: '#27AE60',
    clinicalSignificance: 'Damage can cause memory loss (especially hippocampal damage), difficulty understanding speech, or problems recognizing faces (prosopagnosia). Heavily affected in Alzheimer\'s disease.'
  },
  {
    id: 'Occipital_Lobe',
    name: 'Occipital Lobe',
    region: 'Cerebrum',
    function: 'The occipital lobe is dedicated to processing visual information. It contains the primary visual cortex (V1) which receives input directly from the eyes via the optic nerves. This lobe processes basic visual features like edges, colors, and motion, then sends information to other brain areas for higher-level visual processing like object and face recognition.',
    networks: ['visual'],
    color: '#3498DB',
    clinicalSignificance: 'Damage can cause partial or complete blindness, visual hallucinations, or inability to recognize objects despite intact eyes (visual agnosia).'
  },

  // CEREBELLUM
  {
    id: 'Corpus_Cerebelli',
    name: 'Cerebellum (Corpus Cerebelli)',
    region: 'Hindbrain',
    function: 'The cerebellum (Latin for "little brain") coordinates voluntary movements, balance, posture, and motor learning. Despite being only 10% of brain volume, it contains over 50% of the brain\'s neurons. It fine-tunes motor commands from the cerebral cortex, ensuring smooth and accurate movements. Also involved in cognitive functions like attention and language processing.',
    networks: ['motor', 'coordination', 'balance'],
    color: '#16A085',
    clinicalSignificance: 'Damage causes ataxia (loss of coordination), tremors, difficulty with precise movements, and problems with balance. Can also affect cognitive and emotional processing.'
  },

  // BRAINSTEM STRUCTURES
  {
    id: 'pons',
    name: 'Pons',
    region: 'Brainstem',
    function: 'The pons (Latin for "bridge") connects the cerebral cortex with the cerebellum and medulla. It plays a crucial role in regulating breathing, sleep-wake cycles, bladder control, hearing, equilibrium, taste, eye movement, facial expressions, and posture. Contains nuclei for several cranial nerves and serves as a relay station for information traveling between different brain regions.',
    networks: ['autonomic', 'sleep-wake', 'sensory-motor'],
    color: '#95A5A6',
    clinicalSignificance: 'Damage can cause breathing problems, sleep disorders, difficulty with eye movements, facial paralysis, or loss of sensation. Locked-in syndrome can result from pontine strokes.'
  },
  {
    id: 'medullary_olive_',
    name: 'Medullary Olive (Inferior Olivary Nucleus)',
    region: 'Medulla Oblongata',
    function: 'The inferior olivary nucleus appears as an olive-shaped swelling on the medulla. It is a major source of input to the cerebellum and plays a crucial role in motor learning, timing of movements, and coordination. It helps the cerebellum learn and fine-tune motor skills through practice. Also involved in detecting timing errors during movement.',
    networks: ['motor-learning', 'cerebellar'],
    color: '#D35400',
    clinicalSignificance: 'Damage can cause palatal myoclonus (rhythmic movements of the soft palate), difficulty with motor learning, and coordination problems. Lesions may produce distinctive tremors.'
  },

  // VISUAL PATHWAY STRUCTURES
  {
    id: 'optic_nerve',
    name: 'Optic Nerve (CN II)',
    region: 'Cranial Nerve / Visual Pathway',
    function: 'The optic nerve (cranial nerve II) transmits visual information from the retina to the brain. Each optic nerve contains about 1 million nerve fibers from retinal ganglion cells. It carries all visual input from one eye, converting light detected by photoreceptors into electrical signals that the brain can interpret. Despite being called a "nerve," it is technically part of the central nervous system.',
    networks: ['visual'],
    color: '#9B59B6',
    clinicalSignificance: 'Damage causes vision loss in the affected eye. Conditions include optic neuritis (often in MS), glaucoma (increased pressure damaging the nerve), and optic nerve atrophy. Can be assessed by checking visual acuity and visual fields.'
  },
  {
    id: 'optic_chiasm_',
    name: 'Optic Chiasm',
    region: 'Visual Pathway',
    function: 'The optic chiasm is the X-shaped crossover point where the optic nerves from both eyes meet. Here, nerve fibers from the nasal (inner) half of each retina cross to the opposite side of the brain, while fibers from the temporal (outer) half stay on the same side. This arrangement allows each hemisphere of the brain to receive information from both eyes about the opposite visual field, enabling binocular vision and depth perception.',
    networks: ['visual'],
    color: '#8E44AD',
    clinicalSignificance: 'Tumors (often pituitary) pressing on the chiasm cause bitemporal hemianopia (loss of peripheral vision in both eyes). Damage pattern depends on exact location of lesion.'
  },
  {
    id: 'optic_tract',
    name: 'Optic Tract',
    region: 'Visual Pathway',
    function: 'The optic tract carries visual information from the optic chiasm to the brain. After the chiasm, fibers travel as the optic tract to several destinations: the lateral geniculate nucleus (LGN) of the thalamus (main visual pathway to cortex), the superior colliculus (eye movements and reflexes), and the pretectal area (pupillary light reflex). Each optic tract carries information from the opposite visual field from both eyes.',
    networks: ['visual'],
    color: '#6C3483',
    clinicalSignificance: 'Damage causes homonymous hemianopia (loss of same side of visual field in both eyes). Right tract damage = left visual field loss in both eyes, and vice versa.'
  }
];

// Helper functions
export const getStructureById = (id) => {
  return brainStructures.find(structure => structure.id === id);
};

export const getStructureByName = (name) => {
  return brainStructures.find(structure => 
    structure.name.toLowerCase() === name.toLowerCase()
  );
};

export const getStructuresByRegion = (region) => {
  return brainStructures.filter(structure => structure.region === region);
};

export const getAllRegions = () => {
  return [...new Set(brainStructures.map(s => s.region))];
};

export const searchStructures = (keyword) => {
  const lowerKeyword = keyword.toLowerCase();
  return brainStructures.filter(structure =>
    structure.name.toLowerCase().includes(lowerKeyword) ||
    structure.region.toLowerCase().includes(lowerKeyword) ||
    structure.function.toLowerCase().includes(lowerKeyword)
  );
};