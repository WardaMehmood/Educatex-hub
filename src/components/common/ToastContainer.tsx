import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} color="var(--color-success)" />;
      case 'warning':
        return <AlertCircle size={18} color="var(--color-warning)" />;
      case 'error':
        return <XCircle size={18} color="var(--color-error)" />;
      default:
        return <Info size={18} color="var(--color-info)" />;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 9999,
        maxWidth: '380px'
      }}
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'slideIn 0.25s ease'
          }}
        >
          {getIcon(toast.type)}
          <span style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--color-text-main)', flex: 1 }}>
            {toast.message}
          </span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              display: 'flex',
              padding: '2px'
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
