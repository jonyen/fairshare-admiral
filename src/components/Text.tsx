import React from 'react';

interface TextProps {
  fontSize?: 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  align?: 'left' | 'center' | 'right';
  fontWeight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const fontSizeClasses: Record<string, string> = {
  xs: 'text-xs',
  sm: 'text-sm', 
  md: 'text-base',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl'
};

const fontWeightClasses: Record<string, string> = {
  thin: 'font-thin',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

const alignClasses: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
};

export const Text: React.FC<TextProps> = ({ 
  fontSize = 'base', 
  align = 'left', 
  fontWeight = 'normal', 
  children,
  className = '',
  as: Component = 'p'
}) => {
  const fontSizeClass = fontSizeClasses[fontSize];
  const fontWeightClass = fontWeightClasses[fontWeight];
  const alignClass = alignClasses[align];
  
  const classes = [fontSizeClass, alignClass, fontWeightClass, className].filter(Boolean).join(' ');
  
  return (
    <Component className={classes}>
      {children}
    </Component>
  );
};
