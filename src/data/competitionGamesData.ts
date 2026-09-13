import { CompetitionGameType } from '../types';

export interface CompetitionGameMeta {
  id: CompetitionGameType;
  name: string;
  tagline: string;
  shortDescription: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Dynamic';
  madeCount: string;
  category: 'quizzes' | 'words' | 'logic' | 'visual';
  badge: string;
  estimatedMinutes: number;
  sampleData: any;
}

export const COMPETITION_GAMES: CompetitionGameMeta[] = [
  {
    id: 'quiz',
    name: 'Quiz Challenge',
    tagline: 'Multiplayer Kahoot-Style Showdown',
    shortDescription: 'Classic tactile 4-color multiple choice arena with live timer, countdowns, and dynamic podium ceremonies.',
    difficulty: 'Medium',
    madeCount: '2,940,118 made',
    category: 'quizzes',
    badge: 'KAHOOT-STYLE',
    estimatedMinutes: 5,
    sampleData: {
      questions: [
        {
          id: 'q-1',
          type: 'mcq',
          question: 'Which protocol operates at the Transport Layer of the OSI Model to provide reliable stream delivery?',
          options: ['TCP', 'IP', 'HTTP', 'ARP'],
          correctAnswer: 'TCP',
          explanation: 'TCP guarantees ordered, reliable segment delivery with error checking.'
        },
        {
          id: 'q-2',
          type: 'mcq',
          question: 'What is the average time complexity of searching in a balanced Binary Search Tree?',
          options: ['O(log N)', 'O(1)', 'O(N)', 'O(N²)'],
          correctAnswer: 'O(log N)',
          explanation: 'Halving the search space at each node provides logarithmic time.'
        },
        {
          id: 'q-3',
          type: 'mcq',
          question: 'Which symmetric cipher standard was approved by NIST to replace DES in 2001?',
          options: ['Rijndael (AES)', 'Blowfish', 'RC4', 'ChaCha20'],
          correctAnswer: 'Rijndael (AES)',
          explanation: 'Rijndael became the Advanced Encryption Standard (AES).'
        },
        {
          id: 'q-4',
          type: 'mcq',
          question: 'In Python, which built-in function returns both index and item when iterating over a collection?',
          options: ['enumerate()', 'zip()', 'map()', 'filter()'],
          correctAnswer: 'enumerate()',
          explanation: 'enumerate() yields pairs of (index, value) tuples.'
        }
      ]
    }
  },
  {
    id: 'word_search',
    name: 'Word Search Puzzle',
    tagline: 'Academic Keyword Grid Hunter',
    shortDescription: 'Find and highlight hidden academic terms and vocabulary horizontally, vertically, or diagonally in the letter matrix.',
    difficulty: 'Easy',
    madeCount: '2,578,356 made',
    category: 'words',
    badge: 'VOCABULARY',
    estimatedMinutes: 4,
    sampleData: {
      gridSize: 10,
      words: ['PYTHON', 'BINARY', 'ROUTER', 'PACKET', 'SOCKET', 'THREAD', 'MUTEX', 'BUFFER'],
      grid: [
        ['P', 'Y', 'T', 'H', 'O', 'N', 'A', 'B', 'C', 'D'],
        ['B', 'I', 'N', 'A', 'R', 'Y', 'E', 'F', 'G', 'H'],
        ['R', 'O', 'U', 'T', 'E', 'R', 'I', 'J', 'K', 'L'],
        ['P', 'A', 'C', 'K', 'E', 'T', 'M', 'N', 'O', 'P'],
        ['S', 'O', 'C', 'K', 'E', 'T', 'Q', 'R', 'S', 'T'],
        ['T', 'H', 'R', 'E', 'A', 'D', 'U', 'V', 'W', 'X'],
        ['M', 'U', 'T', 'E', 'X', 'Y', 'Z', 'A', 'B', 'C'],
        ['B', 'U', 'F', 'F', 'E', 'R', 'D', 'E', 'F', 'G'],
        ['A', 'C', 'K', 'N', 'O', 'W', 'L', 'E', 'D', 'G'],
        ['C', 'A', 'C', 'H', 'E', 'D', 'A', 'T', 'A', 'S']
      ]
    }
  },
  {
    id: 'crossword',
    name: 'Crossword Puzzle',
    tagline: 'Academic Clue & Crossword Grid',
    shortDescription: 'Solve interconnected crossword clues across and down to master definitions, formulas, and domain concepts.',
    difficulty: 'Hard',
    madeCount: '1,932,044 made',
    category: 'words',
    badge: 'LOGIC & CLUES',
    estimatedMinutes: 6,
    sampleData: {
      rows: 6,
      cols: 6,
      across: [
        { num: 1, row: 0, col: 0, word: 'TCP', clue: 'Reliable connection-oriented transport protocol' },
        { num: 3, row: 2, col: 0, word: 'DNS', clue: 'Translates domain names to IP addresses' },
        { num: 4, row: 4, col: 1, word: 'FIFO', clue: 'Queue ordering principle (First In First Out)' }
      ],
      down: [
        { num: 1, row: 0, col: 0, word: 'TLS', clue: 'Cryptographic protocol securing internet transport' },
        { num: 2, row: 0, col: 2, word: 'PORT', clue: '16-bit number identifying host network application' },
        { num: 3, row: 2, col: 0, word: 'DATA', clue: 'Raw unorganized facts or network payloads' }
      ]
    }
  },
  {
    id: 'matching_pairs',
    name: 'Matching Pairs',
    tagline: 'Interactive Concept Association',
    shortDescription: 'Connect related academic terms with their definitions, formulas, or matching scientific principles under the clock.',
    difficulty: 'Easy',
    madeCount: '1,311,957 made',
    category: 'logic',
    badge: 'ASSOCIATION',
    estimatedMinutes: 3,
    sampleData: {
      pairs: [
        { id: 'p-1', left: 'HTTP', right: 'Port 80 • Cleartext Web Protocol' },
        { id: 'p-2', left: 'HTTPS', right: 'Port 443 • TLS Encrypted Web' },
        { id: 'p-3', left: 'DNS', right: 'Port 53 • Domain Name Resolution' },
        { id: 'p-4', left: 'SSH', right: 'Port 22 • Secure Remote Terminal' },
        { id: 'p-5', left: 'FTP', right: 'Port 21 • File Transfer Protocol' },
        { id: 'p-6', left: 'SMTP', right: 'Port 25 • Electronic Mail Routing' }
      ]
    }
  },
  {
    id: 'fill_in_blanks',
    name: 'Fill in the Blanks',
    tagline: 'Contextual Term Reconstruction',
    shortDescription: 'Drag or click words from the bank to complete missing keywords in academic statements and scientific laws.',
    difficulty: 'Medium',
    madeCount: '648,880 made',
    category: 'words',
    badge: 'COMPLETION',
    estimatedMinutes: 4,
    sampleData: {
      questions: [
        {
          id: 'fib-1',
          textBefore: 'In computer networking, the',
          textAfter: 'layer guarantees end-to-end delivery of message streams between host processes.',
          correctWord: 'Transport',
          options: ['Transport', 'Physical', 'Application', 'Session']
        },
        {
          id: 'fib-2',
          textBefore: 'Google BBR congestion control independently measures bottleneck bandwidth and minimum',
          textAfter: 'to cap in-flight data at 1x BDP.',
          correctWord: 'RTT',
          options: ['RTT', 'Loss Rate', 'Window Size', 'Jitter']
        },
        {
          id: 'fib-3',
          textBefore: 'A balanced Binary Search Tree guarantees',
          textAfter: 'time complexity for worst-case lookup operations.',
          correctWord: 'O(log N)',
          options: ['O(log N)', 'O(1)', 'O(N)', 'O(N²)']
        }
      ]
    }
  },
  {
    id: 'alphabet',
    name: 'Alphabet Challenge',
    tagline: 'Letter-by-Letter Knowledge Wheel',
    shortDescription: 'Navigate the alphabet wheel where each question requires answering with an academic term beginning with that letter.',
    difficulty: 'Medium',
    madeCount: '618,891 made',
    category: 'quizzes',
    badge: 'A-Z SHOWDOWN',
    estimatedMinutes: 5,
    sampleData: {
      letters: [
        {
          letter: 'A',
          question: 'Symmetric encryption standard approved by NIST in 2001 to replace DES.',
          answer: 'AES',
          hint: 'Advanced Encryption Standard'
        },
        {
          letter: 'B',
          question: 'Congestion control protocol developed by Google that measures bottleneck bandwidth.',
          answer: 'BBR',
          hint: 'Bottleneck Bandwidth and RTT'
        },
        {
          letter: 'C',
          question: 'Default Linux congestion control algorithm utilizing a cubic window growth function.',
          answer: 'CUBIC',
          hint: 'Uses wall-clock time t'
        },
        {
          letter: 'D',
          question: 'Protocol that translates human-readable domain names into 32-bit or 128-bit IP addresses.',
          answer: 'DNS',
          hint: 'Port 53 service'
        },
        {
          letter: 'E',
          question: 'Python built-in function that generates sequential index numbers alongside iterated items.',
          answer: 'ENUMERATE',
          hint: 'enumerate(iterable)'
        }
      ]
    }
  },
  {
    id: 'memory',
    name: 'Memory Game',
    tagline: 'Card Flip Memory Grid',
    shortDescription: 'Flip and reveal cards across the grid to discover matching academic concept pairs before the countdown runs out.',
    difficulty: 'Dynamic',
    madeCount: '890,200 made',
    category: 'logic',
    badge: 'MEMORY & SPEED',
    estimatedMinutes: 3,
    sampleData: {
      cards: [
        { id: 'c1', pairId: 'pair-1', text: 'O(1)', isTerm: true },
        { id: 'c2', pairId: 'pair-1', text: 'Hash Table Lookup', isTerm: false },
        { id: 'c3', pairId: 'pair-2', text: 'O(log N)', isTerm: true },
        { id: 'c4', pairId: 'pair-2', text: 'Binary Search', isTerm: false },
        { id: 'c5', pairId: 'pair-3', text: 'O(N log N)', isTerm: true },
        { id: 'c6', pairId: 'pair-3', text: 'Merge Sort Worst Case', isTerm: false },
        { id: 'c7', pairId: 'pair-4', text: 'FIFO', isTerm: true },
        { id: 'c8', pairId: 'pair-4', text: 'Queue Data Structure', isTerm: false },
        { id: 'c9', pairId: 'pair-5', text: 'LIFO', isTerm: true },
        { id: 'c10', pairId: 'pair-5', text: 'Call Stack Frame', isTerm: false },
        { id: 'c11', pairId: 'pair-6', text: '128 Bits', isTerm: true },
        { id: 'c12', pairId: 'pair-6', text: 'IPv6 Address Length', isTerm: false }
      ]
    }
  },
  {
    id: 'true_false',
    name: 'True / False Challenge',
    tagline: 'High-Tempo Rapid Verification',
    shortDescription: 'Test conceptual accuracy with instant binary verification cards under strict 10-second high-speed rounds.',
    difficulty: 'Easy',
    madeCount: '1,450,300 made',
    category: 'quizzes',
    badge: 'INSTANT SPEED',
    estimatedMinutes: 3,
    sampleData: {
      statements: [
        {
          id: 'tf-1',
          statement: 'HTTP/3 operates over UDP using the QUIC protocol instead of TCP.',
          isTrue: true,
          explanation: 'HTTP/3 is built on QUIC (UDP) to eliminate head-of-line blocking.'
        },
        {
          id: 'tf-2',
          statement: 'In Python, inserting an element at index 0 of a list takes O(1) constant time.',
          isTrue: false,
          explanation: 'Inserting at index 0 requires shifting all subsequent elements, taking O(N) linear time.'
        },
        {
          id: 'tf-3',
          statement: 'A hash collision in a hash table can be resolved using open addressing or separate chaining.',
          isTrue: true,
          explanation: 'Both open addressing (probing) and chaining with linked lists are standard resolution techniques.'
        },
        {
          id: 'tf-4',
          statement: 'TCP Slow Start increases the congestion window linearly rather than exponentially.',
          isTrue: false,
          explanation: 'Slow Start doubles cwnd every RTT, which is exponential growth.'
        },
        {
          id: 'tf-5',
          statement: 'IPv6 address space contains 2¹²⁸ unique addresses, eliminating IPv4 address exhaustion.',
          isTrue: true,
          explanation: '128-bit addresses yield 3.4 x 10³⁸ distinct addresses.'
        }
      ]
    }
  },
  {
    id: 'map_quiz',
    name: 'Map Quiz',
    tagline: 'Interactive Hotspot Identification',
    shortDescription: 'Click and identify locations, continents, tech hubs, or anatomical structures on an interactive educational SVG map.',
    difficulty: 'Medium',
    madeCount: '469,211 made',
    category: 'visual',
    badge: 'INTERACTIVE MAP',
    estimatedMinutes: 4,
    sampleData: {
      title: 'Global Tech & Academic Innovation Hubs',
      locations: [
        { id: 'loc-1', name: 'Silicon Valley Hub', region: 'North America', x: 22, y: 38, hint: 'Palo Alto & San Francisco Bay' },
        { id: 'loc-2', name: 'CERN Particle Collider', region: 'Europe', x: 50, y: 32, hint: 'Franco-Swiss border near Geneva' },
        { id: 'loc-3', name: 'Bengaluru Tech Corridor', region: 'Asia', x: 72, y: 55, hint: 'Silicon Valley of India' },
        { id: 'loc-4', name: 'Tokyo High-Tech District', region: 'Asia', x: 86, y: 40, hint: 'Akihabara & Shibuya innovation cluster' },
        { id: 'loc-5', name: 'Cambridge Science Park', region: 'Europe', x: 48, y: 26, hint: 'Silicon Fen academic incubator' }
      ]
    }
  },
  {
    id: 'rapid_fire',
    name: 'Rapid Fire MCQs',
    tagline: '10-Second High-Pressure Blitz',
    shortDescription: 'High-octane sprint round where points decay with every elapsed millisecond and hot streaks multiply point rewards.',
    difficulty: 'Hard',
    madeCount: '1,820,662 made',
    category: 'quizzes',
    badge: 'BLITZ ARENA',
    estimatedMinutes: 3,
    sampleData: {
      timeLimit: 10,
      questions: [
        {
          id: 'rf-1',
          question: 'What is the default port for encrypted HTTPS traffic?',
          options: ['443', '80', '8080', '22'],
          correctAnswer: '443',
          explanation: 'Port 443 is the standard port for TLS/HTTPS traffic.'
        },
        {
          id: 'rf-2',
          question: 'Which sort algorithm has an optimal O(N log N) worst-case time complexity guarantee?',
          options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Insertion Sort'],
          correctAnswer: 'Merge Sort',
          explanation: 'Merge Sort always divides and conquers in O(N log N) time regardless of input order.'
        },
        {
          id: 'rf-3',
          question: 'What data structure powers function recursion and call frames?',
          options: ['Stack', 'Queue', 'Heap', 'Graph'],
          correctAnswer: 'Stack',
          explanation: 'The call stack keeps track of active execution subroutines in LIFO order.'
        },
        {
          id: 'rf-4',
          question: 'Which TCP flag signals the initiation of a three-way handshake?',
          options: ['SYN', 'ACK', 'FIN', 'RST'],
          correctAnswer: 'SYN',
          explanation: 'SYN (Synchronize Sequence Numbers) begins connection establishment.'
        }
      ]
    }
  }
];

