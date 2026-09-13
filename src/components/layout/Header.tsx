import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Search,
  ChevronDown,
  UserCheck,
  Trophy,
  GraduationCap,
  QrCode,
  CheckCircle2,
  X
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    teacherView,
    studentView,
    joinViaCode,
    showToast
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCodeInput, setJoinCodeInput] = useState('');

  const getPageTitle = () => {
    if (role === 'teacher') {
      switch (teacherView) {
        case 'dashboard': return 'Teacher Dashboard';
        case 'prepare_lecture': return 'Prepare a Lecture with AI';
        case 'classes': return 'Classes & Course Management';
        case 'class_detail': return 'Class Overview & Analytics';
        case 'reports': return 'Standalone Quiz Reports';
        case 'create_competition': return 'Create Live Competition';
        case 'create_slides': return 'AI Lecture Slide Deck';
        case 'create_quiz': return 'Create & Publish Quiz';
        case 'profile': return 'Faculty Profile & Settings';
        default: return 'Teacher Portal';
      }
    } else {
      switch (studentView) {
        case 'dashboard': return 'Student Learning Dashboard';
        case 'my_classes': return 'My Enrolled Classes';
        case 'student_class_detail': return 'Class Details & Assignments';
        case 'learn_topic': return 'Learn a Topic with AI';
        case 'take_quiz': return 'Practice Quiz Arena';
        case 'quiz_attempt': return 'Interactive Quiz Attempt';
        case 'quiz_results': return 'Quiz Results & Review';
        case 'room': return 'Competition Room';
        case 'my_library': return 'My Learning Library';
        case 'profile': return 'Student Profile & Settings';
        default: return 'Student Portal';
      }
    }
  };

  const handleQuickJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCodeInput.trim()) return;
    const res = joinViaCode(joinCodeInput);
    if (res.success) {
      setShowJoinModal(false);
      setJoinCodeInput('');
      showToast(res.message);
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)' }}>
          {getPageTitle()}
        </h2>
      </div>

      <div className="header-right">
        {/* Quick Join Code Button */}
        <Button
          variant="secondary"
          size="sm"
          icon={<QrCode size={13} />}
          onClick={() => setShowJoinModal(true)}
        >
          Join via PIN/QR
        </Button>

        {/* Role Toggle Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', background: '#F5F5F4', borderRadius: 'var(--radius-md)', padding: '2px' }}>
          <button
            onClick={() => setRole('teacher')}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: role === 'teacher' ? '#FFFFFF' : 'transparent',
              color: role === 'teacher' ? 'var(--color-primary-emerald)' : 'var(--color-text-muted)',
              boxShadow: role === 'teacher' ? 'var(--shadow-subtle)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Teacher
          </button>
          <button
            onClick={() => setRole('student')}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: role === 'student' ? '#FFFFFF' : 'transparent',
              color: role === 'student' ? 'var(--color-primary-emerald)' : 'var(--color-text-muted)',
              boxShadow: role === 'student' ? 'var(--shadow-subtle)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Student
          </button>
          <button
            onClick={() => setRole('competition')}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              color: 'var(--color-deep-teal)',
              transition: 'all 0.15s ease'
            }}
          >
            Competition ⚡
          </button>
        </div>

        {/* Notifications Icon with popover */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Bell size={15} />
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-emerald)'
              }}
            />
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                width: '300px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
                padding: '14px',
                zIndex: 50
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Notifications</span>
                <span style={{ fontSize: '10.5px', color: 'var(--color-primary-emerald)', cursor: 'pointer', fontWeight: 600 }}>
                  Mark all as read
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '8px', backgroundColor: 'var(--color-mint-bg)', borderRadius: 'var(--radius-sm)', fontSize: '11.5px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary-emerald)', display: 'block' }}>
                    Quiz Deadline Approaching
                  </span>
                  <span style={{ color: 'var(--color-text-main)' }}>
                    Transport Layer Quiz due tomorrow at 23:59.
                  </span>
                </div>
                <div style={{ padding: '8px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-sm)', fontSize: '11.5px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
                    New Competition Published
                  </span>
                  <span style={{ color: 'var(--color-text-muted)' }}>
                    National Python Championship lobby is now active!
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Chip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '3px 8px 3px 5px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            backgroundColor: '#FFFFFF'
          }}
        >
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-mint-bg)',
              color: 'var(--color-primary-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '11px'
            }}
          >
            {role === 'teacher' ? 'WM' : 'SJ'}
          </div>
          <div style={{ lineHeight: '1.2' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
              {role === 'teacher' ? 'Prof. Warda M.' : 'Sarah Jenkins'}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
              {role === 'teacher' ? 'Dept. of CS' : 'Computer Science'}
            </span>
          </div>
        </div>
      </div>

      {/* Join via PIN / QR Modal */}
      <Modal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        title="Enter Class, Quiz, or Competition"
        maxWidth="440px"
      >
        <form onSubmit={handleQuickJoin}>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Enter any join code or PIN (e.g. <code>8429</code> for Competition, <code>NET-4091</code> for Class, or <code>RAFT-7721</code> for Standalone Quiz).
          </p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="e.g. 8429, NET-4091, RAFT-7721"
              value={joinCodeInput}
              onChange={e => setJoinCodeInput(e.target.value)}
              className="input-field"
              style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}
              autoFocus
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="secondary" type="button" onClick={() => setShowJoinModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Join Now
            </Button>
          </div>
        </form>
      </Modal>
    </header>
  );
};
