import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  maxW?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  paddingTop?: string;
  paddingBottom?: string;
  paddingX?: string;
  paddingY?: string;
  className?: string;
}

const maxWidthClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full'
};

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  maxW = 'xl',
  paddingTop,
  paddingBottom,
  paddingX,
  paddingY,
  className = ''
}) => {
  const maxWidthClass = maxWidthClasses[maxW];
  
  // Remove all padding - candidates need to add it back
  return (
    <div className={`${maxWidthClass} ${className}`}>
      {children}
    </div>
  );
};
