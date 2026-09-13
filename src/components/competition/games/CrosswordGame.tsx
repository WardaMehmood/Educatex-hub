import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { Button } from '../../common/Button';

interface CrosswordGameProps {
  data?: {
    rows: number;
    cols: number;
    across: { num: number; row: number; col: number; word: string; clue: string }[];
    down: { num: number; row: number; col: number; word: string; clue: string }[];
  };
  onComplete: (score: number, accuracy: number) => void;
  onExit: () => void;
}

const DEFAULT_ACROSS = [
  { num: 1, row: 0, col: 0, word: 'TCP', clue: 'Reliable connection-oriented transport protocol' },
  { num: 3, row: 2, col: 0, word: 'DNS', clue: 'Translates domain names to IP addresses' },
  { num: 4, row: 4, col: 1, word: 'FIFO', clue: 'Queue ordering principle (First In First Out)' }
];

const DEFAULT_DOWN = [
  { num: 1, row: 0, col: 0, word: 'TLS', clue: 'Cryptographic protocol securing internet transport' },
  { num: 2, row: 0, col: 2, word: 'PORT', clue: '16-bit number identifying host network application' },
  { num: 3, row: 2, col: 0, word: 'DATA', clue: 'Raw unorganized facts or network payloads' }
];

export const CrosswordGame: React.FC<CrosswordGameProps> = ({
  data,
  onComplete,
  onExit
}) => {
  const across = data?.across || DEFAULT_ACROSS;
  const down = data?.down || DEFAULT_DOWN;
  const rows = data?.rows || 6;
  const cols = data?.cols || 6;

  // Track player cell inputs
  const [gridInputs, setGridInputs] = useState<Record<string, string>>({});
  const [activeClue, setActiveClue] = useState<{ type: 'across' | 'down'; num: number }>({ type: 'across', num: 1 });
  const [solvedClues, setSolvedClues] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const getCellKey = (r: number, c: number) => `${r}-${c}`;

  // Find if cell has a number tag
  const getCellNumber = (r: number, c: number) => {
    const a = across.find(item => item.row === r && item.col === c);
    if (a) return a.num;
    const d = down.find(item => item.row === r && item.col === c);
    if (d) return d.num;
    return null;
  };

  // Check if cell is an active crossword cell
  const isCellActive = (r: number, c: number) => {
    const isAcross = across.some(item => r === item.row && c >= item.col && c < item.col + item.word.length);
    const isDown = down.some(item => c === item.col && r >= item.row && r < item.row + item.word.length);
    return isAcross || isDown;
  };

  const handleCellChange = (r: number, c: number, val: string) => {
    const char = val.slice(-1).toUpperCase();
    const updated = { ...gridInputs, [getCellKey(r, c)]: char };
    setGridInputs(updated);

    // Validate if any clue is now completed
    across.forEach(item => {
      let formed = '';
      for (let i = 0; i < item.word.length; i++) {
        formed += updated[getCellKey(item.row, item.col + i)] || '';
      }
      if (formed === item.word && !solvedClues.includes(`A-${item.num}`)) {
        setSolvedClues(prev => [...prev, `A-${item.num}`]);
        setScore(prev => prev + 300);
      }
    });

    down.forEach(item => {
      let formed = '';
      for (let i = 0; i < item.word.length; i++) {
        formed += updated[getCellKey(item.row + i, item.col)] || '';
      }
      if (formed === item.word && !solvedClues.includes(`D-${item.num}`)) {
        setSolvedClues(prev => [...prev, `D-${item.num}`]);
        setScore(prev => prev + 300);
      }
    });
  };

  const handleFinish = () => {
    const totalClues = across.length + down.length;
    const accuracy = Math.round((solvedClues.length / totalClues) * 100);
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
            CROSSWORD PUZZLE SHOWDOWN
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '2px 0 0' }}>
            Academic Clue Grid ({solvedClues.length}/{across.length + down.length} Solved)
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
            Submit & Leaderboard <ArrowRight size={13} />
          </Button>
        </div>
      </div>

      {/* Grid + Clues Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Crossword Grid */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 44px)`,
              gap: '4px'
            }}
          >
            {Array.from({ length: rows }).map((_, r) =>
              Array.from({ length: cols }).map((_, c) => {
                const active = isCellActive(r, c);
                const num = getCellNumber(r, c);
                const key = getCellKey(r, c);

                if (!active) {
                  return (
                    <div
                      key={key}
                      style={{
                        width: '44px',
                        height: '44px',
                        backgroundColor: '#0F172A',
                        borderRadius: '4px'
                      }}
                    />
                  );
                }

                return (
                  <div
                    key={key}
                    style={{
                      width: '44px',
                      height: '44px',
                      position: 'relative',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid #0F766E',
                      borderRadius: '4px'
                    }}
                  >
                    {num && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '2px',
                          left: '3px',
                          fontSize: '8.5px',
                          fontWeight: 900,
                          color: '#0F766E'
                        }}
                      >
                        {num}
                      </span>
                    )}
                    <input
                      maxLength={1}
                      value={gridInputs[key] || ''}
                      onChange={e => handleCellChange(r, c, e.target.value)}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 900,
                        color: '#0F172A',
                        backgroundColor: 'transparent',
                        outline: 'none',
                        textTransform: 'uppercase'
                      }}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Clues Pane */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {/* Across Clues */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0F766E', marginBottom: '8px', letterSpacing: '0.04em' }}>
              ACROSS CLUES
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {across.map(item => {
                const isSolved = solvedClues.includes(`A-${item.num}`);
                return (
                  <div
                    key={item.num}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      backgroundColor: isSolved ? '#ECFDF5' : '#F8FAFC',
                      border: isSolved ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                      fontSize: '12px'
                    }}
                  >
                    <span style={{ fontWeight: 800, color: '#0F766E', marginRight: '6px' }}>
                      {item.num}.
                    </span>
                    <span style={{ color: isSolved ? '#047857' : '#334155' }}>
                      {item.clue}
                    </span>
                    {isSolved && <span style={{ float: 'right', color: '#059669', fontWeight: 800 }}>✓ Solved</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Down Clues */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0F766E', marginBottom: '8px', letterSpacing: '0.04em' }}>
              DOWN CLUES
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {down.map(item => {
                const isSolved = solvedClues.includes(`D-${item.num}`);
                return (
                  <div
                    key={item.num}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      backgroundColor: isSolved ? '#ECFDF5' : '#F8FAFC',
                      border: isSolved ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                      fontSize: '12px'
                    }}
                  >
                    <span style={{ fontWeight: 800, color: '#0F766E', marginRight: '6px' }}>
                      {item.num}.
                    </span>
                    <span style={{ color: isSolved ? '#047857' : '#334155' }}>
                      {item.clue}
                    </span>
                    {isSolved && <span style={{ float: 'right', color: '#059669', fontWeight: 800 }}>✓ Solved</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
