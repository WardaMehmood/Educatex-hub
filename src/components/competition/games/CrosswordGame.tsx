import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, ArrowRight, Lightbulb, Sparkles, HelpCircle, Eye, Trophy, RefreshCw, Clock } from 'lucide-react';
import { Button } from '../../common/Button';
import { playCorrectChime, playTickSound, playCompleteFanfare } from '../../../utils/soundEffects';

interface CrosswordItem {
  num: number;
  row: number;
  col: number;
  word: string;
  clue: string;
  hint?: string;
}

interface CrosswordGameProps {
  data?: {
    rows: number;
    cols: number;
    across: CrosswordItem[];
    down: CrosswordItem[];
  };
  onComplete: (score: number, accuracy: number) => void;
  onExit: () => void;
}

const DEFAULT_ACROSS: CrosswordItem[] = [
  { num: 1, row: 0, col: 0, word: 'STAR', clue: 'Twinkles brightly high in the night sky ⭐', hint: '4 letters: S _ _ R' },
  { num: 4, row: 2, col: 0, word: 'NEWS', clue: 'Daily updates and stories we read or watch 📰', hint: '4 letters: N _ _ S' }
];

const DEFAULT_DOWN: CrosswordItem[] = [
  { num: 1, row: 0, col: 0, word: 'SUN', clue: 'Bright warm star that gives us daylight ☀️', hint: '3 letters: S _ N' },
  { num: 2, row: 0, col: 1, word: 'TREE', clue: 'Has green leaves and birds build nests here 🌳', hint: '4 letters: T _ _ E' },
  { num: 3, row: 0, col: 3, word: 'ROSE', clue: 'A beautiful fragrant red garden flower 🌹', hint: '4 letters: R _ _ E' }
];

