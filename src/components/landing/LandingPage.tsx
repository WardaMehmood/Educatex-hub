import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  CheckCircle2,
  QrCode,
  Brain,
  FileText,
  Gamepad2,
  LineChart,
  Users,
  Presentation,
  Trophy,
  Check,
  Shield,
  HelpCircle,
  Play,
  GraduationCap,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

export const LandingPage: React.FC = () => {
  const { setRole, joinViaCode, showToast } = useApp();

  const [guestCode, setGuestCode] = useState('');
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

  const handleGuestJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestCode.trim()) return;
    const res = joinViaCode(guestCode);
    if (res.success) {
      setShowGuestModal(false);
      showToast(res.message);
    } else {
      showToast(res.message, 'error');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', color: '#1C1917', fontFamily: 'var(--font-family)', overflowX: 'hidden' }}>
      {/* =========================================================================
          1. HEADER / NAVBAR
          ========================================================================= */}
      <header
        style={{
          height: '84px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 56px',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}
      >
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => scrollToSection('hero')}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#064E3B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <GraduationCap size={22} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 850, color: '#064E3B', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            EDUCATEX HUB
          </span>
        </div>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button
            onClick={() => scrollToSection('hero')}
            style={{ background: 'none', border: 'none', fontSize: '14.5px', fontWeight: 600, color: '#0F766E', cursor: 'pointer', position: 'relative', padding: '6px 0' }}
          >
            Home
            <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#0F766E', borderRadius: '2px' }} />
          </button>
          <button
            onClick={() => scrollToSection('features')}
            style={{ background: 'none', border: 'none', fontSize: '14.5px', fontWeight: 500, color: '#57534E', cursor: 'pointer' }}
          >
            Features
          </button>
          <button
            onClick={() => setRole('teacher')}
            style={{ background: 'none', border: 'none', fontSize: '14.5px', fontWeight: 500, color: '#57534E', cursor: 'pointer' }}
          >
            For Teachers
          </button>
          <button
            onClick={() => setRole('student')}
            style={{ background: 'none', border: 'none', fontSize: '14.5px', fontWeight: 500, color: '#57534E', cursor: 'pointer' }}
          >
            For Students
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            style={{ background: 'none', border: 'none', fontSize: '14.5px', fontWeight: 500, color: '#57534E', cursor: 'pointer' }}
          >
            Pricing
          </button>
          <button
            onClick={() => setRole('competition')}
            style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: 600, color: '#0F766E', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            Competition ⚡
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => setShowGuestModal(true)}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '9999px',
              color: '#0F766E',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <QrCode size={14} /> Join with PIN
          </button>

          <button
            onClick={() => setRole('student')}
            style={{
              padding: '9px 24px',
              fontSize: '14px',
              fontWeight: 600,
              backgroundColor: 'transparent',
              border: '1px solid #D1D5DB',
              borderRadius: '9999px',
              color: '#111827',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#9CA3AF'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#D1D5DB'}
          >
            Login
          </button>

          <button
            onClick={() => setRole('teacher')}
            style={{
              padding: '10px 26px',
              fontSize: '14px',
              fontWeight: 700,
              backgroundColor: '#0B3B2E',
              border: 'none',
              borderRadius: '9999px',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(11, 59, 46, 0.25)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(11, 59, 46, 0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(11, 59, 46, 0.25)'; }}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. HERO SECTION (EXACT MATCH TO REFERENCE IMAGE - COMPACT VIEWPORT)
          ========================================================================= */}
      <section
        id="hero"
        style={{
          position: 'relative',
          padding: '24px 20px 28px',
          maxWidth: '1350px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Soft Ambient Organic Gradients Behind Hero */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '-60px',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167, 243, 208, 0.45) 0%, rgba(209, 250, 229, 0) 70%)',
            filter: 'blur(45px)',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '-60px',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167, 243, 208, 0.45) 0%, rgba(209, 250, 229, 0) 70%)',
            filter: 'blur(45px)',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />

        {/* Decorative Green Paper Airplane (Left) */}
        <div
          style={{
            position: 'absolute',
            left: '40px',
            top: '180px',
            zIndex: 3,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            transform: 'scale(0.85)'
          }}
        >
          <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
            <path
              d="M10 95 C 40 85, 60 45, 105 32"
              stroke="#059669"
              strokeWidth="2.2"
              strokeDasharray="5 5"
              fill="none"
              opacity="0.65"
            />
            <g transform="translate(100, 16) rotate(-15)">
              <path d="M0 16 L32 0 L20 32 L15 20 Z" fill="#10B981" />
              <path d="M15 20 L32 0 L20 32 Z" fill="#059669" opacity="0.35" />
            </g>
          </svg>
        </div>

        {/* Decorative Corner Foliage Accents (Bottom Left & Right) */}
        <div style={{ position: 'absolute', bottom: '-20px', left: '-25px', width: '150px', height: '150px', opacity: 0.8, zIndex: 2, pointerEvents: 'none' }}>
          <svg viewBox="0 0 200 200" fill="none">
            <path d="M10 190 Q 60 120, 150 110 Q 110 160, 10 190 Z" fill="#047857" opacity="0.8" />
            <path d="M10 190 Q 90 90, 180 80 Q 130 140, 10 190 Z" fill="#10B981" opacity="0.65" />
            <path d="M10 190 Q 40 70, 120 50 Q 80 120, 10 190 Z" fill="#065F46" opacity="0.85" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: '-20px', right: '-25px', width: '150px', height: '150px', opacity: 0.8, zIndex: 2, pointerEvents: 'none', transform: 'scaleX(-1)' }}>
          <svg viewBox="0 0 200 200" fill="none">
            <path d="M10 190 Q 60 120, 150 110 Q 110 160, 10 190 Z" fill="#047857" opacity="0.8" />
            <path d="M10 190 Q 90 90, 180 80 Q 130 140, 10 190 Z" fill="#10B981" opacity="0.65" />
            <path d="M10 190 Q 40 70, 120 50 Q 80 120, 10 190 Z" fill="#065F46" opacity="0.85" />
          </svg>
        </div>

        {/* 1. Main Centered Headline (Compact for direct view without scrolling) */}
        <h1
          style={{
            fontSize: '40px',
            fontWeight: 850,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#111827',
            margin: '0 0 4px 0',
            zIndex: 3
          }}
        >
          Teach Smarter. <span style={{ color: '#10B981' }}>Learn Better.</span>
        </h1>

        <div
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#1F2937',
            letterSpacing: '-0.02em',
            margin: '0 0 8px 0',
            zIndex: 3
          }}
        >
          All in One Place.
        </div>

        {/* 2. Subtitle */}
        <p
          style={{
            fontSize: '14.5px',
            lineHeight: 1.5,
            color: '#4B5563',
            maxWidth: '620px',
            margin: '0 auto 16px auto',
            zIndex: 3
          }}
        >
          Create lessons, generate quizzes, engage students, track progress and bring learning into one intelligent platform.
        </p>

        {/* 3. Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '22px', zIndex: 3 }}>
          <button
            onClick={() => setRole('teacher')}
            style={{
              padding: '10px 24px',
              fontSize: '13.5px',
              fontWeight: 700,
              backgroundColor: '#0B3B2E',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 18px rgba(11, 59, 46, 0.25)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(11, 59, 46, 0.32)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(11, 59, 46, 0.25)'; }}
          >
            Get Started as Teacher →
          </button>

          <button
            onClick={() => setRole('student')}
            style={{
              padding: '9px 22px',
              fontSize: '13.5px',
              fontWeight: 600,
              backgroundColor: '#FFFFFF',
              color: '#111827',
              border: '1.5px solid #D1D5DB',
              borderRadius: '9999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#9CA3AF'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#D1D5DB'}
          >
            Start Learning →
          </button>
        </div>

        {/* 4. Centerpiece Illustration & Floating Interactive Cards */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1120px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Main 3D Cartoon Classroom Capsule Frame */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '760px',
              height: '330px',
              borderRadius: '110px 110px 85px 85px / 130px 130px 100px 100px',
              overflow: 'hidden',
              border: '3.5px solid #FFFFFF',
              boxShadow: '0 20px 50px -10px rgba(13, 148, 136, 0.22), 0 8px 24px rgba(0, 0, 0, 0.06)',
              zIndex: 5,
              backgroundColor: '#ECFDF5'
            }}
          >
            <img
              src="/hero-cartoon-classroom.jpg"
              alt="EducateX Hub 3D Cartoon Classroom"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 18%',
                display: 'block'
              }}
            />
          </div>

          {/* Floating Card 1: AI Quiz Generator (Left) */}
          <div
            onClick={() => setRole('teacher')}
            style={{
              position: 'absolute',
              left: '0px',
              top: '24px',
              zIndex: 10,
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 14px 30px rgba(0, 0, 0, 0.08), 0 3px 10px rgba(0, 0, 0, 0.03)',
              border: '1px solid rgba(240, 253, 250, 0.9)',
              cursor: 'pointer',
              transform: 'rotate(-2deg)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              width: '220px'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(0deg) translateY(-3px)'; e.currentTarget.style.boxShadow = '0 18px 36px rgba(0,0,0,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(-2deg) translateY(0)'; e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.08)'; }}
          >
            <img
              src="/card-ai-quiz.jpg"
              alt="AI Quiz Generator"
              style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 3px 8px rgba(0,0,0,0.06)' }}
            />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>
                AI Quiz Generator
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                Generate quizzes instantly
              </div>
            </div>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#064E3B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
              <ChevronRight size={13} />
            </div>
          </div>

          {/* Floating Card 2: Live Competition (Right Top) */}
          <div
            onClick={() => setRole('competition')}
            style={{
              position: 'absolute',
              right: '0px',
              top: '12px',
              zIndex: 10,
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 14px 30px rgba(0, 0, 0, 0.08), 0 3px 10px rgba(0, 0, 0, 0.03)',
              border: '1px solid rgba(240, 253, 250, 0.9)',
              cursor: 'pointer',
              transform: 'rotate(2deg)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              width: '220px'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(0deg) translateY(-3px)'; e.currentTarget.style.boxShadow = '0 18px 36px rgba(0,0,0,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(2deg) translateY(0)'; e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.08)'; }}
          >
            <img
              src="/card-live-competition.jpg"
              alt="Live Competition"
              style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 3px 8px rgba(0,0,0,0.06)' }}
            />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>
                Live Competition
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                Engage students in real-time
              </div>
            </div>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#064E3B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
              <ChevronRight size={13} />
            </div>
          </div>

          {/* Floating Card 3: Student Progress (Right Bottom) */}
          <div
            onClick={() => setRole('student')}
            style={{
              position: 'absolute',
              right: '12px',
              bottom: '22px',
              zIndex: 10,
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 14px 30px rgba(0, 0, 0, 0.08), 0 3px 10px rgba(0, 0, 0, 0.03)',
              border: '1px solid rgba(240, 253, 250, 0.9)',
              cursor: 'pointer',
              transform: 'rotate(-1deg)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              width: '220px'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(0deg) translateY(-3px)'; e.currentTarget.style.boxShadow = '0 18px 36px rgba(0,0,0,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(-1deg) translateY(0)'; e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.08)'; }}
          >
            <img
              src="/card-student-progress.jpg"
              alt="Student Progress"
              style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 3px 8px rgba(0,0,0,0.06)' }}
            />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>
                Student Progress
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                Track learning and performance
              </div>
            </div>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#064E3B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
              <ChevronRight size={13} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. 5-COLUMN FEATURES STRIP (EXACT MATCH TO ATTACHED IMAGE)
          ========================================================================= */}
      <section
        id="features"
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E7E5E4',
          borderBottom: '1px solid #E7E5E4',
          padding: '48px 48px'
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '24px'
          }}
        >
          {/* Feature 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 10px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Brain size={22} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1C1917', marginBottom: '6px' }}>
              AI Quiz Generation
            </h3>
            <p style={{ fontSize: '13px', color: '#78716C', lineHeight: 1.45 }}>
              Create quizzes and tests in seconds with AI.
            </p>
          </div>

          {/* Feature 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 10px', borderLeft: '1px solid #F0EEEB' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <FileText size={22} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1C1917', marginBottom: '6px' }}>
              AI Lecture Assistant
            </h3>
            <p style={{ fontSize: '13px', color: '#78716C', lineHeight: 1.45 }}>
              Generate detailed lectures, slides and study notes.
            </p>
          </div>

          {/* Feature 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 10px', borderLeft: '1px solid #F0EEEB' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Gamepad2 size={22} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1C1917', marginBottom: '6px' }}>
              Gamified Learning
            </h3>
            <p style={{ fontSize: '13px', color: '#78716C', lineHeight: 1.45 }}>
              Make learning fun with live quizzes and games.
            </p>
          </div>

          {/* Feature 4 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 10px', borderLeft: '1px solid #F0EEEB' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <LineChart size={22} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1C1917', marginBottom: '6px' }}>
              Smart Assessment
            </h3>
            <p style={{ fontSize: '13px', color: '#78716C', lineHeight: 1.45 }}>
              Track performance with powerful analytics.
            </p>
          </div>

          {/* Feature 5 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 10px', borderLeft: '1px solid #F0EEEB' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Users size={22} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1C1917', marginBottom: '6px' }}>
              Teacher Management
            </h3>
            <p style={{ fontSize: '13px', color: '#78716C', lineHeight: 1.45 }}>
              Manage classes, students and content — all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. "EVERYTHING YOU NEED IN ONE PLATFORM" (EXACT MATCH TO ATTACHED IMAGE)
          ========================================================================= */}
      <section
        style={{
          padding: '80px 48px',
          maxWidth: '1360px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '48px', alignItems: 'center' }}>
          {/* Left Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                padding: '6px 14px',
                borderRadius: '9999px',
                alignSelf: 'flex-start'
              }}
            >
              <CheckCircle2 size={13} color="#0F766E" />
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F766E' }}>
                For a Brighter Future
              </span>
            </div>

            <h2
              style={{
                fontSize: '44px',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#1C1917',
                letterSpacing: '-0.025em'
              }}
            >
              Everything You Need in One Platform
            </h2>

            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#57534E', maxWidth: '480px' }}>
              From AI-powered content creation to interactive learning and real-time performance tracking — Educatex Hub brings together the best tools for modern education.
            </p>

            <div>
              <button
                onClick={() => setRole('teacher')}
                style={{
                  padding: '12px 26px',
                  fontSize: '14.5px',
                  fontWeight: 700,
                  backgroundColor: '#0F766E',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(15, 118, 110, 0.25)'
                }}
              >
                Explore Features →
              </button>
            </div>
          </div>

          {/* Right Visual + 3 Benefit Cards Column */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '24px', alignItems: 'center' }}>
            {/* Center Classroom Photo Container */}
            <div
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
                border: '3px solid #FFFFFF'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
                alt="Teacher interacting with students in university classroom"
                style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#0F766E'
                }}
              >
                Interactive Classrooms
              </div>
            </div>

            {/* Right Cards Stack with Doodle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
              {/* Card 1: For Teachers */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '16px 18px',
                  border: '1px solid #E7E5E4',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1C1917' }}>For Teachers</h4>
                  <p style={{ fontSize: '12.5px', color: '#78716C', marginTop: '2px', lineHeight: 1.35 }}>
                    Save time, create content, and engage your students better.
                  </p>
                </div>
              </div>

              {/* Card 2: For Students */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '16px 18px',
                  border: '1px solid #E7E5E4',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Users size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1C1917' }}>For Students</h4>
                  <p style={{ fontSize: '12.5px', color: '#78716C', marginTop: '2px', lineHeight: 1.35 }}>
                    Learn at your own pace and reach your full potential.
                  </p>
                </div>
              </div>

              {/* Card 3: For Schools & Institutes */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '16px 18px',
                  border: '1px solid #E7E5E4',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Shield size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1C1917' }}>For Schools & Institutes</h4>
                  <p style={{ fontSize: '12.5px', color: '#78716C', marginTop: '2px', lineHeight: 1.35 }}>
                    Manage classes, performance and growth — all in one place.
                  </p>
                </div>
              </div>

              {/* Cute Handwritten Doodle */}
              <div
                style={{
                  position: 'absolute',
                  top: '-32px',
                  right: '-18px',
                  color: '#0F766E',
                  fontSize: '13px',
                  fontWeight: 700,
                  fontFamily: 'cursive',
                  transform: 'rotate(10deg)',
                  pointerEvents: 'none'
                }}
              >
                ~ Better Tools<br />
                ~ Better Learning ♡
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SUBSCRIPTION & PRICING SECTION (USER SPECIFIC REQUEST)
          ========================================================================= */}
      <section
        id="pricing"
        style={{
          padding: '80px 48px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E7E5E4'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          {/* Pill Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              padding: '6px 16px',
              borderRadius: '9999px',
              marginBottom: '16px'
            }}
          >
            <CheckCircle2 size={14} color="#0F766E" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F766E' }}>
              Affordable Plans for Every Classroom
            </span>
          </div>

          <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#1C1917', letterSpacing: '-0.025em', marginBottom: '12px' }}>
            Simple, Transparent Subscription
          </h2>
          <p style={{ fontSize: '16px', color: '#78716C', maxWidth: '580px', margin: '0 auto 32px' }}>
            Choose the plan that fits your classroom or institution. Upgrade, downgrade, or cancel anytime with zero hidden fees.
          </p>

          {/* Billing Toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#FAFAF9', padding: '5px', borderRadius: '9999px', border: '1px solid #E7E5E4', marginBottom: '48px' }}>
            <button
              onClick={() => setBillingPeriod('monthly')}
              style={{
                padding: '8px 20px',
                fontSize: '13.5px',
                fontWeight: 600,
                border: 'none',
                borderRadius: '9999px',
                cursor: 'pointer',
                backgroundColor: billingPeriod === 'monthly' ? '#FFFFFF' : 'transparent',
                color: billingPeriod === 'monthly' ? '#0F766E' : '#78716C',
                boxShadow: billingPeriod === 'monthly' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              style={{
                padding: '8px 20px',
                fontSize: '13.5px',
                fontWeight: 600,
                border: 'none',
                borderRadius: '9999px',
                cursor: 'pointer',
                backgroundColor: billingPeriod === 'annual' ? '#0F766E' : 'transparent',
                color: billingPeriod === 'annual' ? '#FFFFFF' : '#78716C',
                boxShadow: billingPeriod === 'annual' ? '0 2px 8px rgba(15, 118, 110, 0.25)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>Annual Billing</span>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#84CC16', color: '#134E4A' }}>
                SAVE 20%
              </span>
            </button>
          </div>

          {/* 3 Pricing Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px', textAlign: 'left' }}>
            {/* Card 1: Free Starter */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '36px 32px',
                border: '1px solid #E7E5E4',
                boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#78716C' }}>
                  STUDENT & SCHOLAR
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1C1917', marginTop: '6px' }}>Free Starter</h3>
                <p style={{ fontSize: '13.5px', color: '#78716C', marginTop: '6px', marginBottom: '24px' }}>
                  Ideal for students practicing self-paced topics and participating in peer competitions.
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '28px' }}>
                  <span style={{ fontSize: '42px', fontWeight: 900, color: '#1C1917' }}>$0</span>
                  <span style={{ fontSize: '14px', color: '#78716C', fontWeight: 500 }}>/ forever</span>
                </div>

                <div style={{ borderTop: '1px solid #F0EEEB', paddingTop: '20px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#1C1917', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '14px' }}>
                    What's included:
                  </span>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', paddingLeft: 0 }}>
                    {[
                      'Join unlimited enrolled classes via PIN/QR',
                      '10 AI self-paced learning topics per month',
                      'Instant practice quizzes after every topic',
                      'Wrong-answer review with AI explanations',
                      'Join live Kahoot-style room games with PIN',
                      'Personal learning history & library'
                    ].map((feat, fIdx) => (
                      <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#57534E' }}>
                        <CheckCircle2 size={16} color="#0F766E" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: '36px' }}>
                <button
                  onClick={() => setRole('student')}
                  style={{
                    width: '100%',
                    padding: '13px',
                    fontSize: '14.5px',
                    fontWeight: 700,
                    backgroundColor: '#FAFAF9',
                    color: '#1C1917',
                    border: '1.5px solid #D6D3D1',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Get Started Free
                </button>
              </div>
            </div>

            {/* Card 2: Pro Educator (Highlighted / Most Popular) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '36px 32px',
                border: '2px solid #0F766E',
                boxShadow: '0 16px 36px rgba(15, 118, 110, 0.16)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transform: 'scale(1.02)'
              }}
            >
              {/* Popular Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#0F766E',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  boxShadow: '0 4px 10px rgba(15, 118, 110, 0.3)'
                }}
              >
                MOST POPULAR FOR FACULTY
              </div>

              <div>
                <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0F766E' }}>
                  FACULTY & TEACHERS
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1C1917', marginTop: '6px' }}>Pro Educator</h3>
                <p style={{ fontSize: '13.5px', color: '#78716C', marginTop: '6px', marginBottom: '24px' }}>
                  Complete academic toolkit for professors, lecturers, and modern classrooms.
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '28px' }}>
                  <span style={{ fontSize: '42px', fontWeight: 900, color: '#0F766E' }}>
                    {billingPeriod === 'annual' ? '$19' : '$24'}
                  </span>
                  <span style={{ fontSize: '14px', color: '#78716C', fontWeight: 500 }}>/ month</span>
                </div>

                <div style={{ borderTop: '1px solid #F0EEEB', paddingTop: '20px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#1C1917', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '14px' }}>
                    Everything in Starter, plus:
                  </span>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', paddingLeft: 0 }}>
                    {[
                      'Unlimited AI Lecture Plans & Curriculum builder',
                      'Auto-fill slide deck generator with export',
                      'Multi-format Objective & Subjective Quizzes',
                      'Full AI Subjective Grading Override controls',
                      'Comprehensive per-student performance drill-down',
                      'Host live Kahoot-style competitions with PIN/QR',
                      'Printable accredited certificates for top winners'
                    ].map((feat, fIdx) => (
                      <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#1C1917', fontWeight: 500 }}>
                        <CheckCircle2 size={16} color="#0F766E" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: '36px' }}>
                <button
                  onClick={() => setRole('teacher')}
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '15px',
                    fontWeight: 700,
                    backgroundColor: '#0F766E',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(15, 118, 110, 0.3)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Start 14-Day Free Trial
                </button>
              </div>
            </div>

            {/* Card 3: Institutional Campus */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '36px 32px',
                border: '1px solid #E7E5E4',
                boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#78716C' }}>
                  SCHOOLS & UNIVERSITIES
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1C1917', marginTop: '6px' }}>Institutional Campus</h3>
                <p style={{ fontSize: '13.5px', color: '#78716C', marginTop: '6px', marginBottom: '24px' }}>
                  Enterprise deployment with university LMS sync, cohort analytics, and custom branding.
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '28px' }}>
                  <span style={{ fontSize: '42px', fontWeight: 900, color: '#1C1917' }}>
                    {billingPeriod === 'annual' ? '$79' : '$99'}
                  </span>
                  <span style={{ fontSize: '14px', color: '#78716C', fontWeight: 500 }}>/ dept / month</span>
                </div>

                <div style={{ borderTop: '1px solid #F0EEEB', paddingTop: '20px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#1C1917', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '14px' }}>
                    Everything in Pro, plus:
                  </span>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', paddingLeft: 0 }}>
                    {[
                      'Canvas, Moodle, & Blackboard LMS automated sync',
                      'Unlimited faculty seats & student enrollments',
                      'Dedicated fine-tuned LLM for university curriculum',
                      'Custom institutional logos on all certificates',
                      'Department-wide cross-course grade analytics',
                      'Dedicated account manager & 99.9% uptime SLA'
                    ].map((feat, fIdx) => (
                      <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#57534E' }}>
                        <CheckCircle2 size={16} color="#0F766E" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: '36px' }}>
                <button
                  onClick={() => {
                    showToast('Academic Sales representative notified. Contacting your university.');
                    setRole('teacher');
                  }}
                  style={{
                    width: '100%',
                    padding: '13px',
                    fontSize: '14.5px',
                    fontWeight: 700,
                    backgroundColor: '#134E4A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Contact Academic Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. QUICK JOIN PIN / QR CALLOUT BANNER
          ========================================================================= */}
      <section
        style={{
          padding: '60px 48px',
          backgroundColor: '#134E4A',
          color: '#FFFFFF'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#84CC16', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              INSTANT CLASSROOM ACCESS
            </span>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
              Have a Class, Quiz, or Game PIN?
            </h3>
            <p style={{ fontSize: '15px', color: '#99F6E4', marginTop: '4px' }}>
              Join immediately as a student or guest without creating an account.
            </p>
          </div>

          <form onSubmit={handleGuestJoin} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Enter PIN (e.g. 8429, NET-4091)"
              value={guestCode}
              onChange={e => setGuestCode(e.target.value)}
              style={{
                padding: '12px 18px',
                fontSize: '15px',
                fontWeight: 700,
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                outline: 'none',
                width: '240px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                fontSize: '14.5px',
                fontWeight: 800,
                backgroundColor: '#84CC16',
                color: '#134E4A',
                border: 'none',
                borderRadius: '9999px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Enter Now →
            </button>
          </form>
        </div>
      </section>

      {/* =========================================================================
          7. FOOTER
          ========================================================================= */}
      <footer
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E7E5E4',
          padding: '48px 48px 32px'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '15px' }}>
              <GraduationCap size={18} />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#134E4A' }}>
              Educatex Hub
            </span>
          </div>

          <div style={{ display: 'flex', gap: '28px', fontSize: '13.5px', color: '#78716C' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('features')}>Features</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setRole('teacher')}>Teacher Module</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setRole('student')}>Student Module</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setRole('competition')}>Competition Mode</span>
            <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('pricing')}>Pricing</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#A8A29E' }}>
            © 2026 Educatex Hub. Built to FYP Prototype Specifications.
          </span>
        </div>
      </footer>

      {/* Join via PIN / QR Modal */}
      <Modal
        isOpen={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        title="Enter Class, Quiz, or Game PIN"
        maxWidth="460px"
      >
        <form onSubmit={handleGuestJoin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13.5px', color: '#78716C' }}>
            Enter any join code provided by your instructor or host (e.g. <code>8429</code> for Competition, <code>NET-4091</code> for Course Class, or <code>RAFT-7721</code> for Standalone Quiz).
          </p>

          <input
            type="text"
            placeholder="e.g. 8429, NET-4091, RAFT-7721"
            value={guestCode}
            onChange={e => setGuestCode(e.target.value)}
            className="input-field"
            style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}
            autoFocus
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#78716C', fontWeight: 600 }}>Quick Test:</span>
            <button
              type="button"
              onClick={() => setGuestCode('8429')}
              style={{ fontSize: '11.5px', padding: '4px 10px', backgroundColor: '#FAFAF9', border: '1px solid #E7E5E4', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
            >
              8429 (Live Game)
            </button>
            <button
              type="button"
              onClick={() => setGuestCode('NET-4091')}
              style={{ fontSize: '11.5px', padding: '4px 10px', backgroundColor: '#FAFAF9', border: '1px solid #E7E5E4', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
            >
              NET-4091 (Class)
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setShowGuestModal(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Join Now
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
