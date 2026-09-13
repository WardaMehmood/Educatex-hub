import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, RotateCcw, Link2 } from 'lucide-react';
import { Button } from '../../common/Button';

interface MatchingPairsGameProps {
  data?: {
    pairs: { id: string; left: string; right: string }[];
  };
  onComplete: (score: number, accuracy: number) => void;
  onExit: () => void;
}

const DEFAULT_PAIRS = [
  { id: 'p-1', left: 'HTTP', right: 'Port 80 • Cleartext Web Protocol' },
  { id: 'p-2', left: 'HTTPS', right: 'Port 443 • TLS Encrypted Web' },
  { id: 'p-3', left: 'DNS', right: 'Port 53 • Domain Name Resolution' },
  { id: 'p-4', left: 'SSH', right: 'Port 22 • Secure Remote Terminal' },
  { id: 'p-5', left: 'FTP', right: 'Port 21 • File Transfer Protocol' },
  { id: 'p-6', left: 'SMTP', right: 'Port 25 • Electronic Mail Routing' }
];

export const MatchingPairsGame: React.FC<MatchingPairsGameProps> = ({
  data,
  onComplete,
  onExit
}) => {
  const pairs = data?.pairs || DEFAULT_PAIRS;

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Shuffle right items initially
  const [shuffledRights] = useState(() => {
    return [...pairs].sort(() => Math.random() - 0.5);
  });

  const handleLeftClick = (pairId: string) => {
    if (matchedIds.includes(pairId)) return;
    setSelectedLeft(pairId);

    if (selectedRight) {
      checkMatch(pairId, selectedRight);
    }
  };

  const handleRightClick = (pairId: string) => {
    if (matchedIds.includes(pairId)) return;
    setSelectedRight(pairId);

    if (selectedLeft) {
      checkMatch(selectedLeft, pairId);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // Match found!
      const newMatched = [...matchedIds, leftId];
      setMatchedIds(newMatched);
      setScore(prev => prev + 200 + (streak * 50));
      setStreak(prev => prev + 1);
      setSelectedLeft(null);
      setSelectedRight(null);

      if (newMatched.length === pairs.length) {
        setTimeout(() => {
          onComplete(score + 300, 100);
        }, 800);
      }
    } else {
      // Wrong match
      setWrongMatch(true);
      setStreak(0);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongMatch(false);
      }, 700);
    }
  };

  const handleFinish = () => {
    const accuracy = Math.round((matchedIds.length / pairs.length) * 100);
    onComplete(score, accuracy);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '880px', margin: '0 auto' }}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#0F172A',
          padding: '14px 20px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-lime-accent)', letterSpacing: '0.05em' }}>
            MATCHING PAIRS ARENA
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '2px 0 0' }}>
            Connect Related Concepts ({matchedIds.length}/{pairs.length} Matched)
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>Tournament Score</span>
            <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-lime-accent)' }}>
              {score} pts
            </div>
          </div>

          <Button variant="lime" size="sm" onClick={handleFinish}>
            Finish Round <ArrowRight size={13} />
          </Button>
        </div>
      </div>

      {/* Two Column Matching Layout */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '28px',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#0F766E', letterSpacing: '0.05em' }}>
              ACADEMIC TERMS
            </h4>
            {pairs.map(p => {
              const isMatched = matchedIds.includes(p.id);
              const isSelected = selectedLeft === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleLeftClick(p.id)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    textAlign: 'left',
                    border: isMatched
                      ? '2px solid #10B981'
                      : isSelected
                      ? '2px solid #0F766E'
                      : wrongMatch && isSelected
                      ? '2px solid #EF4444'
                      : '1px solid #E2E8F0',
                    backgroundColor: isMatched
                      ? '#ECFDF5'
                      : isSelected
                      ? '#CCFBF1'
                      : '#F8FAFC',
                    cursor: isMatched ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 800, color: isMatched ? '#047857' : '#0F172A' }}>
                    {p.left}
                  </span>
                  {isMatched && <CheckCircle2 size={16} color="#059669" />}
                </button>
              );
            })}
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#0F766E', letterSpacing: '0.05em' }}>
              MATCHING DEFINITIONS & PRINCIPLES
            </h4>
            {shuffledRights.map(p => {
              const isMatched = matchedIds.includes(p.id);
              const isSelected = selectedRight === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleRightClick(p.id)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    textAlign: 'left',
                    border: isMatched
                      ? '2px solid #10B981'
                      : isSelected
                      ? '2px solid #0F766E'
                      : wrongMatch && isSelected
                      ? '2px solid #EF4444'
                      : '1px solid #E2E8F0',
                    backgroundColor: isMatched
                      ? '#ECFDF5'
                      : isSelected
                      ? '#CCFBF1'
                      : '#F8FAFC',
                    cursor: isMatched ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600, color: isMatched ? '#047857' : '#334155' }}>
                    {p.right}
                  </span>
                  {isMatched && <CheckCircle2 size={16} color="#059669" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
