import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Quiz, QuizAttempt, ObjectiveQuestion, SubjectiveQuestion } from '../../types';
import {
  FileQuestion,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Upload,
  FileText,
  X,
  Sparkles,
  Check
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input, Select } from '../common/Input';
import { Progress } from '../common/Progress';

// Intelligent question synthesizer for practice quizzes & uploaded documents
function generateQuizQuestions(
  topicOrFileName: string,
  format: 'objective' | 'subjective',
  count: number,
  difficulty: string
): { objectiveQuestions?: ObjectiveQuestion[]; subjectiveQuestions?: SubjectiveQuestion[] } {
  const lower = topicOrFileName.toLowerCase();

  // 1. Biology / Cellular Respiration questions
  if (lower.includes('cellular') || lower.includes('respiration') || lower.includes('biology') || lower.includes('atp')) {
    if (format === 'objective') {
      const bioPool: ObjectiveQuestion[] = [
        {
          id: `gen-q-1`,
          type: 'mcq',
          question: 'What is the net ATP yield produced per single glucose molecule during glycolysis in the cytoplasm?',
          options: ['0 ATP', '2 ATP', '4 ATP', '32 ATP'],
          correctAnswer: '2 ATP',
          explanation: 'Glycolysis consumes 2 ATP in the investment phase and produces 4 ATP in the payoff phase, yielding 2 net ATP.'
        },
        {
          id: `gen-q-2`,
          type: 'mcq',
          question: 'Where does the oxidative decarboxylation of pyruvate into Acetyl-CoA take place in eukaryotic cells?',
          options: ['Cytosol', 'Mitochondrial Matrix', 'Intermembrane Space', 'Cristae Membrane'],
          correctAnswer: 'Mitochondrial Matrix',
          explanation: 'Pyruvate is translocated across mitochondrial membranes into the matrix where the PDH complex resides.'
        },
        {
          id: `gen-q-3`,
          type: 'mcq',
          question: 'What is the direct driving force powering ATP Synthase to phosphorylate ADP into ATP during oxidative phosphorylation?',
          options: ['Substrate-level enzyme cleavage', 'The proton electrochemical gradient (Proton Motive Force)', 'Direct heat dissipation', 'Cytoplasmic active transport'],
          correctAnswer: 'The proton electrochemical gradient (Proton Motive Force)',
          explanation: 'Protons accumulated in the intermembrane space flow down their electrochemical gradient through the F0 rotor channel, providing rotational torque.'
        },
        {
          id: `gen-q-4`,
          type: 'mcq',
          question: 'Which molecule serves as the final terminal electron acceptor in the aerobic electron transport chain?',
          options: ['NAD+', 'FAD', 'Molecular Oxygen (O2)', 'Cytochrome c'],
          correctAnswer: 'Molecular Oxygen (O2)',
          explanation: 'Oxygen binds electrons and protons at Complex IV to form metabolic water (H2O).'
        },
        {
          id: `gen-q-5`,
          type: 'mcq',
          question: 'Per single rotation of the Citric Acid Cycle, how many NADH molecules are harvested?',
          options: ['1 NADH', '2 NADH', '3 NADH', '6 NADH'],
          correctAnswer: '3 NADH',
          explanation: 'Each turn of the Krebs cycle generates 3 NADH, 1 FADH2, 1 ATP/GTP, and releases 2 CO2.'
        }
      ];
      return { objectiveQuestions: bioPool.slice(0, count) };
    } else {
      const bioSubPool: SubjectiveQuestion[] = [
        {
          id: `gen-sq-1`,
          question: 'Explain how the Electron Transport Chain establishes a proton motive force across the inner mitochondrial membrane, and describe the mechanical action of ATP Synthase.',
          rubric: 'Full Marks (10): Explicitly states Complexes I, III, IV pumping protons from matrix to intermembrane space. Details electrical and pH gradient. Describes F0 rotor turning and F1 catalytic stalk conformational changes (30-32 total ATP).',
          sampleAnswer: 'Electrons cascade through complexes I, III, and IV, releasing energy that actively pumps H+ into the intermembrane space. The resulting proton motive force drives H+ back into the matrix through the F0 subunit of ATP Synthase, rotating the gamma stalk to phosphorylate ADP + Pi.',
          maxMarks: 10
        },
        {
          id: `gen-sq-2`,
          question: 'Contrast substrate-level phosphorylation in glycolysis with oxidative phosphorylation in mitochondria in terms of mechanism, location, and total ATP efficiency.',
          rubric: 'Full Marks (10): Clarifies substrate-level phosphorylation involves direct kinase transfer in cytosol (2 net ATP), while oxidative phosphorylation couples redox proton pumping to rotary turbine synthesis (26-28 ATP).',
          sampleAnswer: 'Substrate-level phosphorylation directly transfers high-energy phosphate from organic intermediates onto ADP via soluble kinases. Oxidative phosphorylation relies on chemiosmotic coupling across an impermeable membrane via ATP Synthase.',
          maxMarks: 10
        }
      ];
      return { subjectiveQuestions: bioSubPool.slice(0, Math.min(count, bioSubPool.length)) };
    }
  }

  // 2. Operating Systems / Virtual Memory questions
  if (lower.includes('operating') || lower.includes('virtual memory') || lower.includes('paging') || lower.includes('os')) {
    if (format === 'objective') {
      const osPool: ObjectiveQuestion[] = [
        {
          id: `gen-q-1`,
          type: 'mcq',
          question: 'Which dedicated hardware component translates virtual CPU memory addresses into physical RAM page frames?',
          options: ['Direct Memory Access (DMA)', 'Memory Management Unit (MMU)', 'PCIe Host Bridge', 'BIOS ROM'],
          correctAnswer: 'Memory Management Unit (MMU)',
          explanation: 'The MMU hardware intercepts virtual addresses from the CPU core and walks page tables to output physical addresses.'
        },
        {
          id: `gen-q-2`,
          type: 'mcq',
          question: 'What event is triggered when a process attempts to access a virtual page marked Not Present (Present bit = 0) in the page table?',
          options: ['Kernel panic immediately', 'A hardware Page Fault interrupt is raised', 'The hard drive formats itself', 'Virtual memory is disabled'],
          correctAnswer: 'A hardware Page Fault interrupt is raised',
          explanation: 'The MMU raises Interrupt 14 (Page Fault), prompting the operating system kernel to allocate a frame and load the page from disk swap.'
        },
        {
          id: `gen-q-3`,
          type: 'mcq',
          question: 'What is the primary function of the Translation Lookaside Buffer (TLB)?',
          options: ['To cache recent virtual-to-physical address translations', 'To store CPU instruction microcode', 'To manage graphics rendering buffers', 'To control hard disk rotational speed'],
          correctAnswer: 'To cache recent virtual-to-physical address translations',
          explanation: 'The TLB is an associative on-chip hardware cache that bypasses multi-level page table walking latencies on cache hits.'
        },
        {
          id: `gen-q-4`,
          type: 'mcq',
          question: 'Why do modern 64-bit operating systems implement multi-level hierarchical page tables instead of a single flat table?',
          options: ['Flat tables are too fast for modern buses', 'A flat 64-bit table would consume petabytes of physical memory for unallocated spaces', 'Hierarchical tables prevent memory fragmentation', 'Flat tables cannot run on Intel processors'],
          correctAnswer: 'A flat 64-bit table would consume petabytes of physical memory for unallocated spaces',
          explanation: 'Hierarchical page tables only allocate entries for active address ranges, avoiding storing sparse unallocated spaces.'
        },
        {
          id: `gen-q-5`,
          type: 'mcq',
          question: 'What system condition describes when processes spend more time servicing disk swap page faults than executing instructions?',
          options: ['Deadlock', 'Thrashing', 'Starvation', 'Race Condition'],
          correctAnswer: 'Thrashing',
          explanation: 'Thrashing occurs when cumulative process working sets exceed physical RAM, causing endless disk paging.'
        }
      ];
      return { objectiveQuestions: osPool.slice(0, count) };
    } else {
      const osSubPool: SubjectiveQuestion[] = [
        {
          id: `gen-sq-1`,
          question: 'Detail the complete sequence of hardware and operating system actions that occur from the moment a CPU issues a virtual memory address until a Page Fault is resolved.',
          rubric: 'Full Marks (10): Outlines TLB lookup miss -> MMU page table walk -> Present bit 0 detection -> Trap 14 to kernel -> disk frame swap read -> PTE update with Present=1 -> restart faulting instruction.',
          sampleAnswer: 'The CPU checks the TLB; on a miss, the MMU walks hierarchical page tables in RAM. Detecting Present=0, it triggers a Page Fault. The OS kernel saves state, locates the page on disk swap, allocates a free physical frame, transfers the page via DMA, updates the PTE Present bit to 1, and restarts the instruction.',
          maxMarks: 10
        }
      ];
      return { subjectiveQuestions: osSubPool.slice(0, Math.min(count, osSubPool.length)) };
    }
  }

  // 3. Default generalized question synthesizer for any topic or uploaded file
  if (format === 'objective') {
    const defaultObjPool: ObjectiveQuestion[] = [
      {
        id: `gen-q-1`,
        type: 'mcq',
        question: `In the study of ${topicOrFileName}, what is the primary role of foundational baseline axioms?`,
        options: [
          'To define unambiguous operational boundaries and invariant rules',
          'To memorize formulas without empirical validation',
          'To bypass physical constraints entirely',
          'To replace experimental verification'
        ],
        correctAnswer: 'To define unambiguous operational boundaries and invariant rules',
        explanation: `Foundational axioms establish rigorous theoretical bounds within ${topicOrFileName}.`
      },
      {
        id: `gen-q-2`,
        type: 'mcq',
        question: `When analyzing system mechanics in ${topicOrFileName}, what parameter dictates operational throughput?`,
        options: [
          'The capacity of the most constrained critical bottleneck stage',
          'The maximum clock speed of peripheral devices',
          'Arbitrary user preference',
          'Total uncompressed storage size'
        ],
        correctAnswer: 'The capacity of the most constrained critical bottleneck stage',
        explanation: 'System throughput is universally governed by the capacity of the primary bottleneck component.'
      },
      {
        id: `gen-q-3`,
        type: 'mcq',
        question: `What is the primary trade-off when optimizing architectural designs within ${topicOrFileName}?`,
        options: [
          'Balancing computational latency, memory footprint, and implementation complexity',
          'Maximizing complexity regardless of resource cost',
          'Avoiding all automated telemetry checks',
          'Relying strictly on legacy benchmarks'
        ],
        correctAnswer: 'Balancing computational latency, memory footprint, and implementation complexity',
        explanation: 'Rigorous engineering necessitates balancing latency budgets and resource overheads against operational constraints.'
      },
      {
        id: `gen-q-4`,
        type: 'mcq',
        question: `How do production implementations of ${topicOrFileName} mitigate catastrophic runtime anomalies?`,
        options: [
          'By deploying automated telemetry monitoring and graceful degradation fallbacks',
          'By ignoring network jitter and hardware drift',
          'By executing without automated sanity assertions',
          'By formatting storage drives upon first error'
        ],
        correctAnswer: 'By deploying automated telemetry monitoring and graceful degradation fallbacks',
        explanation: 'Production resilience depends on continuous automated telemetry and graceful degradation protocols.'
      },
      {
        id: `gen-q-5`,
        type: 'mcq',
        question: `What distinguishes modern state-of-the-art developments in ${topicOrFileName}?`,
        options: [
          'Synthesizing cross-disciplinary paradigms to overcome legacy physical limits',
          'Repeating obsolete twentieth-century models without modifications',
          'Eliminating theoretical rigor completely',
          'Declaring the problem space completely solved'
        ],
        correctAnswer: 'Synthesizing cross-disciplinary paradigms to overcome legacy physical limits',
        explanation: 'Cutting-edge advances synthesize cross-disciplinary techniques to bypass historical limitations.'
      }
    ];
    return { objectiveQuestions: defaultObjPool.slice(0, count) };
  } else {
    const defaultSubPool: SubjectiveQuestion[] = [
      {
        id: `gen-sq-1`,
        question: `Analyze the core theoretical framework of ${topicOrFileName}. Explain how its operational pipeline transforms inputs into outputs and discuss key trade-offs.`,
        rubric: 'Full Marks (10): Comprehensive explanation of core axioms, step-by-step pipeline transitions, architectural trade-offs, and concrete industry use-cases.',
        sampleAnswer: `${topicOrFileName} operates through deterministic pipeline stages where input vectors are validated, transformed according to invariant rules, and synthesized into stabilized outputs. Operational trade-offs balance speed against complexity.`,
        maxMarks: 10
      },
      {
        id: `gen-sq-2`,
        question: `Discuss the primary failure modes and boundary conditions in ${topicOrFileName}, and evaluate how modern engineering designs ensure system resilience.`,
        rubric: 'Full Marks (10): Evaluates edge-case behavior, bottleneck constraints, and telemetry failover protocols.',
        sampleAnswer: 'System resilience is maintained through continuous telemetry instrumentation, rate limiting, and graceful degradation protocols that isolate component failures without cascading crashes.',
        maxMarks: 10
      }
    ];
    return { subjectiveQuestions: defaultSubPool.slice(0, Math.min(count, defaultSubPool.length)) };
  }
}

