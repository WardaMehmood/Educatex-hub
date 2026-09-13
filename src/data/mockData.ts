import {
  ClassItem,
  Quiz,
  QuizAttempt,
  LecturePlan,
  SlideDeck,
  LearningPlan,
  CompetitionSession
} from '../types';

export const INITIAL_CLASSES: ClassItem[] = [
  {
    id: 'cls-1',
    name: 'Advanced Computer Networks',
    department: 'Computer Science',
    section: 'CS-4A',
    subject: 'Networking',
    academicYear: '2026-Fall',
    studentsCount: 42,
    quizzesCount: 6,
    averageScore: 84,
    progress: 78,
    joinCode: 'NET-4091',
    sections: [
      { id: 'sec-1', name: 'Section A (Morning)', studentCount: 22, averageScore: 86 },
      { id: 'sec-2', name: 'Section B (Evening)', studentCount: 20, averageScore: 81 }
    ],
    announcements: [
      {
        id: 'ann-1',
        title: 'Midterm Quiz Deadline Announced',
        content: 'Quiz 3 (Transport Layer & TCP Congestion Control) has been published and is due on Sunday at 11:59 PM.',
        createdAt: 'Yesterday at 3:15 PM',
        author: 'Prof. Warda Mehmood',
        pinned: true
      },
      {
        id: 'ann-2',
        title: 'Wireshark Lab Assignment Submission',
        content: 'Please upload your Wireshark pcap traces along with your summary report by Wednesday.',
        createdAt: '3 days ago',
        author: 'Prof. Warda Mehmood'
      }
    ],
    assignedQuizzes: [
      {
        id: 'asg-1',
        quizId: 'quiz-net-3',
        title: 'Transport Layer & TCP Congestion Control',
        assignedDate: 'Sep 10, 2026',
        deadline: 'Sep 15, 2026 23:59',
        totalSubmissions: 34,
        totalStudents: 42,
        averageScore: 82,
        status: 'active',
        maxAttempts: 2
      },
      {
        id: 'asg-2',
        quizId: 'quiz-net-2',
        title: 'IP Addressing & Subnetting Mechanics',
        assignedDate: 'Aug 28, 2026',
        deadline: 'Sep 02, 2026 23:59',
        totalSubmissions: 41,
        totalStudents: 42,
        averageScore: 88,
        status: 'closed',
        maxAttempts: 1
      }
    ],
    students: [
      {
        id: 'stu-1',
        name: 'Sarah Jenkins',
        avatar: 'SJ',
        email: 'sarah.j@univ.edu',
        quizzesCompleted: 5,
        totalQuizzes: 6,
        averageScore: 94,
        lastActive: '2 hours ago',
        attendanceRate: 96,
        status: 'top_performer',
        recentScores: [
          { quizTitle: 'Transport Layer', score: 95, date: 'Sep 11' },
          { quizTitle: 'Subnetting Mechanics', score: 98, date: 'Sep 01' },
          { quizTitle: 'Physical Layer Fundamentals', score: 90, date: 'Aug 20' }
        ]
      },
      {
        id: 'stu-2',
        name: 'Ahmed Tariq',
        avatar: 'AT',
        email: 'ahmed.t@univ.edu',
        quizzesCompleted: 5,
        totalQuizzes: 6,
        averageScore: 88,
        lastActive: 'Yesterday',
        attendanceRate: 92,
        status: 'active',
        recentScores: [
          { quizTitle: 'Transport Layer', score: 86, date: 'Sep 11' },
          { quizTitle: 'Subnetting Mechanics', score: 90, date: 'Sep 01' }
        ]
      },
      {
        id: 'stu-3',
        name: 'Ali Raza',
        avatar: 'AR',
        email: 'ali.raza@univ.edu',
        quizzesCompleted: 3,
        totalQuizzes: 6,
        averageScore: 68,
        lastActive: '3 days ago',
        attendanceRate: 75,
        status: 'needs_attention',
        recentScores: [
          { quizTitle: 'Transport Layer', score: 62, date: 'Sep 10' },
          { quizTitle: 'Subnetting Mechanics', score: 72, date: 'Sep 01' }
        ]
      },
      {
        id: 'stu-4',
        name: 'Hamza Malik',
        avatar: 'HM',
        email: 'hamza.m@univ.edu',
        quizzesCompleted: 5,
        totalQuizzes: 6,
        averageScore: 84,
        lastActive: '5 hours ago',
        attendanceRate: 89,
        status: 'active',
        recentScores: [
          { quizTitle: 'Transport Layer', score: 82, date: 'Sep 11' }
        ]
      },
      {
        id: 'stu-5',
        name: 'Zainab Fatima',
        avatar: 'ZF',
        email: 'zainab.f@univ.edu',
        quizzesCompleted: 5,
        totalQuizzes: 6,
        averageScore: 92,
        lastActive: 'Today',
        attendanceRate: 98,
        status: 'top_performer',
        recentScores: [
          { quizTitle: 'Transport Layer', score: 94, date: 'Sep 11' }
        ]
      }
    ]
  },
  {
    id: 'cls-2',
    name: 'Operating Systems & Concurrency',
    department: 'Software Engineering',
    section: 'SE-3B',
    subject: 'Systems',
    academicYear: '2026-Fall',
    studentsCount: 38,
    quizzesCount: 4,
    averageScore: 79,
    progress: 65,
    joinCode: 'OPS-8821',
    sections: [
      { id: 'sec-2a', name: 'Section B1', studentCount: 19, averageScore: 80 },
      { id: 'sec-2b', name: 'Section B2', studentCount: 19, averageScore: 78 }
    ],
    announcements: [
      {
        id: 'ann-os-1',
        title: 'Semaphore & Mutex Lab Quiz Available',
        content: 'Prepare for synchronous IPC test next Tuesday.',
        createdAt: '4 days ago',
        author: 'Prof. Warda Mehmood'
      }
    ],
    assignedQuizzes: [
      {
        id: 'asg-os-1',
        quizId: 'quiz-os-1',
        title: 'Process Scheduling & Deadlocks',
        assignedDate: 'Sep 05, 2026',
        deadline: 'Sep 18, 2026 23:59',
        totalSubmissions: 28,
        totalStudents: 38,
        averageScore: 79,
        status: 'active',
        maxAttempts: 1
      }
    ],
    students: []
  },
  {
    id: 'cls-3',
    name: 'Database Management Systems',
    department: 'Data Science',
    section: 'DS-2A',
    subject: 'Databases',
    academicYear: '2026-Fall',
    studentsCount: 52,
    quizzesCount: 7,
    averageScore: 86,
    progress: 82,
    joinCode: 'DBS-3190',
    sections: [
      { id: 'sec-3a', name: 'Section A1', studentCount: 26, averageScore: 88 },
      { id: 'sec-3b', name: 'Section A2', studentCount: 26, averageScore: 84 }
    ],
    announcements: [],
    assignedQuizzes: [],
    students: []
  },
  {
    id: 'cls-4',
    name: 'Machine Learning & Neural Nets',
    department: 'Artificial Intelligence',
    section: 'AI-4C',
    subject: 'Machine Learning',
    academicYear: '2026-Fall',
    studentsCount: 54,
    quizzesCount: 7,
    averageScore: 91,
    progress: 88,
    joinCode: 'MLN-9024',
    sections: [],
    announcements: [],
    assignedQuizzes: [],
    students: []
  }
];