export const CrosswordGame: React.FC<CrosswordGameProps> = ({
  data,
  onComplete,
  onExit
}) => {
  // Guard against stale clashing words (e.g. COW and SUN conflict) from older sessions
  const isStaleClashingData =
    data?.down?.some(d => d.word === 'COW') ||
    data?.across?.some(a => a.word === 'CAT' || a.word === 'FISH');

  const across = (!isStaleClashingData && data?.across && data.across.length > 0) ? data.across : DEFAULT_ACROSS;
  const down = (!isStaleClashingData && data?.down && data.down.length > 0) ? data.down : DEFAULT_DOWN;

  // Dynamically compute exact rows and cols based on words so there are NO unnecessary empty blocks on the right
  const maxWordRow = Math.max(
    ...across.map(a => a.row),
    ...down.map(d => d.row + d.word.length - 1),
    0
  ) + 1;
  const maxWordCol = Math.max(
    ...across.map(a => a.col + a.word.length - 1),
    ...down.map(d => d.col),
    0
  ) + 1;
  const rows = maxWordRow;
  const cols = maxWordCol;

  // Track cell values (key: 'row-col')
  const [gridInputs, setGridInputs] = useState<Record<string, string>>({});
  const [selectedWord, setSelectedWord] = useState<{ type: 'across' | 'down'; num: number }>({ type: 'across', num: across[0]?.num || 1 });
  const [activeCell, setActiveCell] = useState<{ r: number; c: number }>({ r: across[0]?.row || 0, c: across[0]?.col || 0 });
  const [solvedClues, setSolvedClues] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [revealedHint, setRevealedHint] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // 2-Minute Countdown Timer (120 seconds)
  const [timeLeft, setTimeLeft] = useState(120);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const getCellKey = (r: number, c: number) => `${r}-${c}`;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      const totalClues = across.length + down.length;
      const accuracy = Math.round((solvedClues.length / totalClues) * 100);
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
  }, [timeLeft, solvedClues, score]);

  // Find active item
  const getActiveItem = () => {
    if (selectedWord.type === 'across') {
      return across.find(a => a.num === selectedWord.num);
    }
    return down.find(d => d.num === selectedWord.num);
  };

  // Find if cell has a number label
  const getCellNumber = (r: number, c: number) => {
    const a = across.find(item => item.row === r && item.col === c);
    if (a) return a.num;
    const d = down.find(item => item.row === r && item.col === c);
    if (d) return d.num;
    return null;
  };

  // Check if cell belongs to the currently highlighted word
  const isCellInSelectedWord = (r: number, c: number) => {
    const activeItem = getActiveItem();
    if (!activeItem) return false;
    if (selectedWord.type === 'across') {
      return r === activeItem.row && c >= activeItem.col && c < activeItem.col + activeItem.word.length;
    } else {
      return c === activeItem.col && r >= activeItem.row && r < activeItem.row + activeItem.word.length;
    }
  };

  // Check if cell is playable
  const isCellActive = (r: number, c: number) => {
    const isAcross = across.some(item => r === item.row && c >= item.col && c < item.col + item.word.length);
    const isDown = down.some(item => c === item.col && r >= item.row && r < item.row + item.word.length);
    return isAcross || isDown;
  };

  // Select a clue and highlight its cells
  const handleSelectClue = (type: 'across' | 'down', num: number) => {
    setSelectedWord({ type, num });
    setRevealedHint(null);
    const item = type === 'across' ? across.find(a => a.num === num) : down.find(d => d.num === num);
    if (item) {
      setActiveCell({ r: item.row, c: item.col });
      const key = getCellKey(item.row, item.col);
      inputRefs.current[key]?.focus();
    }
  };

  // Cell click: toggle direction or focus
  const handleCellClick = (r: number, c: number) => {
    const acrossItem = across.find(item => r === item.row && c >= item.col && c < item.col + item.word.length);
    const downItem = down.find(item => c === item.col && r >= item.row && r < item.row + item.word.length);

    if (acrossItem && downItem) {
      // If clicking current word, toggle between across and down
      if (selectedWord.type === 'across' && selectedWord.num === acrossItem.num) {
        setSelectedWord({ type: 'down', num: downItem.num });
      } else {
        setSelectedWord({ type: 'across', num: acrossItem.num });
      }
    } else if (acrossItem) {
      setSelectedWord({ type: 'across', num: acrossItem.num });
    } else if (downItem) {
      setSelectedWord({ type: 'down', num: downItem.num });
    }
    setActiveCell({ r, c });
    setRevealedHint(null);
  };

  // Check completions with sound and automatic navigation to the next unsolved word
  const checkCompletions = (currentInputs: Record<string, string>) => {
    let newlySolved = 0;
    const currentSolved = [...solvedClues];

    across.forEach(item => {
      let formed = '';
      for (let i = 0; i < item.word.length; i++) {
        formed += currentInputs[getCellKey(item.row, item.col + i)] || '';
      }
      if (formed.toUpperCase() === item.word.toUpperCase() && !currentSolved.includes(`A-${item.num}`)) {
        currentSolved.push(`A-${item.num}`);
        newlySolved++;
      }
    });

    down.forEach(item => {
      let formed = '';
      for (let i = 0; i < item.word.length; i++) {
        formed += currentInputs[getCellKey(item.row + i, item.col)] || '';
      }
      if (formed.toUpperCase() === item.word.toUpperCase() && !currentSolved.includes(`D-${item.num}`)) {
        currentSolved.push(`D-${item.num}`);
        newlySolved++;
      }
    });

    if (newlySolved > 0) {
      setSolvedClues(currentSolved);
      setScore(prev => prev + newlySolved * 250);
      playCorrectChime();

      const totalClues = across.length + down.length;
      if (currentSolved.length >= totalClues) {
        playCompleteFanfare();
        setNotification('🏆 AMAZING! You solved all words in the Crossword!');
        setTimeout(() => {
          onComplete(score + newlySolved * 250, 100);
        }, 1200);
        return;
      }

      // Auto-advance directly to the next unsolved word!
      const nextAcross = across.find(a => !currentSolved.includes(`A-${a.num}`));
      if (nextAcross) {
        setSelectedWord({ type: 'across', num: nextAcross.num });
        setActiveCell({ r: nextAcross.row, c: nextAcross.col });
        setRevealedHint(null);
        setNotification(`🎉 Solved! Moving to Across #${nextAcross.num}...`);
        setTimeout(() => {
          const k = getCellKey(nextAcross.row, nextAcross.col);
          inputRefs.current[k]?.focus();
          setNotification(null);
        }, 700);
        return;
      }

      const nextDown = down.find(d => !currentSolved.includes(`D-${d.num}`));
      if (nextDown) {
        setSelectedWord({ type: 'down', num: nextDown.num });
        setActiveCell({ r: nextDown.row, c: nextDown.col });
        setRevealedHint(null);
        setNotification(`🎉 Solved! Moving to Down #${nextDown.num}...`);
        setTimeout(() => {
          const k = getCellKey(nextDown.row, nextDown.col);
          inputRefs.current[k]?.focus();
          setNotification(null);
        }, 700);
      }
    }
  };

  // Handle letter typing with auto-focus
  const handleCellChange = (r: number, c: number, val: string) => {
    const clean = val.slice(-1).toUpperCase().replace(/[^A-Z]/g, '');
    const key = getCellKey(r, c);
    const updated = { ...gridInputs, [key]: clean };
    setGridInputs(updated);

    if (clean) {
      // Auto move to next cell of active word
      const activeItem = getActiveItem();
      if (activeItem) {
        if (selectedWord.type === 'across') {
          const nextCol = c + 1;
          if (nextCol < activeItem.col + activeItem.word.length) {
            const nextKey = getCellKey(r, nextCol);
            setActiveCell({ r, c: nextCol });
            inputRefs.current[nextKey]?.focus();
          }
        } else {
          const nextRow = r + 1;
          if (nextRow < activeItem.row + activeItem.word.length) {
            const nextKey = getCellKey(nextRow, c);
            setActiveCell({ r: nextRow, c });
            inputRefs.current[nextKey]?.focus();
          }
        }
      }
    }

    checkCompletions(updated);
  };

  // Handle backspace navigation
  const handleKeyDown = (r: number, c: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !gridInputs[getCellKey(r, c)]) {
      const activeItem = getActiveItem();
      if (activeItem) {
        if (selectedWord.type === 'across' && c > activeItem.col) {
          const prevKey = getCellKey(r, c - 1);
          setActiveCell({ r, c: c - 1 });
          inputRefs.current[prevKey]?.focus();
        } else if (selectedWord.type === 'down' && r > activeItem.row) {
          const prevKey = getCellKey(r - 1, c);
          setActiveCell({ r: r - 1, c });
          inputRefs.current[prevKey]?.focus();
        }
      }
    }
  };

  // Student Hint: Show explanation & first letter
  const handleShowHint = () => {
    const item = getActiveItem();
    if (!item) return;
    const hintMsg = item.hint || `Word has ${item.word.length} letters and starts with letter '${item.word[0]}'!`;
    setRevealedHint(`💡 Hint for ${selectedWord.type.toUpperCase()} #${item.num}: ${hintMsg}`);
  };

  // Student Helper: Reveal Next Letter
  const handleRevealLetter = () => {
    const item = getActiveItem();
    if (!item) return;

    for (let i = 0; i < item.word.length; i++) {
      const r = selectedWord.type === 'across' ? item.row : item.row + i;
      const c = selectedWord.type === 'across' ? item.col + i : item.col;
      const key = getCellKey(r, c);
      const expected = item.word[i].toUpperCase();
      if ((gridInputs[key] || '').toUpperCase() !== expected) {
        const updated = { ...gridInputs, [key]: expected };
        setGridInputs(updated);
        setNotification(`✨ Revealed letter '${expected}' at box #${i + 1}!`);
        setTimeout(() => setNotification(null), 3000);
        checkCompletions(updated);
        const nextKey = selectedWord.type === 'across' && i + 1 < item.word.length
          ? getCellKey(r, c + 1)
          : selectedWord.type === 'down' && i + 1 < item.word.length
            ? getCellKey(r + 1, c)
            : key;
        inputRefs.current[nextKey]?.focus();
        return;
      }
    }
    setNotification(`🌟 This word is already complete!`);
    setTimeout(() => setNotification(null), 2500);
  };

  // Solve whole word helper
  const handleSolveWord = () => {
    const item = getActiveItem();
    if (!item) return;
    const updated = { ...gridInputs };
    for (let i = 0; i < item.word.length; i++) {
      const r = selectedWord.type === 'across' ? item.row : item.row + i;
      const c = selectedWord.type === 'across' ? item.col + i : item.col;
      updated[getCellKey(r, c)] = item.word[i].toUpperCase();
    }
    setGridInputs(updated);
    setNotification(`✅ Solved word: ${item.word}!`);
    setTimeout(() => setNotification(null), 3000);
    checkCompletions(updated);
  };

  const handleFinish = () => {
    const totalClues = across.length + down.length;
    const accuracy = Math.round((solvedClues.length / totalClues) * 100);
    onComplete(score, accuracy);
  };

  const activeItem = getActiveItem();
  const totalClues = across.length + down.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '920px', margin: '0 auto' }}>
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#0F172A',
          padding: '16px 22px',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--color-lime-accent)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              CROSSWORD SHOWDOWN • STUDENT FRIENDLY
            </span>
            <span style={{ fontSize: '11px', backgroundColor: 'rgba(163,230,53,0.15)', color: 'var(--color-lime-accent)', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>
              {solvedClues.length} / {totalClues} SOLVED
            </span>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 0' }}>
            Interactive Word Clue Grid
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* 2-Minute Round Timer Badge */}
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

          <div style={{ textAlign: 'right', backgroundColor: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', fontWeight: 600 }}>Total Score</span>
            <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--color-lime-accent)' }}>
              {score} pts
            </div>
          </div>

          <Button variant="lime" size="sm" onClick={handleFinish}>
            Finish Round <ArrowRight size={14} />
          </Button>
        </div>
      </div>

      {/* How to Play & Student Helper Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F0FDF4',
          border: '1px solid #BBF7D0',
          borderRadius: '12px',
          padding: '10px 16px',
          fontSize: '13px',
          color: '#166534',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HelpCircle size={16} color="#16A34A" />
          <span>
            <strong>How to play:</strong> Click any clue or box to highlight the word. Type letters directly! Stuck? Use the <strong>Student Hint (💡)</strong> buttons below.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={handleShowHint}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 10px',
              borderRadius: '6px',
              border: '1px solid #16A34A',
              backgroundColor: '#DCFCE7',
              color: '#15803D',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <Lightbulb size={13} /> 💡 Hint
          </button>
          <button
            type="button"
            onClick={handleRevealLetter}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 10px',
              borderRadius: '6px',
              border: '1px solid #0D9488',
              backgroundColor: '#CCFBF1',
              color: '#0F766E',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <Sparkles size={13} /> ✨ Reveal Letter
          </button>
        </div>
      </div>

      {/* Active Word Clue Highlight Callout */}
      {activeItem && (
        <div
          style={{
            backgroundColor: '#0F766E',
            color: '#FFFFFF',
            padding: '12px 18px',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(15,118,110,0.2)',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ backgroundColor: '#CCFBF1', color: '#0F766E', fontWeight: 900, padding: '4px 10px', borderRadius: '8px', fontSize: '12px', letterSpacing: '0.04em' }}>
              {selectedWord.type.toUpperCase()} #{activeItem.num} ({activeItem.word.length} LETTERS)
            </span>
            <span style={{ fontSize: '14.5px', fontWeight: 700 }}>
              {activeItem.clue}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={handleShowHint}
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Lightbulb size={13} /> Student Hint
            </button>
            <button
              type="button"
              onClick={handleRevealLetter}
              style={{
                backgroundColor: 'var(--color-lime-accent)',
                color: '#0F172A',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Sparkles size={13} /> Reveal Letter
            </button>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div
          style={{
            backgroundColor: '#FEF08A',
            color: '#854D0E',
            border: '1px solid #FDE047',
            padding: '8px 14px',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={15} color="#CA8A04" />
          {notification}
        </div>
      )}

      {/* Revealed Hint Message */}
      {revealedHint && (
        <div
          style={{
            backgroundColor: '#EFF6FF',
            color: '#1E40AF',
            border: '1px solid #BFDBFE',
            padding: '10px 16px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '13.5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{revealedHint}</span>
          <button
            type="button"
            onClick={() => setRevealedHint(null)}
            style={{ background: 'none', border: 'none', color: '#1E40AF', cursor: 'pointer', fontWeight: 800, fontSize: '14px' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Grid + Clues Main Arena */}
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
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 54px)`,
              gap: '6px'
            }}
          >
            {Array.from({ length: rows }).map((_, r) =>
              Array.from({ length: cols }).map((_, c) => {
                const active = isCellActive(r, c);
                const num = getCellNumber(r, c);
                const key = getCellKey(r, c);
                const inSelectedWord = isCellInSelectedWord(r, c);
                const isCurrent = activeCell.r === r && activeCell.c === c;

                if (!active) {
                  return (
                    <div
                      key={key}
                      style={{
                        width: '54px',
                        height: '54px',
                        backgroundColor: 'transparent',
                        borderRadius: '8px'
                      }}
                    />
                  );
                }

                return (
                  <div
                    key={key}
                    onClick={() => handleCellClick(r, c)}
                    style={{
                      width: '54px',
                      height: '54px',
                      position: 'relative',
                      backgroundColor: isCurrent ? '#FEF08A' : inSelectedWord ? '#CCFBF1' : '#FFFFFF',
                      border: isCurrent ? '2.5px solid #0F766E' : inSelectedWord ? '2px solid #0D9488' : '1.5px solid #CBD5E1',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      boxShadow: isCurrent ? '0 0 0 3px rgba(15,118,110,0.2)' : '0 1px 3px rgba(0,0,0,0.05)',
                      transition: 'all 0.12s ease'
                    }}
                  >
                    {num && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '2px',
                          left: '4px',
                          fontSize: '10px',
                          fontWeight: 900,
                          color: '#0F766E',
                          pointerEvents: 'none'
                        }}
                      >
                        {num}
                      </span>
                    )}
                    <input
                      ref={el => (inputRefs.current[key] = el)}
                      maxLength={1}
                      value={gridInputs[key] || ''}
                      onChange={e => handleCellChange(r, c, e.target.value)}
                      onKeyDown={e => handleKeyDown(r, c, e)}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        textAlign: 'center',
                        fontSize: '22px',
                        fontWeight: 900,
                        color: '#0F172A',
                        backgroundColor: 'transparent',
                        outline: 'none',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                );
              })
            )}
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '11.5px', color: '#64748B' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '12px', height: '12px', backgroundColor: '#CCFBF1', border: '1px solid #0D9488', borderRadius: '3px' }} />
              Active Word
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '12px', height: '12px', backgroundColor: '#FEF08A', border: '1px solid #CA8A04', borderRadius: '3px' }} />
              Selected Box
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '12px', height: '12px', backgroundColor: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '3px' }} />
              Playable Cell
            </span>
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
            gap: '16px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
          }}
        >
          {/* Across Clues */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#0F766E', margin: 0, letterSpacing: '0.04em' }}>
                ➡️ ACROSS CLUES
              </h4>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Click clue to highlight</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {across.map(item => {
                const isSelected = selectedWord.type === 'across' && selectedWord.num === item.num;
                const isSolved = solvedClues.includes(`A-${item.num}`);

                return (
                  <div
                    key={item.num}
                    onClick={() => handleSelectClue('across', item.num)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#CCFBF1' : isSolved ? '#ECFDF5' : '#F8FAFC',
                      border: isSelected ? '2px solid #0F766E' : isSolved ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'all 0.12s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 900, color: '#0F766E', fontSize: '13px' }}>
                          #{item.num}
                        </span>
                        <span style={{ fontSize: '12.5px', color: isSolved ? '#047857' : '#1E293B', fontWeight: isSelected ? 700 : 500 }}>
                          {item.clue}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '10.5px', color: '#64748B', backgroundColor: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                          {item.word.length} letters
                        </span>
                        {isSolved && <span style={{ color: '#059669', fontWeight: 900, fontSize: '12px' }}>✓</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Down Clues */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#0F766E', margin: 0, letterSpacing: '0.04em' }}>
                ⬇️ DOWN CLUES
              </h4>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Click clue to highlight</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {down.map(item => {
                const isSelected = selectedWord.type === 'down' && selectedWord.num === item.num;
                const isSolved = solvedClues.includes(`D-${item.num}`);

                return (
                  <div
                    key={item.num}
                    onClick={() => handleSelectClue('down', item.num)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#CCFBF1' : isSolved ? '#ECFDF5' : '#F8FAFC',
                      border: isSelected ? '2px solid #0F766E' : isSolved ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'all 0.12s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 900, color: '#0F766E', fontSize: '13px' }}>
                          #{item.num}
                        </span>
                        <span style={{ fontSize: '12.5px', color: isSolved ? '#047857' : '#1E293B', fontWeight: isSelected ? 700 : 500 }}>
                          {item.clue}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '10.5px', color: '#64748B', backgroundColor: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                          {item.word.length} letters
                        </span>
                        {isSolved && <span style={{ color: '#059669', fontWeight: 900, fontSize: '12px' }}>✓</span>}
                      </div>
                    </div>
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
