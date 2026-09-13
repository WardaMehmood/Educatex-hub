import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Play,
  QrCode,
  Copy,
  Check,
  Share2,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../common/Button';
import { QRCodeDisplay } from '../common/QRCodeDisplay';

export const CompetitionLobby: React.FC = () => {
  const {
    competitions,
    activeCompetitionId,
    setCompetitionView,
    updateCompetition,
    showToast
  } = useApp();

  const currentComp = competitions.find(c => c.id === activeCompetitionId) || competitions[0];

  const [participants, setParticipants] = useState([
    { id: 'p-1', name: 'Sarah Jenkins', avatar: 'SJ', ready: true },
    { id: 'p-2', name: 'Ahmed Tariq', avatar: 'AT', ready: true },
    { id: 'p-3', name: 'Ali Raza', avatar: 'AR', ready: true },
    { id: 'p-4', name: 'Zainab Fatima', avatar: 'ZF', ready: true },
    { id: 'p-5', name: 'Hamza Malik', avatar: 'HM', ready: true },
    { id: 'p-6', name: 'Bilal Khan', avatar: 'BK', ready: true },
    { id: 'p-7', name: 'Danyal Sheikh', avatar: 'DS', ready: true }
  ]);

  // Simulate real-time live guest participant joining
  useEffect(() => {
    const timer = setTimeout(() => {
      setParticipants(prev => [
        ...prev,
        { id: `p-guest-${Date.now()}`, name: 'Guest Explorer #92', avatar: 'GE', ready: true }
      ]);
      showToast('A guest participant just joined via QR code!', 'info');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartCompetition = () => {
    const updated = {
      ...currentComp,
      status: 'live' as const,
      currentQuestionIndex: 0,
      timeRemaining: currentComp.timePerQuestion || 30
    };
    updateCompetition(updated);
    setCompetitionView('live');
    showToast('Live session started! Broadcast active.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1080px', margin: '0 auto' }}>
      {/* Top Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => setCompetitionView('dashboard')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94A3B8',
            fontSize: '13.5px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ArrowLeft size={16} /> Back to Competitions
        </button>

        <span className="competition-badge">HOST LOBBY</span>
      </div>

      {/* Hero Waiting Room Card */}
      <div className="competition-card" style={{ textAlign: 'center', padding: '36px 24px' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', color: '#0F766E', textTransform: 'uppercase' }}>
          MULTI-PLAYER TOURNAMENT LOBBY
        </span>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-main)', marginTop: '4px', marginBottom: '12px' }}>
          {currentComp.title}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', maxWidth: '580px', margin: '0 auto 24px' }}>
          Guests and students can scan the QR code or enter the 4-digit PIN on the EducateX portal. No account required.
        </p>

        {/* Large Code Display as strictly mandated: 8 4 2 9 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
          {currentComp.code.split('').map((digit, idx) => (
            <div
              key={idx}
              style={{
                width: '64px',
                height: '78px',
                borderRadius: '12px',
                backgroundColor: '#0F172A',
                color: '#FBBF24',
                fontSize: '40px',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
                border: '2px solid rgba(245, 158, 11, 0.4)'
              }}
            >
              {digit}
            </div>
          ))}
        </div>

        {/* QR Code */}
        <div style={{ marginBottom: '32px' }}>
          <QRCodeDisplay
            value={currentComp.code}
            label="QUICK SCAN PIN"
            size={160}
            allowEnlarge
          />
        </div>

        {/* Primary CTA: START COMPETITION (Only Host can start) */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="lime"
            size="lg"
            icon={<Play size={18} fill="#1A2E05" />}
            onClick={handleStartCompetition}
            style={{
              padding: '16px 48px',
              fontSize: '18px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              boxShadow: '0 6px 20px rgba(132, 204, 22, 0.4)'
            }}
          >
            START COMPETITION
          </Button>
        </div>
      </div>

      {/* Joined Participants Roster */}
      <div className="competition-card-dark">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={20} color="var(--color-lime-accent)" />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>
              Connected Participants ({participants.length})
            </h3>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--color-lime-accent)', fontWeight: 600 }}>
            ● Waiting for Host signal...
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
          {participants.map(p => (
            <div
              key={p.id}
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid rgba(255,255,255,0.12)'
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-emerald)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '12px'
                }}
              >
                {p.avatar}
              </div>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
