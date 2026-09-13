import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, LogOut, ArrowLeft, Shield, Plus, Award, Zap } from 'lucide-react';
import { CompetitionDashboard } from './CompetitionDashboard';
import { CompetitionCreate } from './CompetitionCreate';
import { CompetitionLobby } from './CompetitionLobby';
import { CompetitionLiveSession } from './CompetitionLiveSession';
import { CompetitionResults } from './CompetitionResults';
import { Button } from '../common/Button';

export const CompetitionShell: React.FC = () => {
  const { competitionView, setCompetitionView, setRole } = useApp();

  return (
    <div className="competition-shell">
      {/* Competition Mode Header */}
      <header className="competition-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-lime-accent)',
              color: '#134E4A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '18px'
            }}
          >
            <Zap size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '0.04em', color: '#FFFFFF' }}>
                COMPETITION ARENA
              </span>
              <span className="competition-badge">STANDALONE</span>
            </div>
            <span style={{ fontSize: '12px', color: '#99F6E4' }}>
              Organizer & Live Tournament Controller
            </span>
          </div>
        </div>

        {/* Top Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => setCompetitionView('dashboard')}
            style={{
              background: 'transparent',
              border: 'none',
              color: competitionView === 'dashboard' ? 'var(--color-lime-accent)' : '#CCFBF1',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCompetitionView('create')}
            style={{
              background: 'transparent',
              border: 'none',
              color: competitionView === 'create' ? 'var(--color-lime-accent)' : '#99F6E4',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Create
          </button>
          <button
            onClick={() => setCompetitionView('lobby')}
            style={{
              background: 'transparent',
              border: 'none',
              color: competitionView === 'lobby' ? 'var(--color-lime-accent)' : '#99F6E4',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Lobby
          </button>
          <button
            onClick={() => setCompetitionView('live')}
            style={{
              background: 'transparent',
              border: 'none',
              color: competitionView === 'live' ? 'var(--color-lime-accent)' : '#99F6E4',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Live Session
          </button>
          <button
            onClick={() => setCompetitionView('results')}
            style={{
              background: 'transparent',
              border: 'none',
              color: competitionView === 'results' ? 'var(--color-lime-accent)' : '#99F6E4',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Results
          </button>

          <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

          <button
            onClick={() => setRole('landing')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={13} /> Exit Arena
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="competition-main">
        {competitionView === 'dashboard' && <CompetitionDashboard />}
        {competitionView === 'create' && <CompetitionCreate />}
        {competitionView === 'lobby' && <CompetitionLobby />}
        {competitionView === 'live' && <CompetitionLiveSession />}
        {competitionView === 'results' && <CompetitionResults />}
      </main>
    </div>
  );
};
