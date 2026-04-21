/**
 * BRAIN STRUCTURES DATA - Updated for GLB Model
 */

export const brainStructures = [
  // CEREBRAL LOBES
  {
    id: 'Frontal_Lobe',
    name: 'Frontal Lobe',
    region: 'Cerebrum',
    relatedStructures: ["Brocas_Area", "Prefrontal_Cortex", "Primary_Motor_Cortex", "Medial_Prefrontal_Cortex", "Orbitofrontal_Cortex", "Ventromedial_Prefrontal_Cortex"],
    function: 'The frontal lobe is responsible for executive functions including reasoning, planning, problem-solving, decision-making, and controlling behavior and emotions. It contains the primary motor cortex (controlling voluntary movement) and areas critical for speech production (Broca\'s area). This lobe is what makes humans capable of complex thought, personality expression, and voluntary movement control.',
    networks: ['executive-control', 'motor', 'language'],
    color: '#4A90E2',
    clinicalSignificance: 'Damage can cause personality changes, difficulty with planning, impulsive behavior, or motor deficits. Famous case: Phineas Gage.'
  },
  {
    id: 'Parietal_Lobe',
    name: 'Parietal Lobe',
    region: 'Cerebrum',
    relatedStructures: ["Primary_Somatosensory_Cortex"],
    function: 'The parietal lobe processes sensory information from the body including touch, temperature, pain, and spatial awareness. It contains the primary somatosensory cortex and is crucial for integrating sensory input with motor output. This lobe helps you understand where your body is in space and process mathematical and spatial reasoning.',
    networks: ['sensory', 'attention', 'spatial'],
    color: '#E67E22',
    clinicalSignificance: 'Damage can cause difficulty with spatial awareness, problems with reading or math, or neglect syndrome (ignoring one side of space).'
  },
  {
    id: 'Temporal_Lobe_1',
    name: 'Temporal Lobe',
    region: 'Cerebrum',
    relatedStructures: ["Wernickes_Area"],
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
  {
  id: 'Wernickes_Area',
  name: "Wernicke's Area",
  region: 'Cerebrum',
  function: "Wernicke's area is responsible for language comprehension. It helps the brain interpret the meaning of spoken and written words, integrate auditory information, and map sounds to linguistic concepts. It works closely with auditory cortex and Broca's area to support fluent communication.",
  networks: ['language'],
  color: '#9B59B6',
  clinicalSignificance: "Damage to Wernicke's area causes Wernicke's aphasia, characterized by fluent but nonsensical speech, difficulty understanding language, and impaired ability to produce meaningful sentences despite normal grammar and rhythm."
},
{
  id: 'Brocas_Area',
  name: "Broca's Area",
  region: 'Cerebrum',
  function: "Broca's area is essential for speech production and expressive language. It coordinates the motor planning required to articulate words, form sentences, and produce grammatically structured speech. It also contributes to working memory for language and syntactic processing.",
  networks: ['language'],
  color: '#E74C3C',
  clinicalSignificance: "Damage to Broca's area causes Broca's aphasia, leading to slow, effortful, and non-fluent speech. Individuals typically understand language well but struggle to produce words and form complete sentences."
},
{
  id: 'Thalamus_1',
  name: 'Thalamus',
  region: 'Diencephalon',
  relatedStructures: ['Hypothalamus', 'Basal_Ganglia', 'Cortex'],
  function: 'The thalamus acts as the brain’s central relay station. Nearly all sensory information (except smell) passes through the thalamus before reaching the cerebral cortex. It helps regulate attention, consciousness, sleep–wake cycles, and the flow of motor and sensory signals throughout the brain.',
  networks: ['sensory', 'motor', 'attention'],
  color: '#C39BD3',
  clinicalSignificance: 'Damage can cause sensory loss, motor disturbances, severe attention deficits, or thalamic pain syndrome. Thalamic strokes often lead to profound sensory abnormalities and disruptions in consciousness or alertness.'
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
  {
  id: 'Vermis',
  name: 'Cerebellar Vermis',
  region: 'Cerebellum',
  function: 'The cerebellar vermis coordinates posture, balance, and whole-body movements. It integrates sensory information from the spinal cord and vestibular system to maintain equilibrium and smooth, coordinated motion. It plays a key role in gait and trunk stability.',
  networks: ['motor'],
  color: '#27AE60',
  clinicalSignificance: 'Damage to the vermis can cause truncal ataxia, wide-based gait, difficulty standing upright, impaired balance, and problems with coordinated whole-body movements.'
}
,
  // MIDBRAIN STRUCTURES
  {
  id: 'Anterior_Commissure',
  name: 'Anterior Commissure',
  region: 'Cerebrum',
  relatedStructures: ['Corpus_Callosum'],
  function: 'The anterior commissure is a bundle of white matter fibers connecting the two temporal lobes. It plays a role in interhemispheric communication, especially for olfactory and temporal lobe information.',
  networks: ['interhemispheric'],
  color: '#A569BD',
  clinicalSignificance: 'Damage can impair interhemispheric transfer of sensory information and may contribute to memory or emotional processing deficits.'
},
{
  id: 'Inferior_Colliculus',
  name: 'Inferior Colliculus',
  region: 'Midbrain',
  relatedStructures: ['Superior_Colliculus'],
  function: 'The inferior colliculus is a major auditory relay center. It integrates sound localization cues, processes auditory reflexes, and sends information to the thalamus for further auditory processing.',
  networks: ['auditory'],
  color: '#3498DB',
  clinicalSignificance: 'Damage can cause difficulty localizing sounds, impaired auditory reflexes, and deficits in processing complex auditory patterns.'
},
{
  id: 'Superior_Colliculus_1',
  name: 'Superior Colliculus',
  region: 'Midbrain',
  relatedStructures: ['Inferior_Colliculus'],
  function: 'The superior colliculus coordinates visual reflexes and rapid eye movements (saccades). It integrates visual, auditory, and somatosensory inputs to guide orienting behaviors.',
  networks: ['visual', 'sensorimotor'],
  color: '#1ABC9C',
  clinicalSignificance: 'Damage can impair visual tracking, reflexive eye movements, and the ability to orient toward visual or auditory stimuli.'
},
{
  id: 'Mammilary_Body',
  name: 'Mammillary Body',
  region: 'Limbic System',
  relatedStructures: ['Fornix', 'Thalamus'],
  function: 'The mammillary bodies are relay nuclei involved in memory processing. They receive hippocampal input via the fornix and project to the thalamus, supporting recollective memory and spatial navigation.',
  networks: ['memory'],
  color: '#D35400',
  clinicalSignificance: 'Damage is classically associated with Wernicke–Korsakoff syndrome, causing severe memory loss, confabulation, and disorientation.'
},
{
  id: 'Fornix_1',
  name: 'Fornix',
  region: 'Limbic System',
  relatedStructures: ['Hippocampus', 'Mammillary_Body'],
  function: 'The fornix is a major output tract of the hippocampus, carrying memory-related signals to the mammillary bodies and other limbic structures. It is essential for forming and recalling episodic memories.',
  networks: ['memory'],
  color: '#8E44AD',
  clinicalSignificance: 'Damage to the fornix can cause severe memory impairment, including anterograde amnesia. It is often affected in Alzheimer’s disease and other degenerative conditions.'
},

  // VENTRICULAR SYSTEM
  {
  id: 'Lateral_Ventricle_1',
  name: 'Lateral Ventricle',
  region: 'Cerebrum',
  function: 'The lateral ventricles are fluid-filled cavities that produce and circulate cerebrospinal fluid (CSF). They cushion the brain, remove waste, and help maintain intracranial pressure.',
  networks: ['csf-system'],
  color: '#5DADE2',
  clinicalSignificance: 'Enlargement can indicate hydrocephalus, brain atrophy, or developmental abnormalities. Ventricular asymmetry may be associated with neurological or psychiatric conditions.'
},

  // BRAINSTEM STRUCTURES
  {
    id: 'Pons',
    name: 'Pons',
    region: 'Brainstem',
    function: 'The pons (Latin for "bridge") connects the cerebral cortex with the cerebellum and medulla. It plays a crucial role in regulating breathing, sleep-wake cycles, bladder control, hearing, equilibrium, taste, eye movement, facial expressions, and posture. Contains nuclei for several cranial nerves and serves as a relay station for information traveling between different brain regions.',
    networks: ['autonomic', 'sleep-wake', 'sensory-motor'],
    color: '#95A5A6',
    clinicalSignificance: 'Damage can cause breathing problems, sleep disorders, difficulty with eye movements, facial paralysis, or loss of sensation. Locked-in syndrome can result from pontine strokes.'
  },
  {
    id: 'Medullary_Olive_',
    name: 'Medullary Olive (Inferior Olivary Nucleus)',
    region: 'Medulla Oblongata',
    function: 'The inferior olivary nucleus appears as an olive-shaped swelling on the medulla. It is a major source of input to the cerebellum and plays a crucial role in motor learning, timing of movements, and coordination. It helps the cerebellum learn and fine-tune motor skills through practice. Also involved in detecting timing errors during movement.',
    networks: ['motor-learning', 'cerebellar'],
    color: '#D35400',
    clinicalSignificance: 'Damage can cause palatal myoclonus (rhythmic movements of the soft palate), difficulty with motor learning, and coordination problems. Lesions may produce distinctive tremors.'
  },
  {
  id: 'Spinal_Cord',
  name: 'Spinal Cord',
  region: 'Brainstem',
  function: 'The spinal cord relays sensory information from the body to the brain and transmits motor commands from the brain to muscles. It also mediates reflexes and contains segmental circuits that coordinate basic motor patterns.',
  networks: ['sensorimotor', 'somatosensory', 'motor'],
  color: '#8E44AD',
  clinicalSignificance: 'Damage to the spinal cord can cause loss of sensation, paralysis, autonomic dysfunction, and impaired reflexes below the level of injury.',
  },
  {
  id: 'Pyramids',
  name: 'Medullary Pyramids',
  region: 'Brainstem',
  function: 'The medullary pyramids contain the corticospinal tracts, which carry voluntary motor commands from the cerebral cortex to the spinal cord. These fibers control precise, skilled movements of the limbs and hands. At the lower end of the pyramids, most fibers cross to the opposite side in the pyramidal decussation, allowing each hemisphere to control the opposite side of the body.',
  networks: ['motor'],
  color: '#F1C40F',
  clinicalSignificance: 'Damage to the pyramids or the corticospinal tract can cause weakness or paralysis on the opposite side of the body (contralateral hemiparesis), loss of fine motor control, and abnormal reflexes such as the Babinski sign.'
},

  // VISUAL PATHWAY STRUCTURES
  {
    id: 'Optic_Nerve',
    name: 'Optic Nerve (CN II)',
    region: 'Cranial Nerve / Visual Pathway',
    function: 'The optic nerve (cranial nerve II) transmits visual information from the retina to the brain. Each optic nerve contains about 1 million nerve fibers from retinal ganglion cells. It carries all visual input from one eye, converting light detected by photoreceptors into electrical signals that the brain can interpret. Despite being called a "nerve," it is technically part of the central nervous system.',
    networks: ['visual'],
    color: '#9B59B6',
    clinicalSignificance: 'Damage causes vision loss in the affected eye. Conditions include optic neuritis (often in MS), glaucoma (increased pressure damaging the nerve), and optic nerve atrophy. Can be assessed by checking visual acuity and visual fields.'
  },
  {
    id: 'Optic_Chiasm_',
    name: 'Optic Chiasm',
    region: 'Visual Pathway',
    function: 'The optic chiasm is the X-shaped crossover point where the optic nerves from both eyes meet. Here, nerve fibers from the nasal (inner) half of each retina cross to the opposite side of the brain, while fibers from the temporal (outer) half stay on the same side. This arrangement allows each hemisphere of the brain to receive information from both eyes about the opposite visual field, enabling binocular vision and depth perception.',
    networks: ['visual'],
    color: '#8E44AD',
    clinicalSignificance: 'Tumors (often pituitary) pressing on the chiasm cause bitemporal hemianopia (loss of peripheral vision in both eyes). Damage pattern depends on exact location of lesion.'
  },
  {
    id: 'Optic_Tract',
    name: 'Optic Tract',
    region: 'Visual Pathway',
    function: 'The optic tract carries visual information from the optic chiasm to the brain. After the chiasm, fibers travel as the optic tract to several destinations: the lateral geniculate nucleus (LGN) of the thalamus (main visual pathway to cortex), the superior colliculus (eye movements and reflexes), and the pretectal area (pupillary light reflex). Each optic tract carries information from the opposite visual field from both eyes.',
    networks: ['visual'],
    color: '#6C3483',
    clinicalSignificance: 'Damage causes homonymous hemianopia (loss of same side of visual field in both eyes). Right tract damage = left visual field loss in both eyes, and vice versa.'
  },

  // Sulci and Gyri
  {
    id: 'Longitudinal_Fissure',
    name: 'Longitudinal Fissure',
    function: 'The longitudinal fissure is the deep groove that separates the left and right cerebral hemispheres. It allows for the division of the brain into two distinct halves, each responsible for different functions. The corpus callosum, a thick band of nerve fibers, lies at the base of the fissure and facilitates communication between the hemispheres.',
    region: 'Sulci',
    color: '#9B59B6',
  },
  {
  id: 'Anterior_Cingulate_1',
  name: 'Anterior Cingulate Cortex',
  region: 'Cerebrum',
  relatedStructures: ['Prefrontal_Cortex', 'Amygdala'],
  function: 'The anterior cingulate cortex integrates emotion, attention, and decision-making. It helps regulate emotional responses, detect conflicts, evaluate errors, and modulate autonomic functions. It acts as a bridge between cognitive control and emotional processing.',
  networks: ['salience', 'executive-control', 'emotion'],
  color: '#FF6F61',
  clinicalSignificance: 'Damage or dysfunction is associated with depression, anxiety disorders, ADHD, and impaired error monitoring or emotional regulation.'
},
  {
    id: 'Lateral_Sulcus',
    name: 'Lateral Sulcus (Sylvian Fissure)',
    function: 'The lateral sulcus, also known as the Sylvian fissure, is a prominent groove that separates the frontal and parietal lobes from the temporal lobe. It is one of the most significant landmarks in the brain and contains important structures such as the insula. The lateral sulcus plays a crucial role in demarcating different functional areas of the brain.',
    region: 'Sulci',
    color: '#9B59B6',
  },
  {
  id: 'Primary_Somatosensory_Cortex',
  name: 'Primary Somatosensory Cortex (S1)',
  region: 'Parietal Lobe',
  relatedStructures: ['Somatosensory_Association_Cortex'],
  function: 'The primary somatosensory cortex receives touch, pressure, pain, temperature, and proprioceptive information from the body. It contains a sensory homunculus that maps sensations from specific body regions.',
  networks: ['somatosensory'],
  color: '#F7B7A3',
  clinicalSignificance: 'Damage can cause loss of tactile sensation, impaired spatial discrimination, difficulty recognizing objects by touch (astereognosis), and altered body awareness.'
},
{
  id: 'Primary_Motor_Cortex',
  name: 'Primary Motor Cortex (M1)',
  region: 'Frontal Lobe',
  relatedStructures: ['Premotor_Cortex', 'Supplementary_Motor_Area'],
  function: 'The primary motor cortex generates voluntary movement by sending motor commands to the spinal cord. It contains a somatotopic map (the motor homunculus) that controls precise movements of the face, hands, and body.',
  networks: ['motor'],
  color: '#FF8C42',
  clinicalSignificance: 'Damage can cause weakness or paralysis on the opposite side of the body, loss of fine motor control, and abnormal reflexes. Stroke affecting M1 is a common cause of hemiparesis.'
},
{
  id: 'Medial_Prefrontal_Cortex',
  name: 'Medial Prefrontal Cortex (mPFC)',
  region: 'Frontal Lobe',
  function: 'The medial prefrontal cortex supports self-referential thinking, decision-making, emotional regulation, and social cognition. It integrates internal states with long-term goals and helps evaluate the personal relevance of information.',
  networks: ['default-mode', 'executive-control'],
  color: '#E57373',
  clinicalSignificance: 'Damage can impair emotional regulation, social judgment, and decision-making. Dysfunction is linked to depression, anxiety, and disorders involving impaired self-processing.'
},
{
  id: 'Orbitofrontal_Cortex',
  name: 'Orbitofrontal Cortex (OFC)',
  region: 'Frontal Lobe',
  relatedStructures: ['Amygdala'],
  function: 'The orbitofrontal cortex evaluates rewards and punishments, guides flexible decision-making, and updates behavior based on changing outcomes. It plays a key role in emotion, value-based choices, and social behavior.',
  networks: ['reward', 'emotion', 'decision-making'],
  color: '#F4A261',
  clinicalSignificance: 'Damage can cause impulsivity, poor judgment, emotional disinhibition, and difficulty adapting to changing reward contingencies. OFC dysfunction is associated with addiction and obsessive-compulsive disorder.'
},
{
  id: 'Ventromedial_Prefrontal_Cortex',
  name: 'Ventromedial Prefrontal Cortex (vmPFC)',
  region: 'Frontal Lobe',
  function: 'The ventromedial prefrontal cortex integrates emotional and memory-related information to guide moral reasoning, risk assessment, and value-based decision-making. It helps regulate fear responses and emotional learning.',
  networks: ['default-mode', 'emotion', 'reward'],
  color: '#D67AB1',
  clinicalSignificance: 'Damage can lead to impaired emotional regulation, risky decision-making, and flattened affect. vmPFC dysfunction is linked to PTSD, anxiety disorders, and impaired fear extinction.'
},
{
  id: 'Olfactory_Bulb',
  name: 'Olfactory Bulb',
  region: 'Forebrain',
  relatedStructures: ['Olfactory_Tract', 'Piriform_Cortex'],
  function: 'The olfactory bulb receives smell information from nasal receptors and performs early odor processing before sending signals to limbic and cortical regions. It is one of the only sensory systems that bypasses the thalamus.',
  networks: ['olfactory'],
  color: '#A3D977',
  clinicalSignificance: 'Damage causes anosmia (loss of smell) and can affect taste and emotional memory. Early olfactory dysfunction is a hallmark of neurodegenerative diseases such as Parkinson’s and Alzheimer’s.'
},
{
  id: 'Central_Sulcus',
  name: 'Central Sulcus',
  region: 'Cerebrum',
  
  function: 'The central sulcus is a major landmark separating the frontal and parietal lobes. It divides the primary motor cortex (precentral gyrus) from the primary somatosensory cortex (postcentral gyrus), marking the boundary between motor output and sensory input.',
  networks: ['motor', 'somatosensory'],
  color: '#90CAF9',
},

{
  id: 'Prefrontal_Cortex',
  name: 'Prefrontal Cortex',
  region: 'Frontal Lobe',
  relatedStructures: [
    'Medial_Prefrontal_Cortex',
    'Orbitofrontal_Cortex',
    'Dorsolateral_Prefrontal_Cortex'
  ],
  function: 'The prefrontal cortex supports executive functions including planning, reasoning, working memory, attention control, and decision-making. It integrates emotional, sensory, and motivational information to guide goal-directed behavior.',
  networks: ['executive-control', 'default-mode', 'attention'],
  color: '#FFB74D',
  clinicalSignificance: 'Damage can impair judgment, planning, impulse control, and personality. Dysfunction is associated with ADHD, depression, schizophrenia, and traumatic brain injury.'
},

{
  id: 'Cerebral_Peduncel',
  name: 'Cerebral Peduncle',
  region: 'Midbrain',
  relatedStructures: ['Motor_Cortex'],
  function: 'The cerebral peduncles contain major descending motor pathways that carry voluntary movement commands from the cerebral cortex to the brainstem and spinal cord. They also contain ascending sensory fibers and connections to the cerebellum.',
  networks: ['motor'],
  color: '#8ECAE6',
  clinicalSignificance: 'Damage can cause weakness or paralysis, abnormal reflexes, and coordination deficits. Lesions often produce contralateral motor impairment due to crossing motor pathways.'
},

{
  id: 'Medulla_',
  name: 'Medulla Oblongata',
  region: 'Brainstem',
  function: 'The medulla controls essential autonomic functions including breathing, heart rate, blood pressure, and reflexes such as swallowing, coughing, and vomiting. It serves as a major relay between the brain and spinal cord.',
  networks: ['autonomic'],
  color: '#A5D6A7',
  clinicalSignificance: 'Damage can be life-threatening, causing respiratory failure, cardiovascular instability, or loss of basic reflexes. Stroke in the medulla can produce severe sensory and motor deficits.'
},

{
  id: 'Pineal_Gland',
  name: 'Pineal Gland',
  region: 'Diencephalon',
  relatedStructures: ['Thalamus', 'Hypothalamus'],
  function: 'The pineal gland produces melatonin, regulating circadian rhythms and sleep–wake cycles. It responds to light–dark signals received indirectly through the visual system.',
  networks: ['endocrine'],
  color: '#CE93D8',
  clinicalSignificance: 'Tumors or calcification can disrupt sleep, puberty timing, and hormonal balance. Pineal region masses may compress nearby midbrain structures.'
},

{
  id: 'Pituitary_Gland_1',
  name: 'Pituitary Gland',
  region: 'Endocrine System',
  relatedStructures: ['Hypothalamus'],
  function: 'The pituitary gland is the master endocrine gland, releasing hormones that regulate growth, metabolism, stress responses, reproduction, and water balance. It receives regulatory signals from the hypothalamus.',
  networks: ['endocrine'],
  color: '#FFCC80',
  clinicalSignificance: 'Pituitary tumors can cause hormonal imbalances, vision problems, or growth abnormalities. Disorders include Cushing’s disease, acromegaly, and hypopituitarism.'
},
{
  id: 'Hypothalamus1',
  name: 'Hypothalamus',
  region: 'Diencephalon',
  relatedStructures: ['Pituitary_Gland', 'Thalamus', 'Amygdala'],
  function: 'The hypothalamus regulates essential homeostatic functions including hunger, thirst, temperature, circadian rhythms, stress responses, and hormone release. It links the nervous system to the endocrine system through its control of the pituitary gland.',
  networks: ['endocrine', 'autonomic', 'emotion'],
  color: '#FFAB91',
  clinicalSignificance: 'Damage can disrupt temperature regulation, appetite, sleep, stress responses, and hormonal balance. Hypothalamic dysfunction is associated with endocrine disorders, obesity, insomnia, and autonomic instability.'
},


{
  id: 'Posterior_Commissure1',
  name: 'Posterior Commissure',
  region: 'Diencephalon',
  relatedStructures: ['Pineal_Gland', 'Superior_Colliculus'],
  function: 'The posterior commissure is a small but important fiber tract that connects the two sides of the midbrain. It plays a key role in coordinating eye movements and pupillary light reflexes.',
  networks: ['visual', 'oculomotor'],
  color: '#81D4FA',
  clinicalSignificance: 'Damage can impair vertical eye movements and pupillary reflexes. Lesions in this region are associated with Parinaud’s syndrome.'
},
{
  id: 'Posterior_Cingulate_Cortex',
  name: 'Posterior Cingulate Cortex (PCC)',
  region: 'Cingulate Cortex / Limbic System',
  function: 'The posterior cingulate cortex is a major hub of the default mode network, supporting internally directed thought, autobiographical memory, spatial orientation, and evaluation of personal relevance. It integrates memory, emotion, and self-referential processing.',
  networks: ['default-mode'],
  color: '#B39DDB',
  clinicalSignificance: 'Reduced PCC activity is one of the earliest markers of Alzheimer’s disease. Damage or dysfunction can impair memory retrieval, attention, and self-awareness. Abnormal PCC connectivity is linked to depression, PTSD, and disorders of consciousness.'
},
{
  id: 'Precentral_Sulcus',
  name: 'Precentral Sulcus',
  region: 'Frontal Lobe',
  function: 'A vertical sulcus located just anterior to the precentral gyrus, marking the boundary between the premotor cortex and the primary motor cortex.',
  networks: [],
  color: '#AED581'
},

{
  id: 'Corpus_Callosum_1',
  name: 'Corpus Callosum',
  region: 'Cerebrum',
  relatedStructures: ['Anterior_Commissure'],
  function: 'The corpus callosum is the largest white matter tract in the brain, connecting the left and right cerebral hemispheres. It enables rapid communication between the hemispheres, allowing integration of sensory information, motor commands, and higher cognitive functions.',
  networks: ['interhemispheric', 'executive-control'],
  color: '#A3CEF1',
  clinicalSignificance: 'Damage can cause split-brain symptoms, impaired coordination between the two sides of the body, and deficits in language, attention, or problem-solving. It is often affected in multiple sclerosis and traumatic brain injury.'
},
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