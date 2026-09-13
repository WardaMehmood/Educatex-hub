import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  actionIcon
}) => {
  return (
    <div
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-white)',
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-lg)'
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-mint-bg)',
          color: 'var(--color-primary-emerald)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ maxWidth: '420px', fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: actionText ? '20px' : '0' }}>
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction} icon={actionIcon}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export const LoadingState: React.FC<{ message?: string; isAi?: boolean }> = ({
  message = 'Loading data...',
  isAi = false
}) => {
  return (
    <div
      style={{
        padding: '54px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid #E7E5E4',
          borderTopColor: isAi ? 'var(--color-primary-emerald)' : 'var(--color-deep-teal)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '16px'
        }}
      />
      <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-muted)' }}>
        {message}
      </span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
