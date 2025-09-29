import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  className = ''
}) => {
  const sizeClass = sizeClasses[size];
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`${sizeClass} animate-spin rounded-full border-2 border-gray-300 border-t-gray-600`}
      />
    </div>
  );
};
