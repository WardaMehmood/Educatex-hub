import React, { useState, useEffect } from 'react';
import { Check, X, ArrowRight, Flame, Clock } from 'lucide-react';
import { Button } from '../../common/Button';

interface TrueFalseGameProps {
  data?: {
    statements: { id: string; statement: string; isTrue: boolean; explanation: string }[];
  };
  onComplete: (score: number, accuracy: number) => void;
  onExit: () => void;
}

const DEFAULT_STATEMENTS = [
  {
    id: 'tf-1',
    statement: 'HTTP/3 operates over UDP using the QUIC protocol instead of TCP.',
    isTrue: true,
    explanation: 'HTTP/3 is built on QUIC (UDP) to eliminate head-of-line blocking.'
  },
  {
    id: 'tf-2',
    statement: 'In Python, inserting an element at index 0 of a list takes O(1) constant time.',
    isTrue: false,
    explanation: 'Inserting at index 0 requires shifting all subsequent elements, taking O(N) linear time.'
  },
  {
    id: 'tf-3',
    statement: 'A hash collision in a hash table can be resolved using open addressing or separate chaining.',
    isTrue: true,
    explanation: 'Both open addressing (probing) and chaining with linked lists are standard resolution techniques.'
  },
  {
    id: 'tf-4',
    statement: 'TCP Slow Start increases the congestion window linearly rather than exponentially.',
    isTrue: false,
    explanation: 'Slow Start doubles cwnd every RTT, which is exponential growth.'
  },
  {
    id: 'tf-5',
    statement: 'IPv6 address space contains 2¹²⁸ unique addresses, eliminating IPv4 address exhaustion.',
    isTrue: true,
    explanation: '128-bit addresses yield 3.4 x 10³⁸ distinct addresses.'
  }
];

export const TrueFalseGame: React.FC<TrueFalseGameProps> = ({
  data,
  onComplete,
  onExit
}) => {
  const statements = data?.statements || DEFAULT_STATEMENTS;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timer, setTimer] = useState(12);
  const [selectedVal, setSelectedVal] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const currentItem = statements[currentIdx];

  // 12-second countdown
  useEffect(() => {
    if (isAnswered) return;
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          handleAnswer(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIdx, isAnswered]);

  const handleAnswer = (val: boolean | null) => {
    if (isAnswered) return;
    setSelectedVal(val);
    setIsAnswered(true);

    const isCorrect = val === currentItem.isTrue;
    if (isCorrect) {
      const added = 200 + (timer * 10) + (streak * 50);
      setScore(s => s + added);
      setStreak(st => st + 1);
      setCorrectCount(c => c + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx < statements.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedVal(null);
      setIsAnswered(false);
      setTimer(12);
    } else {
      const accuracy = Math.round((correctCount / statements.length) * 100);
      onComplete(score, accuracy);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '820px', margin: '0 auto' }}>
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
            TRUE / FALSE SPEED SHOWDOWN
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '2px 0 0' }}>
            Statement {currentIdx + 1} of {statements.length}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {streak > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B', fontWeight: 800, fontSize: '13px' }}>
              <Flame size={16} fill="#F59E0B" /> {streak} Streak!
            </div>
          )}

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>Score</span>
            <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-lime-accent)' }}>
              {score} pts
            </div>
          </div>
        </div>
      </div>

      {/* Timer Bar */}
      <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${(timer / 12) * 100}%`,
            backgroundColor: timer <= 3 ? '#EF4444' : '#10B981',
            transition: 'width 1s linear'
          }}
        />
      </div>

      {/* Statement Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '36px 28px',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <p style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', maxWidth: '640px', lineHeight: 1.5, marginBottom: '32px' }}>
          "{currentItem.statement}"
        </p>

        {/* Two Large Tactile Buttons: TRUE & FALSE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%', maxWidth: '480px' }}>
          {/* TRUE BUTTON */}
          <button
            type="button"
            disabled={isAnswered}
            onClick={() => handleAnswer(true)}
            style={{
              padding: '24px',
              borderRadius: '14px',
              border: isAnswered && currentItem.isTrue
                ? '3px solid #047857'
                : '1px solid #BBF7D0',
              backgroundColor: isAnswered
                ? currentItem.isTrue ? '#10B981' : '#F1F5F9'
                : '#10B981',
              color: '#FFFFFF',
              fontSize: '22px',
              fontWeight: 900,
              cursor: isAnswered ? 'default' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(16,185,129,0.25)',
              opacity: isAnswered && !currentItem.isTrue ? 0.4 : 1,
              transition: 'all 0.15s ease'
            }}
          >
            <Check size={32} strokeWidth={3} />
            <span>TRUE</span>
          </button>

          {/* FALSE BUTTON */}
          <button
            type="button"
            disabled={isAnswered}
            onClick={() => handleAnswer(false)}
            style={{
              padding: '24px',
              borderRadius: '14px',
              border: isAnswered && !currentItem.isTrue
                ? '3px solid #991B1B'
                : '1px solid #FECACA',
              backgroundColor: isAnswered
                ? !currentItem.isTrue ? '#EF4444' : '#F1F5F9'
                : '#EF4444',
              color: '#FFFFFF',
              fontSize: '22px',
              fontWeight: 900,
              cursor: isAnswered ? 'default' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(239,68,68,0.25)',
              opacity: isAnswered && currentItem.isTrue ? 0.4 : 1,
              transition: 'all 0.15s ease'
            }}
          >
            <X size={32} strokeWidth={3} />
            <span>FALSE</span>
          </button>
        </div>

        {/* Post-Answer Explanation Banner */}
        {isAnswered && (
          <div
            style={{
              marginTop: '28px',
              width: '100%',
              maxWidth: '560px',
              padding: '16px',
              borderRadius: '10px',
              backgroundColor: selectedVal === currentItem.isTrue ? '#ECFDF5' : '#FEF2F2',
              border: selectedVal === currentItem.isTrue ? '1px solid #A7F3D0' : '1px solid #FECACA'
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 800, color: selectedVal === currentItem.isTrue ? '#047857' : '#DC2626', display: 'block', marginBottom: '4px' }}>
              {selectedVal === currentItem.isTrue ? '✓ Correct Answer!' : '✗ Incorrect!'}
            </span>
            <span style={{ fontSize: '12.5px', color: '#334155' }}>
              {currentItem.explanation}
            </span>

            <div style={{ marginTop: '14px' }}>
              <Button variant="primary" size="sm" onClick={handleNext}>
                {currentIdx < statements.length - 1 ? 'Next Statement →' : 'View Leaderboard →'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
