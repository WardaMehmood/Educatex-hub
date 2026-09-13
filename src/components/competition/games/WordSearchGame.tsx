import React, { useState } from 'react';
import { Trophy, CheckCircle2, Clock, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '../../common/Button';

interface WordSearchGameProps {
  data?: {
    gridSize?: number;
    words: string[];
    grid: string[][];
  };
  onComplete: (score: number, accuracy: number) => void;
  onExit: () => void;
}

const DEFAULT_GRID = [
  ['P', 'Y', 'T', 'H', 'O', 'N', 'A', 'B', 'C', 'D'],
  ['B', 'I', 'N', 'A', 'R', 'Y', 'E', 'F', 'G', 'H'],
  ['R', 'O', 'U', 'T', 'E', 'R', 'I', 'J', 'K', 'L'],
  ['P', 'A', 'C', 'K', 'E', 'T', 'M', 'N', 'O', 'P'],
  ['S', 'O', 'C', 'K', 'E', 'T', 'Q', 'R', 'S', 'T'],
  ['T', 'H', 'R', 'E', 'A', 'D', 'U', 'V', 'W', 'X'],
  ['M', 'U', 'T', 'E', 'X', 'Y', 'Z', 'A', 'B', 'C'],
  ['B', 'U', 'F', 'F', 'E', 'R', 'D', 'E', 'F', 'G'],
  ['A', 'C', 'K', 'N', 'O', 'W', 'L', 'E', 'D', 'G'],
  ['C', 'A', 'C', 'H', 'E', 'D', 'A', 'T', 'A', 'S']
];

const DEFAULT_WORDS = ['PYTHON', 'BINARY', 'ROUTER', 'PACKET', 'SOCKET', 'THREAD', 'MUTEX', 'BUFFER'];

export const WordSearchGame: React.FC<WordSearchGameProps> = ({
  data,
  onComplete,
  onExit
}) => {
  const grid = data?.grid || DEFAULT_GRID;
  const words = data?.words || DEFAULT_WORDS;

  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [score, setScore] = useState(0);

  const isCellSelected = (r: number, c: number) => {
    return selectedCells.some(cell => cell.r === r && cell.c === c);
  };

  const isWordFound = (word: string) => foundWords.includes(word);

  const handleCellClick = (r: number, c: number) => {
    const nextCells = [...selectedCells, { r, c }];
    setSelectedCells(nextCells);

    // Form current selected string
    const currentWord = nextCells.map(cell => grid[cell.r][cell.c]).join('');
    const reversedWord = currentWord.split('').reverse().join('');

    const matchedWord = words.find(w => (w === currentWord || w === reversedWord) && !foundWords.includes(w));

    if (matchedWord) {
      const newFound = [...foundWords, matchedWord];
      setFoundWords(newFound);
      setScore(prev => prev + 250);
      setSelectedCells([]);

      if (newFound.length === words.length) {
        setTimeout(() => {
          onComplete(score + 250, 100);
        }, 800);
      }
    } else if (nextCells.length > 10) {
      // Reset if selection exceeds longest word
      setSelectedCells([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedCells([]);
  };

  const handleFinishEarly = () => {
    const accuracy = Math.round((foundWords.length / words.length) * 100);
    onComplete(score, accuracy);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '860px', margin: '0 auto' }}>
      {/* Game Header Bar */}
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
            WORD SEARCH PUZZLE ARENA
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '2px 0 0' }}>
            Find Academic Keywords ({foundWords.length}/{words.length} Discovered)
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>Current Score</span>
            <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-lime-accent)' }}>
              {score} pts
            </div>
          </div>

          <Button variant="lime" size="sm" onClick={handleFinishEarly}>
            Finish & Leaderboard <ArrowRight size={13} />
          </Button>
        </div>
      </div>

      {/* Main Playing Layout: Grid + Word Bank */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        {/* The Letter Matrix */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
              gap: '6px',
              userSelect: 'none'
            }}
          >
            {grid.map((row, rIdx) =>
              row.map((letter, cIdx) => {
                const selected = isCellSelected(rIdx, cIdx);
                return (
                  <button
                    key={`${rIdx}-${cIdx}`}
                    type="button"
                    onClick={() => handleCellClick(rIdx, cIdx)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      border: selected ? '2px solid #047857' : '1px solid #E2E8F0',
                      backgroundColor: selected ? '#10B981' : '#F8FAFC',
                      color: selected ? '#FFFFFF' : '#0F172A',
                      fontWeight: 800,
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {letter}
                  </button>
                );
              })
            )}
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={handleClearSelection}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 600,
                color: '#64748B',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <RotateCcw size={12} /> Clear Selection
            </button>
            <span style={{ fontSize: '12px', color: '#64748B', alignSelf: 'center' }}>
              Click adjacent letters to spell words
            </span>
          </div>
        </div>

        {/* Word Bank & Instructions */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
              Hidden Academic Terms
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '14px' }}>
              Find all {words.length} terms in the letter grid to complete the tournament challenge.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {words.map(w => {
                const found = isWordFound(w);
                return (
                  <span
                    key={w}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      backgroundColor: found ? '#ECFDF5' : '#F1F5F9',
                      color: found ? '#047857' : '#334155',
                      border: found ? '1px solid #A7F3D0' : '1px solid transparent',
                      textDecoration: found ? 'line-through' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    {found && <CheckCircle2 size={13} color="#059669" />}
                    {w}
                  </span>
                );
              })}
            </div>
          </div>

          <div
            style={{
              padding: '12px',
              borderRadius: '10px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              marginTop: '16px'
            }}
          >
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#047857', display: 'block' }}>
              ⚡ Scoring Rule
            </span>
            <span style={{ fontSize: '11px', color: '#166534' }}>
              +250 points for each discovered term. Complete all words for maximum tournament ranking points!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
