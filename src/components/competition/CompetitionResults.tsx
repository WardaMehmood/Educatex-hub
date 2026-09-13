import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Share2,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Star,
  Users,
  Calendar,
  Eye,
  History,
  Medal,
  Award
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import confetti from 'canvas-confetti';

interface PastTournamentRecord {
  id: string;
  title: string;
  date: string;
  participantsCount: number;
  totalQuestions: number;
  format: string;
  winner: {
    name: string;
    avatar: string;
    score: number;
    accuracy: string;
    team: string;
  };
  runnerUp: {
    name: string;
    avatar: string;
    score: number;
  };
  thirdPlace: {
    name: string;
    avatar: string;
    score: number;
  };
  topRoster: { rank: number; name: string; score: number; accuracy: string }[];
}

const PAST_TOURNAMENTS: PastTournamentRecord[] = [
  {
    id: 'past-1',
    title: 'National Speed Quiz Bowl 2026',
    date: 'Sep 11, 2026 • 2 days ago',
    participantsCount: 112,
    totalQuestions: 15,
    format: 'Multiplayer Kahoot Arena',
    winner: {
      name: 'Sarah Jenkins',
      avatar: 'SJ',
      score: 1480,
      accuracy: '95%',
      team: 'Teal Raptors'
    },
    runnerUp: {
      name: 'Marcus Chen',
      avatar: 'MC',
      score: 1390
    },
    thirdPlace: {
      name: 'Elena Rostova',
      avatar: 'ER',
      score: 1240
    },
    topRoster: [
      { rank: 1, name: 'Sarah Jenkins', score: 1480, accuracy: '95%' },
      { rank: 2, name: 'Marcus Chen', score: 1390, accuracy: '92%' },
      { rank: 3, name: 'Elena Rostova', score: 1240, accuracy: '88%' },
      { rank: 4, name: 'David Kim', score: 1150, accuracy: '85%' },
      { rank: 5, name: 'Aisha Patel', score: 1080, accuracy: '82%' }
    ]
  },
  {
    id: 'past-2',
    title: 'Campus Rapid Fire Championship',
    date: 'Sep 5, 2026 • 1 week ago',
    participantsCount: 84,
    totalQuestions: 12,
    format: 'Tactile Speed Rounds',
    winner: {
      name: 'Hamza Malik',
      avatar: 'HM',
      score: 1340,
      accuracy: '91%',
      team: 'Emerald Wolves'
    },
    runnerUp: {
      name: 'Ayesha Siddiqui',
      avatar: 'AS',
      score: 1280
    },
    thirdPlace: {
      name: 'Omar Farooq',
      avatar: 'OF',
      score: 1190
    },
    topRoster: [
      { rank: 1, name: 'Hamza Malik', score: 1340, accuracy: '91%' },
      { rank: 2, name: 'Ayesha Siddiqui', score: 1280, accuracy: '89%' },
      { rank: 3, name: 'Omar Farooq', score: 1190, accuracy: '85%' },
      { rank: 4, name: 'Zainab Qazi', score: 1120, accuracy: '83%' },
      { rank: 5, name: 'Bilal Khan', score: 1050, accuracy: '80%' }
    ]
  },
  {
    id: 'past-3',
    title: 'Inter-School STEM Showdown 2025',
    date: 'Aug 28, 2026 • 2 weeks ago',
    participantsCount: 146,
    totalQuestions: 20,
    format: 'Multi-Round Tournament',
    winner: {
      name: 'Zainab Fatima',
      avatar: 'ZF',
      score: 1520,
      accuracy: '96%',
      team: 'Lime Vipers'
    },
    runnerUp: {
      name: 'David Kim',
      avatar: 'DK',
      score: 1410
    },
    thirdPlace: {
      name: 'Bilal Khan',
      avatar: 'BK',
      score: 1330
    },
    topRoster: [
      { rank: 1, name: 'Zainab Fatima', score: 1520, accuracy: '96%' },
      { rank: 2, name: 'David Kim', score: 1410, accuracy: '93%' },
      { rank: 3, name: 'Bilal Khan', score: 1330, accuracy: '89%' },
      { rank: 4, name: 'Danyal Sheikh', score: 1260, accuracy: '86%' },
      { rank: 5, name: 'Farhan Ali', score: 1200, accuracy: '84%' }
    ]
  }
];

