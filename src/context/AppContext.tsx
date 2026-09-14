import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ClassItem,
  Quiz,
  QuizAttempt,
  LecturePlan,
  SlideDeck,
  LearningPlan,
  CompetitionSession,
  UserRole
} from '../types';
import {
  INITIAL_CLASSES,
  STANDALONE_QUIZZES,
  STANDALONE_ATTEMPTS,
  SAMPLE_LECTURE_PLAN,
  INITIAL_SLIDES,
  SAMPLE_STUDENT_LEARNING_PLAN,
  INITIAL_COMPETITIONS
} from '../data/mockData';
import { COMPETITION_GAMES } from '../data/competitionGamesData';

export type TeacherView =
  | 'dashboard'
  | 'prepare_lecture'
  | 'classes'
  | 'class_detail'
  | 'reports'
  | 'create_competition'
  | 'create_slides'
  | 'create_quiz'
  | 'profile';

export type StudentView =
  | 'dashboard'
  | 'my_classes'
  | 'student_class_detail'
  | 'learn_topic'
  | 'take_quiz'
  | 'quiz_attempt'
  | 'quiz_results'
  | 'room'
  | 'my_library'
  | 'profile';

export type CompetitionView =
  | 'dashboard'
  | 'create'
  | 'lobby'
  | 'live'
  | 'results'
  | 'profile';

interface Toast {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  role: UserRole | 'landing';
  setRole: (role: UserRole | 'landing') => void;
  
  // Navigation states
  teacherView: TeacherView;
  setTeacherView: (view: TeacherView) => void;
  studentView: StudentView;
  setStudentView: (view: StudentView) => void;
  competitionView: CompetitionView;
  setCompetitionView: (view: CompetitionView) => void;

  // Selected entities for deep flows
  selectedClassId: string;
  setSelectedClassId: (id: string) => void;
  selectedQuizId: string;
  setSelectedQuizId: (id: string) => void;
  activeAttempt: QuizAttempt | null;
  setActiveAttempt: (attempt: QuizAttempt | null) => void;
  activeCompetitionId: string;
  setActiveCompetitionId: (id: string) => void;

  // Entities state
  classes: ClassItem[];
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  lecturePlans: LecturePlan[];
  slideDecks: SlideDeck[];
  learningPlans: LearningPlan[];
  competitions: CompetitionSession[];

  // Quota & Overrides
  teacherQuota: { used: number; total: number; percentage: number };
  studentQuota: { used: number; total: number; percentage: number };
  subjectiveGradingOverrideEnabled: boolean;
  setSubjectiveGradingOverrideEnabled: (enabled: boolean) => void;

