import React, { useState } from 'react';
import { MapPin, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '../../common/Button';

interface MapLocation {
  id: string;
  name: string;
  region: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  hint: string;
}

interface MapQuizGameProps {
  data?: {
    title?: string;
    locations: MapLocation[];
  };
  onComplete: (score: number, accuracy: number) => void;
  onExit: () => void;
}

const DEFAULT_LOCATIONS: MapLocation[] = [
  { id: 'loc-1', name: 'Silicon Valley Innovation Hub', region: 'North America', x: 22, y: 38, hint: 'Palo Alto & San Francisco Bay' },
  { id: 'loc-2', name: 'CERN Particle Physics Collider', region: 'Europe', x: 50, y: 32, hint: 'Franco-Swiss border near Geneva' },
  { id: 'loc-3', name: 'Bengaluru Technology Corridor', region: 'Asia', x: 72, y: 55, hint: 'Silicon Valley of India' },
  { id: 'loc-4', name: 'Tokyo High-Tech District', region: 'Asia', x: 86, y: 40, hint: 'Akihabara & Shibuya innovation cluster' },
  { id: 'loc-5', name: 'Cambridge Science Park', region: 'Europe', x: 48, y: 26, hint: 'Silicon Fen academic incubator' }
];

export const MapQuizGame: React.FC<MapQuizGameProps> = ({
  data,
  onComplete,
  onExit
}) => {
  const locations = data?.locations || DEFAULT_LOCATIONS;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const currentTarget = locations[currentIdx];

  const handlePinClick = (loc: MapLocation) => {
    if (isAnswered) return;
    setSelectedPinId(loc.id);
    setIsAnswered(true);

    const isCorrect = loc.id === currentTarget.id;
    if (isCorrect) {
      setScore(s => s + 300);
      setCorrectCount(c => c + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < locations.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedPinId(null);
      setIsAnswered(false);
    } else {
      const accuracy = Math.round((correctCount / locations.length) * 100);
      onComplete(score, accuracy);
    }
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
            MAP QUIZ SHOWDOWN
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '2px 0 0' }}>
            Target {currentIdx + 1} of {locations.length}: Locate "{currentTarget.name}"
          </h2>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>Tournament Score</span>
          <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-lime-accent)' }}>
            {score} pts
          </div>
        </div>
      </div>

      {/* Interactive Map Canvas Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '13px', color: '#64748B' }}>
            Click on the map pin corresponding to:
          </span>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0F766E', marginTop: '2px' }}>
            📍 {currentTarget.name} ({currentTarget.region})
          </h3>
          <span style={{ fontSize: '12px', color: '#94A3B8' }}>
            Hint: {currentTarget.hint}
          </span>
        </div>

        {/* SVG World Map Vector with Clickable Pin Hotspots */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '720px',
            height: '380px',
            backgroundColor: '#0284C7',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '2px solid #0369A1'
          }}
        >
          {/* World map SVG shapes */}
          <svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
            {/* Ocean Waves Grid */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0369A1" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="60" fill="url(#grid)" />

            {/* North America */}
            <path d="M 10 8 Q 28 8 26 26 Q 22 34 16 32 Q 8 22 10 8 Z" fill="#15803D" opacity="0.9" />
            {/* South America */}
            <path d="M 22 34 Q 32 36 28 54 Q 24 58 20 48 Z" fill="#15803D" opacity="0.9" />
            {/* Europe */}
            <path d="M 44 10 Q 56 8 54 22 Q 46 24 44 14 Z" fill="#15803D" opacity="0.9" />
            {/* Africa */}
            <path d="M 44 24 Q 58 26 54 48 Q 48 52 42 36 Z" fill="#15803D" opacity="0.9" />
            {/* Asia */}
            <path d="M 54 8 Q 88 6 86 32 Q 74 38 60 26 Z" fill="#15803D" opacity="0.9" />
            {/* Australia */}
            <path d="M 76 40 Q 88 40 86 52 Q 76 54 74 46 Z" fill="#15803D" opacity="0.9" />
          </svg>

          {/* Interactive Pins */}
          {locations.map(loc => {
            const isSelected = selectedPinId === loc.id;
            const isCorrectTarget = loc.id === currentTarget.id;

            let pinBg = '#FACC15'; // Default yellow
            if (isAnswered) {
              if (isCorrectTarget) pinBg = '#10B981';
              else if (isSelected) pinBg = '#EF4444';
            }

            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => handlePinClick(loc)}
                disabled={isAnswered}
                style={{
                  position: 'absolute',
                  left: `${loc.x}%`,
                  top: `${loc.y}%`,
                  transform: 'translate(-50%, -100%)',
                  background: 'none',
                  border: 'none',
                  cursor: isAnswered ? 'default' : 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'transform 0.15s ease'
                }}
              >
                <div
                  style={{
                    backgroundColor: pinBg,
                    color: '#0F172A',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 800,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <MapPin size={12} fill="#0F172A" />
                  {isAnswered ? loc.name.split(' ')[0] : 'Pin'}
                </div>
                <div
                  style={{
                    width: '3px',
                    height: '8px',
                    backgroundColor: pinBg,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Post Click Feedback */}
        {isAnswered && (
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: selectedPinId === currentTarget.id ? '#059669' : '#DC2626' }}>
              {selectedPinId === currentTarget.id ? '✓ Exactly correct! +300 pts' : '✗ Incorrect location!'}
            </span>
            <Button variant="primary" size="sm" onClick={handleNext}>
              {currentIdx < locations.length - 1 ? 'Next Location →' : 'Complete & View Leaderboard →'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