export const CompetitionResults: React.FC = () => {
  const {
    competitions,
    activeCompetitionId,
    setCompetitionView,
    showToast
  } = useApp();

  const currentComp = competitions.find(c => c.id === activeCompetitionId) || competitions[0];
  const [selectedPastTourney, setSelectedPastTourney] = useState<PastTournamentRecord | null>(null);

  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const winners = [
    { rank: 1, name: 'Sarah Jenkins', score: 1480, avatar: 'SJ', accuracy: '95%' },
    { rank: 2, name: 'Marcus Chen', score: 1390, avatar: 'MC', accuracy: '92%' },
    { rank: 3, name: 'Elena Rostova', score: 1240, avatar: 'ER', accuracy: '88%' }
  ];

  const fullRoster = [
    ...winners,
    { rank: 4, name: 'David Kim', score: 1150 },
    { rank: 5, name: 'Aisha Patel', score: 1080 },
    { rank: 6, name: 'Liam Wilson', score: 990 },
    { rank: 7, name: 'Zainab Ahmed', score: 910 },
    { rank: 8, name: 'Noah Taylor', score: 840 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px', margin: '0 auto', padding: '16px 0' }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', backgroundColor: 'rgba(13, 62, 58, 0.85)', borderRadius: '9999px', border: '1px solid rgba(153, 246, 228, 0.3)', marginBottom: '12px' }}>
          <Trophy size={16} color="var(--color-lime-accent)" />
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-lime-accent)', letterSpacing: '0.05em' }}>
            TOURNAMENT FINISHED
          </span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          {currentComp.title} Results
        </h1>
        <p style={{ fontSize: '15px', color: '#99F6E4', marginTop: '6px', fontWeight: 500 }}>
          Final arena standing • Verified by EducateX Real-time Score Engine
        </p>
      </div>

      {/* Podium Display (Kahoot 1-2-3 Stadium Style) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: '20px',
          padding: '40px 20px 0',
          minHeight: '280px'
        }}
      >
        {/* 2nd Place */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '180px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#94A3B8', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '18px', border: '3px solid #FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.25)', marginBottom: '8px' }}>
            {winners[1].avatar}
          </div>
          <span style={{ fontWeight: 800, fontSize: '15px', color: '#FFFFFF' }}>{winners[1].name}</span>
          <span style={{ fontSize: '12px', color: '#99F6E4', fontWeight: 600 }}>Accuracy: {winners[1].accuracy}</span>
          <div
            style={{
              width: '100%',
              height: '140px',
              backgroundColor: '#CBD5E1',
              borderRadius: '12px 12px 0 0',
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#334155',
              fontWeight: 800,
              boxShadow: '0 -4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ fontSize: '32px' }}>🥈</div>
            <div style={{ fontSize: '18px' }}>2nd</div>
            {winners[1].score} pts
          </div>
        </div>

        {/* 1st Place (Champion) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '210px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'var(--color-lime-accent)', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '22px', border: '4px solid #FFFFFF', boxShadow: '0 8px 24px rgba(132, 204, 22, 0.4)', marginBottom: '8px', position: 'relative' }}>
            <Trophy size={20} style={{ position: 'absolute', top: '-14px', color: '#EAB308' }} />
            {winners[0].avatar}
          </div>
          <span style={{ fontWeight: 900, fontSize: '18px', color: '#FFFFFF' }}>{winners[0].name}</span>
          <span style={{ fontSize: '12px', color: 'var(--color-lime-accent)', fontWeight: 800 }}>Accuracy: {winners[0].accuracy}</span>
          <div
            style={{
              width: '100%',
              height: '190px',
              backgroundColor: 'var(--color-primary-emerald)',
              borderRadius: '16px 16px 0 0',
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              boxShadow: '0 -8px 24px rgba(15, 118, 110, 0.35)'
            }}
          >
            <div style={{ fontSize: '42px' }}>🥇</div>
            <div style={{ fontSize: '24px' }}>CHAMPION</div>
            <span style={{ fontSize: '18px', color: 'var(--color-lime-accent)' }}>{winners[0].score} pts</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '180px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#D97706', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '18px', border: '3px solid #FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.25)', marginBottom: '8px' }}>
            {winners[2].avatar}
          </div>
          <span style={{ fontWeight: 800, fontSize: '15px', color: '#FFFFFF' }}>{winners[2].name}</span>
          <span style={{ fontSize: '12px', color: '#99F6E4', fontWeight: 600 }}>Accuracy: {winners[2].accuracy}</span>
          <div
            style={{
              width: '100%',
              height: '110px',
              backgroundColor: '#FDE68A',
              borderRadius: '12px 12px 0 0',
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#92400E',
              fontWeight: 800,
              boxShadow: '0 -4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ fontSize: '30px' }}>🥉</div>
            <div style={{ fontSize: '16px' }}>3rd</div>
            {winners[2].score} pts
          </div>
        </div>
      </div>

      {/* Action Bar: Rematch & Back to Dashboard */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Button
          variant="primary"
          size="lg"
          icon={<RotateCcw size={16} />}
          onClick={() => {
            showToast('Tournament rematch initiated!');
            setCompetitionView('live');
          }}
        >
          Play Rematch
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => setCompetitionView('dashboard')}
        >
          Back to Competition Dashboard
        </Button>
      </div>

      {/* Current Match Leaderboard Table */}
      <div className="competition-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '16px' }}>
          Current Tournament Leaderboard
        </h3>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Contender</th>
              <th>Score</th>
              <th>Accuracy</th>
              <th>Standing</th>
            </tr>
          </thead>
          <tbody>
            {fullRoster.map(r => (
              <tr key={r.rank}>
                <td style={{ fontWeight: 800, fontSize: '15px' }}>
                  {r.rank <= 3 ? (r.rank === 1 ? '🥇 1' : r.rank === 2 ? '🥈 2' : '🥉 3') : `#${r.rank}`}
                </td>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td style={{ fontWeight: 700, color: 'var(--color-primary-emerald)' }}>{r.score} pts</td>
                <td>{96 - r.rank * 3}%</td>
                <td>
                  <Badge variant={r.rank === 1 ? 'lime' : r.rank <= 3 ? 'emerald' : 'neutral'}>
                    {r.rank === 1 ? 'Tournament Champion' : r.rank === 2 ? 'Runner-Up' : r.rank === 3 ? '3rd Place' : 'Finalist'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =========================================================================
          NEW: Past Competitions History & Previous Showdowns Cards
          ========================================================================= */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <History size={16} color="var(--color-lime-accent)" />
              <span style={{ fontSize: '11.5px', fontWeight: 900, color: 'var(--color-lime-accent)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                SHOWDOWN ARCHIVE
              </span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              Past Tournament Results & Champions
            </h2>
          </div>
          <span style={{ fontSize: '12.5px', color: '#99F6E4', fontWeight: 600 }}>
            Click any card to inspect full match report
          </span>
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {PAST_TOURNAMENTS.map(tourney => (
            <div
              key={tourney.id}
              className="competition-card-dark"
              onClick={() => setSelectedPastTourney(tourney)}
              style={{
                padding: '22px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(153, 246, 228, 0.25)',
                borderRadius: '16px',
                backgroundColor: '#0D3E3A',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.35)';
                e.currentTarget.style.borderColor = 'var(--color-lime-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(153, 246, 228, 0.25)';
              }}
            >
              <div>
                {/* Header: Title & Status Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.35 }}>
                    {tourney.title}
                  </h3>
                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      color: '#CCFBF1',
                      border: '1px solid rgba(153, 246, 228, 0.3)',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      padding: '3px 9px',
                      borderRadius: '9999px',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    COMPLETED
                  </span>
                </div>

                {/* Date */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#99F6E4', marginBottom: '14px', fontWeight: 500 }}>
                  <Calendar size={13} color="#99F6E4" />
                  <span>{tourney.date}</span>
                </div>

                {/* Tournament Stats Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(15, 118, 110, 0.45)',
                      border: '1px solid rgba(153, 246, 228, 0.25)',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#FFFFFF'
                    }}
                  >
                    <Users size={12} color="var(--color-lime-accent)" />
                    {tourney.participantsCount} Participants
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: '#CCFBF1'
                    }}
                  >
                    {tourney.totalQuestions} Questions
                  </span>
                </div>

                {/* Winner Box (Kon First Aya) */}
                <div
                  style={{
                    backgroundColor: 'rgba(10, 46, 43, 0.85)',
                    border: '1.5px solid var(--color-lime-accent)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    marginBottom: '14px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--color-lime-accent)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Trophy size={12} /> 1st Place Champion
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 900, color: '#FBBF24' }}>
                      {tourney.winner.score} pts
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-lime-accent)',
                        color: '#0A2E2B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: '12px',
                        flexShrink: 0
                      }}
                    >
                      {tourney.winner.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
                        {tourney.winner.name}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#99F6E4', fontWeight: 500 }}>
                        Accuracy: {tourney.winner.accuracy} • {tourney.winner.team}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Open Card Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(153, 246, 228, 0.15)', paddingTop: '12px' }}>
                <span style={{ fontSize: '11.5px', color: '#CCFBF1', fontWeight: 500 }}>
                  Runner-up: <strong style={{ color: '#FFFFFF' }}>{tourney.runnerUp.name}</strong>
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    color: 'var(--color-lime-accent)'
                  }}
                >
                  <Eye size={14} /> Open Card
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          PAST COMPETITION DETAILS MODAL (When clicking any past card)
          ========================================================================= */}
      {selectedPastTourney && (
        <Modal
          isOpen={Boolean(selectedPastTourney)}
          onClose={() => setSelectedPastTourney(null)}
          title={`Tournament Report: ${selectedPastTourney.title}`}
          maxWidth="680px"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setSelectedPastTourney(null)}>
                Close Report
              </Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Top Quick Stats Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                padding: '14px',
                backgroundColor: '#F8FAFC',
                borderRadius: '10px',
                border: '1px solid #E2E8F0'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>Date Held</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  {selectedPastTourney.date}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>Total Contenders</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary-emerald)' }}>
                  {selectedPastTourney.participantsCount} Players
                </span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>Tournament Format</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  {selectedPastTourney.format}
                </span>
              </div>
            </div>

            {/* Podium Overview for Past Tournament */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '10px' }}>
                Podium Winners
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {/* 1st Place */}
                <div
                  style={{
                    backgroundColor: 'rgba(132, 204, 22, 0.12)',
                    border: '1px solid rgba(132, 204, 22, 0.3)',
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>🥇</div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#15803D', textTransform: 'uppercase' }}>CHAMPION</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', margin: '4px 0' }}>
                    {selectedPastTourney.winner.name}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary-emerald)' }}>
                    {selectedPastTourney.winner.score} pts
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    Accuracy: {selectedPastTourney.winner.accuracy}
                  </div>
                </div>

                {/* 2nd Place */}
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>🥈</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>RUNNER-UP</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', margin: '4px 0' }}>
                    {selectedPastTourney.runnerUp.name}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                    {selectedPastTourney.runnerUp.score} pts
                  </div>
                </div>

                {/* 3rd Place */}
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>🥉</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#B45309', textTransform: 'uppercase' }}>3RD PLACE</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', margin: '4px 0' }}>
                    {selectedPastTourney.thirdPlace.name}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                    {selectedPastTourney.thirdPlace.score} pts
                  </div>
                </div>
              </div>
            </div>

            {/* Top Leaderboard for Past Tournament */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
                Top Ranked Contenders
              </h4>
              <table className="custom-table" style={{ fontSize: '12.5px' }}>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Contender</th>
                    <th>Final Score</th>
                    <th>Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPastTourney.topRoster.map(r => (
                    <tr key={r.rank}>
                      <td style={{ fontWeight: 700 }}>
                        {r.rank === 1 ? '🥇 1st' : r.rank === 2 ? '🥈 2nd' : r.rank === 3 ? '🥉 3rd' : `#${r.rank}`}
                      </td>
                      <td style={{ fontWeight: 600 }}>{r.name}</td>
                      <td style={{ fontWeight: 700, color: 'var(--color-primary-emerald)' }}>{r.score} pts</td>
                      <td>{r.accuracy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