// Helper to generate game-specific content using AI simulated generator
export const generateGameContent = (gameType: CompetitionGameType, topic: string, subject: string) => {
  const meta = COMPETITION_GAMES.find(g => g.id === gameType);
  const t = (topic + ' ' + subject).toLowerCase();

  if (gameType === 'word_search') {
    let words = ['PYTHON', 'BINARY', 'ROUTER', 'PACKET', 'SOCKET', 'THREAD'];
    if (t.includes('bio') || t.includes('cell')) {
      words = ['CHLORO', 'PHLOEM', 'XYLEM', 'CELL', 'NUCLEUS', 'MITOSIS'];
    } else if (t.includes('chem')) {
      words = ['PROTON', 'ATOMIC', 'BOND', 'IONIC', 'MOLAR', 'OXIDE'];
    } else if (t.includes('phys') || t.includes('mechanic')) {
      words = ['NEWTON', 'ENERGY', 'VECTOR', 'GRAVITY', 'QUARK', 'MOMENTUM'];
    } else if (t.includes('math')) {
      words = ['MATRIX', 'VECTOR', 'PRIME', 'TENSOR', 'RADIUS', 'COSINE'];
    } else if (t.includes('geo') || t.includes('world')) {
      words = ['SAHARA', 'PACIFIC', 'ANDES', 'TUNDRA', 'AMAZON', 'CANYON'];
    }

    // Build 10x10 matrix embedding these words
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const grid: string[][] = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => alphabet[Math.floor(Math.random() * alphabet.length)])
    );

    // Embed first few words horizontally
    words.slice(0, 6).forEach((w, rowIdx) => {
      const startCol = Math.max(0, Math.floor((10 - w.length) / 2));
      for (let i = 0; i < w.length && (startCol + i) < 10; i++) {
        grid[rowIdx + 1][startCol + i] = w[i];
      }
    });

    return { gridSize: 10, words, grid };
  }

  if (gameType === 'crossword') {
    if (t.includes('bio') || t.includes('cell')) {
      return {
        rows: 6,
        cols: 6,
        across: [
          { num: 1, row: 0, col: 0, word: 'ATP', clue: 'Primary cellular energy currency molecule' },
          { num: 3, row: 2, col: 0, word: 'DNA', clue: 'Carrier of genetic instructions in all living organisms' },
          { num: 4, row: 4, col: 1, word: 'CELL', clue: 'Basic structural and functional unit of life' }
        ],
        down: [
          { num: 1, row: 0, col: 0, word: 'ACT', clue: 'Messenger mRNA transcription codon start' },
          { num: 2, row: 0, col: 2, word: 'PORE', clue: 'Microscopic opening in nuclear membrane' },
          { num: 3, row: 2, col: 0, word: 'DISH', clue: 'Petri container for microbial cultivation' }
        ]
      };
    }
    return meta?.sampleData || {};
  }

  if (gameType === 'matching_pairs') {
    if (t.includes('bio') || t.includes('cell')) {
      return {
        pairs: [
          { id: 'p-1', left: 'Mitochondria', right: 'Powerhouse • Cellular ATP Synthesis' },
          { id: 'p-2', left: 'Chloroplast', right: 'Site of Photosynthesis & Sunlight capture' },
          { id: 'p-3', left: 'Ribosome', right: 'Protein synthesis and polypeptide assembly' },
          { id: 'p-4', left: 'Nucleus', right: 'Stores double-helix genomic DNA' },
          { id: 'p-5', left: 'Cell Membrane', right: 'Phospholipid bilayer semi-permeable boundary' },
          { id: 'p-6', left: 'Lysosome', right: 'Waste degradation with hydrolytic enzymes' }
        ]
      };
    }
    if (t.includes('phys')) {
      return {
        pairs: [
          { id: 'p-1', left: 'Force (F)', right: 'Mass × Acceleration (F = ma)' },
          { id: 'p-2', left: 'Kinetic Energy', right: 'Half mass × velocity squared (0.5 m v²)' },
          { id: 'p-3', left: 'Work Done', right: 'Force × Displacement (W = F · d)' },
          { id: 'p-4', left: 'Momentum (p)', right: 'Mass × Velocity (p = m v)' },
          { id: 'p-5', left: 'Power (P)', right: 'Rate of doing work (P = W / t)' },
          { id: 'p-6', left: 'Ohm\'s Law', right: 'Voltage = Current × Resistance (V = I R)' }
        ]
      };
    }
    return meta?.sampleData || {};
  }

  if (gameType === 'fill_in_blanks') {
    if (t.includes('bio') || t.includes('cell')) {
      return {
        questions: [
          {
            id: 'fib-1',
            textBefore: 'Photosynthesis occurs primarily within plant cell',
            textAfter: 'organelles using green chlorophyll pigments.',
            correctWord: 'Chloroplast',
            options: ['Chloroplast', 'Mitochondria', 'Vacuole', 'Ribosome']
          },
          {
            id: 'fib-2',
            textBefore: 'Cellular respiration produces ATP molecules through the',
            textAfter: 'chain in mitochondrial inner cristae.',
            correctWord: 'Electron Transport',
            options: ['Electron Transport', 'Calvin Cycle', 'Fermentation', 'Glycolysis']
          },
          {
            id: 'fib-3',
            textBefore: 'During DNA replication, the enzyme',
            textAfter: 'unwinds and unzips the parental double helix.',
            correctWord: 'Helicase',
            options: ['Helicase', 'Ligase', 'Polymerase', 'Amylase']
          }
        ]
      };
    }
    return meta?.sampleData || {};
  }

  if (gameType === 'true_false') {
    if (t.includes('bio') || t.includes('cell')) {
      return {
        statements: [
          {
            id: 'tf-1',
            statement: 'Mitochondria contain their own independent circular DNA and ribosomes.',
            isTrue: true,
            explanation: 'Endosymbiotic theory demonstrates mitochondria evolved from ancient aerobic prokaryotes.'
          },
          {
            id: 'tf-2',
            statement: 'Plant cells lack cell membranes and only possess a rigid cellulose cell wall.',
            isTrue: false,
            explanation: 'Plant cells have both a plasma membrane AND an outer cellulose cell wall.'
          },
          {
            id: 'tf-3',
            statement: 'Enzymes lower the activation energy required for biochemical reactions to proceed.',
            isTrue: true,
            explanation: 'Enzyme catalysts stabilize transition states, accelerating reaction kinetics.'
          },
          {
            id: 'tf-4',
            statement: 'Glycolysis requires oxygen and takes place exclusively inside the mitochondria.',
            isTrue: false,
            explanation: 'Glycolysis is anaerobic and occurs in the cytoplasm.'
          },
          {
            id: 'tf-5',
            statement: 'Human somatic cells typically contain 46 chromosomes organized into 23 homologous pairs.',
            isTrue: true,
            explanation: 'Humans have 22 pairs of autosomes and 1 pair of allosomes (sex chromosomes).'
          }
        ]
      };
    }
    return meta?.sampleData || {};
  }

  if (gameType === 'memory') {
    if (t.includes('bio')) {
      return {
        cards: [
          { id: 'c1', pairId: 'pair-1', text: 'ATP', isTerm: true },
          { id: 'c2', pairId: 'pair-1', text: 'Energy Molecule', isTerm: false },
          { id: 'c3', pairId: 'pair-2', text: 'Mitochondria', isTerm: true },
          { id: 'c4', pairId: 'pair-2', text: 'Powerhouse', isTerm: false },
          { id: 'c5', pairId: 'pair-3', text: 'Helicase', isTerm: true },
          { id: 'c6', pairId: 'pair-3', text: 'Unzips DNA', isTerm: false },
          { id: 'c7', pairId: 'pair-4', text: 'Chlorophyll', isTerm: true },
          { id: 'c8', pairId: 'pair-4', text: 'Green Pigment', isTerm: false },
          { id: 'c9', pairId: 'pair-5', text: 'Osmosis', isTerm: true },
          { id: 'c10', pairId: 'pair-5', text: 'Water Diffusion', isTerm: false },
          { id: 'c11', pairId: 'pair-6', text: 'Ribosome', isTerm: true },
          { id: 'c12', pairId: 'pair-6', text: 'Protein Factory', isTerm: false }
        ]
      };
    }
    return meta?.sampleData || {};
  }

  return meta?.sampleData || {};
};
