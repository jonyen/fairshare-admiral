import React from 'react';

interface HeadingProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  bgGradient?: string;
  bgClip?: 'text';
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const sizeClasses: Record<string, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl'
};

export const Heading: React.FC<HeadingProps> = ({ 
  size = 'base', 
  bgGradient, 
  bgClip, 
  children,
  className = '',
  as: Component = 'h1'
}) => {
  const sizeClass = sizeClasses[size];
  
  // Apply gradient text effect if bgGradient and bgClip are provided
  if (bgGradient && bgClip === 'text') {
    const gradientStyle = {
      background: bgGradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    };
    
    return (
      <Component 
        className={`${sizeClass} font-bold ${className}`}
        style={gradientStyle}
      >
        {children}
      </Component>
    );
  }
  
  return (
    <Component className={`${sizeClass} font-bold ${className}`}>
      {children}
    </Component>
  );
};