  // Actions
  addClass: (newClass: Partial<ClassItem>) => void;
  addAnnouncement: (classId: string, title: string, content: string) => void;
  assignQuizToClass: (classId: string, quizId: string, title: string, deadline: string, maxAttempts: number) => void;
  addQuiz: (quiz: Quiz) => void;
  submitQuizAttempt: (attempt: QuizAttempt) => void;
  overrideSubjectiveGrade: (attemptId: string, questionId: string, newGrade: number) => void;
  saveLecturePlan: (plan: LecturePlan) => void;
  saveSlideDeck: (deck: SlideDeck) => void;
  saveLearningPlan: (plan: LearningPlan) => void;
  addCompetition: (competition: CompetitionSession) => void;
  updateCompetition: (comp: CompetitionSession) => void;
  
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Quick navigation helper
  navigateToSlideCreationFromLecture: (plan: LecturePlan) => void;
  joinViaCode: (code: string) => { success: boolean; message: string; target?: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole | 'landing'>('landing');
  const [teacherView, setTeacherView] = useState<TeacherView>('dashboard');
  const [studentView, setStudentView] = useState<StudentView>('dashboard');
  const [competitionView, setCompetitionView] = useState<CompetitionView>('dashboard');

  const [selectedClassId, setSelectedClassId] = useState<string>('cls-1');
  const [selectedQuizId, setSelectedQuizId] = useState<string>('quiz-std-1');
  const [activeAttempt, setActiveAttempt] = useState<QuizAttempt | null>(STANDALONE_ATTEMPTS[0]);
  const [activeCompetitionId, setActiveCompetitionId] = useState<string>('comp-live-1');

  // Load from localStorage or mock data
  const [classes, setClasses] = useState<ClassItem[]>(() => {
    const saved = localStorage.getItem('educatex_classes');
    if (saved) {
      try {
        const parsed: ClassItem[] = JSON.parse(saved);
        return parsed.map(c => {
          const initClass = INITIAL_CLASSES.find(ic => ic.id === c.id);
          if (initClass && (!c.assignedQuizzes || c.assignedQuizzes.length === 0)) {
            return { ...c, assignedQuizzes: initClass.assignedQuizzes };
          }
          return c;
        });
      } catch (e) {
        return INITIAL_CLASSES;
      }
    }
    return INITIAL_CLASSES;
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem('educatex_quizzes');
    if (saved) {
      try {
        const parsed: Quiz[] = JSON.parse(saved);
        const missing = STANDALONE_QUIZZES.filter(sq => !parsed.some(p => p.id === sq.id));
        return [...parsed, ...missing];
      } catch (e) {
        return STANDALONE_QUIZZES;
      }
    }
    return STANDALONE_QUIZZES;
  });

  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('educatex_attempts');
    return saved ? JSON.parse(saved) : STANDALONE_ATTEMPTS;
  });

  const [lecturePlans, setLecturePlans] = useState<LecturePlan[]>(() => {
    const saved = localStorage.getItem('educatex_lecture_plans');
    return saved ? JSON.parse(saved) : [SAMPLE_LECTURE_PLAN];
  });

  const [slideDecks, setSlideDecks] = useState<SlideDeck[]>(() => {
    const saved = localStorage.getItem('educatex_slides');
    return saved ? JSON.parse(saved) : [INITIAL_SLIDES];
  });

  const [learningPlans, setLearningPlans] = useState<LearningPlan[]>(() => {
    const saved = localStorage.getItem('educatex_learning_plans');
    return saved ? JSON.parse(saved) : [SAMPLE_STUDENT_LEARNING_PLAN];
  });

  const [competitions, setCompetitions] = useState<CompetitionSession[]>(() => {
    const saved = localStorage.getItem('educatex_competitions');
    if (!saved) return INITIAL_COMPETITIONS;
    try {
      const parsed: CompetitionSession[] = JSON.parse(saved);
      const cleaned = parsed.filter(p => !['comp-bio-1', 'comp-chem-1', 'comp-phys-1', 'comp-math-1'].includes(p.id));
      if (cleaned.length === 0) return INITIAL_COMPETITIONS;
      const updated = cleaned.map(p => {
        if (p.gameType === 'crossword') {
          const hasClash = p.gameData?.down?.some((d: any) => d.word === 'COW') || p.gameData?.across?.some((a: any) => a.word === 'CAT');
          if (hasClash) {
            const cw = COMPETITION_GAMES.find(g => g.id === 'crossword');
            return {
              ...p,
              gameData: cw?.sampleData
            };
          }
        }
        const initial = INITIAL_COMPETITIONS.find(c => c.id === p.id);
        if (!initial) return p;
        return {
          ...p,
          coverImage: initial.coverImage || p.coverImage,
          questions: initial.questions.length > 0 ? initial.questions : p.questions
        };
      });
      const existingIds = new Set(updated.map(c => c.id));
      const missing = INITIAL_COMPETITIONS.filter(c => !existingIds.has(c.id));
      return [...updated, ...missing];
    } catch {
      return INITIAL_COMPETITIONS;
    }
  });

  const [subjectiveGradingOverrideEnabled, setSubjectiveGradingOverrideEnabled] = useState<boolean>(true);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('educatex_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('educatex_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('educatex_attempts', JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    localStorage.setItem('educatex_lecture_plans', JSON.stringify(lecturePlans));
  }, [lecturePlans]);

  useEffect(() => {
    localStorage.setItem('educatex_slides', JSON.stringify(slideDecks));
  }, [slideDecks]);

  useEffect(() => {
    localStorage.setItem('educatex_learning_plans', JSON.stringify(learningPlans));
  }, [learningPlans]);

  useEffect(() => {
    localStorage.setItem('educatex_competitions', JSON.stringify(competitions));
  }, [competitions]);

  // Quotas (72% as strictly specified)
  const teacherQuota = { used: 18, total: 25, percentage: 72 };
  const studentQuota = { used: 39, total: 50, percentage: 78 };

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Actions
  const addClass = (data: Partial<ClassItem>) => {
    const codeRandom = Math.floor(1000 + Math.random() * 9000);
    const newClass: ClassItem = {
      id: `cls-${Date.now()}`,
      name: data.name || 'New Academic Class',
      department: data.department || 'Computer Science',
      section: data.section || 'A',
      subject: data.subject || 'Core Curriculum',
      academicYear: data.academicYear || '2026-Fall',
      studentsCount: 0,
      quizzesCount: 0,
      averageScore: 0,
      progress: 0,
      joinCode: `${(data.subject || 'CLS').substring(0, 3).toUpperCase()}-${codeRandom}`,
      sections: [{ id: `sec-${Date.now()}`, name: `Section ${data.section || 'A'}`, studentCount: 0, averageScore: 0 }],
      announcements: [],
      students: [],
      assignedQuizzes: []
    };
    setClasses(prev => [newClass, ...prev]);
    showToast(`Class "${newClass.name}" created successfully!`);
  };

  const addAnnouncement = (classId: string, title: string, content: string) => {
    setClasses(prev =>
      prev.map(c => {
        if (c.id === classId) {
          return {
            ...c,
            announcements: [
              {
                id: `ann-${Date.now()}`,
                title,
                content,
                createdAt: 'Just now',
                author: 'Prof. Warda Mehmood',
                pinned: false
              },
              ...c.announcements
            ]
          };
        }
        return c;
      })
    );
    showToast('Announcement posted to class.');
  };

  const assignQuizToClass = (
    classId: string,
    quizId: string,
    title: string,
    deadline: string,
    maxAttempts: number
  ) => {
    setClasses(prev =>
      prev.map(c => {
        if (c.id === classId) {
          return {
            ...c,
            quizzesCount: c.quizzesCount + 1,
            assignedQuizzes: [
              {
                id: `asg-${Date.now()}`,
                quizId,
                title,
                assignedDate: 'Today',
                deadline,
                totalSubmissions: 0,
                totalStudents: c.studentsCount || 40,
                averageScore: 0,
                status: 'active',
                maxAttempts
              },
              ...c.assignedQuizzes
            ]
          };
        }
        return c;
      })
    );
    showToast(`Quiz "${title}" assigned to class with deadline.`);
  };

  const addQuiz = (quiz: Quiz) => {
    setQuizzes(prev => [quiz, ...prev]);
    if (quiz.assignedClassId) {
      setClasses(prev =>
        prev.map(c => {
          if (c.id === quiz.assignedClassId) {
            return {
              ...c,
              quizzesCount: (c.quizzesCount || 0) + 1,
              assignedQuizzes: [
                {
                  id: `asg-${Date.now()}`,
                  quizId: quiz.id,
                  title: quiz.title,
                  assignedDate: 'Today',
                  deadline: quiz.deadline || '2026-09-30 23:59',
                  totalSubmissions: 0,
                  totalStudents: c.studentsCount || 42,
                  averageScore: 0,
                  status: 'active',
                  maxAttempts: 2
                },
                ...(c.assignedQuizzes || [])
              ]
            };
          }
          return c;
        })
      );
    }
    showToast(`Quiz "${quiz.title}" published successfully!`);
  };

  const submitQuizAttempt = (attempt: QuizAttempt) => {
    setAttempts(prev => [attempt, ...prev]);
    setActiveAttempt(attempt);
    showToast('Quiz submitted and graded successfully!');
  };

  const overrideSubjectiveGrade = (attemptId: string, questionId: string, newGrade: number) => {
    setAttempts(prev =>
      prev.map(att => {
        if (att.id === attemptId) {
          let updatedScore = 0;
          const updatedAnswers = att.answers.map(ans => {
            if (ans.questionId === questionId) {
              updatedScore += newGrade;
              return {
                ...ans,
                aiScore: newGrade,
                teacherGrade: newGrade,
                teacherOverridden: true,
                feedback: 'Grade adjusted by Teacher Override'
              };
            }
            updatedScore += ans.teacherGrade !== undefined ? ans.teacherGrade : (ans.isCorrect ? 5 : 0);
            return ans;
          });
          return {
            ...att,
            score: updatedScore,
            answers: updatedAnswers
          };
        }
        return att;
      })
    );
    showToast('Subjective grade override saved.');
  };

  const saveLecturePlan = (plan: LecturePlan) => {
    setLecturePlans(prev => {
      const exists = prev.find(p => p.id === plan.id);
      if (exists) {
        return prev.map(p => (p.id === plan.id ? plan : p));
      }
      return [plan, ...prev];
    });
    showToast('Lecture Plan updated.');
  };

  const saveSlideDeck = (deck: SlideDeck) => {
    setSlideDecks(prev => {
      const exists = prev.find(d => d.id === deck.id);
      if (exists) {
        return prev.map(d => (d.id === deck.id ? deck : d));
      }
      return [deck, ...prev];
    });
    showToast('Slides saved successfully.');
  };

  const saveLearningPlan = (plan: LearningPlan) => {
    setLearningPlans(prev => {
      const exists = prev.find(p => p.id === plan.id);
      if (exists) {
        return prev.map(p => (p.id === plan.id ? plan : p));
      }
      return [plan, ...prev];
    });
  };

  const addCompetition = (comp: CompetitionSession) => {
    setCompetitions(prev => [comp, ...prev]);
    setActiveCompetitionId(comp.id);
    showToast(`Competition "${comp.title}" created with PIN ${comp.code}`);
  };

  const updateCompetition = (comp: CompetitionSession) => {
    setCompetitions(prev => prev.map(c => (c.id === comp.id ? comp : c)));
  };

  const navigateToSlideCreationFromLecture = (plan: LecturePlan) => {
    // Generate slide deck auto-filled from the lecture plan!
    const autoSlides: SlideDeck = {
      id: `deck-${Date.now()}`,
      lecturePlanId: plan.id,
      title: plan.topic,
      template: 'emerald_minimal',
      createdAt: 'Today',
      slides: [
        {
          id: `sl-title`,
          title: plan.topic,
          layout: 'title',
          content: [plan.subject, `Level: ${plan.level}`, `Target Duration: ${plan.duration}`],
          notes: 'Opening slide with lecture objectives.'
        },
        ...plan.sections.map((sec, idx) => ({
          id: `sl-sec-${idx}`,
          title: sec.title,
          layout: 'bullets' as const,
          content: sec.keyPoints,
          notes: `Discussion: ${sec.discussionPrompt}`
        })),
        {
          id: `sl-summary`,
          title: 'Key Outcomes & Next Steps',
          layout: 'summary',
          content: plan.outcomes,
          notes: 'Review outcomes and assign homework quiz.'
        }
      ]
    };
    saveSlideDeck(autoSlides);
    setTeacherView('create_slides');
    showToast('Slides auto-generated from Lecture Plan!', 'info');
  };

  const joinViaCode = (code: string): { success: boolean; message: string; target?: string } => {
    const trimmed = code.trim().toUpperCase();
    
    // Check if it's a competition code
    const comp = competitions.find(c => c.code.toUpperCase() === trimmed);
    if (comp) {
      setActiveCompetitionId(comp.id);
      setRole('competition');
      setCompetitionView(comp.status === 'lobby' ? 'lobby' : 'live');
      return { success: true, message: `Joined competition: ${comp.title}`, target: 'competition' };
    }

    // Check if it's a class code
    const cls = classes.find(c => c.joinCode.toUpperCase() === trimmed);
    if (cls) {
      setSelectedClassId(cls.id);
      setRole('student');
      setStudentView('student_class_detail');
      return { success: true, message: `Joined class: ${cls.name}`, target: 'class' };
    }

    // Check if it's a standalone quiz code
    const qz = quizzes.find(q => q.joinCode.toUpperCase() === trimmed);
    if (qz) {
      setSelectedQuizId(qz.id);
      setRole('student');
      setStudentView('quiz_attempt');
      return { success: true, message: `Loaded quiz: ${qz.title}`, target: 'quiz' };
    }

    return { success: false, message: 'Invalid code or QR. No matching quiz, class, or competition found.' };
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        teacherView,
        setTeacherView,
        studentView,
        setStudentView,
        competitionView,
        setCompetitionView,
        selectedClassId,
        setSelectedClassId,
        selectedQuizId,
        setSelectedQuizId,
        activeAttempt,
        setActiveAttempt,
        activeCompetitionId,
        setActiveCompetitionId,
        classes,
        quizzes,
        attempts,
        lecturePlans,
        slideDecks,
        learningPlans,
        competitions,
        teacherQuota,
        studentQuota,
        subjectiveGradingOverrideEnabled,
        setSubjectiveGradingOverrideEnabled,
        addClass,
        addAnnouncement,
        assignQuizToClass,
        addQuiz,
        submitQuizAttempt,
        overrideSubjectiveGrade,
        saveLecturePlan,
        saveSlideDeck,
        saveLearningPlan,
        addCompetition,
        updateCompetition,
        toasts,
        showToast,
        removeToast,
        navigateToSlideCreationFromLecture,
        joinViaCode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