export const STANDALONE_QUIZZES: Quiz[] = [
  {
    id: 'quiz-std-1',
    title: 'Distributed Consensus Algorithms (Raft vs Paxos)',
    subject: 'Distributed Systems',
    type: 'objective',
    durationMinutes: 15,
    totalMarks: 20,
    joinCode: 'RAFT-7721',
    isStandalone: true,
    createdAt: 'Sep 08, 2026',
    objectiveQuestions: [
      {
        id: 'q-std-1',
        type: 'mcq',
        question: 'In the Raft consensus algorithm, which state does a node transition to if its election timer expires?',
        options: ['Follower', 'Candidate', 'Leader', 'Observer'],
        correctAnswer: 'Candidate',
        explanation: 'When a follower election timer expires without receiving heartbeats from the leader, it increments its term and transitions to Candidate state.'
      },
      {
        id: 'q-std-2',
        type: 'true_false',
        question: 'Paxos guarantees safety even in the presence of Byzantine (malicious) failures.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Standard Paxos assumes crash-recovery model (fail-stop), not Byzantine faults. Byzantine Paxos or PBFT is required for malicious actors.'
      },
      {
        id: 'q-std-3',
        type: 'fill_in_blanks',
        question: 'The minimum number of operational nodes required in an N-node Raft cluster to maintain quorum is (N/2) + ___',
        correctAnswer: '1',
        explanation: 'A majority quorum requires strictly more than half of the nodes, i.e., floor(N/2) + 1.'
      },
      {
        id: 'q-std-4',
        type: 'matching',
        question: 'Match the consensus terminology to its purpose:',
        correctAnswer: [],
        matchingPairs: [
          { left: 'Term', right: 'Logical clock era in Raft' },
          { left: 'Heartbeat', right: 'AppendEntries RPC with empty log' },
          { left: 'Quorum', right: 'Majority of voters needed for agreement' },
          { left: 'Log Compaction', right: 'Snapshotting state machine data' }
        ],
        explanation: 'Each term acts as a logical clock; heartbeats suppress new elections; quorum ensures overlap.'
      }
    ]
  },
  {
    id: 'quiz-std-2',
    title: 'Cloud Architecture & Microservices Resilience',
    subject: 'Software Engineering',
    type: 'subjective',
    durationMinutes: 25,
    totalMarks: 30,
    joinCode: 'MSV-4410',
    isStandalone: true,
    createdAt: 'Sep 09, 2026',
    subjectiveQuestions: [
      {
        id: 'sub-q-1',
        question: 'Analyze how the Circuit Breaker pattern prevents cascading failures across distributed microservices. Include its three states.',
        rubric: 'Must explain Closed, Open, and Half-Open states, fallback mechanics, and latency thresholds.',
        sampleAnswer: 'The Circuit Breaker pattern monitors calls to a remote dependency. In the Closed state, requests pass normally. If failure thresholds exceed limits, it trips into the Open state, immediately failing calls to prevent thread pool starvation. After a timeout period, it enters Half-Open, allowing trial requests to verify dependency health.',
        maxMarks: 15
      },
      {
        id: 'sub-q-2',
        question: 'Contrast Event-Driven Choreography with Orchestration in microservices. Detail trade-offs in coupling and observability.',
        rubric: 'Clarify decentralized message routing vs centralized coordinator, detailing debugging complexity and coupling.',
        sampleAnswer: 'Choreography relies on domain events with no single point of control, reducing coupling but making cross-service tracing complex. Orchestration uses a centralized coordinator (saga manager) making state explicit and observable, at the cost of tighter coupling to the orchestrator.',
        maxMarks: 15
      }
    ]
  },
  {
    id: 'quiz-net-3',
    title: 'Transport Layer & TCP Congestion Control',
    subject: 'Computer Science',
    type: 'objective',
    durationMinutes: 20,
    totalMarks: 20,
    joinCode: 'NET-4091',
    isStandalone: false,
    assignedClassId: 'cls-1',
    deadline: 'Sep 15, 2026 23:59',
    createdAt: 'Sep 10, 2026',
    objectiveQuestions: [
      {
        id: 'q-net-1',
        type: 'mcq',
        question: 'Which TCP algorithm operates independently of RTT by using wall-clock time in its cubic growth function?',
        options: ['TCP Reno', 'CUBIC', 'TCP Tahoe', 'TCP Vegas'],
        correctAnswer: 'CUBIC',
        explanation: 'CUBIC uses a cubic window function driven by real elapsed time t, preventing unfair RTT bias.'
      },
      {
        id: 'q-net-2',
        type: 'mcq',
        question: 'What physical quantities does Google BBR independently estimate to cap in-flight data at 1x BDP?',
        options: ['Bottleneck Bandwidth & Minimum RTT', 'Packet Loss Rate & Queue Size', 'Window Size & Congestion Threshold', 'ACK Arrival Jitter & Hop Count'],
        correctAnswer: 'Bottleneck Bandwidth & Minimum RTT',
        explanation: 'BBR measures BtlBw (bottleneck bandwidth) and RTprop (minimum wire delay) to drain router queues.'
      },
      {
        id: 'q-net-3',
        type: 'mcq',
        question: 'During TCP Slow Start, how does the congestion window (cwnd) grow upon receiving each valid ACK?',
        options: ['Doubles every RTT (exponential growth)', 'Increases by 1 MSS per RTT (linear)', 'Triples every RTT', 'Scales cubically based on wall-clock time'],
        correctAnswer: 'Doubles every RTT (exponential growth)',
        explanation: 'Each ACK adds 1 MSS to cwnd, resulting in an effective doubling of the transmission window every round-trip.'
      },
      {
        id: 'q-net-4',
        type: 'true_false',
        question: 'Bufferbloat occurs when oversized router FIFO buffers create high latency without increasing network throughput.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Bufferbloat is caused by excessive packet buffering at bottleneck links causing massive queuing delays.'
      }
    ]
  },
  {
    id: 'quiz-net-2',
    title: 'IP Addressing & Subnetting Mechanics',
    subject: 'Computer Science',
    type: 'objective',
    durationMinutes: 15,
    totalMarks: 15,
    joinCode: 'NET-2044',
    isStandalone: false,
    assignedClassId: 'cls-1',
    deadline: 'Sep 02, 2026 23:59',
    createdAt: 'Aug 28, 2026',
    objectiveQuestions: [
      {
        id: 'q-ip-1',
        type: 'mcq',
        question: 'How many usable host IP addresses are available in a standard IPv4 /26 subnet?',
        options: ['62', '64', '126', '30'],
        correctAnswer: '62',
        explanation: '2^(32-26) - 2 = 64 - 2 = 62 usable host addresses (subtracting network and broadcast IDs).'
      },
      {
        id: 'q-ip-2',
        type: 'mcq',
        question: 'Which of the following is a private IPv4 address range defined in RFC 1918?',
        options: ['172.16.0.0 to 172.31.255.255', '192.169.0.0 to 192.169.255.255', '11.0.0.0 to 11.255.255.255', '169.254.0.0 to 169.254.255.255'],
        correctAnswer: '172.16.0.0 to 172.31.255.255',
        explanation: 'RFC 1918 defines 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 as private.'
      },
      {
        id: 'q-ip-3',
        type: 'true_false',
        question: 'CIDR (Classless Inter-Domain Routing) replaced historical Class A, B, and C address allocation to mitigate routing table explosion.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'CIDR allows flexible prefix lengths and route aggregation, slowing down routing table exhaustion.'
      }
    ]
  }
];

