import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CompetitionSession, ObjectiveQuestion } from '../../types';
import {
  Trophy,
  Users,
  CheckCircle2,
  ArrowRight,
  Plus,
  Trash2,
  QrCode,
  Check,
  BookOpen,
  RefreshCw,
  HelpCircle,
  FileQuestion
} from 'lucide-react';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';
import { Badge } from '../common/Badge';

export const CompetitionCreate: React.FC = () => {
  const { role, addCompetition, setCompetitionView, setTeacherView, showToast } = useApp();

  const [title, setTitle] = useState('National Rapid Fire Arena Showdown');
  const [format, setFormat] = useState<'simple' | 'game_style'>('game_style');
  const [teamFormation, setTeamFormation] = useState<'auto' | 'self_select' | 'host_assigned'>('auto');
  const [questionSource, setQuestionSource] = useState<'ai' | 'manual'>('ai');
  const [timePerQuestion, setTimePerQuestion] = useState(25);

  // Auto Generator State
  const [autoSubject, setAutoSubject] = useState('Computer Science');
  const [autoTopic, setAutoTopic] = useState('TCP Congestion Control & Network Protocols');
  const [autoQuestionCount, setAutoQuestionCount] = useState<number>(4);
  const [autoDifficulty, setAutoDifficulty] = useState('Standard');
  const [isGenerating, setIsGenerating] = useState(false);

  const [questions, setQuestions] = useState<ObjectiveQuestion[]>([
    {
      id: 'cq-1',
      type: 'mcq',
      question: 'Which symmetric cipher algorithm was standardized by NIST to replace DES in 2001?',
      options: ['Blowfish', 'Rijndael (AES)', 'ChaCha20', 'RC4'],
      correctAnswer: 'Rijndael (AES)',
      explanation: 'The Belgian design Rijndael was selected as AES.'
    },
    {
      id: 'cq-2',
      type: 'mcq',
      question: 'In TCP congestion control, which state corresponds to probe transmission at 1.25x / 0.75x pacing?',
      options: ['Slow Start', 'ProbeBW', 'Fast Recovery', 'ProbeRTT'],
      correctAnswer: 'ProbeBW',
      explanation: 'Google BBR uses ProbeBW to test bottleneck capacity.'
    }
  ]);

  const handleAutoGenerateQuestions = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let generated: ObjectiveQuestion[] = [];
      const topicLower = (autoTopic + ' ' + autoSubject).toLowerCase();

      if (topicLower.includes('tcp') || topicLower.includes('net') || topicLower.includes('cs') || topicLower.includes('computer')) {
        generated = [
          {
            id: `aq-${Date.now()}-1`,
            type: 'mcq',
            question: 'Which TCP algorithm operates independently of RTT by using wall-clock time in its cubic growth function?',
            options: ['TCP Reno', 'CUBIC', 'TCP Tahoe', 'TCP Vegas'],
            correctAnswer: 'CUBIC',
            explanation: 'CUBIC uses a cubic window function driven by real elapsed time t, preventing unfair RTT bias.'
          },
          {
            id: `aq-${Date.now()}-2`,
            type: 'mcq',
            question: 'What physical quantities does Google BBR independently estimate to cap in-flight data at 1x BDP?',
            options: ['Bottleneck Bandwidth & Minimum RTT', 'Packet Loss Rate & Queue Size', 'Window Size & Congestion Threshold', 'ACK Arrival Jitter & Hop Count'],
            correctAnswer: 'Bottleneck Bandwidth & Minimum RTT',
            explanation: 'BBR measures BtlBw (bottleneck bandwidth) and RTprop (minimum wire delay) to drain queues to zero.'
          },
          {
            id: `aq-${Date.now()}-3`,
            type: 'mcq',
            question: 'What network crisis occurs when oversized router FIFO buffers create catastrophic latency without increasing throughput?',
            options: ['Bufferbloat', 'TCP Silly Window Syndrome', 'SYN Flood Attack', 'Jitter Accumulation'],
            correctAnswer: 'Bufferbloat',
            explanation: 'Bufferbloat happens when excessive buffering holds packets for hundreds of milliseconds at bottleneck links.'
          },
          {
            id: `aq-${Date.now()}-4`,
            type: 'mcq',
            question: 'In standard drop-tail queuing, what phenomenon causes concurrent TCP flows to simultaneously halve their windows?',
            options: ['TCP Global Synchronization', 'Fast Retransmit Collapse', 'Exponential Backoff Desync', 'SACK Deadlock'],
            correctAnswer: 'TCP Global Synchronization',
            explanation: 'Tail-drop buffers drop incoming packets across all flows at once, triggering synchronous backoff.'
          },
          {
            id: `aq-${Date.now()}-5`,
            type: 'mcq',
            question: 'During TCP Slow Start, how does the congestion window (cwnd) grow upon receiving each valid ACK?',
            options: ['Doubles every RTT (exponential growth)', 'Increases by 1 MSS per RTT (linear)', 'Triples every RTT', 'Scales cubically based on wall-clock time'],
            correctAnswer: 'Doubles every RTT (exponential growth)',
            explanation: 'Each ACK adds 1 MSS to cwnd, resulting in an effective doubling of the transmission window every round-trip.'
          },
          {
            id: `aq-${Date.now()}-6`,
            type: 'mcq',
            question: 'What metric triggers TCP Fast Retransmit without waiting for an expensive retransmission timeout (RTO)?',
            options: ['Three duplicate ACKs', 'One negative ACK (NACK)', 'Buffer queue warning flag', 'RTT surge exceeding 500ms'],
            correctAnswer: 'Three duplicate ACKs',
            explanation: 'Receipt of 3 duplicate ACKs indicates a specific packet was lost while subsequent packets arrived out of order.'
          }
        ];
      } else if (topicLower.includes('bio') || topicLower.includes('cell')) {
        generated = [
          {
            id: `aq-${Date.now()}-1`,
            type: 'mcq',
            question: 'Which organelle serves as the primary site of cellular ATP synthesis via oxidative phosphorylation?',
            options: ['Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'Lysosome'],
            correctAnswer: 'Mitochondria',
            explanation: 'Mitochondria generate the vast majority of cellular ATP via the electron transport chain.'
          },
          {
            id: `aq-${Date.now()}-2`,
            type: 'mcq',
            question: 'In molecular genetics, which enzyme unwinds the double helix DNA during replication?',
            options: ['DNA Helicase', 'DNA Ligase', 'RNA Polymerase', 'Topoisomerase'],
            correctAnswer: 'DNA Helicase',
            explanation: 'DNA Helicase breaks hydrogen bonds between nitrogenous base pairs to separate the two strands.'
          },
          {
            id: `aq-${Date.now()}-3`,
            type: 'mcq',
            question: 'Which stage of cellular respiration produces the highest net yield of ATP molecules per glucose molecule?',
            options: ['Oxidative Phosphorylation', 'Glycolysis', 'Citric Acid Cycle', 'Fermentation'],
            correctAnswer: 'Oxidative Phosphorylation',
            explanation: 'Oxidative phosphorylation produces approximately 26 to 28 ATP molecules per glucose molecule.'
          },
          {
            id: `aq-${Date.now()}-4`,
            type: 'mcq',
            question: 'What is the primary role of chlorophyll during the light-dependent reactions of photosynthesis?',
            options: ['Absorbing photon energy to excite electrons', 'Fixing atmospheric CO2 into sugars', 'Hydrolyzing sucrose into glucose', 'Regulating stomatal opening and closing'],
            correctAnswer: 'Absorbing photon energy to excite electrons',
            explanation: 'Chlorophyll pigments absorb sunlight to energize electrons in photosystems II and I.'
          }
        ];
      } else if (topicLower.includes('chem')) {
        generated = [
          {
            id: `aq-${Date.now()}-1`,
            type: 'mcq',
            question: 'According to Le Chatelier\'s Principle, how does increasing system pressure affect an exothermic gas reaction with fewer moles of gas on the product side?',
            options: ['Shifts equilibrium toward products', 'Shifts equilibrium toward reactants', 'No shift in equilibrium position', 'Decreases the rate constant K_eq'],
            correctAnswer: 'Shifts equilibrium toward products',
            explanation: 'Increasing pressure shifts equilibrium toward the side with fewer gas moles to relieve pressure.'
          },
          {
            id: `aq-${Date.now()}-2`,
            type: 'mcq',
            question: 'What orbital hybridization is characteristic of the central carbon in a planar alkene (C=C) double bond?',
            options: ['sp2', 'sp3', 'sp', 'dsp3'],
            correctAnswer: 'sp2',
            explanation: 'Trigonal planar carbon atoms with one pi bond and three sigma bonds exhibit sp2 hybridization.'
          },
          {
            id: `aq-${Date.now()}-3`,
            type: 'mcq',
            question: 'How does a chemical catalyst accelerate a reaction without altering the overall thermodynamic equilibrium constant?',
            options: ['By providing an alternate reaction pathway with lower activation energy', 'By increasing the average kinetic energy of reactant molecules', 'By increasing the reaction temperature', 'By changing the delta H of the reaction'],
            correctAnswer: 'By providing an alternate reaction pathway with lower activation energy',
            explanation: 'Catalysts lower the activation energy barrier for both forward and reverse reactions equally.'
          },
          {
            id: `aq-${Date.now()}-4`,
            type: 'mcq',
            question: 'Which intermolecular force accounts for the exceptionally high boiling point of water relative to other group 16 hydrides?',
            options: ['Hydrogen Bonding', 'London Dispersion Forces', 'Dipole-Induced Dipole', 'Ion-Dipole Forces'],
            correctAnswer: 'Hydrogen Bonding',
            explanation: 'Strong hydrogen bonds between electronegative oxygen and hydrogen create high boiling point cohesion.'
          }
        ];
      } else if (topicLower.includes('phys')) {
        generated = [
          {
            id: `aq-${Date.now()}-1`,
            type: 'mcq',
            question: 'Which conservation law directly underpins Kirchhoff\'s Current Law (junction rule) in electrical circuits?',
            options: ['Conservation of Electric Charge', 'Conservation of Energy', 'Conservation of Momentum', 'Gauss\'s Law of Magnetism'],
            correctAnswer: 'Conservation of Electric Charge',
            explanation: 'Charge cannot accumulate at an infinitesimal node; total current entering must equal total current leaving.'
          },
          {
            id: `aq-${Date.now()}-2`,
            type: 'mcq',
            question: 'In special relativity, what happens to the measured relativistic mass of an object as its speed approaches the speed of light c?',
            options: ['Approaches infinity', 'Approaches zero', 'Remains constant at rest mass', 'Decreases logarithmically'],
            correctAnswer: 'Approaches infinity',
            explanation: 'The Lorentz factor gamma diverges toward infinity as v approaches c.'
          },
          {
            id: `aq-${Date.now()}-3`,
            type: 'mcq',
            question: 'What physical quantity is represented by the area under a Force vs. Time (F vs. t) graph?',
            options: ['Impulse (Change in Momentum)', 'Work Done (Kinetic Energy)', 'Instantaneous Power', 'Total Acceleration'],
            correctAnswer: 'Impulse (Change in Momentum)',
            explanation: 'The definite integral of Force with respect to time equals impulse: J = integral F dt = delta p.'
          },
          {
            id: `aq-${Date.now()}-4`,
            type: 'mcq',
            question: 'What thermodynamic law states that the total entropy of an isolated system can never decrease over time?',
            options: ['Second Law of Thermodynamics', 'First Law of Thermodynamics', 'Third Law of Thermodynamics', 'Zeroth Law of Thermodynamics'],
            correctAnswer: 'Second Law of Thermodynamics',
            explanation: 'The Second Law dictates that delta S_universe >= 0 for all spontaneous physical processes.'
          }
        ];
      } else {
        generated = [
          {
            id: `aq-${Date.now()}-1`,
            type: 'mcq',
            question: `What is the core fundamental principle governing ${autoTopic || 'this academic subject'}?`,
            options: ['Axiomatic Foundation & Evidence-based Analysis', 'Random Empirical Observation', 'Rote Memorization of Historic Anecdotes', 'Unregulated Variable Induction'],
            correctAnswer: 'Axiomatic Foundation & Evidence-based Analysis',
            explanation: 'Rigorous analysis relies on first principles and verifiable experimental observations.'
          },
          {
            id: `aq-${Date.now()}-2`,
            type: 'mcq',
            question: `Which methodology is standard when evaluating practical applications of ${autoTopic || 'this discipline'}?`,
            options: ['Quantitative modeling and controlled testing', 'Arbitrary trial without metric baselines', 'Subjective preference without review', 'Ignoring boundary conditions'],
            correctAnswer: 'Quantitative modeling and controlled testing',
            explanation: 'Standard scientific and academic methodologies require controlled evaluation and repeatable testing.'
          },
          {
            id: `aq-${Date.now()}-3`,
            type: 'mcq',
            question: `How do practitioners isolate primary variables when studying ${autoTopic || 'this topic'}?`,
            options: ['Controlling confounding factors and reference frames', 'Altering all parameters simultaneously', 'Neglecting measurement error', 'Assuming ideal state at all times'],
            correctAnswer: 'Controlling confounding factors and reference frames',
            explanation: 'Controlled experiments isolate independent variables to determine causal relationships.'
          },
          {
            id: `aq-${Date.now()}-4`,
            type: 'mcq',
            question: `What is the primary trade-off encountered when optimizing systems in ${autoTopic || 'this domain'}?`,
            options: ['Efficiency vs. Robustness under edge conditions', 'Infinite throughput with zero cost', 'Complete accuracy without observation', 'Total certainty without data'],
            correctAnswer: 'Efficiency vs. Robustness under edge conditions',
            explanation: 'Real-world academic and engineering systems constantly balance performance against operational resilience.'
          }
        ];
      }

      setQuestions(generated.slice(0, autoQuestionCount));
      setIsGenerating(false);
      showToast(`${generated.slice(0, autoQuestionCount).length} questions generated for "${autoTopic}"!`);
    }, 600);
  };

  const handleAddManualQuestion = (type: 'mcq' | 'true_false') => {
    const id = `mq-${Date.now()}`;
    if (type === 'mcq') {
      setQuestions(prev => [
        ...prev,
        {
          id,
          type: 'mcq',
          question: '',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'Option A',
          explanation: ''
        }
      ]);
      showToast('New MCQ question added. Fill in question text and options.');
    } else {
      setQuestions(prev => [
        ...prev,
        {
          id,
          type: 'true_false',
          question: '',
          options: ['True', 'False'],
          correctAnswer: 'True',
          explanation: ''
        }
      ]);
      showToast('New True/False question added.');
    }
  };

  const handleUpdateQuestion = (id: string, updates: Partial<ObjectiveQuestion>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const handleUpdateOption = (questionId: string, optionIndex: number, newValue: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id !== questionId || !q.options) return q;
      const newOptions = [...q.options];
      const oldVal = newOptions[optionIndex];
      newOptions[optionIndex] = newValue;
      const updatedCorrect = q.correctAnswer === oldVal ? newValue : q.correctAnswer;
      return { ...q, options: newOptions, correctAnswer: updatedCorrect };
    }));
  };

  const handleDeleteQuestion = (id: string) => {
    if (questions.length <= 1) {
      showToast('A competition must have at least one question.', 'error');
      return;
    }
    setQuestions(prev => prev.filter(q => q.id !== id));
    showToast('Question removed.');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const randomPin = Math.floor(100000 + Math.random() * 900000).toString();
    const newComp: CompetitionSession = {
      id: `comp-${Date.now()}`,
      title,
      code: randomPin,
      status: 'lobby',
      format,
      teamFormation,
      participantsCount: 1,
      currentQuestionIndex: 0,
      totalQuestions: questions.length,
      timePerQuestion,
      timeRemaining: timePerQuestion,
      isPaused: false,
      questions,
      participants: [
        { id: 'p-host', name: 'Organizer (Host)', avatar: 'ORG', score: 0, streak: 0 }
      ]
    };

    addCompetition(newComp);
    if (role === 'teacher') {
      setTeacherView('dashboard');
      showToast(`Competition "${title}" created with PIN ${randomPin}`);
    } else {
      setCompetitionView('lobby');
      showToast(`Competition lobby created with PIN ${randomPin}`);
    }
  };

  const isDark = role === 'competition';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '880px', margin: '0 auto' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="competition-badge">STEP 1 TO 4</span>
          <span style={{ fontSize: '12.5px', fontWeight: 700, color: isDark ? '#99F6E4' : 'var(--color-primary-emerald)' }}>
            Tournament Setup
          </span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: isDark ? '#FFFFFF' : 'var(--color-text-main)', margin: 0 }}>
          Create Standalone Competition
        </h1>
        <p style={{ fontSize: '13.5px', color: isDark ? '#CCFBF1' : 'var(--color-text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
          Configure live session format, tournament rules, team assignment mode, and generate guest join credentials.
        </p>
      </div>

      <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Step 1: Tournament Details */}
        <div className="competition-card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '12px' }}>
            1. Tournament Details
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input
              label="Competition Title *"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. National Arena Showdown"
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div
                onClick={() => setFormat('game_style')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: format === 'game_style' ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                  backgroundColor: format === 'game_style' ? 'var(--color-mint-bg)' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--color-text-main)', display: 'block' }}>
                  Game-Style Showdown ⚡
                </span>
                <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
                  High-speed countdown, dynamic streak bonuses, and live animated podium ceremonies.
                </span>
              </div>

              <div
                onClick={() => setFormat('simple')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: format === 'simple' ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                  backgroundColor: format === 'simple' ? 'var(--color-mint-bg)' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--color-text-main)', display: 'block' }}>
                  Simple Tournament
                </span>
                <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
                  Linear academic pacing with static point scores and post-event results.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Team Formation */}
        <div className="competition-card">
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '14px' }}>
            2. Team Formation
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { id: 'auto', name: 'Auto-Balanced', desc: 'System automatically balances participants into color squads.' },
              { id: 'self_select', name: 'Self-Select', desc: 'Participants select their own team during lobby entry.' },
              { id: 'host_assigned', name: 'Host-Assigned', desc: 'Host drags & drops players into designated team brackets.' }
            ].map(tf => (
              <div
                key={tf.id}
                onClick={() => setTeamFormation(tf.id as any)}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: teamFormation === tf.id ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                  backgroundColor: teamFormation === tf.id ? 'var(--color-mint-bg)' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--color-text-main)', display: 'block' }}>
                  {tf.name}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
                  {tf.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Objective Questions (Auto Generator vs Manual Entry) */}
        <div className="competition-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
                3. Objective Questions ({questions.length})
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', margin: '3px 0 0 0' }}>
                {questionSource === 'ai'
                  ? 'Auto-generate structured questions with accurate options and answers based on subject and topic.'
                  : 'Manually write custom questions, add options, mark correct answers, and provide explanations.'}
              </p>
            </div>

            {/* TOGGLE BUTTONS (Highlighted in User's Screenshot) */}
            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '8px', padding: '3px', border: '1px solid var(--color-border-light)' }}>
              <button
                type="button"
                onClick={() => setQuestionSource('ai')}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: questionSource === 'ai' ? 'var(--color-primary-emerald)' : 'transparent',
                  color: questionSource === 'ai' ? '#FFFFFF' : '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: questionSource === 'ai' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <RefreshCw size={13} /> Auto Generator
              </button>
              <button
                type="button"
                onClick={() => setQuestionSource('manual')}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: questionSource === 'manual' ? 'var(--color-primary-emerald)' : 'transparent',
                  color: questionSource === 'manual' ? '#FFFFFF' : '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: questionSource === 'manual' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Plus size={13} /> Manual Entry
              </button>
            </div>
          </div>

          {/* 1. AUTO GENERATOR CONFIGURATION & PREVIEW */}
          {questionSource === 'ai' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Configuration Box */}
              <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary-emerald)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      ⚡ Auto Generator Mode Active
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      — Enter your discipline & topic to generate curated competition questions
                    </span>
                  </div>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F766E', backgroundColor: '#CCFBF1', padding: '3px 9px', borderRadius: '12px' }}>
                    Target: {autoSubject} • {autoDifficulty}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <Select
                    label="Academic Discipline"
                    value={autoSubject}
                    onChange={e => setAutoSubject(e.target.value)}
                    options={[
                      { value: 'Computer Science', label: 'Computer Science' },
                      { value: 'Biology', label: 'Biology' },
                      { value: 'Chemistry', label: 'Chemistry' },
                      { value: 'Physics', label: 'Physics' },
                      { value: 'General Knowledge', label: 'General Knowledge & Logic' }
                    ]}
                  />

                  <Input
                    label="Target Topic or Concept"
                    value={autoTopic}
                    onChange={e => setAutoTopic(e.target.value)}
                    placeholder="e.g. TCP Congestion Control, Photosynthesis, Thermodynamics..."
                  />

                  <Select
                    label="Question Count"
                    value={autoQuestionCount.toString()}
                    onChange={e => setAutoQuestionCount(Number(e.target.value))}
                    options={[
                      { value: '4', label: '4 Questions' },
                      { value: '6', label: '6 Questions' },
                      { value: '8', label: '8 Questions' }
                    ]}
                  />

                  <Select
                    label="Difficulty"
                    value={autoDifficulty}
                    onChange={e => setAutoDifficulty(e.target.value)}
                    options={[
                      { value: 'Standard', label: 'Standard' },
                      { value: 'Advanced', label: 'Advanced' },
                      { value: 'Championship', label: 'Championship' }
                    ]}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    icon={<RefreshCw size={15} />}
                    onClick={handleAutoGenerateQuestions}
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating Tournament Questions...' : '⚡ Generate Tournament Questions'}
                  </Button>
                </div>
              </div>

              {/* Generated Questions List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    Generated Questions ({questions.length}):
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Review questions, correct answer badges, and explanations below
                  </span>
                </div>

                {questions.length === 0 ? (
                  <div style={{
                    padding: '36px 20px',
                    textAlign: 'center',
                    backgroundColor: '#F8FAFC',
                    border: '2px dashed var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <RefreshCw size={24} color="#0F766E" />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      No Questions Generated Yet
                    </span>
                    <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', maxWidth: '400px' }}>
                      Select your discipline and topic above, then click <strong>"Generate Tournament Questions"</strong> to populate tournament questions.
                    </span>
                  </div>
                ) : (
                  questions.map((q, idx) => (
                    <div
                      key={q.id}
                      style={{
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FAFAF9',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#CCFBF1', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                            {idx + 1}
                          </span>
                          <Badge variant="emerald">{q.type.toUpperCase()}</Badge>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteQuestion(q.id)}
                          style={{ background: 'transparent', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '4px' }}
                          title="Delete this question"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                        {q.question}
                      </div>

                      {/* Options Grid */}
                      {q.options && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                          {q.options.map((opt, oIdx) => {
                            const isCorrect = q.correctAnswer === opt;
                            return (
                              <div
                                key={oIdx}
                                style={{
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  border: isCorrect ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border-light)',
                                  backgroundColor: isCorrect ? '#F0FDFA' : '#FFFFFF',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  fontSize: '13px'
                                }}
                              >
                                <span style={{ fontWeight: isCorrect ? 700 : 500, color: isCorrect ? '#0F766E' : 'var(--color-text-main)' }}>
                                  {opt}
                                </span>
                                {isCorrect && (
                                  <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#0F766E', backgroundColor: '#CCFBF1', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    <Check size={11} /> Correct
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Explanation */}
                      {q.explanation && (
                        <div style={{ backgroundColor: '#F0FDFA', border: '1px solid #CCFBF1', borderLeft: '3px solid #0F766E', padding: '8px 12px', borderRadius: '4px', fontSize: '12.5px', color: '#134E4A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <BookOpen size={13} color="#0F766E" />
                          <span><strong>Concept Note:</strong> {q.explanation}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 2. MANUAL ENTRY BUILDER */}
          {questionSource === 'manual' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Action Toolbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary-emerald)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      ✍️ Manual Question Builder Active
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      ({questions.length} Question{questions.length === 1 ? '' : 's'})
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '3px 0 0 0' }}>
                    Write custom questions, set choices, click <strong>"Mark Correct"</strong> on the right answer, and add explanations.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    icon={<Plus size={14} />}
                    onClick={() => handleAddManualQuestion('mcq')}
                  >
                    + Add MCQ Question
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    icon={<Plus size={14} />}
                    onClick={() => handleAddManualQuestion('true_false')}
                  >
                    + Add True/False
                  </Button>
                </div>
              </div>

              {/* Editable Question Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {questions.length === 0 ? (
                  <div style={{
                    padding: '36px 20px',
                    textAlign: 'center',
                    backgroundColor: '#F8FAFC',
                    border: '2px dashed var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#CCFBF1', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Plus size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>No Questions Added Yet</h4>
                      <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '4px 0 0 0', maxWidth: '440px' }}>
                        Start creating your tournament questions by clicking <strong>"+ Add MCQ Question"</strong> or <strong>"+ Add True/False"</strong> above.
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                      <Button type="button" variant="primary" size="sm" icon={<Plus size={14} />} onClick={() => handleAddManualQuestion('mcq')}>
                        + Add MCQ Question
                      </Button>
                      <Button type="button" variant="secondary" size="sm" icon={<Plus size={14} />} onClick={() => handleAddManualQuestion('true_false')}>
                        + Add True/False
                      </Button>
                    </div>
                  </div>
                ) : (
                  questions.map((q, idx) => (
                    <div
                      key={q.id}
                      style={{
                        padding: '18px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#CCFBF1', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                            {idx + 1}
                          </span>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                            Question #{idx + 1}
                          </span>
                          <Badge variant="emerald">{q.type.toUpperCase()}</Badge>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteQuestion(q.id)}
                          style={{ background: 'transparent', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '4px' }}
                          title="Delete question"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                    <Input
                      label="Question Text *"
                      placeholder="e.g. Which algorithm prevents bufferbloat by maintaining 1x BDP in-flight?"
                      value={q.question}
                      onChange={e => handleUpdateQuestion(q.id, { question: e.target.value })}
                      required
                    />

                    {/* MCQ Options with Mark Correct Toggle */}
                    {q.type === 'mcq' && q.options && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                          Answer Options (Click "Mark Correct" to select the winning answer):
                        </span>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          {q.options.map((opt, optIdx) => {
                            const isCorrect = q.correctAnswer === opt;
                            return (
                              <div
                                key={optIdx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '8px 10px',
                                  borderRadius: '6px',
                                  border: isCorrect ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                                  backgroundColor: isCorrect ? '#F0FDFA' : '#FAFAF9'
                                }}
                              >
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', width: '20px' }}>
                                  {String.fromCharCode(65 + optIdx)}.
                                </span>
                                <input
                                  type="text"
                                  className="input-field"
                                  style={{ flex: 1, padding: '6px 10px', fontSize: '13px' }}
                                  value={opt}
                                  onChange={e => handleUpdateOption(q.id, optIdx, e.target.value)}
                                  placeholder={`Option ${optIdx + 1}`}
                                  required
                                />
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQuestion(q.id, { correctAnswer: opt })}
                                  style={{
                                    padding: '5px 10px',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    backgroundColor: isCorrect ? '#0F766E' : '#E2E8F0',
                                    color: isCorrect ? '#FFFFFF' : '#475569',
                                    whiteSpace: 'nowrap',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '3px'
                                  }}
                                >
                                  {isCorrect ? <><Check size={11} /> Correct</> : 'Mark Correct'}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* True / False Options */}
                    {q.type === 'true_false' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                          Select Correct Answer:
                        </span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          {['True', 'False'].map(val => {
                            const isCorrect = q.correctAnswer === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => handleUpdateQuestion(q.id, { correctAnswer: val })}
                                style={{
                                  padding: '8px 24px',
                                  borderRadius: '6px',
                                  fontSize: '13px',
                                  fontWeight: 700,
                                  border: isCorrect ? '2px solid #0F766E' : '1px solid var(--color-border)',
                                  backgroundColor: isCorrect ? '#0F766E' : '#FFFFFF',
                                  color: isCorrect ? '#FFFFFF' : 'var(--color-text-main)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px'
                                }}
                              >
                                {isCorrect && <Check size={13} />}
                                {val}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <Input
                      label="Concept Explanation (Displayed to students in post-question review)"
                      placeholder="e.g. BBR measures bottleneck bandwidth and propagation delay to eliminate bufferbloat."
                      value={q.explanation}
                      onChange={e => handleUpdateQuestion(q.id, { explanation: e.target.value })}
                    />
                  </div>
                ))
              )}
              </div>
            </div>
          )}
        </div>

        {/* Step 4 & 5: Publish & Share Code */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button
            variant="secondary"
            type="button"
            onClick={() => role === 'teacher' ? setTeacherView('dashboard') : setCompetitionView('dashboard')}
          >
            Cancel
          </Button>
          <Button
            variant={isDark ? "lime" : "primary"}
            size="lg"
            type="submit"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Publish & Open Lobby (Get PIN/QR) →
          </Button>
        </div>
      </form>
    </div>
  );
};
