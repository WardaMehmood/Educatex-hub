import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  padding = 'md',
  className = '',
  style,
  ...props
}) => {
  const paddingStyles: Record<string, string> = {
    none: '0px',
    sm: '14px',
    md: '22px',
    lg: '28px'
  };

  return (
    <div
      className={`card ${hover ? 'card-hover' : ''} ${className}`}
      style={{ padding: paddingStyles[padding], ...style }}
      {...props}
    >
      {children}
    </div>
  );
};
