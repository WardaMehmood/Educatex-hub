import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightElement,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="input-group">
      {label && <label htmlFor={inputId} className="input-label">{label}</label>}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
        {leftIcon && (
          <span style={{
            position: 'absolute',
            left: '12px',
            color: 'var(--color-text-light)',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none'
          }}>
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={`input-field ${className}`}
          style={{
            paddingLeft: leftIcon ? '38px' : '14px',
            paddingRight: rightElement ? '42px' : '14px',
            borderColor: error ? 'var(--color-error)' : undefined
          }}
          {...props}
        />
        {rightElement && (
          <div style={{
            position: 'absolute',
            right: '12px',
            display: 'flex',
            alignItems: 'center'
          }}>
            {rightElement}
          </div>
        )}
      </div>
      {error && <span style={{ fontSize: '12px', color: 'var(--color-error)' }}>{error}</span>}
      {!error && helperText && <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{helperText}</span>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="input-group">
      {label && <label htmlFor={selectId} className="input-label">{label}</label>}
      <select
        id={selectId}
        className={`select-field ${className}`}
        style={{ borderColor: error ? 'var(--color-error)' : undefined }}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span style={{ fontSize: '12px', color: 'var(--color-error)' }}>{error}</span>}
    </div>
  );
};
