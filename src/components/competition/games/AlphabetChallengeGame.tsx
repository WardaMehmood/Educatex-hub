import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '../../common/Button';

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

  const currentItem = letters[currentIdx];

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
    }

    if (currentIdx < letters.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setUserInput('');
      setShowHint(false);
    } else {
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

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>Tournament Score</span>
          <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-lime-accent)' }}>
            {score} pts
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
