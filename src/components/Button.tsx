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

const getVariantClasses = (variant: string, colorScheme: string): string => {
  const colorSchemes = {
    teal: {
      solid: 'bg-teal-600 hover:bg-teal-700 text-white border-teal-600',
      ghost: 'bg-transparent hover:bg-teal-50 text-teal-600 border-transparent',
      outline: 'bg-transparent hover:bg-teal-50 text-teal-600 border-teal-600'
    },
    blue: {
      solid: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
      ghost: 'bg-transparent hover:bg-blue-50 text-blue-600 border-transparent',
      outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border-blue-600'
    },
    gray: {
      solid: 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600',
      ghost: 'bg-transparent hover:bg-gray-50 text-gray-600 border-transparent',
      outline: 'bg-transparent hover:bg-gray-50 text-gray-600 border-gray-600'
    },
    red: {
      solid: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
      ghost: 'bg-transparent hover:bg-red-50 text-red-600 border-transparent',
      outline: 'bg-transparent hover:bg-red-50 text-red-600 border-red-600'
    }
  };

  return colorSchemes[colorScheme as keyof typeof colorSchemes]?.[variant as keyof typeof colorSchemes.teal] ||
         colorSchemes.teal.solid;
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
  const variantClass = getVariantClasses(variant, colorScheme);
  const sizeClass = sizeClasses[size];

  const classes = `${variantClass} ${sizeClass} ${className}`;

  return (
    <Component
      className={`font-medium rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${colorScheme}-500 disabled:opacity-50 disabled:cursor-not-allowed text-center ${classes}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
};