export const STANDALONE_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'att-1',
    quizId: 'quiz-std-1',
    quizTitle: 'Distributed Consensus Algorithms (Raft vs Paxos)',
    studentName: 'Farhan Zaidi',
    score: 18,
    totalMarks: 20,
    timeTaken: '11m 45s',
    submittedAt: 'Sep 10, 2026 14:20',
    answers: [
      {
        questionId: 'q-std-1',
        question: 'In the Raft consensus algorithm, which state does a node transition to if its election timer expires?',
        studentAnswer: 'Candidate',
        correctAnswer: 'Candidate',
        isCorrect: true,
        explanation: 'When a follower election timer expires, it increments its term and transitions to Candidate.'
      },
      {
        questionId: 'q-std-2',
        question: 'Paxos guarantees safety even in the presence of Byzantine (malicious) failures.',
        studentAnswer: 'False',
        correctAnswer: 'False',
        isCorrect: true,
        explanation: 'Standard Paxos assumes crash-stop/crash-recovery, not Byzantine faults.'
      },
      {
        questionId: 'q-std-3',
        question: 'The minimum number of operational nodes required in an N-node Raft cluster to maintain quorum is (N/2) + ___',
        studentAnswer: '1',
        correctAnswer: '1',
        isCorrect: true,
        explanation: 'Majority quorum is floor(N/2) + 1.'
      },
      {
        questionId: 'q-std-4',
        question: 'Match the consensus terminology to its purpose',
        studentAnswer: 'Partially matched',
        correctAnswer: 'All 4 pairs matched',
        isCorrect: false,
        explanation: 'Swapped Log Compaction with Snapshot terminology.'
      }
    ]
  },
  {
    id: 'att-2',
    quizId: 'quiz-std-2',
    quizTitle: 'Cloud Architecture & Microservices Resilience',
    studentName: 'Ayesha Siddiqua',
    score: 27,
    totalMarks: 30,
    timeTaken: '22m 10s',
    submittedAt: 'Sep 11, 2026 18:40',
    answers: [
      {
        questionId: 'sub-q-1',
        question: 'Analyze how the Circuit Breaker pattern prevents cascading failures across distributed microservices.',
        studentAnswer: 'Circuit breaker has Closed, Open, and Half-Open states. When failure rate is high, it opens and returns cached response or fast fail without hitting the server.',
        correctAnswer: 'Detailed state transition + timeout + fallback mechanics',
        isCorrect: true,
        aiScore: 14,
        teacherOverridden: false,
        teacherGrade: 14,
        explanation: 'Comprehensive coverage of state transitions and failure mitigation.',
        feedback: 'Excellent explanation of Open to Half-open state triggers.'
      },
      {
        questionId: 'sub-q-2',
        question: 'Contrast Event-Driven Choreography with Orchestration in microservices.',
        studentAnswer: 'Choreography is peer to peer with message broker. Orchestration has a master service directing everyone like a conductor.',
        correctAnswer: 'Choreography vs Orchestration trade-offs in coupling and observability',
        isCorrect: true,
        aiScore: 13,
        teacherOverridden: true,
        teacherGrade: 13,
        explanation: 'Accurate comparison; clear understanding of coupling trade-offs.',
        feedback: 'Teacher confirmed AI grading: Solid analysis of loose coupling benefits.'
      }
    ]
  }
];

