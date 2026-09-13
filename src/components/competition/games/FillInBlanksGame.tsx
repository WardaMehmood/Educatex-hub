import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '../../common/Button';

interface FillInBlanksGameProps {
  data?: {
    questions: {
      id: string;
      textBefore: string;
      textAfter: string;
      correctWord: string;
      options: string[];
    }[];
  };
  onComplete: (score: number, accuracy: number) => void;
  onExit: () => void;
}

const DEFAULT_QUESTIONS = [
  {
    id: 'fib-1',
    textBefore: 'In computer networking, the',
    textAfter: 'layer guarantees end-to-end delivery of message streams between host processes.',
    correctWord: 'Transport',
    options: ['Transport', 'Physical', 'Application', 'Session']
  },
  {
    id: 'fib-2',
    textBefore: 'Google BBR congestion control independently measures bottleneck bandwidth and minimum',
    textAfter: 'to cap in-flight data at 1x BDP.',
    correctWord: 'RTT',
    options: ['RTT', 'Loss Rate', 'Window Size', 'Jitter']
  },
  {
    id: 'fib-3',
    textBefore: 'A balanced Binary Search Tree guarantees',
    textAfter: 'time complexity for worst-case lookup operations.',
    correctWord: 'O(log N)',
    options: ['O(log N)', 'O(1)', 'O(N)', 'O(N²)']
  }
];

export const FillInBlanksGame: React.FC<FillInBlanksGameProps> = ({
  data,
  onComplete,
  onExit
}) => {
  const questions = data?.questions || DEFAULT_QUESTIONS;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQ = questions[currentIdx];

  const handleSelectWord = (word: string) => {
    if (isAnswered) return;
    setSelectedWord(word);
    setIsAnswered(true);

    const isCorrect = word === currentQ.correctWord;
    if (isCorrect) {
      setScore(prev => prev + 250);
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedWord(null);
      setIsAnswered(false);
    } else {
      const finalCorrect = correctCount + (selectedWord === currentQ.correctWord ? 0 : 0);
      const accuracy = Math.round((finalCorrect / questions.length) * 100);
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
            FILL IN THE BLANKS ARENA
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '2px 0 0' }}>
            Question {currentIdx + 1} of {questions.length}
          </h2>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>Tournament Score</span>
          <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-lime-accent)' }}>
            {score} pts
          </div>
        </div>
      </div>

      {/* Main Sentence Card */}
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
        <div style={{ fontSize: '18px', lineHeight: 1.8, color: '#0F172A', fontWeight: 600, maxWidth: '680px' }}>
          <span>{currentQ.textBefore} </span>
          <span
            style={{
              display: 'inline-block',
              minWidth: '120px',
              padding: '4px 16px',
              borderRadius: '8px',
              border: isAnswered
                ? selectedWord === currentQ.correctWord
                  ? '2px solid #10B981'
                  : '2px solid #EF4444'
                : '2px dashed #0F766E',
              backgroundColor: isAnswered
                ? selectedWord === currentQ.correctWord
                  ? '#ECFDF5'
                  : '#FEF2F2'
                : '#F0FDFA',
              color: isAnswered
                ? selectedWord === currentQ.correctWord
                  ? '#047857'
                : '#DC2626'
              : '#0F766E',
              fontWeight: 800,
              fontSize: '18px',
              verticalAlign: 'middle',
              margin: '0 6px'
            }}
          >
            {selectedWord || '__________'}
          </span>
          <span> {currentQ.textAfter}</span>
        </div>

        {/* Word Bank */}
        <div style={{ marginTop: '36px', width: '100%' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', letterSpacing: '0.04em', display: 'block', marginBottom: '12px' }}>
            SELECT FROM WORD BANK
          </span>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {currentQ.options.map(word => {
              const isSelected = selectedWord === word;
              const isCorrect = word === currentQ.correctWord;
              return (
                <button
                  key={word}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectWord(word)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontSize: '14.5px',
                    fontWeight: 700,
                    border: isAnswered && isSelected
                      ? isCorrect ? '2px solid #10B981' : '2px solid #EF4444'
                      : '1px solid #CBD5E1',
                    backgroundColor: isAnswered && isSelected
                      ? isCorrect ? '#ECFDF5' : '#FEF2F2'
                      : '#FFFFFF',
                    color: '#0F172A',
                    cursor: isAnswered ? 'default' : 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {word}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Question / Result Bar */}
        {isAnswered && (
          <div style={{ marginTop: '28px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button variant="primary" size="md" onClick={handleNext}>
              {currentIdx < questions.length - 1 ? 'Next Sentence →' : 'Complete & View Leaderboard →'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
