import React from 'react';

interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'emerald' | 'teal' | 'lime' | 'warning' | 'error';
  height?: number;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'emerald',
  height = 8
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colorMap: Record<string, string> = {
    emerald: 'var(--color-primary-emerald)',
    teal: 'var(--color-deep-teal)',
    lime: 'var(--color-lime-accent)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)'
  };

  return (
    <div style={{ width: '100%' }}>
      {(label || showPercentage) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
          {label && <span style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>{label}</span>}
          {showPercentage && <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>{percentage}%</span>}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          backgroundColor: '#E7E5E4',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: colorMap[color],
            borderRadius: '9999px',
            transition: 'width 0.4s ease'
          }}
        />
      </div>
    </div>
  );
};
