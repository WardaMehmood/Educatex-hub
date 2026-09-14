import React from 'react';
import { CompetitionGameMeta } from '../../data/competitionGamesData';
import { Trophy, Plus, Play, Gamepad2, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

interface CompetitionGameCardProps {
  game: CompetitionGameMeta;
  isSelected?: boolean;
  onSelect?: (game: CompetitionGameMeta) => void;
  onCreate?: (game: CompetitionGameMeta) => void;
  onPlay?: (game: CompetitionGameMeta) => void;
  mode?: 'gallery' | 'picker';
}

export const CompetitionGameCard: React.FC<CompetitionGameCardProps> = ({
  game,
  isSelected,
  onSelect,
  onCreate,
  onPlay,
  mode = 'gallery'
}) => {
  // Render custom vector illustration matching reference image style
  const renderIllustration = () => {
    switch (game.id) {
      case 'word_search':
        return (
          <svg width="76" height="76" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="16" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1.5" />
            {/* Grid lines */}
            <rect x="12" y="12" width="56" height="56" rx="8" fill="#FFFFFF" stroke="#DCFCE7" strokeWidth="1" />
            {/* Letters */}
            <text x="22" y="27" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">W</text>
            <text x="34" y="27" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">S</text>
            <text x="46" y="27" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">E</text>
            <text x="58" y="27" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">A</text>

            <text x="22" y="39" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">O</text>
            <text x="34" y="39" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">P</text>
            <text x="46" y="39" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">O</text>
            <text x="58" y="39" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">R</text>

            <text x="22" y="51" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">R</text>
            <text x="34" y="51" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">D</text>
            <text x="46" y="51" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">Z</text>
            <text x="58" y="51" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">H</text>

            <text x="22" y="63" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">D</text>
            <text x="34" y="63" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">T</text>
            <text x="46" y="63" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">E</text>
            <text x="58" y="63" fontSize="9" fontWeight="800" fill="#0F766E" textAnchor="middle">C</text>
            {/* Green highlighter line */}
            <path d="M 16 22 L 64 56" stroke="#22C55E" strokeWidth="7" strokeLinecap="round" opacity="0.6" />
          </svg>
        );

      case 'crossword':
        return (
          <svg width="76" height="76" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="16" fill="#0F172A" />
            <rect x="14" y="16" width="14" height="14" rx="3" fill="#1E293B" stroke="#334155" />
            <text x="21" y="27" fontSize="8.5" fontWeight="800" fill="#94A3B8" textAnchor="middle">W</text>
            <rect x="33" y="16" width="14" height="14" rx="3" fill="#1E293B" stroke="#334155" />
            <text x="40" y="27" fontSize="8.5" fontWeight="800" fill="#94A3B8" textAnchor="middle">O</text>
            {/* Middle cross row */}
            <rect x="14" y="33" width="14" height="14" rx="3" fill="#10B981" />
            <text x="21" y="44" fontSize="9" fontWeight="900" fill="#FFFFFF" textAnchor="middle">C</text>
            <rect x="33" y="33" width="14" height="14" rx="3" fill="#10B981" />
            <text x="40" y="44" fontSize="9" fontWeight="900" fill="#FFFFFF" textAnchor="middle">R</text>
            <rect x="52" y="33" width="14" height="14" rx="3" fill="#10B981" />
            <text x="59" y="44" fontSize="9" fontWeight="900" fill="#FFFFFF" textAnchor="middle">O</text>
            {/* Down */}
            <rect x="33" y="50" width="14" height="14" rx="3" fill="#1E293B" stroke="#334155" />
            <text x="40" y="61" fontSize="8.5" fontWeight="800" fill="#94A3B8" textAnchor="middle">D</text>
          </svg>
        );

      case 'matching_pairs':
        return (
          <svg width="76" height="76" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="16" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1.5" />
            {/* Top Pair */}
            <rect x="14" y="18" width="22" height="14" rx="4" fill="#10B981" />
            <circle cx="20" cy="25" r="2.5" fill="#FFFFFF" />
            <path d="M 36 25 C 44 25, 46 25, 50 25" stroke="#059669" strokeWidth="2.5" strokeDasharray="3 2" />
            <rect x="50" y="18" width="16" height="14" rx="4" fill="#047857" />
            {/* Mid Pair */}
            <rect x="14" y="36" width="18" height="14" rx="4" fill="#0D9488" />
            <circle cx="20" cy="43" r="2.5" fill="#FFFFFF" />
            <path d="M 32 43 C 40 43, 44 54, 48 54" stroke="#0D9488" strokeWidth="2.5" />
            <rect x="48" y="47" width="18" height="14" rx="4" fill="#0F766E" />
            {/* Bottom Tag */}
            <text x="40" y="70" fontSize="7.5" fontWeight="900" fill="#047857" textAnchor="middle" letterSpacing="0.08em">PAIRS</text>
          </svg>
        );

      case 'quiz':
        return (
          <svg width="76" height="76" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="16" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
            {/* Checklist items */}
            <rect x="16" y="18" width="12" height="12" rx="3" fill="#22C55E" />
            <path d="M 19 24 L 22 27 L 26 21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="33" y="21" width="30" height="6" rx="3" fill="#93C5FD" />

            <rect x="16" y="35" width="12" height="12" rx="3" fill="#22C55E" />
            <path d="M 19 41 L 22 44 L 26 38" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="33" y="38" width="24" height="6" rx="3" fill="#F87171" />

            <rect x="16" y="52" width="12" height="12" rx="3" fill="#E2E8F0" stroke="#CBD5E1" />
            <rect x="33" y="55" width="20" height="6" rx="3" fill="#CBD5E1" />
          </svg>
        );

      case 'fill_in_blanks':
        return (
          <svg width="76" height="76" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="16" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1.5" />
            <text x="40" y="24" fontSize="8" fontWeight="800" fill="#047857" textAnchor="middle">Fill in</text>
            <rect x="20" y="30" width="40" height="22" rx="6" fill="#FFFFFF" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="40" y="44" fontSize="8.5" fontWeight="900" fill="#059669" textAnchor="middle">the ___</text>
            {/* Hand pointer */}
            <circle cx="56" cy="56" r="8" fill="#10B981" opacity="0.2" />
            <path d="M 52 50 L 52 62 L 56 58 L 60 62 L 62 60 L 58 56 L 62 56 Z" fill="#047857" />
          </svg>
        );

      case 'alphabet':
        return (
          <svg width="76" height="76" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="16" fill="#0F172A" />
            <circle cx="40" cy="40" r="28" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Radial letters in green pills */}
            <circle cx="40" cy="18" r="6" fill="#10B981" />
            <text x="40" y="21" fontSize="7" fontWeight="900" fill="#FFFFFF" textAnchor="middle">A</text>

            <circle cx="58" cy="26" r="6" fill="#10B981" />
            <text x="58" y="29" fontSize="7" fontWeight="900" fill="#FFFFFF" textAnchor="middle">B</text>

            <circle cx="62" cy="45" r="6" fill="#10B981" />
            <text x="62" y="48" fontSize="7" fontWeight="900" fill="#FFFFFF" textAnchor="middle">C</text>

            <circle cx="48" cy="61" r="6" fill="#0D9488" />
            <text x="48" y="64" fontSize="7" fontWeight="900" fill="#FFFFFF" textAnchor="middle">D</text>

            <circle cx="28" cy="58" r="6" fill="#334155" />
            <text x="28" y="61" fontSize="7" fontWeight="900" fill="#E2E8F0" textAnchor="middle">X</text>

            <circle cx="20" cy="38" r="6" fill="#334155" />
            <text x="20" y="41" fontSize="7" fontWeight="900" fill="#E2E8F0" textAnchor="middle">Z</text>
          </svg>
        );

      case 'true_false':
        return (
          <svg width="76" height="76" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
            {/* True Half */}
            <rect x="14" y="16" width="24" height="48" rx="8" fill="#10B981" />
            <path d="M 21 40 L 25 44 L 31 36" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <text x="26" y="27" fontSize="7" fontWeight="900" fill="#FFFFFF" textAnchor="middle">TRUE</text>
            {/* False Half */}
            <rect x="42" y="16" width="24" height="48" rx="8" fill="#EF4444" />
            <path d="M 49 37 L 59 47 M 59 37 L 49 47" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <text x="54" y="27" fontSize="6.5" fontWeight="900" fill="#FFFFFF" textAnchor="middle">FALSE</text>
          </svg>
        );

      case 'rapid_fire':
      default:
        return (
          <svg width="76" height="76" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="16" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1.5" />
            {/* Fiery Blitz Lightning */}
            <circle cx="40" cy="40" r="26" fill="#FFEDD5" />
            <path d="M 42 16 L 26 42 L 39 42 L 36 64 L 54 36 L 41 36 Z" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return '#059669';
      case 'Hard': return '#DC2626';
      case 'Dynamic': return '#7C3AED';
      default: return '#D97706';
    }
  };

  return (
    <div
      onClick={() => onSelect && onSelect(game)}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: isSelected
          ? '2px solid var(--color-primary-emerald)'
          : '1px solid #E2E8F0',
        boxShadow: isSelected
          ? '0 8px 24px -4px rgba(15, 118, 110, 0.25)'
          : '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
        padding: '22px 18px 18px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        cursor: mode === 'picker' ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        transform: isSelected ? 'translateY(-2px)' : 'none',
        position: 'relative'
      }}
    >
      {/* Top category pill */}
      <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
        <span
          style={{
            fontSize: '9.5px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            padding: '2px 7px',
            borderRadius: '12px',
            backgroundColor: '#F1F5F9',
            color: '#475569'
          }}
        >
          {game.badge}
        </span>
      </div>

      {/* Illustration */}
      <div style={{ marginBottom: '14px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.04))' }}>
        {renderIllustration()}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '15.5px',
          fontWeight: 800,
          color: '#0F172A',
          marginBottom: '4px',
          letterSpacing: '-0.01em'
        }}
      >
        {game.name}
      </h3>

      {/* Made count indicator matching reference image: "2,578,356 made" */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '11px',
          color: '#64748B',
          fontWeight: 600,
          marginBottom: '10px'
        }}
      >
        <Gamepad2 size={12} color="#0F766E" />
        <span>{game.madeCount}</span>
        <span style={{ margin: '0 2px' }}>•</span>
        <span style={{ color: getDifficultyColor(game.difficulty), fontWeight: 700 }}>
          {game.difficulty}
        </span>
      </div>

      {/* Short Description */}
      <p
        style={{
          fontSize: '12px',
          color: '#475569',
          lineHeight: 1.45,
          marginBottom: '16px',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {game.shortDescription}
      </p>

      {/* Action Buttons */}
      {mode === 'gallery' ? (
        <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: 'auto' }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCreate && onCreate(game);
            }}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#0F766E',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              transition: 'background 0.15s ease'
            }}
          >
            <Plus size={13} /> Create
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlay && onPlay(game);
            }}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              color: '#0F172A',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            <Play size={12} fill="#0F766E" color="#0F766E" /> Play
          </button>
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            padding: '7px 10px',
            borderRadius: '8px',
            backgroundColor: isSelected ? 'var(--color-primary-emerald)' : '#F1F5F9',
            color: isSelected ? '#FFFFFF' : '#475569',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          {isSelected ? '✓ Selected Game' : 'Select Game'}
        </div>
      )}
    </div>
  );
};
