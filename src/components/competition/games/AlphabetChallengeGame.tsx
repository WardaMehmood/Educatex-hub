import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, HelpCircle, Clock } from 'lucide-react';
import { Button } from '../../common/Button';
import { playCorrectChime, playWrongSound, playTickSound, playCompleteFanfare } from '../../../utils/soundEffects';

interface AlphabetChallengeGameProps {
  data?: {
    letters: { letter: string; question: string; answer: string; hint?: string }[];
  };
  onComplete: (score: number, accuracy: number) => void;
  onExit: () => void;
}

const DEFAULT_LETTERS = [
  {
    letter: 'A',
    question: 'Symmetric encryption standard approved by NIST in 2001 to replace DES.',
    answer: 'AES',
    hint: 'Advanced Encryption Standard'
  },
  {
    letter: 'B',
    question: 'Congestion control protocol developed by Google that measures bottleneck bandwidth.',
    answer: 'BBR',
    hint: 'Bottleneck Bandwidth and RTT'
  },
  {
    letter: 'C',
    question: 'Default Linux congestion control algorithm utilizing a cubic window growth function.',
    answer: 'CUBIC',
    hint: 'Uses wall-clock time t'
  },
  {
    letter: 'D',
    question: 'Protocol that translates human-readable domain names into 32-bit or 128-bit IP addresses.',
    answer: 'DNS',
    hint: 'Port 53 service'
  },
  {
    letter: 'E',
    question: 'Python built-in function that generates sequential index numbers alongside iterated items.',
    answer: 'ENUMERATE',
    hint: 'enumerate(iterable)'
  }
];

export const AlphabetChallengeGame: React.FC<AlphabetChallengeGameProps> = ({
  data,
  onComplete,
  onExit
}) => {
  const letters = data?.letters || DEFAULT_LETTERS;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [letterStatus, setLetterStatus] = useState<Record<string, 'correct' | 'wrong'>>({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2-minute timer

  const currentItem = letters[currentIdx];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      const correctCount = Object.values(letterStatus).filter(s => s === 'correct').length;
      const accuracy = Math.round((correctCount / letters.length) * 100);
      onComplete(score, accuracy);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        if (prev <= 6 && prev > 1) {
          playTickSound();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, letterStatus, letters.length, score]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const isCorrect = userInput.trim().toUpperCase() === currentItem.answer.toUpperCase();
    const updatedStatus = {
      ...letterStatus,
      [currentItem.letter]: isCorrect ? 'correct' as const : 'wrong' as const
    };
    setLetterStatus(updatedStatus);

    if (isCorrect) {
      setScore(prev => prev + 300);
      playCorrectChime();
    } else {
      playWrongSound();
    }

    if (currentIdx < letters.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setUserInput('');
      setShowHint(false);
    } else {
      playCompleteFanfare();
      const correctCount = Object.values(updatedStatus).filter(s => s === 'correct').length;
      const accuracy = Math.round((correctCount / letters.length) * 100);
      onComplete(score + (isCorrect ? 300 : 0), accuracy);
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
            A-Z ALPHABET CHALLENGE ARENA
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '2px 0 0' }}>
            Letter {currentItem.letter} ({currentIdx + 1}/{letters.length})
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* 2-Minute Round Timer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: timeLeft <= 15 ? 'rgba(239,68,68,0.2)' : timeLeft <= 30 ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)',
              border: `1.5px solid ${timeLeft <= 15 ? '#EF4444' : timeLeft <= 30 ? '#F59E0B' : 'rgba(255,255,255,0.15)'}`,
              padding: '6px 14px',
              borderRadius: '10px'
            }}
          >
            <Clock size={16} color={timeLeft <= 15 ? '#EF4444' : timeLeft <= 30 ? '#F59E0B' : 'var(--color-lime-accent)'} />
            <div>
              <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block', fontWeight: 800 }}>2-MIN TIMER</span>
              <span style={{ fontSize: '18px', fontWeight: 900, color: timeLeft <= 15 ? '#EF4444' : timeLeft <= 30 ? '#F59E0B' : '#FFFFFF', fontFamily: 'monospace' }}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>Tournament Score</span>
            <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-lime-accent)' }}>
              {score} pts
            </div>
          </div>
        </div>
      </div>

      {/* Alphabet Letters Dial Ribbon */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {letters.map((item, idx) => {
          const status = letterStatus[item.letter];
          const isCurrent = idx === currentIdx;
          return (
            <div
              key={item.letter}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '14px',
                backgroundColor: status === 'correct'
                  ? '#10B981'
                  : status === 'wrong'
                  ? '#EF4444'
                  : isCurrent
                  ? '#0F766E'
                  : '#E2E8F0',
                color: isCurrent || status ? '#FFFFFF' : '#475569',
                boxShadow: isCurrent ? '0 0 0 3px #A7F3D0' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {item.letter}
            </div>
          );
        })}
      </div>

      {/* Question Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '32px 28px',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#ECFDF5',
            color: '#0F766E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '22px',
            marginBottom: '16px'
          }}
        >
          {currentItem.letter}
        </div>

        <p style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', maxWidth: '640px', lineHeight: 1.5, marginBottom: '20px' }}>
          "{currentItem.question}"
        </p>

        {showHint && (
          <div style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>
            💡 Hint: {currentItem.hint}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '420px' }}>
          <input
            className="input-field"
            placeholder={`Starts with letter ${currentItem.letter}...`}
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            autoFocus
            style={{ fontSize: '16px', fontWeight: 700, textTransform: 'uppercase' }}
          />
          <Button variant="primary" type="submit">
            Submit Answer
          </Button>
        </form>

        {!showHint && currentItem.hint && (
          <button
            type="button"
            onClick={() => setShowHint(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748B',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <HelpCircle size={13} /> Need a hint?
          </button>
        )}
      </div>
    </div>
  );
};
