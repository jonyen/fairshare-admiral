import React from 'react';

interface FormControlProps {
  id?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'space-y-1',
  md: 'space-y-2',
  lg: 'space-y-3'
};

export const FormControl: React.FC<FormControlProps> = ({ 
  id, 
  size = 'md', 
  children, 
  isInvalid, 
  isRequired,
  isDisabled,
  className = ''
}) => {
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Clone child and add accessibility props
          const childProps: any = {
            id: child.type === 'label' ? id : undefined,
            htmlFor: child.type === 'label' ? id : undefined,
            'aria-describedby': isInvalid ? `${id}-error` : undefined,
            'aria-required': isRequired,
            'aria-invalid': isInvalid,
            disabled: isDisabled
          };

          // Add basic styling to labels
          if (child.type === 'label') {
            childProps.className = `block text-sm font-medium ${child.props.className || ''}`;
          }

          // Add basic validation styling to inputs
          if (child.type === 'input' || child.type === 'select') {
            const baseClasses = "w-full border rounded focus:outline-none";
            const stateClasses = isInvalid 
              ? "border-gray-400" 
              : "border-gray-300";
            const disabledClasses = isDisabled ? "cursor-not-allowed opacity-50" : "";
            
            childProps.className = `${baseClasses} ${stateClasses} ${disabledClasses} ${child.props.className || ''}`;
          }

          return React.cloneElement(child, childProps);
        }
        return child;
      })}
    </div>
  );
};

// FormLabel component for backward compatibility
export const FormLabel: React.FC<{ 
  children: React.ReactNode; 
  htmlFor?: string;
  className?: string;
}> = ({ children, htmlFor, className = '' }) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`block text-sm font-medium ${className}`}
    >
      {children}
    </label>
  );
};

// FormHelperText component for backward compatibility
export const FormHelperText: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <p className={`text-sm ${className}`}>
      {children}
    </p>
  );
};
