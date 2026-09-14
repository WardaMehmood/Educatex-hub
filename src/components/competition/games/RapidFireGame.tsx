import React, { useState, useEffect } from 'react';
import { Zap, Flame, Clock, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../../common/Button';
import { playCorrectChime, playWrongSound, playCompleteFanfare } from '../../../utils/soundEffects';

interface RapidFireGameProps {
  data?: {
    questions: {
      id: string;
      question: string;
      options?: string[];
      correctAnswer: string;
      explanation?: string;
    }[];
  };
  onComplete: (score: number, accuracy: number) => void;
  onExit: () => void;
}

const DEFAULT_QUESTIONS = [
  {
    id: 'rf-1',
    question: 'What is the default port for encrypted HTTPS traffic?',
    options: ['443', '80', '8080', '22'],
    correctAnswer: '443',
    explanation: 'Port 443 is the standard port for TLS/HTTPS traffic.'
  },
  {
    id: 'rf-2',
    question: 'Which sort algorithm has an optimal O(N log N) worst-case time complexity guarantee?',
    options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Insertion Sort'],
    correctAnswer: 'Merge Sort',
    explanation: 'Merge Sort always divides and conquers in O(N log N) time regardless of input order.'
  },
  {
    id: 'rf-3',
    question: 'What data structure powers function recursion and call frames?',
    options: ['Stack', 'Queue', 'Heap', 'Graph'],
    correctAnswer: 'Stack',
    explanation: 'The call stack keeps track of active execution subroutines in LIFO order.'
  },
  {
    id: 'rf-4',
    question: 'Which TCP flag signals the initiation of a three-way handshake?',
    options: ['SYN', 'ACK', 'FIN', 'RST'],
    correctAnswer: 'SYN',
    explanation: 'SYN (Synchronize Sequence Numbers) begins connection establishment.'
  }
];

export const RapidFireGame: React.FC<RapidFireGameProps> = ({
  data,
  onComplete,
  onExit
}) => {
  const questions = data?.questions || DEFAULT_QUESTIONS;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timer, setTimer] = useState(10);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQ = questions[currentIdx];

  useEffect(() => {
    if (isAnswered) return;
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          handleSelectOption(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIdx, isAnswered]);

  const handleSelectOption = (opt: string | null) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentQ.correctAnswer;
    if (isCorrect) {
      const added = 500 + (timer * 50) + (streak * 100);
      setScore(s => s + added);
      setStreak(st => st + 1);
      setCorrectCount(c => c + 1);
      playCorrectChime();
    } else {
      setStreak(0);
      playWrongSound();
    }

    // Automatically advance directly to next question!
    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(i => i + 1);
        setSelectedOpt(null);
        setIsAnswered(false);
        setTimer(10);
      } else {
        playCompleteFanfare();
        const accuracy = Math.round(((correctCount + (isCorrect ? 1 : 0)) / questions.length) * 100);
        onComplete(score + (isCorrect ? 500 : 0), accuracy);
      }
    }, 850);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      setTimer(10);
    } else {
      const accuracy = Math.round((correctCount / questions.length) * 100);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EA580C', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={18} />
          </div>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-lime-accent)', letterSpacing: '0.05em' }}>
              RAPID FIRE SPEED BLITZ
            </span>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              Question {currentIdx + 1} of {questions.length}
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {streak > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B', fontWeight: 900, fontSize: '14px' }}>
              <Flame size={16} fill="#F59E0B" /> {streak}x Multiplier!
            </div>
          )}

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>Speed Points</span>
            <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-lime-accent)' }}>
              {score} pts
            </div>
          </div>
        </div>
      </div>

      {/* Turbo 10s Timer Countdown Bar */}
      <div style={{ width: '100%', height: '8px', backgroundColor: '#1E293B', borderRadius: '4px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${(timer / 10) * 100}%`,
            backgroundColor: timer <= 3 ? '#DC2626' : '#F59E0B',
            transition: 'width 1s linear'
          }}
        />
      </div>

      {/* Question Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '28px',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 800, color: '#EA580C', letterSpacing: '0.05em', marginBottom: '8px' }}>
          FAST RESPONSE NEEDED: {timer}s REMAINING
        </span>
        <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', textAlign: 'center', marginBottom: '24px', maxWidth: '640px' }}>
          {currentQ.question}
        </h3>

        {/* 4 Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', maxWidth: '640px' }}>
          {(currentQ.options || ['Option A', 'Option B', 'Option C', 'Option D']).map((opt, idx) => {
            const isSelected = selectedOpt === opt;
            const isCorrect = opt === currentQ.correctAnswer;

            let bg = '#F8FAFC';
            let border = '1px solid #CBD5E1';
            let color = '#0F172A';

            if (isAnswered) {
              if (isCorrect) {
                bg = '#ECFDF5';
                border = '2px solid #10B981';
                color = '#047857';
              } else if (isSelected) {
                bg = '#FEF2F2';
                border = '2px solid #EF4444';
                color = '#DC2626';
              }
            }

            return (
              <button
                key={opt}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border,
                  backgroundColor: bg,
                  color,
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: isAnswered ? 'default' : 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 size={18} color="#059669" />}
                {isAnswered && isSelected && !isCorrect && <XCircle size={18} color="#DC2626" />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div style={{ marginTop: '24px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button variant="primary" size="md" onClick={handleNext}>
              {currentIdx < questions.length - 1 ? 'Next Fast Question →' : 'Complete & View Leaderboard →'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
