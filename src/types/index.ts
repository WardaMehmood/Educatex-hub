// TypeScript definitions for EducateX Hub

export type UserRole = 'teacher' | 'student' | 'competition' | 'guest';

export interface ClassSection {
  id: string;
  name: string;
  studentCount: number;
  averageScore: number;
}

export interface StudentDrilldown {
  id: string;
  name: string;
  avatar: string;
  email: string;
  quizzesCompleted: number;
  totalQuizzes: number;
  averageScore: number;
  lastActive: string;
  attendanceRate: number;
  status: 'active' | 'needs_attention' | 'top_performer';
  recentScores: { quizTitle: string; score: number; date: string }[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  pinned?: boolean;
}

export interface ClassItem {
  id: string;
  name: string;
  department: string;
  section: string;
  subject: string;
  academicYear: string;
  studentsCount: number;
  quizzesCount: number;
  averageScore: number;
  progress: number;
  joinCode: string;
  sections: ClassSection[];
  announcements: Announcement[];
  students: StudentDrilldown[];
  assignedQuizzes: AssignedQuiz[];
}

export interface AssignedQuiz {
  id: string;
  quizId: string;
  title: string;
  assignedDate: string;
  deadline: string;
  totalSubmissions: number;
  totalStudents: number;
  averageScore: number;
  status: 'active' | 'closed';
  maxAttempts: number;
}

export interface ObjectiveQuestion {
  id: string;
  type: 'mcq' | 'true_false' | 'fill_in_blanks' | 'matching';
  question: string;
  options?: string[]; // for mcq
  correctAnswer: string | boolean | string[]; // for mcq, tf, blanks
  matchingPairs?: { left: string; right: string }[]; // for matching
  imageUrl?: string;
  imageCaption?: string;
  hasVisual?: boolean;
  explanation: string;
}

export interface SubjectiveQuestion {
  id: string;
  question: string;
  rubric: string;
  sampleAnswer: string;
  maxMarks: number;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  type: 'objective' | 'subjective';
  durationMinutes: number;
  totalMarks: number;
  joinCode: string;
  isStandalone: boolean; // if true, appears in standalone reports
  assignedClassId?: string;
  deadline?: string;
  createdAt: string;
  objectiveQuestions?: ObjectiveQuestion[];
  subjectiveQuestions?: SubjectiveQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  studentName: string;
  score: number;
  totalMarks: number;
  timeTaken: string;
  submittedAt: string;
  answers: {
    questionId: string;
    question: string;
    studentAnswer: any;
    correctAnswer: any;
    isCorrect: boolean;
    explanation: string;
    aiScore?: number;
    teacherOverridden?: boolean;
    teacherGrade?: number;
    feedback?: string;
  }[];
}

export interface LecturePlan {
  id: string;
  subject: string;
  topic: string;
  level: string;
  duration: string;
  style: string;
  outcomes: string[];
  sections: {
    title: string;
    duration: string;
    summary: string;
    keyPoints: string[];
    discussionPrompt: string;
    detailedExplanation?: string;
    realWorldAnalogy?: string;
    teachingTips?: string;
  }[];
  createdAt: string;
}

export interface SlideItem {
  id: string;
  title: string;
  layout: 'title' | 'split' | 'bullets' | 'quote' | 'summary';
  content: string[];
  notes?: string;
}

export interface SlideDeck {
  id: string;
  lecturePlanId?: string;
  title: string;
  template: 'emerald_minimal' | 'deep_teal_pro' | 'warm_academic' | 'clean_white';
  slides: SlideItem[];
  createdAt: string;
}

export interface LearningTopicModule {
  id: string;
  number: string;
  title: string;
  description: string;
  content: string;
  keyTakeaways: string[];
  practiceQuiz?: ObjectiveQuestion[];
  completed?: boolean;
  score?: number;
  analogy?: string;
  subNodes?: string[];
  corePoints?: string[];
  mechanisms?: string[];
  applications?: string[];
}

export interface LearningPlan {
  id: string;
  topic: string;
  level: string;
  goal: string;
  modules: LearningTopicModule[];
  createdAt: string;
  progress: number;
  savedInLibrary: boolean;
}

export interface CompetitionSession {
  id: string;
  title: string;
  code: string;
  status: 'lobby' | 'live' | 'completed';
  format: 'simple' | 'game_style';
  teamFormation: 'auto' | 'self_select' | 'host_assigned';
  participantsCount: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  timePerQuestion: number;
  subject?: 'biology' | 'chemistry' | 'physics' | 'maths' | 'cs';
  coverImage?: string;
  questions: ObjectiveQuestion[];
  participants: {
    id: string;
    name: string;
    avatar: string;
    score: number;
    streak: number;
    team?: string;
  }[];
  isPaused: boolean;
  timeRemaining: number;
}
