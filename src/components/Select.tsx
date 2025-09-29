import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg'
};

export const Select: React.FC<SelectProps> = ({ 
  value, 
  onValueChange, 
  children, 
  placeholder, 
  disabled,
  size = 'md',
  className = ''
}) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectPrimitive.Trigger
        className={`w-full bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50 flex items-center justify-between transition-colors ${sizeClasses[size]} ${className}`}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="ml-2">
          <ChevronDown className="w-4 h-4" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
          <SelectPrimitive.Viewport className="p-1">
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

// SelectItem component for backward compatibility
export const SelectItem: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className = '' }) => (
  <SelectPrimitive.Item
    value={value}
    className={`px-3 py-2 text-sm cursor-pointer rounded hover:bg-teal-50 focus:bg-teal-50 focus:outline-none flex items-center justify-between ${className}`}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator>
      <Check className="w-4 h-4 text-teal-600" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);

// For backward compatibility with HTML option elements
export const Option: React.FC<{ 
  value: string; 
  children: React.ReactNode;
}> = ({ value, children }) => (
  <SelectItem value={value}>{children}</SelectItem>
);