export const SAMPLE_LECTURE_PLAN: LecturePlan = {
  id: 'lec-1',
  subject: 'Computer Networks',
  topic: 'TCP Congestion Control & Modern Algorithms (BBR vs CUBIC)',
  level: 'Undergraduate Senior / Master',
  duration: '60 minutes',
  style: 'Interactive & Analytical',
  outcomes: [
    'Contrast loss-based congestion control (CUBIC) with bottleneck-bandwidth/RTT (BBR).',
    'Demonstrate how bufferbloat affects latency in high-speed enterprise networks.',
    'Formulate the mathematical state transitions of TCP Slow Start, Congestion Avoidance, and Fast Recovery.'
  ],
  sections: [
    {
      title: '01. The Bufferbloat Crisis & Legacy Congestion Control',
      duration: '15 min',
      summary: 'Why filling packet buffers creates catastrophic latency without increasing throughput.',
      detailedExplanation: 'Traditional TCP variants (such as Reno and NewReno) treat packet loss as the primary indicator of network congestion. However, modern consumer routers and middleboxes were built with excessively large FIFO buffers to prevent packet drops. When packets flood into these oversized queues, they sit delayed for hundreds of milliseconds before reaching the bottleneck link. As a result, the throughput remains capped at the link capacity, but the round-trip latency surges exponentially—a phenomenon known as Bufferbloat. Leonard Kleinrock demonstrated that the optimal operating point occurs when the in-flight data matches the Bandwidth-Delay Product (BDP): maximizing link utilization while maintaining minimal buffer queuing delay.',
      realWorldAnalogy: 'Imagine a busy highway toll booth. If you build a 5-mile holding parking lot right before the toll gate, cars don\'t move through the toll any faster—they just spend 45 minutes idling in the parking lot queue rather than driving at highway speeds.',
      keyPoints: [
        'Kleinrock optimal operating point (Max throughput at Min RTT) — Network throughput reaches 100% link capacity when in-flight packets equal the Bandwidth-Delay Product (BDP = Bottleneck Bandwidth × Min RTT). Injecting packets beyond this threshold does not increase transmission speed; it only causes packets to accumulate in router buffers and dramatically escalates round-trip delay.',
        'Loss as a signal of congestion vs signal of full queue buffer — Traditional TCP (Reno/NewReno) mistakenly interprets packet loss as an early sign of congestion. In reality, packet loss is only triggered when router buffers have already reached 100% capacity and overflow. Relying on drops forces buffers to stay bloated, inducing massive latency without extra throughput.',
        'Drop-tail queuing and TCP Global Synchronization — When standard drop-tail router queues fill up, incoming packets from many competing connections are dropped at the same time. This forces all TCP flows to cut their sending windows in unison, resulting in repetitive cycles where the network swings from overloaded bufferbloat to link starvation.'
      ],
      discussionPrompt: 'Why does increasing router RAM sometimes degrade internet call quality instead of improving it?',
      teachingTips: 'Sketch a timeline on the whiteboard showing two packets entering a bottleneck link. Ask students what happens when the queue holds 100 packets vs 5 packets.'
    },
    {
      title: '02. CUBIC: The Standard for Modern Operating Systems',
      duration: '20 min',
      summary: 'Deep-dive into the cubic window growth function and RTT independence.',
      detailedExplanation: 'CUBIC is currently the default TCP congestion algorithm in Linux, macOS, and Windows. Unlike traditional linear window growth (AIMD), CUBIC replaces the congestion window growth function with a cubic curve centered around W_max (the window size prior to the last drop). When far below W_max, the window expands aggressively. As it approaches W_max, the growth slows into a horizontal inflection plateau, stabilizing the network. If no drops occur after K seconds, it accelerates upward to probe for new bandwidth. Most crucially, the growth function depends on real elapsed time (t) rather than round-trip time (RTT), ensuring fair bandwidth sharing between short-RTT local flows and long-RTT transatlantic links.',
      realWorldAnalogy: 'Think of driving into an unfamiliar parking space: you pull in rapidly at first, then gently decelerate as you approach the curb (the plateau), before nudging forward carefully to see if there is extra room.',
      keyPoints: [
        'W_cubic(t) = C * (t - K)^3 + W_max equation breakdown — CUBIC replaces Reno\'s linear growth with a cubic curve. W_max represents the window size before the last packet loss, and K is the elapsed time required to ramp back to W_max. Because this growth is driven by elapsed wall-clock time rather than RTT, it prevents low-latency connections from unfairly dominating bandwidth over long-haul connections.',
        'Plateau region around W_max providing network stability — Near the cubic inflection point (t ≈ K), the growth derivative flattens out. This stable plateau allows the network to operate smoothly near bottleneck capacity without instantly overfilling router buffers and inducing jitter.',
        'Fast convergence when competing with new flows — When available link capacity decreases or new flows connect, CUBIC scales down W_max dynamically, ensuring quick, fair bandwidth redistribution and preventing flow starvation.'
      ],
      discussionPrompt: 'How does CUBIC achieve fairness across flows with wildly different round-trip times?',
      teachingTips: 'Write the cubic equation W(t) = C(t-K)³ + W_max and draw the S-curve inflection point. Emphasize why the derivative dW/dt approaches 0 near t = K.'
    },
    {
      title: '03. Google BBR: Model-Based Congestion Control',
      duration: '25 min',
      summary: 'Estimating BtlBw and RTprop independently to navigate the network pipe.',
      detailedExplanation: 'Google Bottleneck Bandwidth and Round-trip propagation time (BBR) revolutionizes congestion control by operating without relying on packet loss. Instead of filling buffers until drops occur, BBR continuously maintains an explicit physical model of the network path by measuring two orthogonal quantities: the bottleneck link bandwidth (BtlBw) and the physical round-trip propagation time (RTprop). By pacing packet transmissions to exactly match BtlBw and keeping in-flight data equal to 1x BDP, BBR drains intermediate queues to near zero, providing maximum link speed with the lowest possible latency. BBR cycles through four states: Startup (exponential search), Drain (emptying buffers), ProbeBW (periodically testing for capacity increases), and ProbeRTT (measuring true physical wire delay).',
      realWorldAnalogy: 'Think of drinking water through a straw. Pouring water faster than the straw can swallow just spills or creates pressure backlogs. BBR sips at the exact maximum rate the straw can carry without creating any backlog.',
      keyPoints: [
        'Pacing gain cycles: Startup, Drain, ProbeBW, ProbeRTT — BBR continuously transitions through four states: Startup exponentially doubles transmission rate to discover capacity; Drain empties transient queue backlogs; ProbeBW alternates pacing rates to track bandwidth changes; and ProbeRTT throttles to 4 packets to measure pure physical wire propagation delay.',
        'Eliminating queue accumulation at the bottleneck buffer — By pacing packet departures at exactly the bottleneck bandwidth (BtlBw) and keeping in-flight data capped at 1x BDP, BBR prevents packets from waiting in intermediate queues, reducing latency to near physical wire speed.',
        'Performance gains on satellite and cellular networks — In wireless and satellite environments (e.g. Starlink, 5G), random packet loss happens from physical interference rather than congestion. While legacy TCP slashes throughput in half upon loss, BBR ignores non-congestion loss and sustains maximum throughput.'
      ],
      discussionPrompt: 'In a shared bottleneck, does BBR starve CUBIC flows? What happens in real-world deployments?',
      teachingTips: 'Contrast BBR\'s packet pacing mechanism against TCP\'s traditional bursty ACK-clocking. Show why loss-tolerant satellite networks (e.g. Starlink) benefit heavily from BBR.'
    }
  ],
  createdAt: '2026-09-12'
};

