import React from 'react';
import { BarChart2 } from 'lucide-react';
import { ObjectiveQuestion } from '../../types';

interface VisualProps {
  questionId: string;
  topic?: string;
  question?: ObjectiveQuestion;
}

interface DiagramMetadata {
  badge: string;
  title: string;
  annotation?: string;
}

const DIAGRAM_METADATA: Record<string, DiagramMetadata> = {
  // CS
  'cq-1': {
    badge: 'DATA STRUCTURES',
    title: 'Balanced AVL Search Tree & Balance Factor (h=2)',
    annotation: 'O(log N) worst-case search path'
  },
  'cq-2': {
    badge: 'ALGORITHMS',
    title: 'Binary Min-Heap Array Index Mapping',
    annotation: 'Parent a[k] ≤ Children a[2k+1], a[2k+2]'
  },
  'cq-3': {
    badge: 'PYTHON INTERNALS',
    title: 'CPython Bytecode Execution Mutex Lock (GIL)',
    annotation: 'Single-thread bytecode execution lock'
  },
  'cq-4': {
    badge: 'OBJECT-ORIENTED DESIGN',
    title: 'Method Resolution Order (MRO) — C3 Linearization',
    annotation: 'Class inheritance DAG traversal'
  },
  'cq-5': {
    badge: 'DEEP LEARNING SYSTEMS',
    title: 'Deep Learning System Stack Architecture',
    annotation: 'C++ ATen / LibTorch Execution Layer'
  },

  // Biology
  'cq-bio-1': {
    badge: 'MOLECULAR GENETICS',
    title: 'DNA Replication Fork Architecture (5\' → 3\')',
    annotation: 'Helicase enzyme breaking hydrogen bonds'
  },
  'cq-bio-2': {
    badge: 'CELLULAR BIOENERGETICS',
    title: 'Mitochondrial Chemiosmosis & ATP Synthase Rotor',
    annotation: 'Proton-motive force F₀-F₁ coupling'
  },
  'cq-bio-3': {
    badge: 'MENDELIAN GENETICS',
    title: 'Monohybrid Cross Punnett Square (Bb × Bb)',
    annotation: '3:1 dominant to recessive phenotype ratio'
  },
  'cq-bio-4': {
    badge: 'PLANT BIOCHEMISTRY',
    title: 'Chlorophyll a & b Absorption Spectrum Curves',
    annotation: 'Absorption peaks at 430nm (Blue) & 662nm (Red)'
  },

  // Chemistry
  'cq-chem-1': {
    badge: 'ORGANIC CHEMISTRY',
    title: 'SN1 Two-Step Nucleophilic Substitution Mechanism',
    annotation: 'Planar carbocation intermediate'
  },
  'cq-chem-2': {
    badge: 'CHEMICAL EQUILIBRIUM',
    title: 'Haber-Bosch Ammonia Synthesis (Exothermic Reaction)',
    annotation: 'Le Chatelier equilibrium temperature shift'
  },
  'cq-chem-3': {
    badge: 'MOLECULAR STRUCTURE',
    title: 'Planar Benzene Ring (C₆H₆) Delocalized π Orbitals',
    annotation: 'sp² hybridization with 120° planar geometry'
  },
  'cq-chem-4': {
    badge: 'PERIODIC TRENDS',
    title: 'First Ionization Energy vs Atomic Number (Z)',
    annotation: 'Helium (1s²) maximum noble gas stability'
  },

  // Physics
  'cq-phys-1': {
    badge: 'KINEMATICS',
    title: 'Parabolic Projectile Trajectory vs Launch Angle',
    annotation: 'Maximum horizontal range at launch θ = 45°'
  },
  'cq-phys-2': {
    badge: 'ELECTROMAGNETISM',
    title: 'Faraday-Lenz Law in Conductive Solenoid Coil',
    annotation: 'Induced EMF = -dΦ/dt opposes magnetic flux'
  },
  'cq-phys-3': {
    badge: 'WAVE OPTICS',
    title: 'Young Double Slit Laser Interference Fringes',
    annotation: 'Constructive (d sin θ = mλ) and destructive fringes'
  },
  'cq-phys-4': {
    badge: 'SPECIAL RELATIVITY',
    title: 'Relativistic Time Dilation & Lorentz Factor (γ)',
    annotation: 'Clocks dilate as v approaches speed of light c'
  },

  // Mathematics
  'cq-math-1': {
    badge: 'DIFFERENTIAL CALCULUS',
    title: 'Tangent Line to Continuous Parabolic Curve',
    annotation: 'Chain rule derivative slope dy/dx = 6x / (3x² + 1)'
  },
  'cq-math-2': {
    badge: 'LINEAR ALGEBRA',
    title: '2D Matrix Determinant Area Parallelogram Mapping',
    annotation: 'det([[4,2],[3,5]]) = 20 - 6 = 14'
  },
  'cq-math-3': {
    badge: 'COMPLEX ANALYSIS',
    title: 'Euler\'s Identity Unit Circle in Complex Plane',
    annotation: 'Unification constant: e^(iπ) + 1 = 0'
  },
  'cq-math-5': {
    badge: 'PROBABILITY & STATISTICS',
    title: 'Standard Normal Distribution Gaussian Bell Curve',
    annotation: 'Empirical rule: 68.26% falls within ±1σ'
  }
};

