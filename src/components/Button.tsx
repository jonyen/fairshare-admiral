import React from 'react';

interface ButtonProps {
  variant?: 'solid' | 'ghost' | 'outline';
  colorScheme?: 'teal' | 'blue' | 'red' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  [key: string]: any; // Allow other HTML button props
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

const variantClasses: Record<string, string> = {
  solid: 'border border-gray-300',
  ghost: 'border border-transparent',
  outline: 'border border-gray-300'
};

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'solid', 
  colorScheme = 'teal', 
  size = 'md', 
  disabled = false,
  as: Component = 'button',
  children, 
  className = '',
  ...props 
}) => {
  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];
  
  const classes = `${variantClass} ${sizeClass} ${className}`;
  
  return (
    <Component 
      className={`font-medium rounded focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${classes}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
};
