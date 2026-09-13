import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'teal' | 'secondary' | 'ghost' | 'lime' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" style={{
          width: '16px',
          height: '16px',
          border: '2px solid rgba(255,255,255,0.3)',
          borderTopColor: 'currentColor',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          display: 'inline-block'
        }} />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
        </>
      )}
    </button>
  );
};
