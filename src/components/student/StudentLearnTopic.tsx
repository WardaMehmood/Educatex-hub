import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { LearningPlan, LearningTopicModule } from '../../types';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  Edit3,
  BookOpen,
  Layers,
  ChevronRight,
  Trophy,
  RotateCcw,
  Network,
  GitFork,
  Lightbulb,
  Eye,
  Check,
  CircleDot,
  Play,
  ListFilter,
  Upload,
  FileText,
  X,
  Paperclip,
  CheckCircle,
  Cpu,
  Workflow,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Progress } from '../common/Progress';

// Rich English curriculum generator database with structured points
const CURRICULUM_DATABASE: Record<string, LearningTopicModule[]> = {
  'quantum': [
    {
      id: 'mod-q1',
      number: '01',
      title: 'Introduction to Quantum States & Qubits',
      description: 'Superposition, Dirac bra-ket notation, and basis state vectors |0⟩ and |1⟩.',
      content: 'In classical computation, the fundamental atom of information is a bit, strictly constrained to either state 0 or state 1. In quantum computing, a qubit exists in a normalized linear superposition |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex probability amplitudes satisfying |α|² + |β|² = 1.',
      corePoints: [
        'Classical bits operate strictly as discrete binary switches (0 or 1), whereas qubits leverage continuous quantum amplitudes.',
        'A single qubit simultaneously represents linear combinations of computational basis vectors |0⟩ = [1, 0]^T and |1⟩ = [0, 1]^T.',
        'The state remains in continuous superposition until physical interaction or measurement forces wave-function collapse.'
      ],
      mechanisms: [
        'Normalization Constraint: The sum of squared moduli of amplitudes must strictly equal 1 (|α|² + |β|² = 1) to conserve probability.',
        'Bloch Sphere Geometry: Any pure qubit state can be parameterized on a 3D unit sphere via polar angle θ and azimuthal angle φ: |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩.',
        'Born Rule Probability: Measurement in the standard computational basis collapses the qubit into state |0⟩ with probability |α|² and state |1⟩ with probability |β|².'
      ],
      analogy: 'Real-World Mental Model: Imagine a classical coin resting flat on a table—it is strictly either "Heads" (0) or "Tails" (1). However, while rapidly spinning on the table, it exists in a continuous blend of both states simultaneously (superposition). Only when you slap your hand down (measurement) does it probabilistically collapse into a single definitive outcome.',
      applications: [
        'Quantum Random Number Generation (QRNG): Using inherent hardware measurement collapse to generate provably un-predictable cryptographic entropy.',
        'Molecular Energy Ground-State Simulation: Modeling electron spin configurations that are intractable for classical supercomputers.',
        'Quantum Key Distribution (QKD): Detecting eavesdroppers immediately because any interception measurement irrevocably disturbs the qubit state.'
      ],
      subNodes: ['Superposition Principle', 'Dirac Bra-Ket |ψ⟩', 'Bloch Sphere Geometry', 'Measurement Collapse'],
      keyTakeaways: [
        'Superposition enables N qubits to explore 2^N state trajectories simultaneously.',
        'Measurement collapses the wave function probabilistically into a definitive basis vector.',
        'The Bloch Sphere provides an exact geometric unit sphere visualization for single pure-state qubits.'
      ]
    },
    {
      id: 'mod-q2',
      number: '02',
      title: 'Quantum Logic Gates & Unitary Transformations',
      description: 'Pauli X/Y/Z matrices, Hadamard (H) superposition gate, and phase rotations.',
      content: 'Classical logic gates like AND/OR are mathematically irreversible, discarding input information as heat. In contrast, quantum logic gates are strictly reversible unitary transformations represented by complex square matrices where U†U = I.',
      corePoints: [
        'Every quantum logic gate must be mathematically reversible, meaning input states can always be uniquely deduced from output states.',
        'Quantum transformations are linear operators that preserve the total geometric length (norm) of state vectors in Hilbert space.',
        'The Hadamard gate acts as the universal superposition generator, converting deterministic basis states into balanced 50/50 superpositions.'
      ],
      mechanisms: [
        'Unitary Condition: An operator matrix U is unitary if and only if its conjugate transpose equals its inverse (U† = U^-1), ensuring U†U = I.',
        'Pauli-X Gate (Quantum NOT): Multiplies state vector by [[0, 1], [1, 0]], swapping amplitudes between |0⟩ and |1⟩.',
        'Hadamard Gate (H): Maps |0⟩ -> (|0⟩ + |1⟩)/√2 and |1⟩ -> (|0⟩ - |1⟩)/√2; applying H twice (H·H) yields the identity operator I.'
      ],
      analogy: 'Real-World Mental Model: If you hold an apple in your hand, a classical NOT gate flips it completely upside down (180° inversion). A Hadamard gate, however, turns the apple 90° onto its side and sets it into an equal-velocity spin, putting it into a balanced state between upright and upside-down.',
      applications: [
        'Quantum Circuit Initialization: Preparing uniform superpositions across billions of computational states in a single clock cycle.',
        'Quantum Phase Estimation: Measuring eigenvalues of complex physical operators to predict chemical bonding energies.',
        'Fault-Tolerant Clifford Gates: Constructing universal quantum gate sets protected by topological error-correcting codes.'
      ],
      subNodes: ['Pauli-X Bit Flip', 'Hadamard Superposition', 'Reversible Unitary Matrices', 'Phase Shift Gates'],
      keyTakeaways: [
        'All quantum operations must preserve total probability amplitude via unitary matrix operators.',
        'Applying the Hadamard gate twice in succession (H·H) yields the identity matrix, restoring the original state.',
        'Phase gates alter the quantum phase angle without shifting measurement probability magnitudes.'
      ]
    },
    {
      id: 'mod-q3',
      number: '03',
      title: 'Quantum Entanglement & Bell States',
      description: 'Non-locality, CNOT entangling gates, EPR pairs, and the No-Cloning theorem.',
      content: 'Quantum entanglement occurs when composite multi-qubit states cannot be mathematically factored into independent tensor products of individual qubits. Measuring one entangled qubit instantaneously determines the state of its paired partner, irrespective of spatial separation.',
      corePoints: [
        'Entanglement represents a non-classical joint probability distribution where the whole system has a definite state, but individual parts do not.',
        'The Controlled-NOT (CNOT) gate flips a target qubit if and only if the control qubit is |1⟩, acting as the primary entangling primitive.',
        'Bell states form a maximally entangled orthonormal basis of two-qubit Hilbert space.'
      ],
      mechanisms: [
        'Mathematical Inseparability: A two-qubit state |ψ_AB⟩ is entangled if it cannot be written as |ψ_A⟩ ⊗ |ψ_B⟩.',
        'Bell State Formation: Passing |00⟩ through a Hadamard gate on qubit 1, followed by a CNOT onto qubit 2, produces (|00⟩ + |11⟩)/√2.',
        'No-Cloning Theorem: Because unitary operators are strictly linear, an unknown quantum state |ψ⟩ cannot be cloned into |ψ⟩|ψ⟩ without destroying the original.'
      ],
      analogy: 'Real-World Mental Model: Imagine two synchronized magical dice placed in separate cities—one in New York and one in Tokyo. Whenever the New York die is rolled and lands on 6, the Tokyo die instantaneously lands on 6 without any physical wire or radio signal passing between them.',
      applications: [
        'Quantum Superdense Coding: Transmitting two classical bits of information using only a single physical transmitted qubit.',
        'Device-Independent Cryptography: Verifying that keys have not been intercepted using Bell inequality violations.',
        'Distributed Quantum Computing: Linking discrete quantum processor cores across optical fiber links via entangled pairs.'
      ],
      subNodes: ['EPR Paradox & Bell Pairs', 'CNOT Controlled Gate', 'Quantum Non-Locality', 'No-Cloning Theorem'],
      keyTakeaways: [
        'Entangled systems exhibit statistical correlations that violate classical local realism (Bell Inequalities).',
        'The No-Cloning theorem strictly proves that an arbitrary unknown quantum state cannot be duplicated.',
        'Entanglement cannot transmit classical signals faster than light without a classical communication channel.'
      ]
    },
    {
      id: 'mod-q4',
      number: '04',
      title: 'Quantum Teleportation & Superdense Coding',
      description: 'Transferring quantum information using pre-shared entanglement and classical channels.',
      content: 'Quantum teleportation is the protocol of transmitting an unknown quantum state from Alice to Bob without physical particle transfer. Alice and Bob share an entangled Bell pair, execute joint measurement, and transmit classical bits to complete reconstruction.',
      corePoints: [
        'Teleportation transfers quantum state information, not physical matter, strictly respecting the cosmic speed of light limit c.',
        'The protocol requires three distinct resources: an unknown input qubit, a pre-shared entangled Bell pair, and a 2-bit classical channel.',
        'Alice original state is destroyed during her measurement, ensuring compliance with the No-Cloning theorem.'
      ],
      mechanisms: [
        'Step 1: Alice performs a Bell-state measurement on the unknown qubit and her half of the entangled pair, yielding one of four classical outcomes (00, 01, 10, 11).',
        'Step 2: Alice sends the 2 classical bits across standard communication channels to Bob.',
        'Step 3: Bob applies one of four local unitary operations (I, X, Z, or ZX) to his entangled half, exactly recovering the initial state |ψ⟩.'
      ],
      analogy: 'Real-World Mental Model: Imagine a futuristic fax machine where the original paper document is completely vaporized during the scan, and the machine sends two numerical coordinates over a telephone line so the receiving terminal can reconstruct an atom-by-atom exact copy of the original document.',
      applications: [
        'Quantum Internet Routers: Transporting fragile quantum states across long-haul optical networks via quantum repeaters.',
        'Fault-Tolerant Gate Synthesis: Teleporting quantum gates into protected logical qubits to bypass physical hardware layout constraints.',
        'Blind Quantum Cloud Computing: Delegating confidential algorithms to untrusted cloud quantum servers without revealing the code.'
      ],
      subNodes: ['Bell State Measurement', '2 Classical Bits Channel', 'Unitary State Correction', 'Superdense Coding Protocol'],
      keyTakeaways: [
        'Teleporting 1 unknown qubit consumes 1 entangled Bell pair and requires transmitting 2 classical bits.',
        'The original qubit is destroyed during Alice measurement, strictly upholding the No-Cloning theorem.',
        'Superdense coding executes the inverse: transmitting 2 classical bits by sending only 1 physical qubit.'
      ]
    },
    {
      id: 'mod-q5',
      number: '05',
      title: 'Quantum Algorithms: Shor & Grover',
      description: 'Quantum Fourier Transform, polynomial integer factoring, and quadratic database search.',
      content: 'Quantum computers achieve computational speedups by harnessing constructive and destructive wave interference. Peter Shor algorithm factors integers in polynomial time O((log N)³), while Lov Grover algorithm searches unsorted databases in O(√N) time.',
      corePoints: [
        'Quantum algorithms do not try all combinations in parallel; they engineer wave interference so wrong paths cancel out and correct answers amplify.',
        'Shor algorithm transforms integer factorization into period finding of modular exponentiation functions.',
        'Grover search provides an optimal quadratic speedup for any unstructured database or black-box brute-force problem.'
      ],
      mechanisms: [
        'Quantum Fourier Transform (QFT): Computes discrete Fourier transforms exponentially faster than classical FFT, scaling in O(n²) gates vs O(n2ⁿ).',
        'Grover Oracle & Diffusion Operator: Flips the phase of target states (f(x)=1), then reflects all amplitudes across their geometric mean to boost target probability.',
        'Convergence Rate: Grover algorithm reaches near 100% measurement probability in exactly ⌊(π/4)√N⌋ iterations.'
      ],
      analogy: 'Real-World Mental Model: Imagine trying to find a single specific quote in an unsorted library of 100,000 books. A classical search opens each book sequentially (up to 100,000 steps). Grover algorithm sets up constructive wave interference so the target book glows brightly in just 316 steps (√100,000).',
      applications: [
        'Cryptographic Threat Assessment: Breaking 2048-bit RSA and Elliptic Curve Cryptography (ECC) in hours once physical quantum computers scale.',
        'Post-Quantum Cryptography Migration: Transitioning global internet protocols to lattice-based algorithms (NIST Kyber and Dilithium).',
        'Combinatorial Optimization: Accelerating drug discovery, protein docking simulations, and financial portfolio risk optimization.'
      ],
      subNodes: ['Quantum Fourier Transform', 'Shor RSA Factoring', 'Grover Amplitude Amplification', 'Post-Quantum Cryptography'],
      keyTakeaways: [
        'Shor algorithm provides an exponential speedup over classical best-known factoring methods.',
        'Grover algorithm delivers a provable quadratic speedup for unstructured search problems.',
        'Quantum algorithms rely on constructive interference for valid answers and cancellation of incorrect paths.'
      ]
    }
  ],
  'cellular': [
    {
      id: 'mod-c1',
      number: '01',
      title: 'Glycolysis: Cytoplasmic Sugar Cleavage',
      description: 'Glucose phosphorylation, ATP investment, NAD+ reduction, and pyruvate yield.',
      content: 'Glycolysis is an anaerobic 10-step metabolic pathway occurring in the cytosol. One 6-carbon glucose molecule is primed with 2 ATP molecules, cleaved into two 3-carbon intermediates, and oxidized to yield 2 pyruvate molecules, a net gain of 2 ATP, and 2 NADH.',
      corePoints: [
        'Glycolysis occurs universally in the cytoplasm of virtually all living organisms, requiring zero molecular oxygen.',
        'The pathway is divided into an initial energy investment phase (consuming 2 ATP) and an energy payoff phase (producing 4 ATP).',
        'Phosphofructokinase-1 (PFK-1) acts as the primary allosteric rate-limiting valve controlling glycolytic throughput.'
      ],
      mechanisms: [
        'Substrate-Level Phosphorylation: Soluble cytoplasmic kinase enzymes directly transfer high-energy phosphate groups from metabolites onto ADP.',
        'Redox Coenzyme Reduction: Glyceraldehyde-3-phosphate dehydrogenase (GAPDH) reduces NAD+ to NADH while adding inorganic phosphate.',
        'Net Equation: 1 Glucose + 2 NAD+ + 2 ADP + 2 Pi -> 2 Pyruvate + 2 NADH + 2 H+ + 2 ATP + 2 H2O.'
      ],
      analogy: 'Real-World Mental Model: Think of starting a profitable business. You must first invest $2,000 of your own capital (2 ATP investment phase) to buy equipment and raw materials. As the business operates, it generates $4,000 in revenue (4 ATP produced), yielding a net profit of $2,000 (2 net ATP).',
      applications: [
        'Warburg Effect in Oncology: Cancer cells preferentially consume glucose via high-rate glycolysis (aerobic glycolysis), visualized on FDG-PET scans.',
        'Industrial Bio-Fermentation: Exploiting anaerobic glycolysis in yeast for bio-ethanol fuel and beverage production.',
        'Type 2 Diabetes Therapeutics: Targeting hepatic gluconeogenesis and glycolytic enzymes to regulate systemic blood glucose levels.'
      ],
      subNodes: ['Hexokinase Phosphorylation', 'Fructose-1,6-bisphosphate Cleavage', 'Substrate-Level Phosphorylation', 'Net ATP Balance'],
      keyTakeaways: [
        'Glycolysis occurs universally in the cytoplasm and requires no molecular oxygen.',
        'Net yield per glucose molecule: 2 Pyruvate + 2 ATP + 2 NADH.',
        'Phosphofructokinase-1 (PFK-1) serves as the primary allosteric rate-limiting enzyme.'
      ]
    },
    {
      id: 'mod-c2',
      number: '02',
      title: 'Pyruvate Oxidation & Acetyl-CoA Formation',
      description: 'Mitochondrial entry, decarboxylation, and the pyruvate dehydrogenase complex.',
      content: 'Pyruvate is actively transported into the mitochondrial matrix, where the pyruvate dehydrogenase complex (PDH) catalyzes oxidative decarboxylation, stripping CO2, reducing NAD+ to NADH, and forming Acetyl-CoA.',
      corePoints: [
        'Pyruvate oxidation serves as the indispensable bridge linking cytoplasmic glycolysis with the mitochondrial citric acid cycle.',
        'The pyruvate dehydrogenase (PDH) complex consists of three distinct enzymes (E1, E2, E3) utilizing five cofactors.',
        'Carbon dioxide is released as metabolic waste, representing the first carbons shed from the original glucose molecule.'
      ],
      mechanisms: [
        'Active Transport: Cytoplasmic pyruvate crosses the outer mitochondrial membrane via porins and traverses the inner membrane via the MPC symporter.',
        'Decarboxylation: Pyruvate dehydrogenase (E1) removes the carboxyl group using Thiamine pyrophosphate (TPP), releasing CO2.',
        'Acetyl Transfer: Dihydrolipoyl transacetylase (E2) transfers the remaining 2-carbon acetyl group onto Coenzyme A, forming high-energy Acetyl-CoA.'
      ],
      analogy: 'Real-World Mental Model: Imagine an airport security terminal. Pyruvate is the domestic passenger who must hand over their passport and luggage tag (decarboxylation releasing CO2) to receive an international boarding pass (Acetyl-CoA) before entering the main terminal (mitochondrial matrix).',
      applications: [
        'Ketogenic Metabolic Therapy: Depriving cells of glucose forces reliance on fatty acid beta-oxidation to generate Acetyl-CoA directly.',
        'Lactic Acidosis Pathology: Defects in PDH block pyruvate oxidation, shunting pyruvate into lactate dehydrogenase and lowering blood pH.',
        'Beriberi (Vitamin B1 Deficiency): Insufficient thiamine impairs E1 function, crippling central nervous system energy production.'
      ],
      subNodes: ['Pyruvate Translocase', 'PDH Enzyme Complex', 'Decarboxylation & CO2', 'Acetyl-CoA Formation'],
      keyTakeaways: [
        'Pyruvate oxidation bridges cytoplasmic glycolysis with the mitochondrial citric acid cycle.',
        'Each glucose yields 2 Acetyl-CoA, 2 CO2, and 2 NADH during transition.',
        'High ratios of ATP/ADP or NADH/NAD+ allosterically inhibit the PDH complex.'
      ]
    },
    {
      id: 'mod-c3',
      number: '03',
      title: 'The Citric Acid Cycle (Krebs Cycle)',
      description: 'Oxaloacetate condensation, cyclical decarboxylation, and high-energy carrier harvesting.',
      content: 'In the mitochondrial matrix, Acetyl-CoA (2C) condenses with Oxaloacetate (4C) to form Citrate (6C). Through a sequence of 8 enzymatic steps, two carbons are oxidized to CO2, regenerating oxaloacetate while harvesting NADH, FADH2, and GTP.',
      corePoints: [
        'The Citric Acid Cycle is the metabolic hub where carbohydrates, lipids, and amino acids converge for final oxidation.',
        'The cycle does not produce large quantities of ATP directly; its primary mission is stripping high-energy electrons onto NADH and FADH2.',
        'Two complete rotations of the cycle are required to process the products of a single original glucose molecule.'
      ],
      mechanisms: [
        'Citrate Synthase: Catalyzes condensation of Acetyl-CoA with Oxaloacetate, generating Citrate and releasing free Coenzyme A.',
        'Isocitrate Dehydrogenase: Primary rate-controlling allosteric enzyme; stimulated by ADP and inhibited by ATP and NADH.',
        'Carrier Yield per Turn: 3 NADH, 1 FADH2, 1 GTP/ATP via substrate-level phosphorylation, and 2 CO2.'
      ],
      analogy: 'Real-World Mental Model: Envision a municipal Ferris wheel with 8 boarding gondolas. A passenger enters (Acetyl-CoA), rides the full circular rotation while unloading luggage (carbon atoms as CO2 and electrons onto battery packs NADH/FADH2), and leaves the empty seat ready for the next passenger.',
      applications: [
        'Anaplerotic Metabolic Replenishment: Intermediates like alpha-ketoglutarate and oxaloacetate are drawn off to synthesize amino acids and heme.',
        'Mitochondrial Myopathies: Genetic mutations in succinate dehydrogenase lead to metabolic fatigue and neuromuscular deficits.',
        'Metabolic Profiling in Sports Medicine: Measuring lactate clearance and VO2 max as indicators of mitochondrial cycle efficiency.'
      ],
      subNodes: ['Citrate Synthase Condensation', 'Isocitrate Dehydrogenase', 'Oxaloacetate Regeneration', 'NADH/FADH2 Carrier Harvest'],
      keyTakeaways: [
        'Two complete turns of the cycle are required per single glucose molecule.',
        'The primary function of the cycle is harvesting high-energy electrons onto NADH and FADH2.',
        'Oxaloacetate must be regenerated in the final step to keep the cycle continuous.'
      ]
    },
    {
      id: 'mod-c4',
      number: '04',
      title: 'The Electron Transport Chain & Proton Pumping',
      description: 'Complexes I-IV, electron shuttling via Ubiquinone & Cytochrome c, and terminal O2 reduction.',
      content: 'The inner mitochondrial membrane houses respiratory complexes I, II, III, and IV. High-energy electrons donated by NADH and FADH2 cascade along descending redox potentials, powering active proton pumping into the intermembrane space.',
      corePoints: [
        'The Electron Transport Chain converts chemical bond energy from NADH/FADH2 into a steep physical transmembrane electrochemical gradient.',
        'Electrons flow spontaneously through ascending reduction potentials, culminating in oxygen reduction to form water.',
        'Protons (H+) are pumped across the impermeable inner membrane, establishing both an electrical voltage and a pH differential.'
      ],
      mechanisms: [
        'Complex I (NADH Dehydrogenase): Accepts 2 electrons from NADH, transfers them to Coenzyme Q (Ubiquinone), and pumps 4 H+ across.',
        'Complex III (Cytochrome bc1): Shuttles electrons from reduced ubiquinone to Cytochrome c via the Q-cycle, pumping 4 H+.',
        'Complex IV (Cytochrome c Oxidase): Transfers 4 electrons onto molecular oxygen, binding 4 matrix protons to form 2 H2O and pumping 2 H+.'
      ],
      analogy: 'Real-World Mental Model: Think of a hydroelectric dam. Water is pumped up into a mountain reservoir using electrical pumps (Complexes I, III, IV pumping protons). As the reservoir fills with water under intense gravitational pressure, huge potential energy is stored behind the dam wall.',
      applications: [
        'Toxicological Inhibitors: Cyanide and Carbon Monoxide bind irreversibly to Complex IV, causing rapid cellular asphyxiation despite abundant oxygen.',
        'Brown Adipose Tissue Thermogenesis: Thermogenin (UCP1) uncouples proton flow from ATP synthesis, generating pure heat in hibernating animals and human infants.',
        'Reactive Oxygen Species (ROS) Aging Research: Electron leakage at Complexes I and III produces superoxide radicals that drive cellular aging.'
      ],
      subNodes: ['Complex I (NADH Dehydrogenase)', 'Ubiquinone & Cytochrome c', 'Proton Motive Force (PMF)', 'Terminal O2 Electron Acceptor'],
      keyTakeaways: [
        'Electrons flow sequentially toward oxygen, the terminal electron acceptor, forming H2O.',
        'Proton pumping creates both a chemical (pH) and electrical voltage gradient across the inner membrane.',
        'Cyanide and Carbon Monoxide inhibit Complex IV, completely halting electron flow.'
      ]
    },
    {
      id: 'mod-c5',
      number: '05',
      title: 'Chemiosmosis & ATP Synthase Molecular Turbine',
      description: 'Rotary motor catalysis, proton back-flow, and oxidative phosphorylation yield.',
      content: 'Protons accumulated in the intermembrane space flow down their electrochemical gradient back into the matrix through the F0 rotor channel of ATP Synthase, driving mechanical rotation of the F1 catalytic subunit to phosphorylate ADP into ATP.',
      corePoints: [
        'Peter Mitchell Chemiosmotic Theory proved that ATP synthesis is driven by physical proton back-flow rather than direct chemical intermediates.',
        'ATP Synthase operates as a true nanomechanical rotary motor with nearly 100% kinetic energy efficiency.',
        'Oxidative phosphorylation generates approximately 85-90% of all ATP produced during cellular respiration.'
      ],
      mechanisms: [
        'F0 Subunit Rotor: Imbedded in the inner membrane; proton binding to conserved aspartate residues induces physical rotation of the c-ring.',
        'F1 Catalytic Stator: Projects into the matrix; the rotating central gamma stalk forces conformational transitions in alpha/beta catalytic dimers (Open, Loose, Tight states).',
        'Aggregate Energy Budget: Oxidation of 1 NADH drives synthesis of ~2.5 ATP; 1 FADH2 yields ~1.5 ATP, totaling ~30-32 ATP per glucose molecule.'
      ],
      analogy: 'Real-World Mental Model: The stored water from the hydroelectric dam rushes through a spinning water turbine at the bottom. As the turbine axle spins rapidly, its mechanical turning motion directly drives a generator that manufactures electricity (ATP).',
      applications: [
        'Antibiotic Target Development: Bedaquiline selectively inhibits mycobacterial ATP Synthase to eradicate multi-drug-resistant tuberculosis.',
        'Oligomycin Research: Using selective F0 channel blockers to measure mitochondrial reserve capacity in metabolic assays.',
        'Bio-Nanotechnology: Engineering synthetic hybrid nanomotors utilizing ATP Synthase catalytic spindles for targeted drug delivery.'
      ],
      subNodes: ['F0 Proton Rotor Channel', 'F1 Catalytic Domain Rotation', 'ADP + Pi Phosphorylation', 'Total Cellular ATP Budget'],
      keyTakeaways: [
        'Peter Mitchell Chemiosmotic Hypothesis couples proton gradients directly to chemical ATP synthesis.',
        'ATP Synthase operates as a true rotary nanomotor with ~100% mechanical efficiency.',
        'Complete aerobic oxidation of one glucose molecule yields an aggregate of ~30 to 32 ATP.'
      ]
    }
  ]
};

