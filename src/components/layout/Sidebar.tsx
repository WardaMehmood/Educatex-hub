import React from 'react';
import { useApp, TeacherView, StudentView } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  BarChart3,
  Trophy,
  Presentation,
  FileQuestion,
  User,
  Compass,
  Layers,
  ArrowUpRight,
  LogOut
} from 'lucide-react';
import { Button } from '../common/Button';

export const Sidebar: React.FC = () => {
  const {
    role,
    setRole,
    teacherView,
    setTeacherView,
    studentView,
    setStudentView,
    teacherQuota,
    studentQuota,
    showToast
  } = useApp();

  const handleTeacherNav = (view: TeacherView) => {
    setTeacherView(view);
  };

  const handleStudentNav = (view: StudentView) => {
    setStudentView(view);
  };

  const currentQuota = role === 'teacher' ? teacherQuota : studentQuota;

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">
          E
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="sidebar-logo-text">EducateX</span>
            <span className="sidebar-logo-tag">HUB</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
            {role === 'teacher' ? 'Faculty Portal' : 'Student Portal'}
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="sidebar-nav">
        {role === 'teacher' && (
          <>
            <div className="sidebar-section-title">MAIN</div>
            <div
              className={`sidebar-item ${teacherView === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleTeacherNav('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
            <div
              className={`sidebar-item ${teacherView === 'prepare_lecture' ? 'active' : ''}`}
              onClick={() => handleTeacherNav('prepare_lecture')}
            >
              <BookOpen size={18} />
              <span>Prepare a Lecture</span>
            </div>
            <div
              className={`sidebar-item ${teacherView === 'classes' || teacherView === 'class_detail' ? 'active' : ''}`}
              onClick={() => handleTeacherNav('classes')}
            >
              <GraduationCap size={18} />
              <span>Classes</span>
            </div>
            <div
              className={`sidebar-item ${teacherView === 'reports' ? 'active' : ''}`}
              onClick={() => handleTeacherNav('reports')}
            >
              <BarChart3 size={18} />
              <span>Reports</span>
            </div>

            <div className="sidebar-section-title" style={{ marginTop: '12px' }}>CREATE</div>
            <div
              className={`sidebar-item ${teacherView === 'create_competition' ? 'active' : ''}`}
              onClick={() => handleTeacherNav('create_competition')}
            >
              <Trophy size={18} />
              <span>Create Competition</span>
            </div>
            <div
              className={`sidebar-item ${teacherView === 'create_slides' ? 'active' : ''}`}
              onClick={() => handleTeacherNav('create_slides')}
            >
              <Presentation size={18} />
              <span>Create Slides</span>
            </div>
            <div
              className={`sidebar-item ${teacherView === 'create_quiz' ? 'active' : ''}`}
              onClick={() => handleTeacherNav('create_quiz')}
            >
              <FileQuestion size={18} />
              <span>Create Quiz</span>
            </div>

            <div className="sidebar-section-title" style={{ marginTop: '12px' }}>ACCOUNT</div>
            <div
              className={`sidebar-item ${teacherView === 'profile' ? 'active' : ''}`}
              onClick={() => handleTeacherNav('profile')}
            >
              <User size={18} />
              <span>Profile</span>
            </div>
          </>
        )}

        {role === 'student' && (
          <>
            <div className="sidebar-section-title">MAIN</div>
            <div
              className={`sidebar-item ${studentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleStudentNav('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
            <div
              className={`sidebar-item ${studentView === 'my_classes' || studentView === 'student_class_detail' ? 'active' : ''}`}
              onClick={() => handleStudentNav('my_classes')}
            >
              <GraduationCap size={18} />
              <span>My Classes</span>
            </div>
            <div
              className={`sidebar-item ${studentView === 'learn_topic' ? 'active' : ''}`}
              onClick={() => handleStudentNav('learn_topic')}
            >
              <Compass size={18} />
              <span>Learn a Topic</span>
            </div>
            <div
              className={`sidebar-item ${studentView === 'take_quiz' || studentView === 'quiz_attempt' || studentView === 'quiz_results' ? 'active' : ''}`}
              onClick={() => handleStudentNav('take_quiz')}
            >
              <FileQuestion size={18} />
              <span>Take a Quiz</span>
            </div>
            <div
              className={`sidebar-item ${studentView === 'room' ? 'active' : ''}`}
              onClick={() => handleStudentNav('room')}
            >
              <Trophy size={18} />
              <span>Room</span>
            </div>

            <div className="sidebar-section-title" style={{ marginTop: '12px' }}>LEARNING</div>
            <div
              className={`sidebar-item ${studentView === 'my_library' ? 'active' : ''}`}
              onClick={() => handleStudentNav('my_library')}
            >
              <Layers size={18} />
              <span>My Library</span>
            </div>

            <div className="sidebar-section-title" style={{ marginTop: '12px' }}>ACCOUNT</div>
            <div
              className={`sidebar-item ${studentView === 'profile' ? 'active' : ''}`}
              onClick={() => handleStudentNav('profile')}
            >
              <User size={18} />
              <span>Profile</span>
            </div>
          </>
        )}
      </div>

      {/* Sidebar Footer: AI Quota & Upgrade Plan */}
      <div className="sidebar-footer">
        <div className="quota-widget">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', color: 'var(--color-text-main)' }}>
              AI QUOTA
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary-emerald)' }}>
              {currentQuota.percentage}%
            </span>
          </div>
          
          <div className="quota-bar-bg">
            <div
              className="quota-bar-fill"
              style={{ width: `${currentQuota.percentage}%` }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              {currentQuota.used} of {currentQuota.total} units
            </span>
            <button
              onClick={() => {
                if (role === 'teacher') handleTeacherNav('profile');
                else handleStudentNav('profile');
                showToast('View subscription plans to upgrade quota.');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-primary-emerald)',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                padding: '0'
              }}
            >
              Upgrade Plan <ArrowUpRight size={11} />
            </button>
          </div>
        </div>

        {/* Switch Role or Exit to Landing */}
        <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setRole('landing')}
            style={{
              width: '100%',
              padding: '7px 10px',
              fontSize: '12px',
              fontWeight: 500,
              backgroundColor: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={13} /> Exit to Portal
          </button>
        </div>
      </div>
    </aside>
  );
};
