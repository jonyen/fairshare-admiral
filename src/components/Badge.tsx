import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base'
};

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  size = 'md',
  className = ''
}) => {
  const sizeClass = sizeClasses[size];
  
  return (
    <span className={`inline-flex items-center font-semibold rounded border ${sizeClass} ${className}`}>
      {children}
    </span>
  );
};
