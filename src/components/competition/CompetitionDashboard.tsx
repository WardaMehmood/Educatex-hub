import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Plus,
  Users,
  Clock,
  ArrowRight,
  Flame,
  CheckCircle2,
  Gamepad2
} from 'lucide-react';
import { Button } from '../common/Button';

export const CompetitionDashboard: React.FC = () => {
  const {
    competitions,
    setActiveCompetitionId,
    setCompetitionView
  } = useApp();

  // Show only 3 to 4 active/recent competitions
  const visibleCompetitions = competitions.slice(0, 4);
  const featuredComp = visibleCompetitions[0] || competitions[0];

  const handleEnterLive = (id: string) => {
    setActiveCompetitionId(id);
    setCompetitionView('live');
  };

  const handleEnterLobby = (id: string) => {
    setActiveCompetitionId(id);
    setCompetitionView('lobby');
  };

  const handleEnterResults = (id: string) => {
    setActiveCompetitionId(id);
    setCompetitionView('results');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Hero Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="competition-badge">COMPETITION MODE</span>
            <span style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 600 }}>Multiplayer Academic Tournament Arena</span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Live Academic Competitions & Showdowns
          </h1>
          <p style={{ fontSize: '12.5px', color: '#94A3B8', marginTop: '2px' }}>
            Multiplayer Kahoot-style tournament arena for live showdowns, speed quizzes, and team battles.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="lime"
            size="sm"
            icon={<Plus size={14} />}
            onClick={() => setCompetitionView('create')}
          >
            + Create Competition
          </Button>
        </div>
      </div>

      {/* Competitions Grid or Empty State */}
      {visibleCompetitions.length === 0 ? (
        <div
          className="competition-card"
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            border: '1px dashed rgba(255,255,255,0.2)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-lime-accent)'
            }}
          >
            <Trophy size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
              No Active Competitions
            </h3>
            <p style={{ fontSize: '13px', color: '#94A3B8', maxWidth: '420px', margin: '0 auto' }}>
              You haven't created any tournament arenas yet. Create your first competition and invite players with a 4-digit PIN!
            </p>
          </div>
          <Button
            variant="lime"
            size="md"
            icon={<Plus size={16} />}
            onClick={() => setCompetitionView('create')}
          >
            Create First Competition
          </Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
          {visibleCompetitions.map(comp => {
            const isLive = comp.status === 'live';
            const isLobby = comp.status === 'lobby';
            const isCompleted = comp.status === 'completed';
            const coverImg = comp.coverImage || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80';

            return (
              <div
                key={comp.id}
                className="competition-card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {/* Cover Banner */}
                <div style={{ position: 'relative', width: '100%', height: '125px', backgroundColor: '#0F172A', overflow: 'hidden' }}>
                  <img
                    src={coverImg}
                    alt={comp.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Gradient Shadow */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.35) 60%, rgba(0,0,0,0.15) 100%)'
                    }}
                  />

                  {/* Badges on Top */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isLive ? (
                        <span
                          style={{
                            backgroundColor: '#DC2626',
                            color: '#FFFFFF',
                            fontWeight: 800,
                            fontSize: '9.5px',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: '0 2px 6px rgba(220,38,38,0.4)'
                          }}
                        >
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#FFFFFF', animation: 'pulse 1s infinite' }} />
                          LIVE ARENA
                        </span>
                      ) : isLobby ? (
                        <span
                          style={{
                            backgroundColor: '#F59E0B',
                            color: '#0F172A',
                            fontWeight: 800,
                            fontSize: '9.5px',
                            padding: '3px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          LOBBY OPEN
                        </span>
                      ) : (
                        <span
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(4px)',
                            color: '#FFFFFF',
                            fontWeight: 700,
                            fontSize: '9.5px',
                            padding: '3px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          COMPLETED
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 900,
                        color: '#0F172A',
                        backgroundColor: 'var(--color-lime-accent)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.04em'
                      }}
                    >
                      PIN: {comp.code}
                    </span>
                  </div>

                  {/* Format subtitle */}
                  <div style={{ position: 'absolute', bottom: '8px', left: '14px', right: '14px' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#E2E8F0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {comp.format === 'game_style' ? 'KAHOOT GAME-STYLE ARENA' : 'STANDARD SPEED QUIZ'}
                    </span>
                  </div>
                </div>

                {/* Card Body Content */}
                <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px', lineHeight: 1.35 }}>
                      {comp.title}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: '#0F766E' }}>
                        <Users size={12} /> {comp.participantsCount} Joined
                      </span>
                      <span>• {comp.questions?.length || comp.totalQuestions} Questions</span>
                      <span>• {comp.timePerQuestion}s / Q</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-light)', paddingTop: '10px' }}>
                    <span style={{ fontSize: '10.5px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Flame size={11} color="#F59E0B" /> Interactive Arena
                    </span>
                    <Button
                      variant={isLive ? 'teal' : 'lime'}
                      size="sm"
                      icon={<ArrowRight size={13} />}
                      iconPosition="right"
                      onClick={() => {
                        if (isLive) handleEnterLive(comp.id);
                        else if (isLobby) handleEnterLobby(comp.id);
                        else handleEnterResults(comp.id);
                      }}
                    >
                      {isLive ? 'Enter Live Arena →' : isLobby ? 'Join Host Lobby →' : 'View Leaderboard →'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Grid: Global Contenders & Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
        {/* Top Contenders Leaderboard */}
        <div className="competition-card-dark" style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trophy size={15} color="var(--color-lime-accent)" />
              Top Global Arena Contenders
            </h3>
            <span style={{ fontSize: '10.5px', color: 'var(--color-lime-accent)', fontWeight: 700 }}>Real-time</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(featuredComp?.participants || []).slice(0, 4).map((p, idx) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255,255,255,0.06)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, width: '18px', color: idx === 0 ? 'var(--color-lime-accent)' : '#FFFFFF' }}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF' }}>{p.name}</span>
                  {p.team && (
                    <span style={{ fontSize: '9.5px', color: '#99F6E4', backgroundColor: 'rgba(15,118,110,0.4)', padding: '1px 5px', borderRadius: '3px' }}>
                      {p.team}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {p.streak > 1 && (
                    <span style={{ fontSize: '10px', color: 'var(--color-lime-accent)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Flame size={11} /> {p.streak}
                    </span>
                  )}
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-lime-accent)' }}>
                    {p.score} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tournament Arena Features & Highlights */}
        <div className="competition-card-dark" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Gamepad2 size={16} color="var(--color-lime-accent)" />
              Tournament Arena Features
            </h3>
            <p style={{ fontSize: '11.5px', color: '#99F6E4', marginBottom: '10px' }}>
              Multiplayer competition engine powered by real-time WebSocket communication and tactile response cards.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#FFFFFF' }}>
                <CheckCircle2 size={13} color="var(--color-lime-accent)" />
                <span>Tactile 4-Color Answer Tiles: Vibrant geometric response buttons (▲ ◆ ● ■)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#FFFFFF' }}>
                <CheckCircle2 size={13} color="var(--color-lime-accent)" />
                <span>Real-Time Streak Engine: Bonus multipliers for rapid consecutive correct answers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#FFFFFF' }}>
                <CheckCircle2 size={13} color="var(--color-lime-accent)" />
                <span>Audio Synthesizer: Sound effects for countdown ticks, answers, and victory</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#FFFFFF' }}>
                <CheckCircle2 size={13} color="var(--color-lime-accent)" />
                <span>Quick Guest Join: Contenders can jump in instantly using a 4-digit PIN</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '10px', color: '#99F6E4' }}>
              Host or join anytime with 4-digit PIN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