export const INITIAL_SLIDES: SlideDeck = {
  id: 'deck-1',
  lecturePlanId: 'lec-1',
  title: 'TCP Congestion Control: CUBIC & BBR Deep Dive',
  template: 'deep_teal_pro',
  createdAt: '2026-09-12',
  slides: [
    {
      id: 's-1',
      title: 'TCP Congestion Control: CUBIC vs BBR',
      layout: 'title',
      content: [
        'Department of Computer Science & Engineering',
        'Prof. Warda Mehmood',
        'Advanced Network Protocols'
      ],
      notes: 'Welcome students. Today we explore how modern internet congestion control evolved beyond packet loss.'
    },
    {
      id: 's-2',
      title: 'The Bufferbloat Problem',
      layout: 'bullets',
      content: [
        'Oversized router buffers create massive queues before dropping packets.',
        'Loss-based algorithms (Reno, Tahoe) mistake full buffers for congestion.',
        'Result: Throughput plateaus while RTT shoots up from 20ms to 800ms+.'
      ],
      notes: 'Emphasize that more buffer space is not the solution to packet drops.'
    },
    {
      id: 's-3',
      title: 'Kleinrock Optimal Operating Point',
      layout: 'split',
      content: [
        'Throughput reaches Maximum capacity (BtlBw).',
        'Queuing delay is Zero (Minimum RTprop).',
        'Delivery Rate is maximized without inflight queue inflation.'
      ],
      notes: 'BBR is designed to operate continuously at this exact intersection.'
    },
    {
      id: 's-4',
      title: 'CUBIC Mathematical Formulation',
      layout: 'bullets',
      content: [
        'W_cubic(t) = C * (t - K)^3 + W_max',
        'Independent of round trip times for fair bandwidth sharing.',
        'Rapid window expansion when far below capacity; conservative near W_max.'
      ],
      notes: 'Highlight the shape of the cubic curve on the whiteboard.'
    },
    {
      id: 's-5',
      title: 'Google BBR: Pacing & Probing',
      layout: 'summary',
      content: [
        'Measures Bottleneck Bandwidth and Minimum RTT alternately.',
        'Paces packets rather than bursting on ACKs.',
        'Reduces queue occupancy by up to 90% on cloud workloads.'
      ],
      notes: 'Wrap up with real-world YouTube and Google Search latency metrics.'
    }
  ]
};

