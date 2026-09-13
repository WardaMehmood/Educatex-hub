import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../../common/Button';

interface MemoryCard {
  id: string;
  pairId: string;
  text: string;
}

interface MemoryMatchGameProps {
  data?: {
    cards: MemoryCard[];
  };
  onComplete: (score: number, accuracy: number) => void;
  onExit: () => void;
}

const DEFAULT_CARDS: MemoryCard[] = [
  { id: 'c1', pairId: 'pair-1', text: 'O(1)' },
  { id: 'c2', pairId: 'pair-1', text: 'Dict Hash Lookup' },
  { id: 'c3', pairId: 'pair-2', text: 'O(log N)' },
  { id: 'c4', pairId: 'pair-2', text: 'Binary Search' },
  { id: 'c5', pairId: 'pair-3', text: 'O(N log N)' },
  { id: 'c6', pairId: 'pair-3', text: 'Merge Sort' },
  { id: 'c7', pairId: 'pair-4', text: 'FIFO' },
  { id: 'c8', pairId: 'pair-4', text: 'Queue Order' },
  { id: 'c9', pairId: 'pair-5', text: 'LIFO' },
  { id: 'c10', pairId: 'pair-5', text: 'Call Stack' },
  { id: 'c11', pairId: 'pair-6', text: '128 Bits' },
  { id: 'c12', pairId: 'pair-6', text: 'IPv6 Address' }
];

export const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({
  data,
  onComplete,
  onExit
}) => {
  const initialCards = data?.cards || DEFAULT_CARDS;
  const [cards] = useState(() => [...initialCards].sort(() => Math.random() - 0.5));

  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  const handleCardClick = (card: MemoryCard) => {
    if (flippedIds.length === 2 || flippedIds.includes(card.id) || matchedPairs.includes(card.pairId)) {
      return;
    }

    const nextFlipped = [...flippedIds, card.id];
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves(m => m + 1);
      const firstCard = cards.find(c => c.id === nextFlipped[0])!;
      const secondCard = card;

      if (firstCard.pairId === secondCard.pairId) {
        // Matched!
        const nextMatched = [...matchedPairs, firstCard.pairId];
        setMatchedPairs(nextMatched);
        setScore(prev => prev + 250);
        setFlippedIds([]);

        if (nextMatched.length === initialCards.length / 2) {
          setTimeout(() => {
            onComplete(score + 350, 100);
          }, 800);
        }
      } else {
        // Not a match: reset after brief delay
        setTimeout(() => {
          setFlippedIds([]);
        }, 900);
      }
    }
  };

  const totalPairs = initialCards.length / 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '840px', margin: '0 auto' }}>
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
            CARD FLIP MEMORY ARENA
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '2px 0 0' }}>
            Find Matching Concept Pairs ({matchedPairs.length}/{totalPairs})
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>Moves: {moves}</span>
            <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-lime-accent)' }}>
              {score} pts
            </div>
          </div>

          <Button
            variant="lime"
            size="sm"
            onClick={() => onComplete(score, Math.round((matchedPairs.length / totalPairs) * 100))}
          >
            Finish <ArrowRight size={13} />
          </Button>
        </div>
      </div>

      {/* Grid of 12 Flip Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '14px',
          padding: '24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        {cards.map(card => {
          const isFlipped = flippedIds.includes(card.id);
          const isMatched = matchedPairs.includes(card.pairId);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              style={{
                height: '110px',
                borderRadius: '12px',
                perspective: '1000px',
                cursor: isMatched ? 'default' : 'pointer'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px',
                  textAlign: 'center',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  transition: 'all 0.3s ease',
                  border: isMatched
                    ? '2px solid #10B981'
                    : isFlipped
                    ? '2px solid #0F766E'
                    : '1px solid #CBD5E1',
                  backgroundColor: isMatched
                    ? '#ECFDF5'
                    : isFlipped
                    ? '#CCFBF1'
                    : '#0F172A',
                  color: isMatched
                    ? '#047857'
                    : isFlipped
                    ? '#0F172A'
                    : '#FFFFFF',
                  boxShadow: isFlipped || isMatched ? '0 4px 10px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {isFlipped || isMatched ? (
                  <span>{card.text}</span>
                ) : (
                  <span style={{ fontSize: '24px', opacity: 0.7 }}>🎴</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