// Generic synthesizer for custom topics or uploaded documents
function generateCurriculumForTopic(topic: string, goal: string): LearningTopicModule[] {
  const lower = topic.toLowerCase();
  if (lower.includes('quantum')) return CURRICULUM_DATABASE['quantum'];
  if (lower.includes('cellular') || lower.includes('respiration') || lower.includes('biology') || lower.includes('atp')) {
    return CURRICULUM_DATABASE['cellular'];
  }

  // Generates custom 5-module structured curriculum in clean points
  return [
    {
      id: `mod-${Date.now()}-1`,
      number: '01',
      title: `Core Foundations & Domain Scope of ${topic}`,
      description: `Fundamental axioms, historical evolution, and baseline definitions in ${topic}.`,
      content: `${topic} is grounded in foundational principles that govern its theoretical and practical domain. Mastering these basic primitives allows learners to construct rigorous mental models before approaching higher-order architectural complexities.`,
      corePoints: [
        `Systematic definition of ${topic}, identifying the core challenge or physical phenomenon it addresses.`,
        'Baseline assumptions, axiomatic rules, and standard academic nomenclature used by domain specialists.',
        'Prerequisites, input variables, and historical progression that led to modern formulations.'
      ],
      mechanisms: [
        'Primary Operational Rules: Mathematical relationships and deterministic constraints that govern system states.',
        'Component Interfacing: How fundamental primitives exchange signals, energy, or data payloads.',
        'State Space Boundaries: Defining the valid operational envelope within which the core principles remain invariant.'
      ],
      analogy: `Real-World Mental Model: Think of constructing a high-rise building. Before framing the floors and installing glass facades, engineers must anchor deep structural foundation pilings into bedrock. This first milestone establishes the bedrock definitions for ${topic}.`,
      applications: [
        'Foundational System Design: Structuring baseline architectures using standard industry best practices.',
        'Academic Benchmarking: Setting up controlled baseline experiments for scientific peer review.',
        'Requirements Analysis: Verifying that project specifications conform to core domain limits.'
      ],
      subNodes: ['Baseline Terminology', 'Core Axiomatic Framework', 'Primary Primitives', 'Domain Scope'],
      keyTakeaways: [
        `Understand the fundamental problem space solved by ${topic}.`,
        'Identify standard academic conventions, mathematical notation, and baseline assumptions.',
        'Distinguish core structural drivers from peripheral edge cases.'
      ]
    },
    {
      id: `mod-${Date.now()}-2`,
      number: '02',
      title: `Structural Mechanisms & Operational Pipelines`,
      description: `Internal mechanics, operational flow, and key state transitions in ${topic}.`,
      content: `Beneath the high-level concepts of ${topic} lie the concrete mechanical operations that drive system behavior. Understanding how inputs transform into outputs through deterministic rules is critical for true mastery.`,
      corePoints: [
        'Sequential pipeline progression: How raw inputs undergo stage-by-stage transformations.',
        'Internal feedback loops and control parameters that maintain stability under varying workloads.',
        'Critical bottleneck components that dictate overall operational throughput.'
      ],
      mechanisms: [
        'Execution Flow: Tracing end-to-end data propagation from initial trigger to completed output.',
        'State Transition Logic: Conditions required to switch between operational states safely.',
        'Resource Scheduling: How memory, compute, or chemical substrate is allocated during operation.'
      ],
      analogy: `Real-World Mental Model: Think of opening the hood of an automobile while the engine is running. Seeing how the timing belt coordinates the camshaft and pistons gives you an intuitive mechanical understanding of how the car actually moves.`,
      applications: [
        'Pipeline Performance Optimization: Eliminating resource stalls and latency spikes in high-throughput workflows.',
        'Root-Cause Diagnostics: Tracing unexpected failures back to specific intermediate pipeline stages.',
        'Automated Control Systems: Implementing feedback loops that adapt to fluctuating runtime demands.'
      ],
      subNodes: ['Operational Pipeline', 'State Transitions', 'Control Parameters', 'Data Transformations'],
      keyTakeaways: [
        'Analyze the internal dependencies that dictate overall system performance.',
        'Trace the input-to-output propagation path across sub-components.',
        'Identify mechanical bottlenecks that constrain system throughput or stability.'
      ]
    },
    {
      id: `mod-${Date.now()}-3`,
      number: '03',
      title: `Comparative Paradigms & Architectural Trade-offs`,
      description: `Contrasting methodologies, complexity vs performance, and edge constraints.`,
      content: `Engineering and theoretical problem-solving in ${topic} never operates in a vacuum of ideal conditions. Practitioners must navigate trade-offs between speed, resource consumption, accuracy, and maintainability.`,
      corePoints: [
        'No single methodology is universally superior across all constraints and operating budgets.',
        'Evaluating competing approaches using standardized metrics (latency, accuracy, memory footprint, complexity).',
        'Recognizing diminishing returns when optimizing beyond practical production thresholds.'
      ],
      mechanisms: [
        'Complexity Profiling: Evaluating Big-O time and space scaling characteristics under stress.',
        'Boundary Behavior: How competing algorithms behave when encountering sparse, noisy, or corrupted inputs.',
        'Degradation Modes: Determining whether system failure is graceful or catastrophically sudden.'
      ],
      analogy: `Real-World Mental Model: Compare a lightweight racing motorcycle to an 18-wheel heavy freight truck. Both are motor vehicles, yet their engineering trade-offs (speed vs cargo capacity) are optimized for entirely different operational envelopes.`,
      applications: [
        'Architecture Decision Records (ADR): Justifying technology stack choices to stakeholders using empirical trade-off data.',
        'Cost-to-Performance Optimization: Balancing cloud infrastructure expenses against latency SLA targets.',
        'Safety-Critical Systems: Selecting conservative, provable algorithms over complex heuristics in mission-critical environments.'
      ],
      subNodes: ['Complexity Analysis', 'Trade-off Matrices', 'Boundary Conditions', 'Failure Modes'],
      keyTakeaways: [
        'No single approach is universally optimal across all operational contexts.',
        'Evaluate competing architectural options using standardized empirical benchmarks.',
        'Anticipate boundary conditions and design graceful degradation strategies.'
      ]
    },
    {
      id: `mod-${Date.now()}-4`,
      number: '04',
      title: `Real-World Implementations & Engineering Applications`,
      description: `Industry pipelines, enterprise benchmarks, and case studies.`,
      content: `Transitioning theoretical knowledge of ${topic} into battle-tested deployments requires addressing messy real-world conditions, latency budgets, noise mitigation, and scaling overheads.`,
      corePoints: [
        'Bridging the gap between sterile laboratory models and non-ideal production environments.',
        'Designing automated monitoring telemetry to detect drift, degradation, or silent failures.',
        'Implementing fail-safe redundancy protocols to ensure uninterrupted service availability.'
      ],
      mechanisms: [
        'Telemetry Instrumentation: Emitting health metrics, error logs, and execution traces without imposing performance drag.',
        'Circuit Breaking & Rate Limiting: Protecting downstream services during traffic surges or partial outages.',
        'Zero-Downtime Migration: Deploying updates and schema shifts without halting live production traffic.'
      ],
      analogy: `Real-World Mental Model: Think of testing a chemical vaccine formula in a tiny laboratory test tube versus manufacturing, packaging, and distributing 100 million doses at refrigerated temperatures worldwide.`,
      applications: [
        'Enterprise Production Deployments: Scaling systems to support millions of concurrent real-world transactions.',
        'Automated CI/CD Verification: Continuous integration pipelines that validate behavioral invariants before release.',
        'Compliance & Auditing: Ensuring systems satisfy rigorous international regulatory and safety standards.'
      ],
      subNodes: ['Deployment Workflows', 'Performance Profiling', 'Failure Recovery', 'Benchmarking'],
      keyTakeaways: [
        'Bridge the gap between theoretical ideal models and empirical production environments.',
        'Implement automated telemetry, health checks, and verification checkpoints.',
        'Design automated fail-safe recovery protocols for unexpected runtime anomalies.'
      ]
    },
    {
      id: `mod-${Date.now()}-5`,
      number: '05',
      title: `Advanced Horizons & Emerging Frontiers in ${topic}`,
      description: `Modern breakthroughs, open research questions, and upcoming state-of-the-art developments.`,
      content: `The frontier of ${topic} is continually expanding through cutting-edge academic research and industrial innovation. Understanding current unsolved problems provides learners with a compass for long-term mastery.`,
      corePoints: [
        'Identifying open theoretical paradoxes and engineering bottlenecks currently under active research.',
        'Cross-pollination of disciplines: How adjacent fields (e.g. AI, quantum mechanics, genomics) are converging.',
        'Formulating high-impact research questions that will shape the next decade of development.'
      ],
      mechanisms: [
        'Next-Gen Algorithmic Paradigms: Pushing beyond traditional classical boundaries using novel theoretical models.',
        'Emergent State Synthesis: Generating higher-order emergent behavior from simple interconnected agents.',
        'Empirical Limits Verification: Measuring when physical hardware limits (thermal noise, quantum tunneling) enforce hard ceilings.'
      ],
      analogy: `Real-World Mental Model: Envision sailing beyond familiar coastal harbors out into the uncharted open ocean to map new continents. This final milestone surveys where this discipline is heading over the next decade.`,
      applications: [
        'Pioneering R&D Initiatives: Investing in high-risk, breakthrough technologies with transformative potential.',
        'Academic Doctoral Dissertations: Tackling high-impact open problems at the research frontier.',
        'Next-Generation Patents: Protecting novel intellectual property that unlocks future industrial paradigms.'
      ],
      subNodes: ['State-of-the-Art Benchmarks', 'Open Research Challenges', 'Next-Gen Paradigms', 'Synthesis & Integration'],
      keyTakeaways: [
        'Synthesize foundational knowledge to critically evaluate modern literature.',
        'Recognize current computational and theoretical limits yet to be resolved.',
        'Formulate independent analytical questions to drive deeper domain specialization.'
      ]
    }
  ];
}

