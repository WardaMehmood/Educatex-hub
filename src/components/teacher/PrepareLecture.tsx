import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LecturePlan, SlideItem } from '../../types';
import {
  CheckCircle2,
  ArrowRight,
  Edit3,
  Presentation,
  Plus,
  Trash2,
  HelpCircle,
  Clock,
  BookOpen,
  Download,
  FileText,
  Printer,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Check,
  GitBranch,
  CornerDownRight,
  Layers,
  Target
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { LoadingState } from '../common/EmptyState';

export const parseKeyPoint = (kp: string): { title: string; explanation: string } => {
  if (kp.includes(' — ')) {
    const [title, ...rest] = kp.split(' — ');
    return { title: title.trim(), explanation: rest.join(' — ').trim() };
  }
  if (kp.includes(': ')) {
    const [title, ...rest] = kp.split(': ');
    return { title: title.trim(), explanation: rest.join(': ').trim() };
  }
  return { title: kp.trim(), explanation: '' };
};

export const PrepareLecture: React.FC = () => {
  const {
    saveLecturePlan,
    saveSlideDeck,
    navigateToSlideCreationFromLecture,
    setTeacherView,
    showToast
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form State - Open and flexible for any subject, level, or duration
  const [subject, setSubject] = useState('Computer Science');
  const [topic, setTopic] = useState('TCP Congestion Control & Modern Algorithms (BBR vs CUBIC)');
  const [level, setLevel] = useState('Undergraduate Senior');
  const [duration, setDuration] = useState('60 minutes');
  const [style, setStyle] = useState('Interactive & Analytical');

  // Generated Plan State
  const [plan, setPlan] = useState<LecturePlan | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Step 4: Slides State
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<'emerald_minimal' | 'deep_teal_pro' | 'warm_academic' | 'clean_white'>('emerald_minimal');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const templates = [
    {
      id: 'emerald_minimal' as const,
      name: 'Emerald Minimal',
      description: 'Clean white background with emerald accents and modern typography',
      bg: '#FFFFFF',
      accent: '#0F766E',
      textColor: '#1C1917'
    },
    {
      id: 'deep_teal_pro' as const,
      name: 'Deep Teal Pro',
      description: 'Authoritative deep teal styling designed for technical lectures',
      bg: '#134E4A',
      accent: '#84CC16',
      textColor: '#FFFFFF'
    },
    {
      id: 'warm_academic' as const,
      name: 'Warm Academic',
      description: 'Soft warm background with structured pedagogical layout',
      bg: '#FAFAF9',
      accent: '#0F766E',
      textColor: '#1C1917'
    },
    {
      id: 'clean_white' as const,
      name: 'Clean White',
      description: 'High-contrast minimalist layout with sharp focus on content',
      bg: '#FFFFFF',
      accent: '#78716C',
      textColor: '#1C1917'
    }
  ];

  const handleGeneratePlan = () => {
    const rawTopic = topic.trim();
    if (!rawTopic) {
      showToast('Please enter a lecture topic or chapter title to proceed.', 'error');
      return;
    }

    const currentTopic = rawTopic;
    const currentSubject = subject.trim() || 'General Academic Discipline';
    const currentLevel = level.trim() || 'All Academic Levels';
    const currentDuration = duration.trim() || '45 minutes';
    const currentStyle = style.trim() || 'Interactive & Conceptual';

    setIsGenerating(true);
    setTimeout(() => {
      let outcomes = [
        `Understand foundational principles, core mechanisms, and real-world significance of ${currentTopic}.`,
        `Analyze practical applications, experimental/analytical observations, and key conceptual trade-offs.`,
        `Synthesize theoretical concepts into clear problem-solving frameworks and classroom discussion.`
      ];

      let sections = [
        {
          title: `01. Foundational Overview & Core Concepts of ${currentTopic}`,
          duration: '15 min',
          summary: `Historical context, fundamental principles, and why ${currentTopic} is central to ${currentSubject}.`,
          detailedExplanation: `In this opening phase, we introduce students to the core principles governing ${currentTopic}. We unpack foundational definitions, explore historical discoveries or baseline paradigms, and illustrate how this topic connects with broader concepts in ${currentSubject}. Students learn to recognize the primary questions this area solves and build an intuitive conceptual baseline before engaging with complex mechanisms.`,
          realWorldAnalogy: `Consider building an architectural skyscraper: the foundation and bedrock framing determine how high and sturdy the structure can rise. Similarly, grasping the baseline principles of ${currentTopic} provides the anchor for all advanced analysis.`,
          keyPoints: [
            `Core definitions, baseline axioms, and conceptual scope of ${currentTopic} — Establishing foundational terminology, theoretical axioms, and subject boundaries.`,
            `Historical context and primary problem space — Exploring the foundational questions and historical paradigms that motivated this theory.`,
            `Essential vocabulary and systemic relationships — Connecting foundational mechanisms to overarching discipline principles.`
          ],
          discussionPrompt: `Why do you think early researchers/thinkers first needed to formulate ${currentTopic}? What fundamental question were they trying to solve?`,
          teachingTips: `Begin by asking students what they already know about ${currentTopic}. Draw a simple conceptual map on the board connecting their existing knowledge to today's core theme.`
        },
        {
          title: `02. In-Depth Mechanisms, Working Principles & Analysis`,
          duration: '20 min',
          summary: `Step-by-step breakdown of processes, mathematical/logical relationships, and governing laws.`,
          detailedExplanation: `This core module deep-dives into the operational mechanics of ${currentTopic}. We systematically trace step-by-step stages, governing principles, and critical cause-and-effect relationships. Students analyze real-world scenarios or quantitative patterns, observing how changes in key variables alter outcomes. Emphasis is placed on building rigorous analytical intuition rather than rote memorization.`,
          realWorldAnalogy: `Like watching a finely calibrated Swiss mechanical watch: each gear and spring must interact with precise timing to move the hands forward. In ${currentTopic}, every component mechanism plays an indispensable role.`,
          keyPoints: [
            `Step-by-step mechanistic progression — Tracing component interactions, governing equations, and sequential operational stages.`,
            `Critical parameters and cause-and-effect dynamics — Analyzing variable sensitivities, equilibrium conditions, and operational limits.`,
            `Analytical patterns and problem-solving models — Formulating structured quantitative or qualitative diagnostic frameworks.`
          ],
          discussionPrompt: `If you alter the primary condition or input in this mechanism, how does the system compensate? Where is the primary point of failure or equilibrium?`,
          teachingTips: `Walk through one concrete demonstration or example step-by-step. Pause midway through the derivation or process and ask a student to predict the next phase.`
        },
        {
          title: `03. Real-World Applications, Problem Solving & Critical Synthesis`,
          duration: '25 min',
          summary: `Practical applications, case studies, evaluation criteria, and modern significance.`,
          detailedExplanation: `In the concluding module, students transition from internal mechanics to external applications and critical evaluation. We examine cutting-edge research, industrial applications, environmental/societal impacts, or advanced problem scenarios relevant to ${currentSubject}. Students synthesize lessons from across all sections to formulate evidence-based solutions.`,
          realWorldAnalogy: `Similar to test-piloting a newly engineered vehicle on diverse road conditions: theory meets practical reality, exposing nuances and engineering or natural adaptations.`,
          keyPoints: [
            `Contemporary real-world applications — Current industrial, scientific, or technological implementations in ${currentSubject}.`,
            `Comparative evaluation and edge-case analysis — Evaluating trade-offs, operational failure modes, and optimization criteria.`,
            `Standard problem-solving methodologies — Actionable exercises empowering students to synthesize lessons and solve novel challenges.`
          ],
          discussionPrompt: `How would you apply the principles learned in ${currentTopic} to solve a novel, modern challenge in our world today?`,
          teachingTips: `Present a short open-ended case scenario or problem on the board. Group students in pairs for 3 minutes to deliberate before sharing conclusions.`
        }
      ];

      const subLower = currentSubject.toLowerCase();
      const topLower = currentTopic.toLowerCase();

      // Biology enrichment
      if (subLower.includes('bio') || topLower.includes('cell') || topLower.includes('photosynthesis') || topLower.includes('genet')) {
        outcomes = [
          `Analyze the cellular, biochemical, and physiological mechanisms governing ${currentTopic}.`,
          `Interpret biological diagrams, experimental observations, and evolutionary adaptations.`,
          `Relate molecular-level processes to organism-level homeostasis and ecological systems.`
        ];
        sections = [
          {
            title: `01. Cellular Foundations & Biological Importance of ${currentTopic}`,
            duration: '15 min',
            summary: `Introduction to biological structures, cellular environment, and physiological role.`,
            detailedExplanation: `We examine the biological significance of ${currentTopic} within living systems. Cells maintain intricate balance across membranes and molecular pathways. Students explore the structural components, organelle roles, and chemical precursors necessary for this physiological process to occur sustainably.`,
            realWorldAnalogy: `Think of a cellular power grid and logistics depot: molecules are sorted, packaged, and converted into usable metabolic currency with zero wasted energy.`,
            keyPoints: [
              `Structural hierarchy: from molecular components to organelle function — Tracing the pathway from individual biochemical precursors up to membrane-bound organelles and cellular machinery.`,
              `Homeostasis and physiological requirements (pH, temperature, enzymes) — How cellular enzymes and transport proteins require tight temperature and pH ranges to prevent denaturation.`,
              `Biological importance for organism survival and reproduction — The critical role this pathway plays in maintaining metabolic equilibrium, cellular respiration, or tissue regeneration.`
            ],
            discussionPrompt: `What would happen to the organism if the rate of ${currentTopic} suddenly increased or stopped completely?`,
            teachingTips: `Use clear anatomical/cellular diagrams. Ask students to trace the path of key molecules as they move through the system.`
          },
          {
            title: `02. Biochemical Pathways & Step-by-Step Mechanisms`,
            duration: '20 min',
            summary: `Detailed biochemical reactions, enzymatic regulation, and energetic transformations.`,
            detailedExplanation: `Here we analyze the precise chemical equations, catalyst enzymes, and electron/molecular transfers in ${currentTopic}. We trace the cycle step-by-step, highlighting how ATP, NADH, or regulatory feedback loops ensure precise metabolic control.`,
            realWorldAnalogy: `Like a factory assembly line with quality control checkpoints at every station: if intermediate reactants are missing, the pathway gracefully pauses.`,
            keyPoints: [
              `Enzymatic catalysis, activation energy, and reaction kinetics — How specific catalysts lower activation energy barriers to drive sequential metabolic transformations.`,
              `Step-by-step cyclical or linear reaction phases — Tracing ATP/NADH consumption and production at each biochemical step in the pathway.`,
              `Energy yields, regulatory inhibitors, and feedback mechanisms — Mechanisms where downstream product concentrations naturally inhibit upstream enzymes to avoid cellular waste.`
            ],
            discussionPrompt: `Why do cells use enzyme-mediated multi-step pathways instead of releasing all chemical energy in one single rapid reaction?`,
            teachingTips: `Have students draw the cycle or reaction chain in their notebooks while you label the active enzymes and products together.`
          },
          {
            title: `03. Evolutionary Adaptations, Pathology & Medical/Biotech Applications`,
            duration: '25 min',
            summary: `Clinical significance, genetic variations, biotechnology tools, and modern research.`,
            detailedExplanation: `We connect ${currentTopic} to practical medical therapies, genetic engineering, or environmental adaptations. Students investigate what occurs during clinical malfunction (pathology/diseases) and how modern biotechnologists harness these mechanisms for medicine and agriculture.`,
            realWorldAnalogy: `Like diagnosing an electrical circuit fault: understanding the normal pathway lets biomedical researchers develop targeted drugs with pinpoint accuracy.`,
            keyPoints: [
              `Pathological consequences of pathway defects and genetic mutations — Clinical disorders, metabolic syndromes, or mutations arising when key enzymes or transporters malfunction.`,
              `Modern biotechnology applications (CRISPR, drug targeting, bio-manufacturing) — How modern therapies, CRISPR gene editing, and synthetic biology target these pathways.`,
              `Evolutionary diversity across species and environmental adaptations — Comparative analysis showing how this mechanism evolved and adapted across diverse organisms.`
            ],
            discussionPrompt: `How can understanding the molecular mechanics of ${currentTopic} help scientists design more effective therapies for human diseases?`,
            teachingTips: `Connect the theory to a recent clinical breakthrough or real medical case study to ignite student curiosity.`
          }
        ];
      }

      // Chemistry enrichment
      if (subLower.includes('chem') || topLower.includes('reaction') || topLower.includes('acid') || topLower.includes('bond') || topLower.includes('organic')) {
        outcomes = [
          `Formulate balanced chemical equations, stoichiometry, and reaction mechanisms for ${currentTopic}.`,
          `Analyze thermodynamics, reaction rates, equilibrium shifts, and orbital interactions.`,
          `Apply principles to laboratory synthesis, industrial chemical processes, and safety protocols.`
        ];
        sections = [
          {
            title: `01. Molecular Structure & Chemical Principles of ${currentTopic}`,
            duration: '15 min',
            summary: `Atomic orbitals, chemical bonding, and fundamental properties.`,
            detailedExplanation: `We establish the molecular architecture and periodic trends that govern ${currentTopic}. Understanding valence electrons, electronegativity differences, and intermolecular forces allows students to predict reactivity and physical properties before touching reagents.`,
            realWorldAnalogy: `Like magnetic puzzle pieces: atoms align only when their charges, spatial geometries, and electron distributions complement each other.`,
            keyPoints: [
              `Electronic configurations, Lewis structures, and hybridization states — How atomic valence orbitals hybridize to define 3D molecular geometry, bond angles, and steric hindrance.`,
              `Intermolecular forces, polarity, and thermodynamic stability — Assessing bond polarity, dipole moments, and Gibbs free energy to predict physical phase and baseline stability.`,
              `Baseline reaction conditions and stoichiometric relationships — Formulating balanced chemical equations to calculate theoretical yields and determine limiting reagents.`
            ],
            discussionPrompt: `How does molecular geometry and electronegativity directly dictate whether this substance reacts vigorously or remains inert?`,
            teachingTips: `Hold up 3D molecular ball-and-stick models to show bond angles and steric hindrance.`
          },
          {
            title: `02. Reaction Kinetics, Equilibrium & Mechanistic Pathways`,
            duration: '20 min',
            summary: `Transition states, activation energy profiles, and Le Chatelier's equilibrium dynamics.`,
            detailedExplanation: `This module investigates reaction coordinate diagrams, carbocation/radical intermediates, and rate-determining steps. Students discover how catalysts lower activation energy and how Le Chatelier's principle directs equilibrium under varying pressure, concentration, and temperature.`,
            realWorldAnalogy: `Rolling a boulder over a mountain pass: the catalyst tunnels through the mountain, drastically reducing the effort needed to reach the other side.`,
            keyPoints: [
              `Reaction coordinate diagrams and transition state energy barriers — Mapping potential energy landscapes from reactants through high-energy transition states to products.`,
              `Curved arrow notation for electron flow in reaction mechanisms — Tracking electron pair movements between nucleophiles and electrophiles during bond cleavage and formation.`,
              `Equilibrium constants (Kc, Kp) and Le Chatelier shifts — Predicting equilibrium constants and dynamic reaction shifts in response to temperature, pressure, and concentration perturbations.`
            ],
            discussionPrompt: `If this reaction is exothermic, how does raising temperature shift equilibrium yield vs reaction speed? What is the industrial compromise?`,
            teachingTips: `Plot an energy vs reaction progress graph on the board. Mark the activation energy barrier with and without a catalyst.`
          },
          {
            title: `03. Industrial Applications, Green Chemistry & Laboratory Practice`,
            duration: '25 min',
            summary: `Synthetic pathways, yield optimization, spectroscopy (NMR/IR), and practical lab techniques.`,
            detailedExplanation: `We conclude by connecting theoretical chemistry to large-scale chemical engineering, pharmaceuticals, green chemistry principles, and spectroscopic confirmation (NMR, FTIR, Mass Spec).`,
            realWorldAnalogy: `Cooking a Michelin-star recipe at industrial scale: maximizing product yield and purity while minimizing hazardous byproduct waste.`,
            keyPoints: [
              `Percentage yield, atom economy, and green chemistry considerations — Scaling laboratory reactions to industrial manufacturing while optimizing atom economy and minimizing hazardous waste.`,
              `Spectroscopic identification and purity analysis — Modern analytical instrumentation (NMR, FTIR, Mass Spec) used to confirm molecular structure and reaction purity.`,
              `Safe handling protocols and real-world industrial applications — Proper handling of reactive reagents, exothermic thermal runaway management, and waste containment.`
            ],
            discussionPrompt: `Why is atom economy just as important as percentage yield when manufacturing pharmaceuticals on an industrial scale?`,
            teachingTips: `Show a sample infrared or NMR spectrum. Guide students through identifying functional group peaks.`
          }
        ];
      }

      // Physics enrichment
      if (subLower.includes('phys') || topLower.includes('newton') || topLower.includes('quantum') || topLower.includes('thermodynam') || topLower.includes('wave') || topLower.includes('motion')) {
        outcomes = [
          `Derive foundational physical laws and mathematical equations governing ${currentTopic}.`,
          `Analyze vector fields, conservation laws (energy, momentum, charge), and boundary conditions.`,
          `Solve multi-step physics problems and connect mathematical models to observable experimental phenomena.`
        ];
        sections = [
          {
            title: `01. Physical Principles & Idealized Frameworks of ${currentTopic}`,
            duration: '15 min',
            summary: `First principles, coordinate systems, and conservation laws.`,
            detailedExplanation: `We define the physical system, reference frames, and governing conservation laws for ${currentTopic}. Students learn to isolate bodies using free-body diagrams and state vectors, distinguishing between idealized friction-free models and real-world physical constraints.`,
            realWorldAnalogy: `A frictionless ice skating rink: observing pure motion without confusing drag forces reveals the underlying physical laws cleanly.`,
            keyPoints: [
              `Fundamental conservation laws (Energy, Momentum, Angular Momentum) — Core conservation principles that establish mathematical invariants for the physical system.`,
              `Coordinate systems, vector decomposition, and units dimensional analysis — Resolving forces, velocities, and fields into orthogonal reference frames for mathematical analysis.`,
              `Core governing physical laws and experimental baselines — Defining operational boundary conditions where theoretical models accurately describe physical systems.`
            ],
            discussionPrompt: `What simplifying assumptions are we making when modeling this physical system? When would those assumptions fail?`,
            teachingTips: `Always start by sketching the physical scenario and choosing a clear coordinate origin on the board.`
          },
          {
            title: `02. Mathematical Derivations & Analytical Problem Solving`,
            duration: '20 min',
            summary: `Differential equations, calculus-based derivations, and quantitative solutions.`,
            detailedExplanation: `We derive the governing differential equations from first principles. Students step through integral calculus, boundary conditions, and equilibrium equations, building quantitative confidence to solve multi-variable physical problems.`,
            realWorldAnalogy: `Calibrating a satellite launch trajectory: slight variations in angle or initial velocity produce drastically different orbital trajectories.`,
            keyPoints: [
              `Rigorous mathematical derivation from first principles — Step-by-step differential and integral calculus connecting governing laws to observable physical quantities.`,
              `Boundary conditions and asymptotic behavior analysis — Examining system behavior at extreme thresholds (e.g. t → ∞, v → c) to verify physical consistency.`,
              `Step-by-step problem-solving strategy for quantitative exams — Using unit consistency checks and analytical methodologies to solve complex multi-body problems.`
            ],
            discussionPrompt: `What does the physical derivative with respect to time represent here? What does a second derivative tell us about stability?`,
            teachingTips: `Solve one multi-step problem completely, explaining why each algebraic step is physically justified.`
          },
          {
            title: `03. Engineering Applications, Observational Physics & Future Horizons`,
            duration: '25 min',
            summary: `Modern technological implementations, aerospace/semiconductor applications, and frontier experiments.`,
            detailedExplanation: `We connect theoretical physics to groundbreaking modern technologies—from particle colliders and fiber optic telecommunications to quantum computing, renewable energy, and aerospace engineering.`,
            realWorldAnalogy: `Turning mathematical equations on a chalkboard into spacecraft navigating past gravitational wells to Mars.`,
            keyPoints: [
              `Technological breakthroughs enabled by this physical principle — Transforming theoretical physics into cutting-edge devices like semiconductors, lasers, particle detectors, and aerospace craft.`,
              `Experimental measurement techniques and precision instrumentation — Instrumentation and telemetry techniques used to empirically measure phenomena with high fidelity.`,
              `Frontier research questions and unanswered challenges in modern physics — Ongoing investigations where classical principles intersect with relativistic or quantum phenomena.`
            ],
            discussionPrompt: `How did the discovery of this physical law transform modern engineering and global technology?`,
            teachingTips: `Show a short real-world video or telemetry simulation demonstrating the physical effect in action.`
          }
        ];
      }

      // Computer science / TCP legacy support
      if (topLower.includes('tcp') || topLower.includes('congestion')) {
        outcomes = [
          'Contrast loss-based congestion control (CUBIC) with bottleneck-bandwidth/RTT (BBR).',
          'Demonstrate how bufferbloat affects latency in high-speed enterprise networks.',
          'Formulate the mathematical state transitions of TCP Slow Start, Congestion Avoidance, and Fast Recovery.'
        ];
        sections = [
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
        ];
      }

      const generated: LecturePlan = {
        id: `lec-${Date.now()}`,
        subject: currentSubject,
        topic: currentTopic,
        level: currentLevel,
        duration: currentDuration,
        style: currentStyle,
        outcomes,
        sections,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPlan(generated);
      setIsGenerating(false);
      setStep(2);
      showToast('Lecture Plan structure generated successfully!');
    }, 800);
  };

  const handleProceedToExplanation = () => {
    if (plan) {
      saveLecturePlan(plan);
      setStep(3);
      showToast('Lecture Plan approved! Displaying full explanation & delivery notes.');
    }
  };

  const handleUpdateSectionTitle = (index: number, newTitle: string) => {
    if (!plan) return;
    const updated = [...plan.sections];
    updated[index] = { ...updated[index], title: newTitle };
    setPlan({ ...plan, sections: updated });
  };

  const handleUpdateSectionSummary = (index: number, newSummary: string) => {
    if (!plan) return;
    const updated = [...plan.sections];
    updated[index] = { ...updated[index], summary: newSummary };
    setPlan({ ...plan, sections: updated });
  };

  const handleDeleteSection = (index: number) => {
    if (!plan || plan.sections.length <= 1) {
      showToast('A lecture plan must have at least one module node.', 'error');
      return;
    }
    const updated = plan.sections.filter((_, idx) => idx !== index);
    setPlan({ ...plan, sections: updated });
    showToast('Module node removed from hierarchy tree.');
  };

  const handleAddSection = () => {
    if (!plan) return;
    const newIdx = plan.sections.length + 1;
    const newSec = {
      title: `0${newIdx}. Additional Curriculum Unit`,
      duration: '15 min',
      summary: 'In-depth conceptual analysis and practical classroom delivery.',
      detailedExplanation: `This supplementary unit builds on preceding concepts, exploring deeper analytical dimensions and practical applications.`,
      realWorldAnalogy: 'Like adding an extra modular component to a high-performance engine for customized output.',
      keyPoints: [
        'Core theoretical baseline — Clear fundamental definitions and baseline axioms.',
        'Mechanistic derivation and real-world constraints — Step-by-step derivation considering physical and operational constraints.',
        'Classroom evaluation and problem-solving application — Practical exercises for students to demonstrate mastery.'
      ],
      discussionPrompt: 'How does this additional module reinforce the foundational concepts introduced earlier?',
      teachingTips: 'Reinforce connections with earlier modules before branching into advanced details.'
    };
    setPlan({ ...plan, sections: [...plan.sections, newSec] });
    showToast('New module node added to hierarchy tree!');
  };

  const handleProceedToSlides = () => {
    if (!plan) return;
    saveLecturePlan(plan);
    const generatedSlides: SlideItem[] = [
      {
        id: `sl-title`,
        title: plan.topic,
        layout: 'title',
        content: [
          `Subject: ${plan.subject}`,
          `Target Level: ${plan.level}`,
          `Allocated Duration: ${plan.duration}`,
          `Instructional Style: ${plan.style}`
        ],
        notes: `Opening Slide: Welcome students and introduce key competencies for ${plan.topic}.`
      },
      ...plan.sections.map((sec, idx) => ({
        id: `sl-sec-${idx}`,
        title: sec.title,
        layout: 'bullets' as const,
        content: sec.keyPoints,
        notes: `Delivery Cue: ${sec.summary}\n\nDiscussion Question: ${sec.discussionPrompt}`
      })),
      {
        id: `sl-summary`,
        title: 'Summary & Learning Mastery',
        layout: 'summary',
        content: plan.outcomes,
        notes: 'Wrap up key takeaways, answer student questions, and assign follow-up homework / quiz.'
      }
    ];
    setSlides(generatedSlides);
    setActiveSlideIndex(0);
    setStep(4);
    saveSlideDeck({
      id: `deck-${Date.now()}`,
      lecturePlanId: plan.id,
      title: `${plan.topic} — Slide Deck`,
      template: selectedTemplate,
      slides: generatedSlides,
      createdAt: new Date().toISOString().split('T')[0]
    });
    showToast('Proceeded to Step 4 — Presentation slides generated!');
  };

  const handleDownloadSlides = () => {
    if (!plan || slides.length === 0) return;
    const currentTmpl = templates.find(t => t.id === selectedTemplate) || templates[0];
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      showToast('Please enable popups in your browser to print / download slides.');
      return;
    }

    const slidesHtml = slides.map((s, idx) => `
      <div class="slide-page">
        <div class="accent-bar" style="background-color: ${currentTmpl.accent};"></div>
        <div class="slide-header">
          <span class="slide-num">SLIDE ${idx + 1} OF ${slides.length}</span>
          <span class="slide-subject">${plan.subject}</span>
        </div>
        <h2 class="slide-title" style="color: ${currentTmpl.id === 'deep_teal_pro' ? '#FFFFFF' : '#134E4A'};">${s.title}</h2>
        <ul class="bullet-list">
          ${s.content.map(b => `<li>${b}</li>`).join('')}
        </ul>
        ${s.notes ? `<div class="speaker-notes"><strong>Speaker Notes:</strong> ${s.notes}</div>` : ''}
      </div>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${plan.topic} — Presentation Slides</title>
        <style>
          @page { size: landscape; margin: 12mm; }
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #F1F5F9;
            margin: 0;
            padding: 20px;
          }
          .slide-page {
            width: 100%;
            max-width: 960px;
            aspect-ratio: 16/9;
            margin: 0 auto 30px auto;
            background: ${currentTmpl.bg};
            color: ${currentTmpl.textColor};
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            position: relative;
            display: flex;
            flex-direction: column;
            page-break-after: always;
          }
          .accent-bar {
            width: 48px;
            height: 5px;
            border-radius: 3px;
            margin-bottom: 16px;
          }
          .slide-header {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.05em;
            opacity: 0.7;
            margin-bottom: 12px;
          }
          .slide-title {
            font-size: 26px;
            font-weight: 800;
            margin: 0 0 24px 0;
          }
          .bullet-list {
            flex: 1;
            padding-left: 24px;
            font-size: 16px;
            line-height: 1.6;
          }
          .bullet-list li {
            margin-bottom: 12px;
          }
          .speaker-notes {
            margin-top: auto;
            padding: 10px 14px;
            background: rgba(0,0,0,0.04);
            border-left: 3px solid ${currentTmpl.accent};
            border-radius: 4px;
            font-size: 12px;
            line-height: 1.4;
          }
          @media print {
            body { background: transparent; padding: 0; }
            .slide-page { box-shadow: none; border: 1px solid #E2E8F0; margin-bottom: 0; }
          }
        </style>
      </head>
      <body>
        ${slidesHtml}
        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 250);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    showToast('Slide deck ready for printing / Save as PDF!');
  };

  const activeSlide = slides[activeSlideIndex] || slides[0];
  const activeTemplateObj = templates.find(t => t.id === selectedTemplate) || templates[0];

  const handleDownloadPDF = () => {
    if (!plan) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      showToast('Please enable popups in your browser to print / save as PDF.');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${plan.topic} — Academic Lecture Notes</title>
        <style>
          @page { size: A4; margin: 16mm; }
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            color: #1C1917;
            background: #FFFFFF;
            line-height: 1.55;
            padding: 0;
            margin: 0;
            font-size: 13px;
          }
          .header-banner {
            border-bottom: 2.5px solid #0F766E;
            padding-bottom: 14px;
            margin-bottom: 18px;
          }
          .tag {
            display: inline-block;
            background-color: #CCFBF1;
            color: #0F766E;
            font-size: 11px;
            font-weight: 800;
            padding: 3px 10px;
            border-radius: 9999px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
          }
          h1 {
            font-size: 22px;
            font-weight: 800;
            color: #134E4A;
            margin: 0 0 6px 0;
            line-height: 1.25;
          }
          .meta-row {
            display: flex;
            gap: 14px;
            font-size: 11.5px;
            color: #78716C;
            font-weight: 500;
          }
          .outcomes-box {
            background-color: #F0FDFA;
            border: 1px solid #99F6E4;
            border-left: 4px solid #0F766E;
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 20px;
          }
          .outcomes-box h3 {
            margin: 0 0 6px 0;
            font-size: 12px;
            font-weight: 800;
            color: #0F766E;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }
          .outcomes-box ul {
            margin: 0;
            padding-left: 18px;
          }
          .outcomes-box li {
            margin-bottom: 3px;
            font-size: 12.5px;
            color: #134E4A;
          }
          .section-card {
            border: 1px solid #E7E5E4;
            border-radius: 10px;
            padding: 16px 18px;
            margin-bottom: 18px;
            page-break-inside: avoid;
            background: #FFFFFF;
          }
          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #F5F5F4;
            padding-bottom: 8px;
            margin-bottom: 10px;
          }
          .section-title {
            font-size: 15px;
            font-weight: 800;
            color: #1C1917;
            margin: 0;
          }
          .section-badge {
            background-color: #F5F5F4;
            color: #57534E;
            font-size: 11px;
            font-weight: 700;
            padding: 2px 7px;
            border-radius: 4px;
          }
          .explanation-box {
            background-color: #FAFAF9;
            border-left: 3px solid #0F766E;
            padding: 10px 14px;
            border-radius: 0 6px 6px 0;
            margin-bottom: 10px;
          }
          .explanation-label {
            font-size: 10px;
            font-weight: 800;
            color: #0F766E;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: block;
            margin-bottom: 3px;
          }
          .explanation-text {
            margin: 0;
            font-size: 12.5px;
            color: #292524;
            line-height: 1.55;
          }
          .analogy-box {
            background-color: #F0FDFA;
            border: 1px solid #CCFBF1;
            border-left: 3px solid #0F766E;
            padding: 8px 12px;
            border-radius: 0 6px 6px 0;
            margin-bottom: 10px;
          }
          .analogy-label {
            font-size: 10px;
            font-weight: 800;
            color: #0F766E;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: block;
            margin-bottom: 2px;
          }
          .analogy-text {
            margin: 0;
            font-size: 12px;
            color: #134E4A;
            font-style: italic;
          }
          .key-points-box {
            margin-bottom: 10px;
          }
          .key-points-title {
            font-size: 10.5px;
            font-weight: 800;
            color: #78716C;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            margin-bottom: 3px;
          }
          .key-points-box ul {
            margin: 0;
            padding-left: 16px;
          }
          .key-points-box li {
            font-size: 12px;
            color: #44403C;
            margin-bottom: 2px;
          }
          .prompt-box {
            background-color: #F0FDF4;
            border: 1px solid #BBF7D0;
            border-left: 3px solid #22C55E;
            padding: 8px 12px;
            border-radius: 0 6px 6px 0;
            margin-bottom: 8px;
          }
          .prompt-label {
            font-size: 10px;
            font-weight: 800;
            color: #15803D;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: block;
            margin-bottom: 2px;
          }
          .prompt-text {
            margin: 0;
            font-size: 12px;
            color: #166534;
            font-weight: 600;
          }
          .tips-box {
            background-color: #F8FAFC;
            border: 1px solid #E2E8F0;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 11px;
            color: #475569;
          }
          .footer {
            text-align: center;
            font-size: 10.5px;
            color: #A8A29E;
            border-top: 1px solid #E7E5E4;
            padding-top: 10px;
            margin-top: 20px;
          }
          @media print {
            body { padding: 0; }
            .section-card { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header-banner">
          <span class="tag">Academic Lecture Document</span>
          <h1>${plan.topic}</h1>
          <div class="meta-row">
            <span><strong>Subject:</strong> ${plan.subject}</span>
            <span><strong>Level:</strong> ${plan.level}</span>
            <span><strong>Duration:</strong> ${plan.duration}</span>
            <span><strong>Style:</strong> ${plan.style}</span>
            <span><strong>Date:</strong> ${plan.createdAt}</span>
          </div>
        </div>

        <div class="outcomes-box">
          <h3>Target Learning Outcomes</h3>
          <ul>
            ${plan.outcomes.map(o => `<li>${o}</li>`).join('')}
          </ul>
        </div>

        <div>
          ${plan.sections.map(sec => `
            <div class="section-card">
              <div class="section-header">
                <h2 class="section-title">${sec.title}</h2>
                <span class="section-badge">${sec.duration}</span>
              </div>
              
              <div class="explanation-box">
                <span class="explanation-label">Concept Explanation & Lecture Delivery</span>
                <p class="explanation-text">${sec.detailedExplanation || sec.summary}</p>
              </div>

              ${sec.realWorldAnalogy ? `
                <div class="analogy-box">
                  <span class="analogy-label">Real-World Analogy & Mental Model</span>
                  <p class="analogy-text">${sec.realWorldAnalogy}</p>
                </div>
              ` : ''}

              <div class="key-points-box">
                <div class="key-points-title">Key Technical Checkpoints & Explanations</div>
                <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                  ${sec.keyPoints.map((kp, kidx) => {
                    const { title, explanation } = parseKeyPoint(kp);
                    return `
                      <div style="font-size: 11.5px; color: #292524; line-height: 1.45; margin-bottom: 4px;">
                        <strong style="color: #0F766E;">${kidx + 1}. ${title}</strong>
                        ${explanation ? `<div style="color: #57534E; margin-left: 14px; font-size: 11px; margin-top: 2px;">${explanation}</div>` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

              <div class="prompt-box">
                <span class="prompt-label">Classroom Socratic Discussion Prompt</span>
                <p class="prompt-text">"${sec.discussionPrompt}"</p>
              </div>

              ${sec.teachingTips ? `
                <div class="tips-box">
                  <strong>Teaching Delivery Strategy:</strong> ${sec.teachingTips}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>

        <div class="footer">
          Generated via EducateX Hub • Academic Lecture Preparation & Delivery Engine
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
    showToast('Opening PDF Print & Save preview...');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* 4-Step Indicator - Strictly 1 Horizontal Line across all pages/steps */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          padding: '12px 16px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border-light)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Step 1 */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}
          onClick={() => setStep(1)}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: step >= 1 ? 'var(--color-primary-emerald)' : '#E7E5E4',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 700,
              flexShrink: 0
            }}
          >
            1
          </div>
          <span
            style={{
              fontSize: '13.5px',
              fontWeight: step === 1 ? 700 : 500,
              color: step === 1 ? 'var(--color-text-main)' : 'var(--color-text-muted)',
              whiteSpace: 'nowrap'
            }}
          >
            Step 1 — Topic
          </span>
        </div>

        <div style={{ width: '28px', height: '2px', backgroundColor: step >= 2 ? 'var(--color-primary-emerald)' : '#E7E5E4', flexShrink: 0 }} />

        {/* Step 2 */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: plan ? 'pointer' : 'default', flexShrink: 0 }}
          onClick={() => plan && setStep(2)}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: step >= 2 ? 'var(--color-primary-emerald)' : '#E7E5E4',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 700,
              flexShrink: 0
            }}
          >
            2
          </div>
          <span
            style={{
              fontSize: '13.5px',
              fontWeight: step === 2 ? 700 : 500,
              color: step === 2 ? 'var(--color-text-main)' : 'var(--color-text-muted)',
              whiteSpace: 'nowrap'
            }}
          >
            Step 2 — Lecture Structure
          </span>
        </div>

        <div style={{ width: '28px', height: '2px', backgroundColor: step >= 3 ? 'var(--color-primary-emerald)' : '#E7E5E4', flexShrink: 0 }} />

        {/* Step 3 */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: plan ? 'pointer' : 'default', flexShrink: 0 }}
          onClick={() => plan && setStep(3)}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: step >= 3 ? 'var(--color-primary-emerald)' : '#E7E5E4',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 700,
              flexShrink: 0
            }}
          >
            3
          </div>
          <span
            style={{
              fontSize: '13.5px',
              fontWeight: step === 3 ? 700 : 500,
              color: step === 3 ? 'var(--color-text-main)' : 'var(--color-text-muted)',
              whiteSpace: 'nowrap'
            }}
          >
            Step 3 — Lecture Explanation & Notes
          </span>
        </div>

        <div style={{ width: '28px', height: '2px', backgroundColor: step >= 4 ? 'var(--color-primary-emerald)' : '#E7E5E4', flexShrink: 0 }} />

        {/* Step 4 */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: plan ? 'pointer' : 'default', flexShrink: 0 }}
          onClick={() => plan && (slides.length > 0 ? setStep(4) : handleProceedToSlides())}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: step === 4 ? 'var(--color-primary-emerald)' : '#E7E5E4',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 700,
              flexShrink: 0
            }}
          >
            4
          </div>
          <span
            style={{
              fontSize: '13.5px',
              fontWeight: step === 4 ? 700 : 500,
              color: step === 4 ? 'var(--color-text-main)' : 'var(--color-text-muted)',
              whiteSpace: 'nowrap'
            }}
          >
            Step 4 — Presentation Slides
          </span>
        </div>
      </div>

      {/* STEP 1: TOPIC FORM */}
      {step === 1 && (
        <Card>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <BookOpen size={20} color="var(--color-primary-emerald)" />
              <h2 className="text-h2">Prepare Lecture Plan</h2>
            </div>
            <p className="text-body">
              Enter any topic from any academic subject or discipline. Our pedagogical engine will assemble a comprehensive, time-sequenced lecture plan with full explanations and delivery notes.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Primary Topic Input */}
            <Input
              label="Lecture Topic or Chapter Title *"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Cell Structure & Function, Photosynthesis, Newton's Laws of Motion, World War II, Organic Reactions, TCP Congestion Control..."
            />

            {/* Flexible Subject & Student Level Fields (Open Inputs) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Input
                label="Academic Subject / Discipline"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Biology, Chemistry, Physics, Mathematics, Computer Science, History, Literature..."
              />

              <Input
                label="Student Level / Target Grade"
                value={level}
                onChange={e => setLevel(e.target.value)}
                placeholder="e.g. Grade 9, Matric, O-Levels, FSc, Intermediate, Undergraduate, Masters..."
              />
            </div>

            {/* Flexible Duration & Teaching Pedagogy Select */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Input
                label="Estimated Duration"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="e.g. 45 minutes, 1 hour, 60 mins, 90 mins, 2 hours..."
              />

              <Select
                label="Teaching Approach & Pedagogy"
                value={style}
                onChange={e => setStyle(e.target.value)}
                options={[
                  { value: 'Interactive & Analytical', label: 'Interactive & Analytical' },
                  { value: 'Socratic Case-Study', label: 'Socratic Case-Study' },
                  { value: 'Theory & Mathematical Derivation', label: 'Theory & Mathematical Derivation' },
                  { value: 'Hands-on Code Walkthrough', label: 'Hands-on Code Walkthrough' }
                ]}
              />
            </div>

            {/* AI Callout Banner */}
            <div className="ai-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span className="ai-badge">Pedagogical Engine</span>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', margin: 0 }}>
                  Generates learning outcomes, time-boxed milestones, comprehensive concept explanations, analogies, and discussion prompts for any academic field.
                </p>
              </div>

              <Button
                variant="primary"
                size="lg"
                icon={<BookOpen size={16} />}
                onClick={handleGeneratePlan}
                loading={isGenerating}
              >
                Generate Plan
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* STEP 2: LECTURE PLAN HIERARCHY TREE REVIEW & EDIT */}
      {step === 2 && plan && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Actions Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', backgroundColor: '#FFFFFF', padding: '18px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <GitBranch size={13} /> Curriculum Hierarchy Tree
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  Interactive Academic Breakdown
                </span>
              </div>
              <h2 className="text-h2" style={{ margin: 0, fontSize: '20px' }}>
                Lecture Structure & Module Hierarchy
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                variant="secondary"
                size="sm"
                icon={<Edit3 size={14} />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Done Editing Tree' : 'Edit Tree Nodes'}
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<CheckCircle2 size={14} />}
                onClick={handleProceedToExplanation}
              >
                Approve & View Lecture Explanation →
              </Button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* LEVEL 0: ROOT TOPIC NODE (APEX OF THE HIERARCHY) */}
          {/* ========================================================================= */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card style={{ width: '100%', maxWidth: '820px', border: '2px solid var(--color-primary-emerald)', backgroundColor: '#F0FDFA', textAlign: 'center', padding: '24px', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#CCFBF1', color: 'var(--color-primary-emerald)', padding: '4px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                <GitBranch size={13} /> Root Curriculum Node
              </div>

              <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-deep-teal)', margin: '0 0 10px 0', lineHeight: 1.3 }}>
                {plan.topic}
              </h1>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <Badge variant="neutral">
                  Subject: {plan.subject}
                </Badge>
                <Badge variant="neutral">
                  Level: {plan.level}
                </Badge>
                <Badge variant="neutral" icon={<Clock size={12} />}>
                  Duration: {plan.duration}
                </Badge>
                <Badge variant="neutral">
                  Approach: {plan.style}
                </Badge>
              </div>
            </Card>

            {/* Central Trunk Stem Line Down */}
            <div style={{ width: '3px', height: '32px', backgroundColor: 'var(--color-primary-emerald)' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-primary-emerald)', border: '2px solid #FFFFFF', marginTop: '-6px', zIndex: 2 }} />
          </div>

          {/* ========================================================================= */}
          {/* LEVEL 1, BRANCH A: TARGET LEARNING OUTCOMES */}
          {/* ========================================================================= */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card style={{ width: '100%', maxWidth: '820px', borderLeft: '4px solid var(--color-primary-emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Target size={18} color="var(--color-primary-emerald)" />
                <h3 className="text-h3" style={{ margin: 0, fontSize: '16px' }}>
                  Hierarchy Branch: Target Learning Outcomes ({plan.outcomes.length} Objectives)
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px' }}>
                {plan.outcomes.map((out, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      backgroundColor: '#FAFAF9',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}
                  >
                    <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0, marginTop: '2px' }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                      {out}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Central Trunk Stem Line Down to Modules */}
            <div style={{ width: '3px', height: '36px', backgroundColor: 'var(--color-primary-emerald)' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-primary-emerald)', border: '2px solid #FFFFFF', marginTop: '-6px', zIndex: 2 }} />
          </div>

          {/* ========================================================================= */}
          {/* LEVEL 1, BRANCH B: SEQUENTIAL MODULE UNITS (TREE VIEW) */}
          {/* ========================================================================= */}
          <div style={{ width: '100%', maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} color="var(--color-primary-emerald)" />
                <h3 className="text-h3" style={{ margin: 0, fontSize: '16px' }}>
                  Hierarchy Branch: Time-Sequenced Learning Modules ({plan.sections.length} Units)
                </h3>
              </div>

              {isEditing && (
                <Button size="sm" variant="secondary" icon={<Plus size={14} />} onClick={handleAddSection}>
                  Add Unit Node
                </Button>
              )}
            </div>

            {/* Continuous Left Tree Stem Container */}
            <div style={{ position: 'relative', paddingLeft: '42px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Vertical Tree Stem Line */}
              <div
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '12px',
                  bottom: '24px',
                  width: '3px',
                  backgroundColor: 'var(--color-primary-emerald)',
                  borderRadius: '2px'
                }}
              />

              {plan.sections.map((sec, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  {/* Horizontal Branch Connector Arm */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-26px',
                      top: '26px',
                      width: '26px',
                      height: '2px',
                      backgroundColor: 'var(--color-primary-emerald)'
                    }}
                  />

                  {/* Junction Node Circle on Trunk */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-34px',
                      top: '18px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-emerald)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 800,
                      border: '2px solid #FFFFFF',
                      zIndex: 3
                    }}
                  >
                    {idx + 1}
                  </div>

                  {/* Module Node Card */}
                  <Card style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '20px' }}>
                    {/* Module Title Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary-emerald)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            MODULE NODE 0{idx + 1}
                          </span>
                        </div>

                        {isEditing ? (
                          <Input
                            value={sec.title}
                            onChange={e => handleUpdateSectionTitle(idx, e.target.value)}
                            placeholder="Unit Title"
                          />
                        ) : (
                          <h3 className="text-h3" style={{ fontSize: '17px', margin: 0 }}>
                            {sec.title}
                          </h3>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Badge variant="neutral" icon={<Clock size={12} />}>
                          {sec.duration}
                        </Badge>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleDeleteSection(idx)}
                            style={{
                              padding: '4px 8px',
                              borderRadius: '4px',
                              border: '1px solid #FECDD3',
                              backgroundColor: '#FFF1F2',
                              color: '#E11D48',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '11px',
                              fontWeight: 600
                            }}
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 1. Core Definition & Concept Overview */}
                    <div style={{ marginBottom: '14px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary-emerald)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                        <BookOpen size={13} /> Core Definition & Concept Overview:
                      </span>
                      {isEditing ? (
                        <Input
                          value={sec.summary}
                          onChange={e => handleUpdateSectionSummary(idx, e.target.value)}
                          placeholder="Core definition and overview"
                        />
                      ) : (
                        <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderLeft: '3px solid var(--color-primary-emerald)', padding: '10px 14px', borderRadius: '4px' }}>
                          <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', margin: 0, lineHeight: 1.55 }}>
                            {sec.summary}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 2. Key Principles & Technical Mechanisms */}
                    <div style={{ marginBottom: '14px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F766E', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                        <CornerDownRight size={13} /> Key Principles & Technical Mechanisms:
                      </span>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '8px', borderLeft: '2px dashed #99F6E4' }}>
                        {sec.keyPoints.map((pt, pidx) => {
                          const { title, explanation } = parseKeyPoint(pt);
                          return (
                            <div
                              key={pidx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid var(--color-border-light)',
                                borderRadius: '6px',
                                padding: '8px 12px',
                                fontSize: '13px'
                              }}
                            >
                              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#0F766E', backgroundColor: '#CCFBF1', padding: '2px 6px', borderRadius: '4px', flexShrink: 0, marginTop: '1px' }}>
                                {idx + 1}.{pidx + 1}
                              </span>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <span style={{ fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.4 }}>
                                  {title}
                                </span>
                                {explanation && (
                                  <span style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                                    {explanation}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* 3. Real-World Example & Practical Application */}
                    {sec.realWorldAnalogy && (
                      <div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F766E', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                          <BookOpen size={13} color="#0F766E" /> Real-World Example & Practical Application:
                        </span>
                        <div style={{ backgroundColor: '#F0FDFA', border: '1px solid #CCFBF1', borderLeft: '3px solid #0F766E', padding: '10px 14px', borderRadius: '4px' }}>
                          <p style={{ fontSize: '13px', color: '#134E4A', margin: 0, lineHeight: 1.5 }}>
                            {sec.realWorldAnalogy}
                          </p>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              ))}

              {/* Add Unit Node Button Card */}
              {isEditing && (
                <div
                  onClick={handleAddSection}
                  style={{
                    border: '2px dashed var(--color-primary-emerald)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    textAlign: 'center',
                    backgroundColor: '#F0FDFA',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: 'var(--color-primary-emerald)',
                    fontWeight: 700,
                    fontSize: '13.5px'
                  }}
                >
                  <Plus size={16} /> Add Next Module Unit Node
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', padding: '18px 24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', flexWrap: 'wrap', gap: '14px' }}>
            <Button variant="secondary" onClick={() => setStep(1)}>
              ← Back to Step 1 (Topic Form)
            </Button>
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
              onClick={handleProceedToExplanation}
            >
              Approve & Proceed to Step 3 (Lecture Explanation) →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: DETAILED LECTURE EXPLANATION & DELIVERY (SAMJHAYA GAYA LECTURE) */}
      {step === 3 && plan && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Header Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-emerald">
                  <BookOpen size={12} /> Lecture Explained & Ready
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  Comprehensive Classroom Delivery Script
                </span>
              </div>
              <h1 className="text-h2" style={{ fontSize: '24px', marginBottom: '6px' }}>{plan.topic}</h1>
              <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', margin: 0 }}>
                {plan.subject} • {plan.level} • {plan.duration} • Pedagogy: {plan.style}
              </p>
            </div>

            {/* Quick Actions on Top */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Button
                variant="secondary"
                size="md"
                icon={<Download size={15} />}
                onClick={handleDownloadPDF}
              >
                Download Lecture PDF
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={<Presentation size={15} />}
                onClick={handleProceedToSlides}
              >
                Proceed to Step 4 — Slides
              </Button>
            </div>
          </div>

          {/* Detailed Section Explanations - Continuous sequential layout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {plan.sections.map((sec, idx) => (
              <Card key={idx} style={{ padding: '24px' }}>
                {/* Section Title Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px' }}>
                      {idx + 1}
                    </span>
                    <h3 className="text-h3" style={{ fontSize: '18px', margin: 0 }}>
                      {sec.title}
                    </h3>
                  </div>
                  <Badge variant="neutral" icon={<Clock size={12} />}>
                    {sec.duration}
                  </Badge>
                </div>

                {/* 1. Core Lecture Explanation (Samjhaya Gaya Part) */}
                <div style={{ marginBottom: '18px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--color-primary-emerald)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <BookOpen size={14} /> Instructor's Concept Delivery & Detailed Explanation
                  </span>
                  <div style={{ backgroundColor: '#FBFBFA', border: '1px solid var(--color-border-light)', borderLeft: '4px solid var(--color-primary-emerald)', padding: '16px 18px', borderRadius: '0 8px 8px 0' }}>
                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-text-main)', margin: 0 }}>
                      {sec.detailedExplanation || sec.summary}
                    </p>
                  </div>
                </div>

                {/* 2. Real-World Analogy & Mental Model */}
                {sec.realWorldAnalogy && (
                  <div style={{ marginBottom: '18px', backgroundColor: '#F0FDFA', border: '1px solid #CCFBF1', borderLeft: '4px solid #0F766E', padding: '14px 18px', borderRadius: '0 8px 8px 0' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F766E', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <BookOpen size={14} color="#0F766E" /> Real-World Analogy & Mental Model
                    </span>
                    <p style={{ fontSize: '13.5px', color: '#134E4A', lineHeight: 1.6, margin: 0 }}>
                      {sec.realWorldAnalogy}
                    </p>
                  </div>
                )}

                {/* 3. Core Technical Checkpoints & Explanations */}
                <div style={{ marginBottom: '18px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--color-primary-emerald)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <CheckCircle2 size={13} /> Key Technical Checkpoints & Explanations:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sec.keyPoints.map((kp, kidx) => {
                      const { title, explanation } = parseKeyPoint(kp);
                      return (
                        <div
                          key={kidx}
                          style={{
                            padding: '12px 16px',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid var(--color-border-light)',
                            borderLeft: '3px solid var(--color-primary-emerald)',
                            borderRadius: '0 8px 8px 0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F766E', backgroundColor: '#CCFBF1', padding: '2px 6px', borderRadius: '4px', flexShrink: 0 }}>
                              {idx + 1}.{kidx + 1}
                            </span>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                              {title}
                            </span>
                          </div>
                          {explanation && (
                            <p style={{ fontSize: '13px', color: '#475569', margin: '2px 0 0 28px', lineHeight: 1.6 }}>
                              {explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                  {/* 4. Classroom Socratic Discussion Prompt */}
                  <div style={{ marginBottom: '14px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderLeft: '4px solid #16A34A', padding: '12px 16px', borderRadius: '0 8px 8px 0' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#15803D', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <HelpCircle size={14} color="#16A34A" /> Socratic Question to Ask the Class
                    </span>
                    <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#166534', margin: 0 }}>
                      "{sec.discussionPrompt}"
                    </p>
                  </div>

                  {/* 5. Teacher Delivery Tip */}
                  {sec.teachingTips && (
                    <div style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '12.5px', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, color: '#0F766E' }}>Delivery Tip:</span>
                      <span>{sec.teachingTips}</span>
                    </div>
                  )}
                </Card>
              ))}
          </div>

          {/* BOTTOM TWO ACTIONS (EXACTLY AS REQUESTED BY USER) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', padding: '20px 24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', flexWrap: 'wrap', gap: '14px' }}>
            <Button variant="secondary" onClick={() => setStep(2)}>
              ← Back to Step 2 (Lecture Structure)
            </Button>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {/* Option 2: PDF of the explained lecture */}
              <Button
                variant="secondary"
                size="lg"
                icon={<Download size={18} />}
                onClick={handleDownloadPDF}
              >
                Download Lecture PDF
              </Button>

              {/* Option 1: Step 4 Slides */}
              <Button
                variant="primary"
                size="lg"
                icon={<Presentation size={18} />}
                onClick={handleProceedToSlides}
              >
                Proceed to Step 4 — Slides →
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: PRESENTATION SLIDES */}
      {step === 4 && plan && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header Card with Template Selector & Quick Controls */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Presentation size={20} color="var(--color-primary-emerald)" />
                  <h2 className="text-h2" style={{ margin: 0 }}>Step 4 — Presentation Slides</h2>
                </div>
                <p className="text-body" style={{ margin: 0 }}>
                  Interactive lecture slides auto-generated from your approved curriculum and detailed explanations.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Maximize2 size={16} />}
                  onClick={() => setIsFullscreen(true)}
                >
                  Present Fullscreen
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Download size={16} />}
                  onClick={handleDownloadSlides}
                >
                  Download Slides
                </Button>
              </div>
            </div>

            {/* Template Selector Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid var(--color-border-light)' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Slide Theme:
              </span>
              {templates.map(tmpl => {
                const isSelected = selectedTemplate === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: isSelected ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                      backgroundColor: isSelected ? 'var(--color-mint-bg)' : '#FFFFFF',
                      color: isSelected ? 'var(--color-primary-emerald)' : 'var(--color-text-main)',
                      fontSize: '12.5px',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: tmpl.accent }} />
                    {tmpl.name}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Slide Deck Studio Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px' }}>
            {/* Slide Filmstrip / Navigation */}
            <Card style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '580px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)' }}>
                  Slides ({slides.length})
                </span>
                <Badge variant="neutral">
                  Slide {activeSlideIndex + 1}/{slides.length}
                </Badge>
              </div>

              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: activeSlideIndex === idx ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                    backgroundColor: activeSlideIndex === idx ? 'var(--color-mint-bg)' : '#FAFAF9',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: 800, color: activeSlideIndex === idx ? 'var(--color-primary-emerald)' : 'var(--color-text-muted)' }}>
                      SLIDE {idx + 1}
                    </span>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                      {s.layout}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {s.title}
                  </span>
                </div>
              ))}
            </Card>

            {/* Slide Display & Speaker Notes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* 16:9 Canvas */}
              {activeSlide && (
                <div
                  style={{
                    aspectRatio: '16/9',
                    width: '100%',
                    backgroundColor: activeTemplateObj.bg,
                    color: activeTemplateObj.textColor,
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-md)',
                    padding: '40px 48px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'inline-block', width: '36px', height: '4px', backgroundColor: activeTemplateObj.accent, borderRadius: '2px', marginBottom: '14px' }} />
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em', opacity: 0.7, textTransform: 'uppercase', marginBottom: '8px' }}>
                      {plan.subject} • {plan.topic}
                    </span>
                    <h2 style={{ fontSize: '26px', fontWeight: 800, color: activeTemplateObj.textColor, marginBottom: '22px', lineHeight: 1.25 }}>
                      {activeSlide.title}
                    </h2>

                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '22px' }}>
                      {activeSlide.content.map((bullet, bIdx) => (
                        <li key={bIdx} style={{ fontSize: '16px', lineHeight: 1.5, opacity: 0.95 }}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Canvas Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(120, 113, 108, 0.2)', paddingTop: '14px', marginTop: '16px' }}>
                    <span style={{ fontSize: '11.5px', opacity: 0.75, fontWeight: 600 }}>
                      Slide {activeSlideIndex + 1} of {slides.length}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={activeSlideIndex === 0}
                        onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                        icon={<ChevronLeft size={16} />}
                      >
                        Prev
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={activeSlideIndex === slides.length - 1}
                        onClick={() => setActiveSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
                        icon={<ChevronRight size={16} />}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Speaker Notes Drawer */}
              {activeSlide?.notes && (
                <Card style={{ backgroundColor: '#FBFBFA', borderLeft: '4px solid var(--color-primary-emerald)', padding: '16px 20px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary-emerald)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <BookOpen size={14} /> Instructor Speaker Notes & Discussion Cues for this Slide
                  </span>
                  <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', margin: 0, whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                    {activeSlide.notes}
                  </p>
                </Card>
              )}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', padding: '20px 24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', flexWrap: 'wrap', gap: '14px' }}>
            <Button variant="secondary" onClick={() => setStep(3)}>
              ← Back to Step 3 (Lecture Explanation)
            </Button>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button
                variant="secondary"
                size="lg"
                icon={<Download size={18} />}
                onClick={handleDownloadPDF}
              >
                Download Lecture PDF
              </Button>

              <Button
                variant="primary"
                size="lg"
                icon={<Download size={18} />}
                onClick={handleDownloadSlides}
              >
                Download Slide Deck
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Presenter Modal */}
      {isFullscreen && activeSlide && (
        <Modal
          isOpen={isFullscreen}
          onClose={() => setIsFullscreen(false)}
          title={`Presenting: ${plan?.topic || 'Lecture Deck'}`}
          maxWidth="960px"
        >
          <div
            style={{
              aspectRatio: '16/9',
              width: '100%',
              backgroundColor: activeTemplateObj.bg,
              color: activeTemplateObj.textColor,
              borderRadius: 'var(--radius-lg)',
              padding: '50px 60px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'inline-block', width: '40px', height: '5px', backgroundColor: activeTemplateObj.accent, borderRadius: '2px', marginBottom: '20px' }} />
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: activeTemplateObj.textColor, marginBottom: '26px' }}>
                {activeSlide.title}
              </h1>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '26px' }}>
                {activeSlide.content.map((bullet, bIdx) => (
                  <li key={bIdx} style={{ fontSize: '19px', lineHeight: 1.5, opacity: 0.95 }}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(120, 113, 108, 0.2)', paddingTop: '18px' }}>
              <span style={{ fontSize: '13px', opacity: 0.8, fontWeight: 600 }}>
                Slide {activeSlideIndex + 1} of {slides.length}
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                  size="md"
                  variant="secondary"
                  disabled={activeSlideIndex === 0}
                  onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                  icon={<ChevronLeft size={18} />}
                >
                  Previous
                </Button>
                <Button
                  size="md"
                  variant="primary"
                  disabled={activeSlideIndex === slides.length - 1}
                  onClick={() => setActiveSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
                  icon={<ChevronRight size={18} />}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