export const CompetitionQuestionVisual: React.FC<VisualProps> = ({ questionId, topic, question }) => {
  const meta = DIAGRAM_METADATA[questionId] || {
    badge: `${(topic || 'academic').toUpperCase()} DIAGRAM`,
    title: question?.imageCaption || 'Educational Scientific Diagram',
    annotation: 'Diagrammatic Model'
  };

  const renderDiagram = () => {
    switch (questionId) {
    case 'cq-1':
      // AVL Tree Balance Factor Diagram
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <defs>
            <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#134E4A" />
            </linearGradient>
            <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>
          {/* Background grid */}
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <g stroke="#165B56" strokeWidth="1" strokeDasharray="4 4">
            <line x1="20" y1="45" x2="460" y2="45" />
            <line x1="20" y1="105" x2="460" y2="105" />
            <line x1="20" y1="165" x2="460" y2="165" />
          </g>
          <text x="30" y="38" fill="#84CC16" fontSize="10" fontWeight="700" letterSpacing="0.05em">LEVEL 0 (Root)</text>
          <text x="30" y="98" fill="#99F6E4" fontSize="10" fontWeight="600">LEVEL 1 (h=1)</text>
          <text x="30" y="158" fill="#99F6E4" fontSize="10" fontWeight="600">LEVEL 2 (h=2)</text>

          {/* Connectors */}
          <line x1="240" y1="45" x2="160" y2="105" stroke="#84CC16" strokeWidth="2.5" />
          <line x1="240" y1="45" x2="320" y2="105" stroke="#84CC16" strokeWidth="2.5" />
          <line x1="160" y1="105" x2="120" y2="165" stroke="#99F6E4" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="160" y1="105" x2="200" y2="165" stroke="#99F6E4" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="320" y1="105" x2="280" y2="165" stroke="#99F6E4" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="320" y1="105" x2="360" y2="165" stroke="#99F6E4" strokeWidth="2" strokeDasharray="3 3" />

          {/* Root Node */}
          <circle cx="240" cy="45" r="22" fill="url(#nodeGrad)" stroke="#84CC16" strokeWidth="2" filter="url(#shadow)" />
          <text x="240" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800">42</text>
          <rect x="256" y="24" width="28" height="15" rx="3" fill="#84CC16" />
          <text x="270" y="35" textAnchor="middle" fill="#134E4A" fontSize="9" fontWeight="800">BF=0</text>

          {/* Left Node */}
          <circle cx="160" cy="105" r="18" fill="url(#nodeGrad)" stroke="#99F6E4" strokeWidth="1.5" />
          <text x="160" y="109" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">21</text>
          <rect x="172" y="88" width="26" height="14" rx="3" fill="#115E59" stroke="#99F6E4" strokeWidth="0.5" />
          <text x="185" y="99" textAnchor="middle" fill="#99F6E4" fontSize="8" fontWeight="700">BF=+1</text>

          {/* Right Node */}
          <circle cx="320" cy="105" r="18" fill="url(#nodeGrad)" stroke="#99F6E4" strokeWidth="1.5" />
          <text x="320" y="109" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">65</text>
          <rect x="332" y="88" width="26" height="14" rx="3" fill="#115E59" stroke="#99F6E4" strokeWidth="0.5" />
          <text x="345" y="99" textAnchor="middle" fill="#99F6E4" fontSize="8" fontWeight="700">BF=-1</text>

          {/* Leaf Nodes */}
          <circle cx="120" cy="165" r="14" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1" />
          <text x="120" y="169" textAnchor="middle" fill="#FFFFFF" fontSize="10">10</text>
          <circle cx="200" cy="165" r="14" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1" />
          <text x="200" y="169" textAnchor="middle" fill="#FFFFFF" fontSize="10">28</text>
          <circle cx="280" cy="165" r="14" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1" />
          <text x="280" y="169" textAnchor="middle" fill="#FFFFFF" fontSize="10">53</text>
          <circle cx="360" cy="165" r="14" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1" />
          <text x="360" y="169" textAnchor="middle" fill="#FFFFFF" fontSize="10">80</text>
        </svg>
      );

    case 'cq-2':
      // Priority Queue Min-Heap visualizer
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="28" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800" letterSpacing="0.05em">
            BINARY MIN-HEAP ARRAY MAPPING: a[k] ≤ a[2k+1], a[2k+2]
          </text>

          {/* Array visual */}
          <g transform="translate(60, 50)">
            {['12', '18', '24', '35', '41', '50', '68'].map((val, i) => (
              <g key={i} transform={`translate(${i * 52}, 0)`}>
                <rect width="48" height="40" rx="6" fill={i === 0 ? '#0F766E' : '#134E4A'} stroke={i === 0 ? '#84CC16' : '#2DD4BF'} strokeWidth={i === 0 ? 2 : 1} />
                <text x="24" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="700">{val}</text>
                <text x="24" y="55" textAnchor="middle" fill="#99F6E4" fontSize="11" fontWeight="600">[{i}]</text>
              </g>
            ))}
          </g>

          {/* Parent-Child pointer arc */}
          <path d="M 84 95 Q 160 145 240 100" fill="none" stroke="#84CC16" strokeWidth="2" strokeDasharray="4 2" />
          <text x="240" y="155" textAnchor="middle" fill="#84CC16" fontSize="11" fontWeight="700">
            root = a[0] (Min Element O(1) Access)
          </text>
          <text x="240" y="178" textAnchor="middle" fill="#CCFBF1" fontSize="11">
            heappush() / heappop() logarithmic sift-up / sift-down
          </text>
        </svg>
      );

    case 'cq-3':
      // CPython Global Interpreter Lock (GIL) Diagram
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="26" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800" letterSpacing="0.06em">
            CPYTHON BYTECODE EXECUTION LOCK TIMELINE
          </text>

          {/* Central Mutex Lock */}
          <g transform="translate(160, 42)">
            <rect width="160" height="34" rx="8" fill="#134E4A" stroke="#84CC16" strokeWidth="2" />
            <text x="80" y="22" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">
              Global Interpreter Lock
            </text>
          </g>

          {/* Thread 1 (Running) */}
          <g transform="translate(30, 95)">
            <rect width="120" height="42" rx="6" fill="#0F766E" stroke="#2DD4BF" strokeWidth="1.5" />
            <text x="60" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">Thread 1</text>
            <text x="60" y="34" textAnchor="middle" fill="#84CC16" fontSize="9" fontWeight="800">RUNNING BYTECODE</text>
            <line x1="60" y1="0" x2="170" y2="-19" stroke="#84CC16" strokeWidth="2" markerEnd="url(#arrow)" />
          </g>

          {/* Thread 2 (Waiting/Blocked) */}
          <g transform="translate(180, 95)">
            <rect width="120" height="42" rx="6" fill="#1C1917" stroke="#EF4444" strokeWidth="1.5" />
            <text x="60" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">Thread 2</text>
            <text x="60" y="34" textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="800">BLOCKED (WAITING)</text>
          </g>

          {/* Thread 3 (I/O Wait) */}
          <g transform="translate(330, 95)">
            <rect width="120" height="42" rx="6" fill="#115E59" stroke="#99F6E4" strokeWidth="1" strokeDasharray="3 2" />
            <text x="60" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">Thread 3</text>
            <text x="60" y="34" textAnchor="middle" fill="#99F6E4" fontSize="9">RELEASED FOR I/O</text>
          </g>

          <text x="240" y="172" textAnchor="middle" fill="#99F6E4" fontSize="11">
            Prevents simultaneous multi-core execution of Python bytecode in a single process
          </text>
        </svg>
      );

    case 'cq-4':
      // C3 Linearization DAG Diagram
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="26" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800" letterSpacing="0.05em">
            METHOD RESOLUTION ORDER (MRO) — C3 LINEARIZATION
          </text>

          {/* Base object */}
          <rect x="210" y="42" width="60" height="28" rx="6" fill="#134E4A" stroke="#99F6E4" strokeWidth="1.5" />
          <text x="240" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">object</text>

          {/* Class A */}
          <rect x="210" y="85" width="60" height="28" rx="6" fill="#0F766E" stroke="#84CC16" strokeWidth="1.5" />
          <text x="240" y="103" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">Class A</text>

          {/* Class B & Class C */}
          <rect x="120" y="125" width="70" height="28" rx="6" fill="#115E59" stroke="#2DD4BF" strokeWidth="1.5" />
          <text x="155" y="143" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">Class B</text>

          <rect x="290" y="125" width="70" height="28" rx="6" fill="#115E59" stroke="#2DD4BF" strokeWidth="1.5" />
          <text x="325" y="143" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">Class C</text>

          {/* Derived Class D */}
          <rect x="200" y="162" width="80" height="30" rx="8" fill="#84CC16" />
          <text x="240" y="182" textAnchor="middle" fill="#134E4A" fontSize="13" fontWeight="900">Class D(B, C)</text>

          {/* Connectors */}
          <line x1="240" y1="85" x2="240" y2="70" stroke="#99F6E4" strokeWidth="1.5" />
          <line x1="155" y1="125" x2="215" y2="105" stroke="#2DD4BF" strokeWidth="1.5" />
          <line x1="325" y1="125" x2="265" y2="105" stroke="#2DD4BF" strokeWidth="1.5" />
          <line x1="220" y1="162" x2="165" y2="153" stroke="#84CC16" strokeWidth="2" />
          <line x1="260" y1="162" x2="315" y2="153" stroke="#84CC16" strokeWidth="2" />
        </svg>
      );

    case 'cq-bio-1':
      // DNA Replication Fork Diagram
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="24" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800" letterSpacing="0.05em">
            DNA REPLICATION FORK ARCHITECTURE (5' → 3')
          </text>
          {/* Double helix unwinding */}
          <path d="M 40 70 Q 120 70 180 90" stroke="#99F6E4" strokeWidth="3" fill="none" />
          <path d="M 40 130 Q 120 130 180 110" stroke="#99F6E4" strokeWidth="3" fill="none" />
          {/* Base pair bars */}
          {[60, 90, 120, 150].map((x, i) => (
            <line key={i} x1={x} y1={72} x2={x} y2={128} stroke="#5EEAD4" strokeWidth="1.5" strokeDasharray="3 2" />
          ))}
          {/* Helicase Enzyme */}
          <ellipse cx="195" cy="100" rx="26" ry="32" fill="#0F766E" stroke="#84CC16" strokeWidth="2.5" />
          <text x="195" y="103" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">HELICASE</text>
          <text x="195" y="115" textAnchor="middle" fill="#84CC16" fontSize="8" fontWeight="700">UNWINDING</text>
          {/* Separated Strands */}
          <path d="M 215 88 Q 320 50 440 45" stroke="#84CC16" strokeWidth="3" fill="none" />
          <path d="M 215 112 Q 320 150 440 155" stroke="#38BDF8" strokeWidth="3" fill="none" />
          {/* Leading strand label */}
          <rect x="270" y="32" width="150" height="22" rx="4" fill="#134E4A" stroke="#84CC16" strokeWidth="1" />
          <text x="345" y="47" textAnchor="middle" fill="#84CC16" fontSize="10" fontWeight="700">
            Leading Strand (Continuous 5'→3')
          </text>
          {/* Lagging strand Okazaki fragments */}
          <rect x="270" y="145" width="160" height="22" rx="4" fill="#134E4A" stroke="#38BDF8" strokeWidth="1" />
          <text x="350" y="160" textAnchor="middle" fill="#99F6E4" fontSize="10" fontWeight="700">
            Lagging Strand (Okazaki Fragments)
          </text>
        </svg>
      );

    case 'cq-bio-2':
      // Mitochondria Proton Gradient & ATP Synthase
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="24" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800" letterSpacing="0.05em">
            MITOCHONDRIAL CHEMIOSMOSIS & ATP SYNTHASE ROTOR
          </text>
          {/* Intermembrane space with H+ */}
          <rect x="30" y="38" width="420" height="34" rx="6" fill="#134E4A" />
          <text x="240" y="52" textAnchor="middle" fill="#99F6E4" fontSize="10" fontWeight="700">
            HIGH [H⁺] CONCENTRATION (Intermembrane Space)
          </text>
          <text x="240" y="66" textAnchor="middle" fill="#84CC16" fontSize="10">H⁺   H⁺   H⁺   H⁺   H⁺   H⁺   H⁺   H⁺   H⁺</text>
          {/* Inner Mitochondrial Membrane */}
          <rect x="30" y="78" width="420" height="30" fill="#0F766E" stroke="#84CC16" strokeWidth="1" />
          <text x="240" y="98" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
            INNER MITOCHONDRIAL MEMBRANE (CRISTAE)
          </text>
          {/* ATP Synthase complex */}
          <g transform="translate(210, 70)">
            <rect width="60" height="46" rx="6" fill="#84CC16" />
            <text x="30" y="24" textAnchor="middle" fill="#134E4A" fontSize="9" fontWeight="900">F₀ ROTOR</text>
            <circle cx="30" cy="65" r="22" fill="#115E59" stroke="#84CC16" strokeWidth="2" />
            <text x="30" y="68" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">F₁ ATP</text>
            <path d="M 30 35 L 30 85" stroke="#FFFFFF" strokeWidth="2" markerEnd="url(#arrow)" />
          </g>
          {/* Matrix label */}
          <text x="120" y="160" fill="#99F6E4" fontSize="11" fontWeight="600">Mitochondrial Matrix (Low H⁺)</text>
          <rect x="300" y="145" width="140" height="24" rx="4" fill="#0A2E2B" stroke="#84CC16" strokeWidth="1" />
          <text x="370" y="161" textAnchor="middle" fill="#84CC16" fontSize="10" fontWeight="800">ADP + Pi → ATP</text>
        </svg>
      );

    case 'cq-bio-3':
      // Mendelian Punnett Square 3:1
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="24" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">
            MONOHYBRID CROSS PUNNETT SQUARE (Bb × Bb)
          </text>
          {/* Grid */}
          <g transform="translate(80, 42)">
            <text x="60" y="-8" textAnchor="middle" fill="#84CC16" fontSize="14" fontWeight="800">B</text>
            <text x="130" y="-8" textAnchor="middle" fill="#84CC16" fontSize="14" fontWeight="800">b</text>
            <text x="-15" y="45" textAnchor="middle" fill="#84CC16" fontSize="14" fontWeight="800">B</text>
            <text x="-15" y="115" textAnchor="middle" fill="#84CC16" fontSize="14" fontWeight="800">b</text>

            <rect x="25" y="5" width="70" height="65" fill="#0F766E" stroke="#84CC16" strokeWidth="2" rx="6" />
            <text x="60" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="800">BB</text>
            <text x="60" y="55" textAnchor="middle" fill="#84CC16" fontSize="10">Dominant (1)</text>

            <rect x="100" y="5" width="70" height="65" fill="#0F766E" stroke="#84CC16" strokeWidth="2" rx="6" />
            <text x="135" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="800">Bb</text>
            <text x="135" y="55" textAnchor="middle" fill="#84CC16" fontSize="10">Dominant (2)</text>

            <rect x="25" y="75" width="70" height="65" fill="#0F766E" stroke="#84CC16" strokeWidth="2" rx="6" />
            <text x="60" y="108" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="800">Bb</text>
            <text x="60" y="125" textAnchor="middle" fill="#84CC16" fontSize="10">Dominant (3)</text>

            <rect x="100" y="75" width="70" height="65" fill="#1C1917" stroke="#EF4444" strokeWidth="2" rx="6" />
            <text x="135" y="108" textAnchor="middle" fill="#EF4444" fontSize="16" fontWeight="800">bb</text>
            <text x="135" y="125" textAnchor="middle" fill="#FCA5A5" fontSize="10">Recessive (1)</text>
          </g>
          {/* Summary Box */}
          <g transform="translate(280, 50)">
            <rect width="170" height="120" rx="8" fill="#134E4A" stroke="#99F6E4" strokeWidth="1" />
            <text x="85" y="28" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">PHENOTYPIC RATIO</text>
            <text x="85" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="900">3 : 1</text>
            <text x="85" y="90" textAnchor="middle" fill="#99F6E4" fontSize="11">75% Dominant : 25% Recessive</text>
            <text x="85" y="108" textAnchor="middle" fill="#CCFBF1" fontSize="10">Genotypic: 1 BB : 2 Bb : 1 bb</text>
          </g>
        </svg>
      );

    case 'cq-chem-1':
      // SN1 vs SN2 Mechanism Reaction Coordinate
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="24" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">
            SN1 MECHANISM: TWO-STEP CARBOCATION ENERGY PROFILE
          </text>
          {/* Coordinate axes */}
          <line x1="40" y1="165" x2="440" y2="165" stroke="#5EEAD4" strokeWidth="1.5" />
          <line x1="40" y1="165" x2="40" y2="40" stroke="#5EEAD4" strokeWidth="1.5" />
          <text x="240" y="185" textAnchor="middle" fill="#99F6E4" fontSize="11">Reaction Coordinate</text>
          <text x="25" y="45" fill="#84CC16" fontSize="10" fontWeight="700">Gibbs Energy (G)</text>
          {/* SN1 Two-peak curve with carbocation valley */}
          <path d="M 45 140 Q 110 50 160 65 T 250 110 Q 300 75 350 90 T 430 150" fill="none" stroke="#84CC16" strokeWidth="3" />
          {/* Planar Carbocation intermediate highlight */}
          <circle cx="230" cy="105" r="18" fill="#0F766E" stroke="#84CC16" strokeWidth="2" />
          <text x="230" y="109" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">R₃C⁺</text>
          <rect x="175" y="130" width="110" height="20" rx="4" fill="#134E4A" stroke="#84CC16" strokeWidth="1" />
          <text x="230" y="144" textAnchor="middle" fill="#84CC16" fontSize="9" fontWeight="700">
            Planar Intermediate (sp²)
          </text>
          {/* TS1 and TS2 labels */}
          <text x="140" y="60" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="800">TS 1 (Rate Limiting)</text>
          <text x="330" y="80" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="800">TS 2 (Nu Attack)</text>
        </svg>
      );

    case 'cq-chem-2':
      // Le Chatelier's Exothermic Equilibrium
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="24" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">
            HABER-BOSCH EQUILIBRIUM: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + 92 kJ/mol
          </text>
          {/* Chemical balance illustration */}
          <rect x="40" y="50" width="160" height="50" rx="8" fill="#0F766E" stroke="#99F6E4" strokeWidth="1.5" />
          <text x="120" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">N₂ + 3H₂</text>
          <text x="120" y="90" textAnchor="middle" fill="#99F6E4" fontSize="10">Reactants (4 mol gas)</text>

          <text x="240" y="78" textAnchor="middle" fill="#84CC16" fontSize="22" fontWeight="900">⇌</text>

          <rect x="280" y="50" width="160" height="50" rx="8" fill="#134E4A" stroke="#84CC16" strokeWidth="2" />
          <text x="360" y="75" textAnchor="middle" fill="#84CC16" fontSize="14" fontWeight="800">2NH₃ + HEAT</text>
          <text x="360" y="90" textAnchor="middle" fill="#99F6E4" fontSize="10">Product (Exothermic)</text>

          {/* Temperature shift indicator */}
          <g transform="translate(60, 120)">
            <rect width="360" height="48" rx="8" fill="#1C1917" stroke="#EF4444" strokeWidth="1.5" />
            <text x="180" y="22" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="800">
              TEMPERATURE INCREASE (ΔT &gt; 0)
            </text>
            <text x="180" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="11">
              Equilibrium shifts LEFT (←) towards reactants to consume excess heat
            </text>
          </g>
        </svg>
      );

    case 'cq-chem-3':
      // Benzene Hybridization sp2 & Delocalized Pi Cloud
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="24" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">
            BENZENE RING: PLANAR sp² HYBRIDIZATION & π DELOCALIZATION
          </text>
          {/* Hexagon ring */}
          <polygon points="170,60 210,60 230,95 210,130 170,130 150,95" fill="#0F766E" stroke="#84CC16" strokeWidth="3" />
          <circle cx="190" cy="95" r="22" fill="none" stroke="#99F6E4" strokeWidth="2.5" strokeDasharray="4 3" />
          <text x="190" y="99" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">6 π e⁻</text>
          {/* Bond Angle Arc */}
          <path d="M 210 60 A 15 15 0 0 1 225 78" fill="none" stroke="#84CC16" strokeWidth="1.5" />
          <text x="245" y="70" fill="#84CC16" fontSize="12" fontWeight="800">120°</text>
          {/* Details callout */}
          <g transform="translate(290, 50)">
            <rect width="160" height="110" rx="8" fill="#134E4A" stroke="#99F6E4" strokeWidth="1" />
            <text x="80" y="26" textAnchor="middle" fill="#84CC16" fontSize="11" fontWeight="800">GEOMETRY</text>
            <text x="80" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">Trigonal Planar</text>
            <text x="80" y="72" textAnchor="middle" fill="#84CC16" fontSize="11" fontWeight="800">HYBRIDIZATION</text>
            <text x="80" y="94" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">sp² Orbitals</text>
          </g>
        </svg>
      );

    case 'cq-phys-1':
      // Projectile Parabola at 45 degrees
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="24" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">
            PROJECTILE RANGE AS FUNCTION OF LAUNCH ANGLE (θ)
          </text>
          {/* Ground axis */}
          <line x1="40" y1="160" x2="440" y2="160" stroke="#5EEAD4" strokeWidth="2" />
          {/* 45 degree optimal path */}
          <path d="M 60 160 Q 240 30 420 160" fill="none" stroke="#84CC16" strokeWidth="3.5" />
          {/* 30 degree path */}
          <path d="M 60 160 Q 220 80 380 160" fill="none" stroke="#99F6E4" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* 60 degree path */}
          <path d="M 60 160 Q 200 10 340 160" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Launch vector */}
          <line x1="60" y1="160" x2="110" y2="110" stroke="#84CC16" strokeWidth="2.5" />
          <path d="M 85 160 A 25 25 0 0 0 95 142" fill="none" stroke="#84CC16" strokeWidth="1.5" />
          <text x="105" y="152" fill="#84CC16" fontSize="11" fontWeight="800">θ = 45°</text>
          {/* Range banner */}
          <rect x="220" y="70" width="180" height="42" rx="6" fill="#134E4A" stroke="#84CC16" strokeWidth="1.5" />
          <text x="310" y="88" textAnchor="middle" fill="#84CC16" fontSize="11" fontWeight="800">
            MAXIMUM RANGE: R_max
          </text>
          <text x="310" y="104" textAnchor="middle" fill="#FFFFFF" fontSize="11">
            R = (v₀² sin 2θ) / g → sin(90°) = 1
          </text>
        </svg>
      );

    case 'cq-phys-2':
      // Faraday & Lenz Electromagnetic Induction
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="24" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">
            FARADAY'S LAW & LENZ'S OPPOSITION: EMF = -dΦ_B / dt
          </text>
          {/* Bar Magnet */}
          <g transform="translate(60, 65)">
            <rect width="60" height="35" fill="#EF4444" rx="4" />
            <text x="30" y="22" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">N</text>
            <rect x="60" y="0" width="60" height="35" fill="#3B82F6" rx="4" />
            <text x="90" y="22" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">S</text>
            {/* Motion arrow */}
            <line x1="125" y1="17" x2="160" y2="17" stroke="#84CC16" strokeWidth="3" />
            <polygon points="158,12 168,17 158,22" fill="#84CC16" />
            <text x="145" y="38" textAnchor="middle" fill="#84CC16" fontSize="10" fontWeight="700">velocity v</text>
          </g>
          {/* Solenoid Coil */}
          <g transform="translate(240, 50)">
            {[0, 20, 40, 60, 80].map((cx, i) => (
              <ellipse key={i} cx={cx} cy="35" rx="12" ry="32" fill="none" stroke="#2DD4BF" strokeWidth="2.5" />
            ))}
          </g>
          {/* Induced current opposed arrow */}
          <rect x="230" y="140" width="210" height="38" rx="6" fill="#134E4A" stroke="#84CC16" strokeWidth="1.5" />
          <text x="335" y="156" textAnchor="middle" fill="#84CC16" fontSize="10" fontWeight="800">
            LENZ'S LAW OPPOSITION
          </text>
          <text x="335" y="170" textAnchor="middle" fill="#99F6E4" fontSize="10">
            Induced current opposes rate of change of flux
          </text>
        </svg>
      );

    case 'cq-phys-3':
      // Young's Double Slit Wave Superposition
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="24" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">
            YOUNG'S DOUBLE SLIT WAVE INTERFERENCE PATTERN
          </text>
          {/* Slit barrier */}
          <line x1="100" y1="35" x2="100" y2="80" stroke="#84CC16" strokeWidth="4" />
          <line x1="100" y1="95" x2="100" y2="135" stroke="#84CC16" strokeWidth="4" />
          <line x1="100" y1="150" x2="100" y2="185" stroke="#84CC16" strokeWidth="4" />
          <text x="95" y="90" fill="#84CC16" fontSize="9" fontWeight="700">S₁</text>
          <text x="95" y="145" fill="#84CC16" fontSize="9" fontWeight="700">S₂</text>
          {/* Wave circular ripples */}
          <path d="M 100 87 A 30 30 0 0 1 130 87" fill="none" stroke="#2DD4BF" strokeWidth="1" />
          <path d="M 100 142 A 30 30 0 0 1 130 142" fill="none" stroke="#2DD4BF" strokeWidth="1" />
          {/* Screen with fringes */}
          <line x1="380" y1="35" x2="380" y2="185" stroke="#FFFFFF" strokeWidth="3" />
          <text x="380" y="28" textAnchor="middle" fill="#99F6E4" fontSize="10">Screen</text>
          {/* Alternating bright & dark fringes */}
          {[50, 75, 100, 125, 150, 175].map((fy, i) => (
            <g key={i} transform={`translate(390, ${fy - 6})`}>
              <rect width="60" height="12" rx="2" fill={i % 2 === 0 ? '#84CC16' : '#0F3F3C'} />
              <text x="30" y="9" textAnchor="middle" fill={i % 2 === 0 ? '#134E4A' : '#78716C'} fontSize="8" fontWeight="800">
                {i % 2 === 0 ? 'BRIGHT' : 'DARK'}
              </text>
            </g>
          ))}
          {/* Constructive label */}
          <text x="240" y="110" textAnchor="middle" fill="#84CC16" fontSize="11" fontWeight="700">
            Δx = d sin θ = m λ
          </text>
        </svg>
      );

    case 'cq-math-1':
      // Calculus Tangent Slope Derivative f'(x)
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="24" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">
            CALCULUS: f(x) = ln(3x² + 1) → f'(x) = 6x / (3x² + 1)
          </text>
          {/* Axes */}
          <line x1="60" y1="160" x2="420" y2="160" stroke="#5EEAD4" strokeWidth="1.5" />
          <line x1="240" y1="40" x2="240" y2="170" stroke="#5EEAD4" strokeWidth="1.5" />
          <text x="430" y="164" fill="#99F6E4" fontSize="11">x</text>
          <text x="245" y="45" fill="#99F6E4" fontSize="11">y</text>
          {/* Symmetric log-parabola curve */}
          <path d="M 80 145 Q 160 155 240 160 T 400 145" fill="none" stroke="#2DD4BF" strokeWidth="2.5" />
          {/* Tangent line at point */}
          <circle cx="310" cy="154" r="5" fill="#84CC16" />
          <line x1="250" y1="168" x2="370" y2="140" stroke="#84CC16" strokeWidth="2.5" />
          <text x="320" y="140" fill="#84CC16" fontSize="11" fontWeight="800">Tangent Slope m = f'(x)</text>
          {/* Chain rule breakdown */}
          <g transform="translate(60, 48)">
            <rect width="160" height="50" rx="6" fill="#134E4A" stroke="#84CC16" strokeWidth="1" />
            <text x="80" y="20" textAnchor="middle" fill="#84CC16" fontSize="10" fontWeight="700">CHAIN RULE</text>
            <text x="80" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="11">d/dx [ln u] = u' / u</text>
          </g>
        </svg>
      );

    case 'cq-math-2':
      // 2x2 Matrix Determinant Geometric Area
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="24" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">
            MATRIX DETERMINANT AREA: det([[4, 2], [3, 5]]) = 20 - 6 = 14
          </text>
          {/* Parallelogram area visualization */}
          <g transform="translate(60, 35)">
            <line x1="20" y1="120" x2="180" y2="120" stroke="#5EEAD4" strokeWidth="1" />
            <line x1="20" y1="20" x2="20" y2="120" stroke="#5EEAD4" strokeWidth="1" />
            <polygon points="20,120 100,120 160,50 80,50" fill="#0F766E" stroke="#84CC16" strokeWidth="2" />
            <text x="90" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">
              AREA = 14
            </text>
          </g>
          {/* Formula calculation card */}
          <g transform="translate(260, 45)">
            <rect width="180" height="110" rx="8" fill="#134E4A" stroke="#99F6E4" strokeWidth="1" />
            <text x="90" y="28" textAnchor="middle" fill="#84CC16" fontSize="11" fontWeight="800">DETERMINANT FORMULA</text>
            <text x="90" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="700">ad - bc</text>
            <text x="90" y="80" textAnchor="middle" fill="#99F6E4" fontSize="13">(4 × 5) - (2 × 3)</text>
            <text x="90" y="100" textAnchor="middle" fill="#84CC16" fontSize="14" fontWeight="900">= 14</text>
          </g>
        </svg>
      );

    case 'cq-math-3':
      // Euler's Identity Unit Circle Complex Plane
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="24" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">
            EULER'S FORMULA IN COMPLEX PLANE: e^(iπ) + 1 = 0
          </text>
          {/* Complex axis & Unit circle */}
          <g transform="translate(140, 105)">
            <circle cx="0" cy="0" r="60" fill="none" stroke="#2DD4BF" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="-80" y1="0" x2="80" y2="0" stroke="#5EEAD4" strokeWidth="1" />
            <line x1="0" y1="-75" x2="0" y2="75" stroke="#5EEAD4" strokeWidth="1" />
            <text x="75" y="15" fill="#99F6E4" fontSize="10">Re</text>
            <text x="8" y="-65" fill="#99F6E4" fontSize="10">Im</text>
            {/* Rotation arc to pi */}
            <path d="M 40 0 A 40 40 0 0 0 -40 0" fill="none" stroke="#84CC16" strokeWidth="3" />
            <circle cx="-60" cy="0" r="7" fill="#84CC16" />
            <text x="-60" y="-12" textAnchor="middle" fill="#84CC16" fontSize="11" fontWeight="800">e^(iπ) = -1</text>
          </g>
          {/* Identity equation box */}
          <g transform="translate(280, 55)">
            <rect width="170" height="90" rx="8" fill="#134E4A" stroke="#84CC16" strokeWidth="2" />
            <text x="85" y="32" textAnchor="middle" fill="#84CC16" fontSize="11" fontWeight="800">EULER'S BEAUTY</text>
            <text x="85" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900">e^(iπ) + 1 = 0</text>
          </g>
        </svg>
      );

    case 'cq-5':
      // Tensor Engine Architecture Diagram (C++ ATen / CUDA)
      return (
        <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
          <rect width="480" height="200" fill="#0A2E2B" rx="12" />
          <text x="240" y="26" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800" letterSpacing="0.05em">
            DEEP LEARNING TENSOR FRAMEWORK INTERNALS
          </text>

          {/* Python Layer */}
          <g transform="translate(30, 48)">
            <rect width="420" height="32" rx="6" fill="#134E4A" stroke="#99F6E4" strokeWidth="1" />
            <text x="210" y="21" textAnchor="middle" fill="#99F6E4" fontSize="12" fontWeight="700">
              High-Level Frontend: Python API (torch.Tensor, tf.keras, PyBind11)
            </text>
          </g>

          {/* Down arrow */}
          <line x1="240" y1="80" x2="240" y2="96" stroke="#84CC16" strokeWidth="2.5" />
          <polygon points="236,94 244,94 240,100" fill="#84CC16" />

          {/* C++ Core Layer (Highlighted) */}
          <g transform="translate(30, 102)">
            <rect width="420" height="42" rx="8" fill="#0F766E" stroke="#84CC16" strokeWidth="2.5" />
            <text x="210" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">
              Core Runtime Engine: Native C++ (ATen, LibTorch, Eigen, XLA)
            </text>
            <text x="210" y="37" textAnchor="middle" fill="#84CC16" fontSize="10" fontWeight="700">
              ★ High-Performance Memory Allocator & Auto-Grad DAG Engine
            </text>
          </g>

          {/* Hardware backend */}
          <g transform="translate(30, 154)">
            <rect width="200" height="30" rx="6" fill="#1C1917" stroke="#34D399" strokeWidth="1" />
            <text x="100" y="20" textAnchor="middle" fill="#34D399" fontSize="11" fontWeight="700">NVIDIA CUDA / cuDNN</text>

            <rect x="220" y="0" width="200" height="30" rx="6" fill="#1C1917" stroke="#38BDF8" strokeWidth="1" />
            <text x="320" y="20" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="700">Intel AVX-512 / oneDNN</text>
          </g>
        </svg>
      );
      default:
        // Default clean scientific diagram visual
        return (
          <svg viewBox="0 0 480 200" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
            <rect width="480" height="200" fill="#0A2E2B" rx="12" />
            <g stroke="#165B56" strokeWidth="1" strokeDasharray="4 4">
              <line x1="40" y1="40" x2="440" y2="40" />
              <line x1="40" y1="100" x2="440" y2="100" />
              <line x1="40" y1="160" x2="440" y2="160" />
            </g>
            <text x="240" y="30" textAnchor="middle" fill="#84CC16" fontSize="12" fontWeight="800">
              {meta.title.toUpperCase()}
            </text>
            <circle cx="240" cy="100" r="42" fill="#0F766E" stroke="#84CC16" strokeWidth="2.5" />
            <text x="240" y="104" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
              {meta.badge}
            </text>
            <path d="M 120 100 Q 240 40 360 100" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="3 3" />
            <text x="240" y="172" textAnchor="middle" fill="#99F6E4" fontSize="10.5">
              {meta.annotation || 'Scientific Diagrammatic Model'}
            </text>
          </svg>
        );
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '210px',
        backgroundColor: '#0A2E2B',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px'
      }}
    >
      {/* Top Left Diagram Badge */}
      <div style={{ position: 'absolute', top: '8px', left: '10px', zIndex: 5 }}>
        <span
          style={{
            backgroundColor: 'rgba(10, 46, 43, 0.92)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(153, 246, 228, 0.3)',
            color: 'var(--color-lime-accent)',
            fontSize: '9.5px',
            fontWeight: 800,
            letterSpacing: '0.06em',
            padding: '2px 7px',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          {meta.badge}
        </span>
      </div>

      {/* Direct Pure SVG Scientific Diagram (Zero photos or external images) */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {renderDiagram()}
      </div>

      {/* Bottom Subtitle / Annotation */}
      {meta.annotation && (
        <div
          style={{
            position: 'absolute',
            bottom: '6px',
            right: '10px',
            zIndex: 5,
            backgroundColor: 'rgba(10, 46, 43, 0.92)',
            backdropFilter: 'blur(4px)',
            padding: '2px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(153, 246, 228, 0.2)',
            fontSize: '10px',
            color: '#99F6E4',
            fontWeight: 700
          }}
        >
          {meta.annotation}
        </div>
      )}
    </div>
  );
};