export const StudentLearnTopic: React.FC = () => {
  const {
    learningPlans,
    saveLearningPlan,
    setStudentView,
    showToast
  } = useApp();

  // Generator Mode: 'topic_input' vs 'document_upload'
  const [generatorMode, setGeneratorMode] = useState<'topic_input' | 'document_upload'>('topic_input');

  // Input states
  const [inputTopic, setInputTopic] = useState('Quantum Computing & Qubit Superposition');
  const [targetGoal, setTargetGoal] = useState('Understand qubits, Bloch sphere representation, and Quantum Teleportation');
  const [isGenerating, setIsGenerating] = useState(false);

  // Document Upload State
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Flow Phases: 'input' -> 'plan_confirm' -> 'learning' -> 'completed'
  const [phase, setPhase] = useState<'input' | 'plan_confirm' | 'learning' | 'completed'>('input');
  const [currentPlan, setCurrentPlan] = useState<LearningPlan | null>(learningPlans[0] || null);

  // View state for Phase 2: Mind Map Flow vs Linear Syllabus
  const [viewMode, setViewMode] = useState<'mindmap' | 'linear'>('mindmap');
  const [selectedPreviewNode, setSelectedPreviewNode] = useState<number | null>(0);
  const [animationKey, setAnimationKey] = useState<number>(0);

  // Learning Mode State
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  // Handle file selection from local device
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'doc';
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setUploadedFile({
        name: file.name,
        size: `${sizeMB} MB`,
        type: ext
      });
      // Pre-fill topic derived from filename
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setInputTopic(cleanName);
      setTargetGoal(`Analyze and master core concepts extracted from ${file.name}`);
    }
  };

  const handleGeneratePlan = () => {
    const topicToUse = generatorMode === 'document_upload'
      ? (inputTopic || uploadedFile?.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ') || 'Document Knowledge Graph')
      : inputTopic;

    if (!topicToUse.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const generatedModules = generateCurriculumForTopic(topicToUse, targetGoal);
      const generatedPlan: LearningPlan = {
        id: `lp-${Date.now()}`,
        topic: topicToUse,
        level: 'Undergraduate',
        goal: targetGoal || `Master ${topicToUse}`,
        progress: 0,
        savedInLibrary: false,
        createdAt: new Date().toISOString().split('T')[0],
        modules: generatedModules
      };

      setCurrentPlan(generatedPlan);
      setIsGenerating(false);
      setPhase('plan_confirm');
      setSelectedPreviewNode(0);
      setAnimationKey(prev => prev + 1);
      showToast('Knowledge Mind Map Generated! Explore the concept tree.');
    }, 1100);
  };

  const handleStartLearning = (startIndex = 0) => {
    setPhase('learning');
    setActiveModuleIndex(startIndex);
  };

  const activeModule = currentPlan?.modules[activeModuleIndex];

  const handleNextModule = () => {
    if (!currentPlan) return;
    const nextIdx = activeModuleIndex + 1;
    const progress = Math.round((nextIdx / currentPlan.modules.length) * 100);

    const updatedPlan: LearningPlan = {
      ...currentPlan,
      progress
    };
    setCurrentPlan(updatedPlan);

    if (nextIdx < currentPlan.modules.length) {
      setActiveModuleIndex(nextIdx);
    } else {
      const completedPlan: LearningPlan = {
        ...updatedPlan,
        progress: 100,
        savedInLibrary: true
      };
      setCurrentPlan(completedPlan);
      saveLearningPlan(completedPlan);
      setPhase('completed');
      showToast('Learning track completed and archived to My Library!', 'success');
    }
  };

  const handlePreviousModule = () => {
    if (activeModuleIndex > 0) {
      setActiveModuleIndex(activeModuleIndex - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1020px', margin: '0 auto', width: '100%' }}>
      {/* PHASE 1: TOPIC INPUT OR DOCUMENT UPLOAD */}
      {phase === 'input' && (
        <Card style={{ padding: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', border: '2px solid var(--color-mint-border)' }}>
              <Network size={26} />
            </div>
            <h1 className="text-h1" style={{ fontSize: '26px' }}>
              NotebookLM AI Mind Map & Learning Generator
            </h1>
            <p className="text-body" style={{ fontSize: '15px', marginTop: '6px', maxWidth: '620px', margin: '6px auto 0' }}>
              Enter any topic or upload course documents (PDF, PPT, DOCX) to synthesize an interactive knowledge tree flow with step-by-step intuitive concept breakdowns.
            </p>
          </div>

          <div style={{ maxWidth: '740px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* GENERATION SOURCE TAB SWITCHER */}
            <div style={{ display: 'flex', backgroundColor: 'var(--color-surface-hover)', borderRadius: 'var(--radius-lg)', padding: '4px', border: '1px solid var(--color-border)' }}>
              <button
                type="button"
                onClick={() => setGeneratorMode('topic_input')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: generatorMode === 'topic_input' ? '#FFFFFF' : 'transparent',
                  color: generatorMode === 'topic_input' ? 'var(--color-primary-emerald)' : 'var(--color-text-muted)',
                  fontWeight: generatorMode === 'topic_input' ? 700 : 500,
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: generatorMode === 'topic_input' ? 'var(--shadow-subtle)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Compass size={16} />
                Enter Topic & Learning Goal
              </button>

              <button
                type="button"
                onClick={() => setGeneratorMode('document_upload')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: generatorMode === 'document_upload' ? '#FFFFFF' : 'transparent',
                  color: generatorMode === 'document_upload' ? 'var(--color-primary-emerald)' : 'var(--color-text-muted)',
                  fontWeight: generatorMode === 'document_upload' ? 700 : 500,
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: generatorMode === 'document_upload' ? 'var(--shadow-subtle)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Upload size={16} />
                Upload Document (PDF / PPT / DOCX)
              </button>
            </div>

            {/* TAB 1: TOPIC INPUT */}
            {generatorMode === 'topic_input' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="input-label" style={{ fontSize: '13.5px', marginBottom: '8px', display: 'block', fontWeight: 600 }}>
                    What topic or discipline would you like to master?
                  </label>
                  <input
                    className="input-field"
                    style={{ fontSize: '15px', padding: '13px 16px', fontWeight: 500 }}
                    value={inputTopic}
                    onChange={e => setInputTopic(e.target.value)}
                    placeholder="e.g. Quantum Computing, Cellular Respiration, Distributed Systems..."
                  />
                </div>

                <div>
                  <label className="input-label" style={{ fontSize: '13px', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
                    Target Learning Outcome / Competency Goal
                  </label>
                  <input
                    className="input-field"
                    value={targetGoal}
                    onChange={e => setTargetGoal(e.target.value)}
                    placeholder="What specific outcome or mastery do you want to achieve?"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: DOCUMENT UPLOAD (PDF, PPT, DOCX) */}
            {generatorMode === 'document_upload' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                />

                {/* Drag and Drop / Upload Box */}
                {!uploadedFile ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: '2px dashed var(--color-mint-border)',
                      backgroundColor: 'var(--color-mint-bg)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '36px 20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary-emerald)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-mint-border)')}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FFFFFF', color: 'var(--color-primary-emerald)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', boxShadow: 'var(--shadow-subtle)' }}>
                      <Upload size={22} />
                    </div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-teal-dark)', marginBottom: '4px' }}>
                      Click to Browse or Drag Course Documents Here
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-deep-teal)', marginBottom: '8px' }}>
                      Supports PDF, PowerPoint (PPT, PPTX), Microsoft Word (DOC, DOCX), or Lecture Notes (TXT)
                    </p>
                    <span style={{ fontSize: '11.5px', color: 'var(--color-text-muted)', backgroundColor: '#FFFFFF', padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }}>
                      Maximum file size: 50 MB
                    </span>
                  </div>
                ) : (
                  /* Uploaded File Card */
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-primary-emerald)', boxShadow: '0 4px 14px -2px rgba(15, 118, 110, 0.12)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FileText size={22} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                            {uploadedFile.name}
                          </h4>
                          <span className="badge badge-emerald" style={{ fontSize: '10.5px' }}>
                            {uploadedFile.type.toUpperCase()}
                          </span>
                        </div>
                        <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          File Size: {uploadedFile.size} • Ready for Concept Mind Map Extraction
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Replace File
                      </Button>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-text-muted)',
                          cursor: 'pointer',
                          padding: '6px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title="Remove file"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="input-label" style={{ fontSize: '13px', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
                    Extracted Topic Heading
                  </label>
                  <input
                    className="input-field"
                    value={inputTopic}
                    onChange={e => setInputTopic(e.target.value)}
                    placeholder="Topic title derived from uploaded document"
                  />
                </div>

                <div>
                  <label className="input-label" style={{ fontSize: '13px', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
                    Target Mastery Focus
                  </label>
                  <input
                    className="input-field"
                    value={targetGoal}
                    onChange={e => setTargetGoal(e.target.value)}
                    placeholder="Specific chapters or analytical questions to extract into the mind map"
                  />
                </div>
              </div>
            )}

            {/* AI Generator Action Callout */}
            <div className="ai-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginTop: '10px' }}>
              <div>
                <span className="ai-badge" style={{ marginBottom: '4px' }}>
                  {generatorMode === 'document_upload' ? 'Document Concept Synthesizer' : 'Tree Structure Mind Map Engine'}
                </span>
                <p style={{ fontSize: '13px', color: 'var(--color-deep-teal)' }}>
                  {generatorMode === 'document_upload'
                    ? 'Extracts chapter hierarchy and generates an interactive 5-node knowledge tree.'
                    : 'Generates an interactive 5-node knowledge tree with detailed point-by-point breakdowns.'}
                </p>
              </div>

              <Button
                variant="primary"
                size="lg"
                icon={generatorMode === 'document_upload' ? <FileText size={16} /> : <GitFork size={16} />}
                onClick={handleGeneratePlan}
                loading={isGenerating}
                disabled={generatorMode === 'document_upload' && !uploadedFile && !inputTopic.trim()}
              >
                {generatorMode === 'document_upload' ? 'Generate Mind Map from Document' : 'Generate Learning Plan'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* PHASE 2: NOTEBOOKLM MIND MAP TREE VIEW (SLOW SHOW & FLOW) */}
      {phase === 'plan_confirm' && currentPlan && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Top Control Ribbon */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', backgroundColor: '#FFFFFF', padding: '20px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <GitFork size={12} />
                  NotebookLM Knowledge Mind Map
                </span>
                <Badge variant="neutral">5 Interconnected Concept Nodes</Badge>
                {uploadedFile && (
                  <span style={{ fontSize: '11.5px', color: 'var(--color-primary-emerald)', backgroundColor: 'var(--color-mint-bg)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    Extracted from {uploadedFile.name}
                  </span>
                )}
              </div>
              <h2 className="text-h2" style={{ fontSize: '22px' }}>{currentPlan.topic}</h2>
              <p className="text-body" style={{ marginTop: '2px', fontSize: '14px' }}>
                Target Outcome: <strong>{currentPlan.goal}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Layout Switcher */}
              <div style={{ display: 'flex', backgroundColor: 'var(--color-surface-hover)', borderRadius: 'var(--radius-md)', padding: '3px', border: '1px solid var(--color-border)' }}>
                <button
                  type="button"
                  onClick={() => setViewMode('mindmap')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: viewMode === 'mindmap' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'mindmap' ? 'var(--color-primary-emerald)' : 'var(--color-text-muted)',
                    fontWeight: viewMode === 'mindmap' ? 700 : 500,
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer',
                    boxShadow: viewMode === 'mindmap' ? 'var(--shadow-subtle)' : 'none'
                  }}
                >
                  <Network size={14} />
                  Tree Mind Map
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('linear')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: viewMode === 'linear' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'linear' ? 'var(--color-primary-emerald)' : 'var(--color-text-muted)',
                    fontWeight: viewMode === 'linear' ? 700 : 500,
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer',
                    boxShadow: viewMode === 'linear' ? 'var(--shadow-subtle)' : 'none'
                  }}
                >
                  <ListFilter size={14} />
                  Module List
                </button>
              </div>

              {/* Replay Slow-Show Animation */}
              <Button
                variant="secondary"
                size="sm"
                icon={<RotateCcw size={13} />}
                onClick={() => setAnimationKey(k => k + 1)}
                title="Replay the progressive tree reveal animation"
              >
                Replay Flow
              </Button>

              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                onClick={() => handleStartLearning(0)}
              >
                Explore Nodes →
              </Button>
            </div>
          </div>

          {/* VIEW 1: NOTEBOOKLM TREE MIND MAP FLOW */}
          {viewMode === 'mindmap' && (
            <div
              key={animationKey}
              className="mind-map-bg-grid"
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--color-mint-border)',
                padding: '36px 20px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* TOP APEX / ROOT NODE */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                <div
                  style={{
                    maxWidth: '480px',
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--color-primary-emerald)',
                    boxShadow: '0 8px 24px -4px rgba(15, 118, 110, 0.18)',
                    padding: '20px 24px',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', border: '1px solid var(--color-mint-border)' }}>
                    <Network size={12} />
                    Knowledge Root Apex
                  </div>
                  <h3 className="text-h3" style={{ fontSize: '17px', color: 'var(--color-deep-teal-dark)', marginBottom: '4px' }}>
                    {currentPlan.topic}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                    {currentPlan.goal}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-primary-emerald)', backgroundColor: 'var(--color-mint-bg)', padding: '2px 8px', borderRadius: '4px' }}>
                      5 Core Branches
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', backgroundColor: 'var(--color-surface-hover)', padding: '2px 8px', borderRadius: '4px' }}>
                      Interactive Flow
                    </span>
                  </div>
                </div>

                {/* STEM CONNECTOR LINE (SVG Flow) */}
                <div style={{ width: '2px', height: '36px', backgroundColor: 'var(--color-primary-emerald)', opacity: 0.6 }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-primary-emerald)', border: '2px solid #FFFFFF', boxShadow: '0 0 0 3px rgba(15, 118, 110, 0.2)', marginBottom: '20px' }}></div>
              </div>

              {/* BRANCH NODES (Staggered Tree Flow) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                {currentPlan.modules.map((mod, idx) => {
                  const isSelected = selectedPreviewNode === idx;
                  return (
                    <div
                      key={mod.id}
                      className="tree-node-animate"
                      style={{
                        animationDelay: `${idx * 160}ms`,
                        display: 'flex',
                        alignItems: 'stretch',
                        gap: '14px'
                      }}
                    >
                      {/* Left stem indicator column */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '38px', flexShrink: 0 }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: isSelected ? 'var(--color-primary-emerald)' : '#FFFFFF',
                            color: isSelected ? '#FFFFFF' : 'var(--color-primary-emerald)',
                            border: '2px solid var(--color-primary-emerald)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '13px',
                            boxShadow: isSelected ? '0 0 0 4px rgba(15, 118, 110, 0.25)' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {mod.number}
                        </div>
                        {idx < currentPlan.modules.length - 1 && (
                          <div style={{ width: '2px', flex: 1, backgroundColor: 'var(--color-mint-border)', margin: '4px 0' }}></div>
                        )}
                      </div>

                      {/* Main Node Card */}
                      <div
                        onClick={() => setSelectedPreviewNode(idx)}
                        style={{
                          flex: 1,
                          backgroundColor: '#FFFFFF',
                          borderRadius: 'var(--radius-lg)',
                          border: isSelected ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                          boxShadow: isSelected ? '0 6px 20px -4px rgba(15, 118, 110, 0.16)' : 'var(--shadow-card)',
                          padding: '18px 20px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary-emerald)', letterSpacing: '0.04em' }}>
                              Branch Node {mod.number}
                            </span>
                            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>• Milestone {idx + 1} of 5</span>
                          </div>

                          <Button
                            variant={isSelected ? 'primary' : 'secondary'}
                            size="sm"
                            icon={<BookOpen size={13} />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartLearning(idx);
                            }}
                          >
                            Explore Node →
                          </Button>
                        </div>

                        <h4 className="text-h4" style={{ fontSize: '16px', color: 'var(--color-text-main)', marginBottom: '4px' }}>
                          {mod.title}
                        </h4>

                        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>
                          {mod.description}
                        </p>

                        {/* Mind Map Sub-Nodes (NotebookLM Leaf Chips) */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-deep-teal)', marginRight: '2px' }}>
                            Leaf Concepts:
                          </span>
                          {(mod.subNodes || ['Core Principle', 'System Mechanics', 'Verification']).map((sub, sIdx) => (
                            <span
                              key={sIdx}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '11.5px',
                                padding: '3px 9px',
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: 'var(--color-mint-bg)',
                                color: 'var(--color-deep-teal)',
                                border: '1px solid var(--color-mint-border)',
                                fontWeight: 600
                              }}
                            >
                              <CircleDot size={9} color="var(--color-primary-emerald)" />
                              {sub}
                            </span>
                          ))}
                        </div>

                        {/* Analogy Preview Teaser */}
                        {mod.analogy && (
                          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-primary-emerald)', backgroundColor: '#F0FDF4', padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--color-mint-border)' }}>
                            <Lightbulb size={13} color="var(--color-primary-emerald)" />
                            <span style={{ fontWeight: 600 }}>Mental Model:</span>
                            <span style={{ color: 'var(--color-deep-teal)', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '440px' }}>
                              {mod.analogy.replace('Real-World Mental Model:', '').replace('Real-World Analogy:', '')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* FLOATING ACTIVE PREVIEW DRAWER (If user clicked a node) */}
              {selectedPreviewNode !== null && currentPlan.modules[selectedPreviewNode] && (
                <div
                  style={{
                    marginTop: '28px',
                    maxWidth: '820px',
                    margin: '24px auto 0',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--color-primary-emerald)',
                    boxShadow: '0 12px 32px -4px rgba(15, 118, 110, 0.2)',
                    padding: '20px 24px',
                    position: 'relative',
                    zIndex: 3
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="badge badge-emerald">Selected Node Preview</span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-deep-teal-dark)' }}>
                        {currentPlan.modules[selectedPreviewNode].number}. {currentPlan.modules[selectedPreviewNode].title}
                      </span>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight size={14} />}
                      iconPosition="right"
                      onClick={() => handleStartLearning(selectedPreviewNode)}
                    >
                      Explore This Node →
                    </Button>
                  </div>

                  <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.5, marginBottom: '12px' }}>
                    {currentPlan.modules[selectedPreviewNode].content}
                  </p>

                  {currentPlan.modules[selectedPreviewNode].analogy && (
                    <div style={{ backgroundColor: 'var(--color-mint-bg)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-mint-border)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <Lightbulb size={18} color="var(--color-primary-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ fontSize: '13px', color: 'var(--color-deep-teal)', lineHeight: 1.45 }}>
                        <strong>Real-World Mental Model: </strong>
                        {currentPlan.modules[selectedPreviewNode].analogy?.replace('Real-World Mental Model:', '').replace('Real-World Analogy:', '')}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: STRUCTURED SYLLABUS LIST VIEW */}
          {viewMode === 'linear' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentPlan.modules.map((mod, idx) => (
                <Card key={mod.id}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '15px', flexShrink: 0, border: '1px solid var(--color-mint-border)' }}>
                      {mod.number}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                        <div>
                          <h3 className="text-h3" style={{ fontSize: '16px', marginBottom: '4px' }}>
                            {mod.title}
                          </h3>
                          <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                            {mod.description}
                          </p>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<ArrowRight size={14} />}
                          iconPosition="right"
                          onClick={() => handleStartLearning(idx)}
                        >
                          Explore Node
                        </Button>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--color-primary-emerald)', fontWeight: 600 }}>
                          • 1 Comprehensive Point-by-Point Breakdown
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--color-deep-teal)', fontWeight: 600 }}>
                          • 1 Real-World Mental Model
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                          • Industry Applications & Checkpoints
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Bottom Confirmation Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <Button variant="secondary" onClick={() => setPhase('input')}>
              ← Change Topic / Document
            </Button>

            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
              onClick={() => handleStartLearning(0)}
            >
              Start Exploring Nodes →
            </Button>
          </div>
        </div>
      )}

      {/* PHASE 3: COMPREHENSIVE CONCEPT EXPLANATION (DETAILED POINTS BREAKDOWN, NO QUIZ) */}
      {phase === 'learning' && activeModule && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header Progress & Mind Map Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <button
                  type="button"
                  onClick={() => setPhase('plan_confirm')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-primary-emerald)',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: 0
                  }}
                >
                  <GitFork size={13} />
                  Mind Map: {currentPlan?.topic}
                </button>
                <span style={{ color: 'var(--color-text-light)' }}>/</span>
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                  Node {activeModuleIndex + 1} of {currentPlan?.modules.length}
                </span>
              </div>
              <h2 className="text-h2" style={{ fontSize: '22px' }}>{activeModule.title}</h2>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Button
                variant="secondary"
                size="sm"
                icon={<GitFork size={14} />}
                onClick={() => setPhase('plan_confirm')}
              >
                View Mind Map Tree
              </Button>
              <Badge variant="emerald">Self-Paced Exploration Track</Badge>
            </div>
          </div>

          {/* HORIZONTAL NODE STEPPER TRACK */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '12px 18px',
              border: '1px solid var(--color-border)',
              overflowX: 'auto',
              gap: '10px'
            }}
          >
            {currentPlan?.modules.map((m, idx) => {
              const isPast = idx < activeModuleIndex;
              const isCurrent = idx === activeModuleIndex;
              return (
                <div
                  key={m.id}
                  onClick={() => setActiveModuleIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isCurrent ? 'var(--color-mint-bg)' : isPast ? '#F5F5F4' : 'transparent',
                    border: isCurrent ? '1.5px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: isPast ? 'var(--color-success)' : isCurrent ? 'var(--color-primary-emerald)' : 'var(--color-border)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 800
                    }}
                  >
                    {isPast ? <Check size={12} /> : m.number}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? 'var(--color-primary-emerald)' : 'var(--color-text-main)' }}>
                    Node {m.number}
                  </span>
                </div>
              );
            })}
          </div>

          <Progress value={((activeModuleIndex + 1) / (currentPlan?.modules.length || 1)) * 100} />

          {/* COMPREHENSIVE CONCEPT BREAKDOWN IN POINTS */}
          <Card style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header with Icon */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary-emerald)', letterSpacing: '0.05em' }}>
                    Branch Milestone {activeModule.number}
                  </span>
                  <h3 className="text-h3" style={{ fontSize: '18px' }}>
                    {activeModule.title}
                  </h3>
                </div>
              </div>
              <Badge variant="neutral">Detailed Point-by-Point Breakdown</Badge>
            </div>

            {/* Overview Abstract */}
            <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'var(--color-text-main)', margin: 0 }}>
              {activeModule.content}
            </p>

            {/* SECTION 1: CORE PRINCIPLES & CONCEPTUAL FOUNDATION (IN POINTS) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-deep-teal-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  1. Core Principles & Theoretical Foundation:
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(activeModule.corePoints || [
                  `${activeModule.title} addresses critical invariants and baseline requirements within this academic discipline.`,
                  'Primary definitions ensure consistent mathematical, operational, and systematic reproducibility.',
                  'Establishes explicit boundaries separating normal operating regimes from anomalous failure states.'
                ]).map((pt, pIdx) => (
                  <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: '#FAFAF9', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--color-primary-emerald)', backgroundColor: 'var(--color-mint-bg)', padding: '2px 8px', borderRadius: 'var(--radius-full)', flexShrink: 0, marginTop: '2px', border: '1px solid var(--color-mint-border)' }}>
                      1.{pIdx + 1}
                    </span>
                    <span style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: TECHNICAL MECHANICS & SYSTEM DYNAMICS (IN POINTS) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-deep-teal-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  2. Technical Mechanics & Operational Rules:
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(activeModule.mechanisms || [
                  'Inputs undergo progressive transformations through strictly ordered deterministic pipeline stages.',
                  'Feedback mechanisms dynamically adjust operational parameters to prevent overflow and saturation.',
                  'State transitions must satisfy explicit conservation and stability constraints before advancing.'
                ]).map((mech, mIdx) => (
                  <div key={mIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: '#FFFFFF', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-subtle)' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#FFFFFF', backgroundColor: 'var(--color-primary-emerald)', padding: '2px 8px', borderRadius: 'var(--radius-full)', flexShrink: 0, marginTop: '2px' }}>
                      2.{mIdx + 1}
                    </span>
                    <span style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                      {mech}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: REAL-WORLD MENTAL MODEL & INTUITIVE ANALOGY */}
            {activeModule.analogy && (
              <div
                style={{
                  backgroundColor: 'var(--color-mint-bg)',
                  padding: '20px 22px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1.5px solid var(--color-mint-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--color-primary-emerald)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lightbulb size={16} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-deep-teal-dark)' }}>
                    3. Real-World Mental Model & Everyday Analogy:
                  </span>
                </div>

                <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--color-deep-teal)', margin: 0, fontWeight: 500 }}>
                  {activeModule.analogy.replace('Real-World Mental Model:', '').replace('Real-World Analogy:', '')}
                </p>
              </div>
            )}

            {/* SECTION 4: INDUSTRY APPLICATIONS & REAL-WORLD CONTEXT (IN POINTS) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-deep-teal-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  4. Practical Real-World Applications & Industry Context:
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(activeModule.applications || [
                  'Production Deployments: Implemented across high-availability commercial systems to maximize operational uptime.',
                  'Automated Telemetry: Continuously instrumented to identify system bottlenecks and prevent resource starvation.',
                  'Domain Synthesis: Serves as a mandatory prerequisite for advanced research dissertations and industry standards.'
                ]).map((app, aIdx) => (
                  <div key={aIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: '#F0FDF4', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-mint-border)' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--color-primary-emerald)', backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: 'var(--radius-full)', flexShrink: 0, marginTop: '2px', border: '1px solid var(--color-mint-border)' }}>
                      4.{aIdx + 1}
                    </span>
                    <span style={{ fontSize: '13.5px', color: 'var(--color-deep-teal-dark)', lineHeight: 1.5 }}>
                      {app}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: KEY TECHNICAL CHECKPOINTS TO MASTER */}
            <div style={{ backgroundColor: '#FAFAF9', padding: '18px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-primary-emerald)', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                5. Key Technical Checkpoints to Master:
              </span>
              <ul style={{ paddingLeft: '6px', display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', margin: 0 }}>
                {activeModule.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
                    <CheckCircle2 size={16} color="var(--color-primary-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CLEAN BOTTOM NAVIGATION BAR (NO QUIZ) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '20px', borderTop: '1px solid var(--color-border-light)' }}>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setPhase('plan_confirm')}
                icon={<GitFork size={14} />}
              >
                ← Back to Mind Map Tree
              </Button>

              <div style={{ display: 'flex', gap: '10px' }}>
                {activeModuleIndex > 0 && (
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handlePreviousModule}
                    icon={<ArrowLeft size={14} />}
                  >
                    Previous Node
                  </Button>
                )}

                <Button
                  variant="primary"
                  size="md"
                  icon={<ArrowRight size={15} />}
                  iconPosition="right"
                  onClick={handleNextModule}
                >
                  {activeModuleIndex < (currentPlan?.modules.length || 0) - 1
                    ? `Next Concept Node (${currentPlan?.modules[activeModuleIndex + 1]?.number}) →`
                    : 'Complete Learning Track & Save →'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* PHASE 4: COMPLETION (SAVED TO MY LIBRARY) */}
      {phase === 'completed' && (
        <Card style={{ padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', border: '2px solid var(--color-mint-border)' }}>
            <Trophy size={32} />
          </div>

          <h2 className="text-h2" style={{ fontSize: '26px', marginBottom: '8px' }}>
            Mind Map Learning Track Completed!
          </h2>
          <p className="text-body" style={{ maxWidth: '560px', margin: '0 auto 24px', fontSize: '14.5px' }}>
            Congratulations! You have navigated through all 5 concept nodes and explored the detailed point-by-point breakdowns for <strong>{currentPlan?.topic}</strong>.
            This plan is now archived in <strong>My Library</strong> so you can re-inspect the mind map anytime without regenerating.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <Button variant="secondary" onClick={() => setStudentView('my_library')}>
              Go to My Library
            </Button>
            <Button
              variant="secondary"
              icon={<GitFork size={14} />}
              onClick={() => {
                setPhase('plan_confirm');
              }}
            >
              Re-explore Mind Map Tree
            </Button>
            <Button variant="primary" onClick={() => setPhase('input')}>
              Learn Another Topic or Document
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