export const SAMPLE_STUDENT_LEARNING_PLAN: LearningPlan = {
  id: 'lp-ml-1',
  topic: 'Machine Learning Fundamentals & Neural Architectures',
  level: 'Intermediate',
  goal: 'Master neural networks, backpropagation, and loss functions',
  progress: 72,
  savedInLibrary: true,
  createdAt: 'Sep 04, 2026',
  modules: [
    {
      id: 'm-1',
      number: '01',
      title: 'Foundations: Supervised vs Unsupervised Learning',
      description: 'Understanding feature vectors, labels, and inductive bias.',
      content: 'Supervised learning trains models on input-output pairs (X, Y) to approximate a mapping function f(X) -> Y. Unsupervised learning discovers latent representations without labels through clustering or dimensionality reduction.',
      keyTakeaways: [
        'Supervised learning requires labeled ground truth data.',
        'Generalization error is the difference between training and test loss.',
        'Overfitting occurs when a model memorizes noise rather than signal.'
      ],
      completed: true,
      score: 100,
      practiceQuiz: [
        {
          id: 'pq-1',
          type: 'mcq',
          question: 'Which of the following is an example of an unsupervised learning task?',
          options: ['Sentiment classification', 'K-Means customer segmentation', 'House price regression', 'Spam email detection'],
          correctAnswer: 'K-Means customer segmentation',
          explanation: 'K-Means groups unlabeled observations based on feature distance, which is unsupervised.'
        }
      ]
    },
    {
      id: 'm-2',
      number: '02',
      title: 'Loss Functions & Optimization Landscapes',
      description: 'MSE, Cross-Entropy, Gradient Descent, and Momentum.',
      content: 'The loss function quantifies model discrepancy. Mean Squared Error is standard for continuous regression, whereas Cross-Entropy evaluates probability distributions in classification. Gradient descent iteratively updates weights along the negative gradient vector.',
      keyTakeaways: [
        'Cross-Entropy heavily penalizes confident wrong predictions.',
        'Learning rate schedules prevent oscillations in steep ravines.',
        'Stochastic Gradient Descent (SGD) uses mini-batches to break out of saddle points.'
      ],
      completed: true,
      score: 90,
      practiceQuiz: [
        {
          id: 'pq-2',
          type: 'true_false',
          question: 'Mean Squared Error is mathematically optimal for multiclass classification outputs with Softmax.',
          options: ['True', 'False'],
          correctAnswer: 'False',
          explanation: 'Cross-Entropy is the maximum likelihood estimator for categorical distributions; MSE causes gradient saturation when combined with Softmax.'
        }
      ]
    },
    {
      id: 'm-3',
      number: '03',
      title: 'Perceptrons to Multi-Layer Networks',
      description: 'Activation functions (ReLU, Sigmoid), affine transforms, and universal approximation.',
      content: 'A single perceptron can only learn linearly separable decision boundaries (failing at XOR). Multi-Layer Perceptrons (MLPs) overcome this by composing linear matrix multiplications with non-linear activation functions such as ReLU.',
      keyTakeaways: [
        'Without non-linear activations, deep networks collapse into a single linear map.',
        'ReLU avoids the vanishing gradient problem common with Sigmoid/Tanh.',
        'The Universal Approximation Theorem guarantees any continuous function can be approximated by a single hidden layer of sufficient width.'
      ],
      completed: true,
      score: 85,
      practiceQuiz: [
        {
          id: 'pq-3',
          type: 'mcq',
          question: 'What happens if you remove all non-linear activation functions from a 50-layer deep neural network?',
          options: ['It learns 50x faster', 'It is mathematically equivalent to a single linear layer', 'It immediately diverges to infinity', 'It only works for images'],
          correctAnswer: 'It is mathematically equivalent to a single linear layer',
          explanation: 'A composition of linear maps W2*(W1*x) is merely another linear map W3*x.'
        }
      ]
    },
    {
      id: 'm-4',
      number: '04',
      title: 'Backpropagation & The Chain Rule',
      description: 'Computational graphs, reverse-mode automatic differentiation.',
      content: 'Backpropagation efficiently calculates the partial derivative of the scalar loss L with respect to every parameter in the computational graph using the multivariate chain rule from the output back to the inputs.',
      keyTakeaways: [
        'Reverse-mode automatic differentiation has time complexity proportional to forward pass.',
        'Jacobian matrices map changes across vector-valued activations.',
        'Gradients accumulate during the backward pass before optimizer updates.'
      ],
      completed: false,
      practiceQuiz: [
        {
          id: 'pq-4',
          type: 'mcq',
          question: 'In computational graphs, reverse-mode automatic differentiation computes gradients from:',
          options: ['Inputs to Outputs', 'Outputs to Inputs', 'Middle layers outward', 'Random order'],
          correctAnswer: 'Outputs to Inputs',
          explanation: 'Reverse-mode starts at the scalar loss objective and sweeps backwards through the graph.'
        }
      ]
    },
    {
      id: 'm-5',
      number: '05',
      title: 'Regularization: Dropout, Batch Normalization & Weight Decay',
      description: 'Techniques to prevent overfitting and accelerate convergence.',
      content: 'L2 Regularization (Weight Decay) penalizes large weight magnitudes. Dropout randomly zeros out neurons during training to prevent co-adaptation. Batch Normalization stabilizes layer inputs by standardizing activations across mini-batches.',
      keyTakeaways: [
        'Dropout simulates an ensemble of sub-networks.',
        'Batch Norm acts as a regularizer and enables higher learning rates.',
        'Early stopping halts training when validation loss stops improving.'
      ],
      completed: false,
      practiceQuiz: [
        {
          id: 'pq-5',
          type: 'true_false',
          question: 'Dropout is active during inference/evaluation time in production.',
          options: ['True', 'False'],
          correctAnswer: 'False',
          explanation: 'Dropout is disabled during evaluation, and neuron outputs are scaled by the retention probability.'
        }
      ]
    }
  ]
};

