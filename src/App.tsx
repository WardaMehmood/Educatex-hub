import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/common/ToastContainer';
import { LandingPage } from './components/landing/LandingPage';

// Teacher Views
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { PrepareLecture } from './components/teacher/PrepareLecture';
import { TeacherClasses } from './components/teacher/TeacherClasses';
import { ClassDetail } from './components/teacher/ClassDetail';
import { TeacherReports } from './components/teacher/TeacherReports';
import { TeacherCreateQuiz } from './components/teacher/TeacherCreateQuiz';
import { TeacherCreateSlides } from './components/teacher/TeacherCreateSlides';
import { TeacherProfile } from './components/teacher/TeacherProfile';

// Student Views
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentMyClasses } from './components/student/StudentMyClasses';
import { StudentClassDetail } from './components/student/StudentClassDetail';
import { StudentLearnTopic } from './components/student/StudentLearnTopic';
import { StudentTakeQuiz } from './components/student/StudentTakeQuiz';
import { StudentRoom } from './components/student/StudentRoom';
import { StudentMyLibrary } from './components/student/StudentMyLibrary';
import { StudentProfile } from './components/student/StudentProfile';

// Competition Mode
import { CompetitionShell } from './components/competition/CompetitionShell';
import { CompetitionCreate } from './components/competition/CompetitionCreate';

export const App: React.FC = () => {
  const {
    role,
    teacherView,
    studentView
  } = useApp();

  // Landing Page Mode
  if (role === 'landing') {
    return (
      <>
        <LandingPage />
        <ToastContainer />
      </>
    );
  }

  // Standalone Competition Mode
  if (role === 'competition') {
    return (
      <>
        <CompetitionShell />
        <ToastContainer />
      </>
    );
  }

  // Teacher or Student App Shell (250px left sidebar + top header + main content)
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Header />
        <main className="main-content">
          {role === 'teacher' && (
            <>
              {teacherView === 'dashboard' && <TeacherDashboard />}
              {teacherView === 'prepare_lecture' && <PrepareLecture />}
              {teacherView === 'classes' && <TeacherClasses />}
              {teacherView === 'class_detail' && <ClassDetail />}
              {teacherView === 'reports' && <TeacherReports />}
              {teacherView === 'create_competition' && <CompetitionCreate />}
              {teacherView === 'create_slides' && <TeacherCreateSlides />}
              {teacherView === 'create_quiz' && <TeacherCreateQuiz />}
              {teacherView === 'profile' && <TeacherProfile />}
            </>
          )}

          {role === 'student' && (
            <>
              {studentView === 'dashboard' && <StudentDashboard />}
              {studentView === 'my_classes' && <StudentMyClasses />}
              {studentView === 'student_class_detail' && <StudentClassDetail />}
              {studentView === 'learn_topic' && <StudentLearnTopic />}
              {studentView === 'take_quiz' && <StudentTakeQuiz />}
              {studentView === 'quiz_attempt' && <StudentTakeQuiz />}
              {studentView === 'quiz_results' && <StudentTakeQuiz />}
              {studentView === 'room' && <StudentRoom />}
              {studentView === 'my_library' && <StudentMyLibrary />}
              {studentView === 'profile' && <StudentProfile />}
            </>
          )}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};