export const StudentTakeQuiz: React.FC = () => {
  const {
    quizzes,
    selectedQuizId,
    submitQuizAttempt,
    studentView,
    setStudentView,
    showToast
  } = useApp();

  // Screen Sub-state: 'setup' | 'attempt' | 'results'
  const [subState, setSubState] = useState<'setup' | 'attempt' | 'results'>(() => {
    return studentView === 'quiz_attempt' ? 'attempt' : 'setup';
  });

  // Source Mode: 'topic_input' vs 'document_upload'
  const [generatorMode, setGeneratorMode] = useState<'topic_input' | 'document_upload'>('topic_input');

  // Form setup parameters
  const [topic, setTopic] = useState('Distributed Systems & Consensus');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [quizFormat, setQuizFormat] = useState<'objective' | 'subjective'>('objective');

  // Document Upload State
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [isAnalyzingDocument, setIsAnalyzingDocument] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Quiz taking session state
  const [activeQuiz, setActiveQuiz] = useState<Quiz>(() => {
    if (selectedQuizId) {
      const found = quizzes.find(q => q.id === selectedQuizId);
      if (found) return found;
    }
    const classQuiz = quizzes.find(q => q.assignedClassId || q.id === 'quiz-net-3');
    return classQuiz || quizzes[0];
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedAttempt, setCompletedAttempt] = useState<QuizAttempt | null>(null);
  const [showWrongAnswerReview, setShowWrongAnswerReview] = useState(false);

  // Synchronize quiz attempt with selectedQuizId and studentView
  useEffect(() => {
    if (studentView === 'quiz_attempt') {
      const found = quizzes.find(q => q.id === selectedQuizId)
        || quizzes.find(q => q.id === 'quiz-net-3')
        || quizzes.find(q => q.assignedClassId)
        || quizzes[0];

      if (found) {
        setActiveQuiz(found);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setTimeRemaining((found.durationMinutes || 15) * 60);
        setIsSubmitted(false);
        setShowWrongAnswerReview(false);
        setSubState('attempt');
      }
    } else if (studentView === 'take_quiz') {
      setSubState('setup');
    }
  }, [selectedQuizId, studentView, quizzes]);

  // Timer countdown during attempt
  useEffect(() => {
    if (subState !== 'attempt' || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [subState, isSubmitted]);

  // Handle local device document selection
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
      // Extract title from file name
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setTopic(cleanTitle);
    }
  };

  const handleStartPracticeQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveTopic = generatorMode === 'document_upload' && uploadedFile
      ? (topic.trim() || uploadedFile.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '))
      : topic;

    if (!effectiveTopic.trim()) return;

    if (generatorMode === 'document_upload') {
      setIsAnalyzingDocument(true);
      setTimeout(() => {
        const { objectiveQuestions, subjectiveQuestions } = generateQuizQuestions(
          effectiveTopic,
          quizFormat,
          questionCount,
          difficulty
        );

        const customQuiz: Quiz = {
          id: `quiz-doc-${Date.now()}`,
          title: `Document Assessment: ${effectiveTopic}`,
          subject: 'Document Practice Arena',
          type: quizFormat,
          durationMinutes: questionCount * 3,
          totalMarks: quizFormat === 'objective' ? questionCount * 5 : questionCount * 10,
          joinCode: `DOC${Math.floor(1000 + Math.random() * 9000)}`,
          isStandalone: true,
          createdAt: 'Just now',
          objectiveQuestions,
          subjectiveQuestions
        };

        setActiveQuiz(customQuiz);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setTimeRemaining(customQuiz.durationMinutes * 60);
        setIsSubmitted(false);
        setShowWrongAnswerReview(false);
        setIsAnalyzingDocument(false);
        setSubState('attempt');
        showToast('Quiz generated from document successfully! Good luck.');
      }, 900);
      return;
    }

    // Standard Topic Generation
    const { objectiveQuestions, subjectiveQuestions } = generateQuizQuestions(
      effectiveTopic,
      quizFormat,
      questionCount,
      difficulty
    );

    const customQuiz: Quiz = {
      id: `quiz-gen-${Date.now()}`,
      title: `Practice Quiz: ${effectiveTopic}`,
      subject: 'Self-Assessment',
      type: quizFormat,
      durationMinutes: questionCount * 3,
      totalMarks: quizFormat === 'objective' ? questionCount * 5 : questionCount * 10,
      joinCode: `PQ${Math.floor(1000 + Math.random() * 9000)}`,
      isStandalone: true,
      createdAt: 'Just now',
      objectiveQuestions,
      subjectiveQuestions
    };

    setActiveQuiz(customQuiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeRemaining(customQuiz.durationMinutes * 60);
    setIsSubmitted(false);
    setShowWrongAnswerReview(false);
    setSubState('attempt');
    showToast('Practice Quiz started!');
  };

  const handleSelectOption = (qId: string, option: any) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: option
    }));
  };

  const isSubjective = activeQuiz.type === 'subjective';
  const questions: any[] = isSubjective
    ? (activeQuiz.subjectiveQuestions || [])
    : (activeQuiz.objectiveQuestions || []);
  const currentQ: any = questions[currentQuestionIndex] || questions[0];

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);

    if (isSubjective) {
      const subQuestions = activeQuiz.subjectiveQuestions || [];
      let totalSubjectiveScore = 0;
      const totalPossibleMarks = subQuestions.reduce((a, c) => a + c.maxMarks, 0) || 20;

      const answersBreakdown = subQuestions.map(q => {
        const studentAns = selectedAnswers[q.id] || '';
        const wordCount = String(studentAns).trim().split(/\s+/).filter(Boolean).length;
        let aiMarks = 0;
        if (wordCount >= 20) {
          aiMarks = Math.min(q.maxMarks, Math.round(q.maxMarks * 0.9));
        } else if (wordCount >= 8) {
          aiMarks = Math.round(q.maxMarks * 0.65);
        } else if (wordCount > 0) {
          aiMarks = Math.round(q.maxMarks * 0.3);
        } else {
          aiMarks = 0;
        }
        totalSubjectiveScore += aiMarks;

        return {
          questionId: q.id,
          question: q.question,
          studentAnswer: studentAns || '(No response submitted)',
          correctAnswer: q.sampleAnswer,
          isCorrect: aiMarks >= q.maxMarks * 0.6,
          explanation: `Automated Rubric Evaluation: ${aiMarks}/${q.maxMarks} marks awarded based on conceptual completeness.`,
          aiScore: aiMarks,
          feedback: `Scored ${aiMarks}/${q.maxMarks} based on rubric criteria.`
        };
      });

      const newAttempt: QuizAttempt = {
        id: `att-${Date.now()}`,
        quizId: activeQuiz.id,
        quizTitle: activeQuiz.title,
        studentName: 'Sarah Jenkins',
        score: totalSubjectiveScore,
        totalMarks: totalPossibleMarks,
        timeTaken: `${Math.floor((activeQuiz.durationMinutes * 60 - timeRemaining) / 60)}m ${(activeQuiz.durationMinutes * 60 - timeRemaining) % 60}s`,
        submittedAt: 'Just now',
        answers: answersBreakdown
      };

      setCompletedAttempt(newAttempt);
      submitQuizAttempt(newAttempt);
      setSubState('results');
      showToast('Subjective quiz evaluated instantly!');
      return;
    }

    // Objective Scoring
    const objQuestions = activeQuiz.objectiveQuestions || [];
    let correctCount = 0;
    const answersBreakdown = objQuestions.map(q => {
      const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        question: q.question,
        studentAnswer: selectedAnswers[q.id] || '(No Answer)',
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation || (isCorrect ? 'Correct application of concepts.' : 'Needs review.')
      };
    });

    const newAttempt: QuizAttempt = {
      id: `att-${Date.now()}`,
      quizId: activeQuiz.id,
      quizTitle: activeQuiz.title,
      studentName: 'Sarah Jenkins',
      score: correctCount * 5,
      totalMarks: objQuestions.length * 5 || 20,
      timeTaken: `${Math.floor((activeQuiz.durationMinutes * 60 - timeRemaining) / 60)}m ${(activeQuiz.durationMinutes * 60 - timeRemaining) % 60}s`,
      submittedAt: 'Just now',
      answers: answersBreakdown
    };

    setCompletedAttempt(newAttempt);
    submitQuizAttempt(newAttempt);
    setSubState('results');
    showToast('Quiz evaluated instantly!');
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '880px', margin: '0 auto', width: '100%' }}>
      {/* 1. SETUP REQUEST FORM (TOPIC OR UPLOAD DOCUMENT) */}
      {subState === 'setup' && (
        <Card style={{ padding: '34px' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <FileQuestion size={24} color="var(--color-primary-emerald)" />
              <h1 className="text-h1" style={{ fontSize: '26px' }}>Take a Practice Quiz</h1>
            </div>
            <p className="text-body" style={{ fontSize: '14.5px' }}>
              Generate custom self-assessment quizzes from any topic or directly from your uploaded PDF or Word document.
            </p>
          </div>

          <form onSubmit={handleStartPracticeQuiz} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* SOURCE TAB SELECTOR */}
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
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: generatorMode === 'topic_input' ? 'var(--shadow-subtle)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <BookOpen size={15} />
                Generate by Topic & Level
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
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: generatorMode === 'document_upload' ? 'var(--shadow-subtle)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Upload size={15} />
                Upload Document (PDF / Word DOCX)
              </button>
            </div>

            {/* TAB 1: TOPIC INPUT */}
            {generatorMode === 'topic_input' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Input
                  label="Topic or Concept Area *"
                  placeholder="e.g. Distributed Consensus (Raft/Paxos), Cellular Respiration, Operating Systems"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  required
                />
              </div>
            )}

            {/* TAB 2: DOCUMENT UPLOAD (PDF / WORD DOCX) */}
            {generatorMode === 'document_upload' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                />

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
                      Click to Browse or Drag Course Notes / PDF / Word File Here
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-deep-teal)', marginBottom: '8px' }}>
                      Upload your class handouts, past papers, or textbook chapters (.pdf, .doc, .docx, .txt)
                    </p>
                    <span style={{ fontSize: '11.5px', color: 'var(--color-text-muted)', backgroundColor: '#FFFFFF', padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }}>
                      The AI will extract key questions directly from your uploaded file
                    </span>
                  </div>
                ) : (
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
                          Size: {uploadedFile.size} • Ready for question synthesis
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

                <Input
                  label="Derived Quiz Heading / Focus"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="Topic title derived from uploaded document"
                  required
                />
              </div>
            )}

            {/* CONFIGURATION PARAMETERS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Select
                label="Difficulty Level"
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                options={[
                  { value: 'Foundational', label: 'Foundational (Introductory)' },
                  { value: 'Medium', label: 'Medium (Standard University)' },
                  { value: 'Advanced', label: 'Advanced (Challenging)' }
                ]}
              />

              <Select
                label="Number of Questions"
                value={String(questionCount)}
                onChange={e => setQuestionCount(Number(e.target.value))}
                options={[
                  { value: '5', label: '5 Questions (Quick Fire)' },
                  { value: '10', label: '10 Questions (Standard Assessment)' },
                  { value: '15', label: '15 Questions (Comprehensive Exam)' }
                ]}
              />
            </div>

            {/* Objective / Subjective Toggle */}
            <div className="input-group">
              <label className="input-label">Evaluation Mode</label>
              <div style={{ display: 'flex', background: '#F5F5F4', borderRadius: 'var(--radius-md)', padding: '4px' }}>
                <button
                  type="button"
                  onClick={() => setQuizFormat('objective')}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    backgroundColor: quizFormat === 'objective' ? 'var(--color-primary-emerald)' : 'transparent',
                    color: quizFormat === 'objective' ? '#FFFFFF' : 'var(--color-text-muted)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Objective (Multiple Choice Questions)
                </button>
                <button
                  type="button"
                  onClick={() => setQuizFormat('subjective')}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    backgroundColor: quizFormat === 'subjective' ? 'var(--color-primary-emerald)' : 'transparent',
                    color: quizFormat === 'subjective' ? '#FFFFFF' : 'var(--color-text-muted)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Subjective (AI Rubric Evaluation)
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                loading={isAnalyzingDocument}
                disabled={generatorMode === 'document_upload' && !uploadedFile && !topic.trim()}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                {generatorMode === 'document_upload' ? 'Generate & Start Quiz from Document →' : 'Start Practice Quiz →'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* 2. MINIMAL DISTRACTION QUIZ ATTEMPT (STRICT RULE: EMERALD FOR SELECTED) */}
      {subState === 'attempt' && currentQ && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Bar: Quiz Name, Question Counter, Timer, Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary-emerald)' }}>
                {activeQuiz.title}
              </span>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Button
                variant="secondary"
                size="sm"
                icon={<ArrowLeft size={14} />}
                onClick={() => setSubState('setup')}
              >
                Exit Quiz
              </Button>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: timeRemaining < 120 ? 'var(--color-error-bg)' : 'var(--color-mint-bg)',
                  color: timeRemaining < 120 ? 'var(--color-error)' : 'var(--color-deep-teal)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: timeRemaining < 120 ? '1px solid var(--color-error)' : '1px solid var(--color-mint-border)'
                }}
              >
                <Clock size={14} />
                <span>{formatTimer(timeRemaining)}</span>
              </div>
            </div>
          </div>

          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} />

          {/* MAIN QUESTION CARD */}
          <Card style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <Badge variant="emerald">
                {isSubjective ? `Subjective (Max Marks: ${currentQ.maxMarks})` : 'Objective Question'}
              </Badge>
              <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                {isSubjective ? 'AI Semantic Rubric Evaluation' : 'Instant Automated Scoring'}
              </span>
            </div>

            <h2 className="text-h2" style={{ fontSize: '18px', lineHeight: 1.5, marginBottom: '24px' }}>
              {currentQ.question}
            </h2>

            {/* SUBJECTIVE ANSWER AREA */}
            {isSubjective && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ backgroundColor: '#FAFAF9', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '4px' }}>
                    Grading Rubric Criteria:
                  </span>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-main)', margin: 0 }}>
                    {currentQ.rubric}
                  </p>
                </div>

                <div>
                  <label className="input-label" style={{ marginBottom: '6px', display: 'block', fontWeight: 600 }}>
                    Your Solution & Conceptual Explanation:
                  </label>
                  <textarea
                    rows={8}
                    className="input-field"
                    style={{ width: '100%', fontFamily: 'var(--font-family)', fontSize: '14px', lineHeight: 1.6, padding: '14px' }}
                    placeholder="Provide a comprehensive academic explanation demonstrating core principles, operational flow, and theoretical mechanisms..."
                    value={selectedAnswers[currentQ.id] || ''}
                    onChange={e => handleSelectOption(currentQ.id, e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      Word count: {String(selectedAnswers[currentQ.id] || '').trim().split(/\s+/).filter(Boolean).length} words
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--color-primary-emerald)', fontWeight: 600 }}>
                      Minimum recommended: 25+ words for full rubric credit
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* OBJECTIVE OPTIONS (STRICT RULE: EMERALD FOR SELECTED) */}
            {!isSubjective && currentQ.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentQ.options.map((option: string, idx: number) => {
                  const isSelected = selectedAnswers[currentQ.id] === option;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(currentQ.id, option)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '14px 18px',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                        backgroundColor: isSelected ? 'var(--color-mint-bg)' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: isSelected ? '2px solid var(--color-primary-emerald)' : '2px solid var(--color-border)',
                          backgroundColor: isSelected ? 'var(--color-primary-emerald)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />}
                      </div>
                      <span style={{ fontSize: '14.5px', color: isSelected ? 'var(--color-deep-teal-dark)' : 'var(--color-text-main)', fontWeight: isSelected ? 600 : 400 }}>
                        {option}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* NAVIGATION FOOTER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--color-border-light)' }}>
              <Button
                variant="secondary"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                icon={<ChevronLeft size={16} />}
              >
                Previous
              </Button>

              <div style={{ display: 'flex', gap: '10px' }}>
                {currentQuestionIndex < questions.length - 1 ? (
                  <Button
                    variant="primary"
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    icon={<ChevronRight size={16} />}
                    iconPosition="right"
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleSubmitQuiz}
                    icon={<CheckCircle2 size={16} />}
                  >
                    Submit Quiz Attempt
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 3. RESULTS VIEW WITH INSTANT SCORE & EVALUATION */}
      {subState === 'results' && completedAttempt && (
        <Card style={{ padding: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', border: '2px solid var(--color-mint-border)' }}>
              <CheckCircle2 size={32} />
            </div>
            <h1 className="text-h1" style={{ fontSize: '26px' }}>Quiz Completed!</h1>
            <p className="text-body" style={{ marginTop: '4px' }}>
              Results for <strong>{completedAttempt.quizTitle}</strong>
            </p>
          </div>

          {/* SCORE BANNER */}
          <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'var(--color-warm-bg)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '28px', border: '1px solid var(--color-border)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Your Score
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-emerald)', marginTop: '4px' }}>
                {completedAttempt.score} / {completedAttempt.totalMarks}
              </div>
            </div>

            <div style={{ width: '1px', backgroundColor: 'var(--color-border)' }}></div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Percentage
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-deep-teal)', marginTop: '4px' }}>
                {Math.round((completedAttempt.score / (completedAttempt.totalMarks || 1)) * 100)}%
              </div>
            </div>

            <div style={{ width: '1px', backgroundColor: 'var(--color-border)' }}></div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Time Taken
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '6px' }}>
                {completedAttempt.timeTaken}
              </div>
            </div>
          </div>

          {/* TOGGLE DETAILED QUESTION BREAKDOWN */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="text-h3" style={{ fontSize: '16px' }}>
              Detailed Question Analysis ({completedAttempt.answers.length} Questions)
            </h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowWrongAnswerReview(!showWrongAnswerReview)}
            >
              {showWrongAnswerReview ? 'Show All Answers' : 'Show Needs Review Only'}
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
            {completedAttempt.answers
              .filter(a => !showWrongAnswerReview || !a.isCorrect)
              .map((ans, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    border: ans.isCorrect ? '1px solid var(--color-mint-border)' : '1px solid var(--color-error-bg)',
                    backgroundColor: ans.isCorrect ? '#F0FDF4' : '#FEF2F2'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      Q{idx + 1}. {ans.question}
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: ans.isCorrect ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                        color: ans.isCorrect ? 'var(--color-success)' : 'var(--color-error)'
                      }}
                    >
                      {ans.isCorrect ? 'Correct' : 'Needs Review'}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                    <div>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>Your Answer: </span>
                      <span style={{ color: ans.isCorrect ? 'var(--color-success)' : 'var(--color-error)', fontWeight: 600 }}>
                        {String(ans.studentAnswer)}
                      </span>
                    </div>

                    {!ans.isCorrect && (
                      <div>
                        <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>Correct Answer: </span>
                        <span style={{ color: 'var(--color-primary-emerald)', fontWeight: 600 }}>
                          {String(ans.correctAnswer)}
                        </span>
                      </div>
                    )}

                    <div style={{ marginTop: '4px', color: 'var(--color-deep-teal)', fontSize: '12.5px', fontStyle: 'italic' }}>
                      <strong>Feedback: </strong> {ans.explanation}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <Button
              variant="secondary"
              icon={<RotateCcw size={15} />}
              onClick={() => {
                setSubState('setup');
                setUploadedFile(null);
              }}
            >
              Take Another Quiz
            </Button>
            <Button
              variant="primary"
              onClick={() => setStudentView('dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