export const INITIAL_COMPETITIONS: CompetitionSession[] = [
  {
    id: 'comp-live-1',
    title: 'National Python & Algorithms Championship',
    code: '8429',
    status: 'live',
    format: 'game_style',
    teamFormation: 'auto',
    participantsCount: 128,
    currentQuestionIndex: 4,
    totalQuestions: 15,
    timePerQuestion: 30,
    timeRemaining: 18,
    isPaused: false,
    subject: 'cs',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    questions: [
      {
        id: 'cq-1',
        type: 'mcq',
        question: 'What is the worst-case time complexity of searching in a balanced AVL Tree?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correctAnswer: 'O(log N)',
        explanation: 'AVL trees maintain strict height balance with factor of at most 1, guaranteeing O(log N).',
        hasVisual: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/AVL-tree-w-balance_factor.svg/800px-AVL-tree-w-balance_factor.svg.png',
        imageCaption: 'AVL Balanced Search Tree with Node Balance Factors'
      },
      {
        id: 'cq-2',
        type: 'mcq',
        question: 'Which built-in Python module implements heap-based priority queues?',
        options: ['collections.deque', 'queue.LifoQueue', 'heapq', 'bisect'],
        correctAnswer: 'heapq',
        explanation: 'heapq provides min-heap algorithms over standard Python lists.',
        hasVisual: false
      },
      {
        id: 'cq-3',
        type: 'mcq',
        question: 'In Python, what does the GIL (Global Interpreter Lock) prevent?',
        options: [
          'Multiple OS processes from running simultaneously',
          'Multiple native threads from executing Python bytecodes concurrently',
          'Memory leaks in circular references',
          'Asyncio event loop creation'
        ],
        correctAnswer: 'Multiple native threads from executing Python bytecodes concurrently',
        explanation: 'GIL ensures only one thread executes Python bytecode at a time in CPython.',
        hasVisual: false
      },
      {
        id: 'cq-4',
        type: 'mcq',
        question: 'Which method resolution order (MRO) algorithm does modern Python 3 employ?',
        options: ['Depth-First Search', 'Breadth-First Search', 'C3 Linearization', 'Dijkstra MRO'],
        correctAnswer: 'C3 Linearization',
        explanation: 'Python 2.3+ uses the C3 linearization algorithm to resolve multiple inheritance.',
        hasVisual: false
      },
      {
        id: 'cq-5',
        type: 'mcq',
        question: 'Which language is primarily used for the core TensorFlow and PyTorch tensor runtime engine?',
        options: ['Python', 'Java', 'C++', 'Ruby'],
        correctAnswer: 'C++',
        explanation: 'High performance tensor arithmetic and CUDA dispatch is implemented in C++.',
        hasVisual: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/PyTorch_logo_icon.svg/640px-PyTorch_logo_icon.svg.png',
        imageCaption: 'Deep Learning System Architecture: Python Frontend & Native C++ Core Engine'
      }
    ],
    participants: [
      { id: 'p-1', name: 'Sarah Jenkins', avatar: 'SJ', score: 980, streak: 4, team: 'Teal Raptors' },
      { id: 'p-2', name: 'Ahmed Tariq', avatar: 'AT', score: 920, streak: 3, team: 'Emerald Wolves' },
      { id: 'p-3', name: 'Ali Raza', avatar: 'AR', score: 870, streak: 2, team: 'Lime Vipers' },
      { id: 'p-4', name: 'Hamza Malik', avatar: 'HM', score: 840, streak: 2, team: 'Teal Raptors' },
      { id: 'p-5', name: 'Zainab Fatima', avatar: 'ZF', score: 810, streak: 1, team: 'Emerald Wolves' },
      { id: 'p-6', name: 'Bilal Khan', avatar: 'BK', score: 790, streak: 0, team: 'Lime Vipers' },
      { id: 'p-7', name: 'Danyal Sheikh', avatar: 'DS', score: 750, streak: 1, team: 'Teal Raptors' }
    ]
  },
  {
    id: 'comp-lobby-1',
    title: 'Campus Rapid Fire Arena',
    code: '5219',
    status: 'lobby',
    format: 'game_style',
    teamFormation: 'self_select',
    participantsCount: 34,
    currentQuestionIndex: 0,
    totalQuestions: 10,
    timePerQuestion: 25,
    timeRemaining: 25,
    isPaused: false,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    questions: [
      {
        id: 'cq-sec-1',
        type: 'mcq',
        question: 'Which symmetric block cipher is currently approved as the Advanced Encryption Standard (AES)?',
        options: ['DES', 'Rijndael', 'Blowfish', 'RC4'],
        correctAnswer: 'Rijndael',
        explanation: 'AES was standardized by NIST based on the Rijndael block cipher.',
        hasVisual: false
      }
    ],
    participants: [
      { id: 'p-10', name: 'Usman Ghani', avatar: 'UG', score: 0, streak: 0 },
      { id: 'p-11', name: 'Mehak Noor', avatar: 'MN', score: 0, streak: 0 },
      { id: 'p-12', name: 'Kashif Ali', avatar: 'KA', score: 0, streak: 0 },
      { id: 'p-13', name: 'Hira Tariq', avatar: 'HT', score: 0, streak: 0 }
    ]
  },
  {
    id: 'comp-completed-1',
    title: 'Inter-School Academic Bowl 2025',
    code: '3180',
    status: 'completed',
    format: 'game_style',
    teamFormation: 'auto',
    participantsCount: 64,
    currentQuestionIndex: 10,
    totalQuestions: 10,
    timePerQuestion: 30,
    timeRemaining: 0,
    isPaused: true,
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    questions: [],
    participants: [
      { id: 'p-c1', name: 'Sarah Jenkins', avatar: 'SJ', score: 1480, streak: 5 },
      { id: 'p-c2', name: 'Marcus Chen', avatar: 'MC', score: 1390, streak: 4 },
      { id: 'p-c3', name: 'Elena Rostova', avatar: 'ER', score: 1240, streak: 3 }
    ]
  }
];

export const TEACHER_TIMETABLE = [
  { day: 'Monday', time: '09:00 - 10:30', subject: 'Advanced Computer Networks', room: 'Lab 402', section: 'CS-4A' },
  { day: 'Monday', time: '11:00 - 12:30', subject: 'Operating Systems & Concurrency', room: 'Lecture Hall 2', section: 'SE-3B' },
  { day: 'Tuesday', time: '10:00 - 11:30', subject: 'Database Management Systems', room: 'Hall B', section: 'DS-2A' },
  { day: 'Tuesday', time: '14:00 - 15:30', subject: 'Faculty Office Hours & Research', room: 'Office 318', section: 'All' },
  { day: 'Wednesday', time: '09:00 - 10:30', subject: 'Advanced Computer Networks', room: 'Lab 402', section: 'CS-4A' },
  { day: 'Thursday', time: '11:00 - 12:30', subject: 'Operating Systems & Concurrency', room: 'Lecture Hall 2', section: 'SE-3B' },
  { day: 'Friday', time: '10:00 - 11:30', subject: 'Weekly Academic Quiz & Competition', room: 'Auditorium 1', section: 'Open' }
];
