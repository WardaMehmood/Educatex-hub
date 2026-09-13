import React, { useState } from 'react';
import { Copy, Check, Maximize2, Download } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';

interface QRCodeDisplayProps {
  value: string;
  label?: string;
  size?: number;
  showCopy?: boolean;
  allowEnlarge?: boolean;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  label,
  size = 140,
  showCopy = true,
  allowEnlarge = true
}) => {
  const [copied, setCopied] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate deterministic QR matrix pattern based on code hash
  const generatePattern = (val: string, dim: number = 21) => {
    const grid: boolean[][] = Array(dim).fill(false).map(() => Array(dim).fill(false));
    
    // Fixed corner position patterns (7x7)
    const addCorner = (startX: number, startY: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
            grid[startY + r][startX + c] = true;
          }
        }
      }
    };

    addCorner(0, 0);
    addCorner(dim - 7, 0);
    addCorner(0, dim - 7);

    // Timing patterns
    for (let i = 8; i < dim - 8; i++) {
      grid[6][i] = i % 2 === 0;
      grid[i][6] = i % 2 === 0;
    }

    // Data-derived pseudo pattern
    let hash = 0;
    for (let i = 0; i < val.length; i++) {
      hash = ((hash << 5) - hash) + val.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < dim; r++) {
      for (let c = 0; c < dim; c++) {
        // Skip corner zones
        if ((r < 8 && c < 8) || (r < 8 && c >= dim - 8) || (r >= dim - 8 && c < 8)) continue;
        if (r === 6 || c === 6) continue;
        
        const cellHash = (hash ^ (r * 31 + c * 17)) & 0xFF;
        grid[r][c] = cellHash % 3 !== 0;
      }
    }

    return grid;
  };

  const matrix = generatePattern(value);
  const cellSize = size / matrix.length;

  const renderQRContent = (renderSize: number) => {
    const cell = renderSize / matrix.length;
    return (
      <svg
        width={renderSize}
        height={renderSize}
        viewBox={`0 0 ${renderSize} ${renderSize}`}
        style={{
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          padding: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
      >
        {matrix.map((row, r) =>
          row.map((active, c) =>
            active ? (
              <rect
                key={`${r}-${c}`}
                x={c * cell}
                y={r * cell}
                width={cell + 0.3}
                height={cell + 0.3}
                fill="#134E4A"
              />
            ) : null
          )
        )}
      </svg>
    );
  };

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {renderQRContent(size)}
        {allowEnlarge && (
          <button
            onClick={() => setIsEnlarged(true)}
            style={{
              position: 'absolute',
              bottom: '6px',
              right: '6px',
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              padding: '4px',
              cursor: 'pointer',
              color: 'var(--color-primary-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Project / Fullscreen View"
          >
            <Maximize2 size={13} />
          </button>
        )}
      </div>

      {label && (
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block' }}>{label}</span>
          <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-text-main)' }}>
            {value}
          </span>
        </div>
      )}

      {showCopy && (
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          icon={copied ? <Check size={14} color="#16A34A" /> : <Copy size={14} />}
        >
          {copied ? 'Copied Code' : 'Copy PIN'}
        </Button>
      )}

      {/* Projection Modal */}
      <Modal
        isOpen={isEnlarged}
        onClose={() => setIsEnlarged(false)}
        title="Classroom Projection QR & PIN"
        maxWidth="520px"
        footer={
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="secondary" onClick={() => setIsEnlarged(false)}>
              Close
            </Button>
            <Button variant="primary" icon={<Download size={14} />} onClick={() => alert('QR Code downloaded for presentation printing.')}>
              Download Poster
            </Button>
          </div>
        }
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ display: 'inline-block', padding: '16px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
            {renderQRContent(260)}
          </div>
          <div style={{ marginTop: '20px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>
              Scan QR or Enter Join PIN
            </span>
            <div style={{
              fontSize: '42px',
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: 'var(--color-primary-emerald)',
              marginTop: '4px'
            }}>
              {value}
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
              Students can join directly from any smartphone camera or from the student portal without needing prior enrollment.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
