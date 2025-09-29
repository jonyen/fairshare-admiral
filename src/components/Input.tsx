import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'sm' | 'md' | 'lg';
  isInvalid?: boolean;
  disabled?: boolean;
  variant?: 'outline' | 'flushed' | 'filled';
  className?: string;
  [key: string]: any; // Allow other HTML input props
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg'
};

const variantClasses: Record<string, string> = {
  outline: 'border border-gray-300',
  flushed: 'border-b border-gray-300 rounded-none px-0',
  filled: 'border border-transparent'
};

export const Input: React.FC<InputProps> = ({
  type = 'text',
  size = 'md',
  isInvalid,
  disabled,
  variant = 'outline',
  className = '',
  ...props
}) => {
  const baseClasses = "w-full rounded focus:outline-none transition-colors";
  const stateClasses = isInvalid
    ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
    : "border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500";
  const disabledClasses = disabled ? "cursor-not-allowed opacity-50 bg-gray-50" : "bg-white";

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    stateClasses,
    disabledClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      type={type}
      className={classes}
      disabled={disabled}
      {...props}
    />
  );
};
