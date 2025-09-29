import React from 'react';

interface StackProps {
  direction?: 'row' | 'column';
  spacing?: '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  children: React.ReactNode;
  className?: string;
  divider?: React.ReactNode;
  as?: React.ElementType;
  // Form props
  onSubmit?: (e: React.FormEvent) => void;
  [key: string]: any; // Allow other HTML attributes
}

export const Stack: React.FC<StackProps> = ({
  direction = 'column',
  spacing = '4',
  alignItems,
  justify,
  children,
  className = '',
  divider,
  as: Component = 'div',
  ...props
}) => {
  // Build flex classes
  const flexDirection = direction === 'row' ? 'flex-row' : 'flex-col';
  const gapClass = direction === 'row' ? `gap-x-${spacing}` : `gap-y-${spacing}`;

  // Alignment classes
  const alignItemsClass = alignItems ? {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline'
  }[alignItems] : '';

  const justifyClass = justify ? {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }[justify] : '';

  const classes = `flex ${flexDirection} ${gapClass} ${alignItemsClass} ${justifyClass} ${className}`.trim();

  if (divider && direction === 'column') {
    const childrenArray = React.Children.toArray(children);
    const childrenWithDividers = childrenArray.map((child: React.ReactNode, index: number) => (
      <React.Fragment key={index}>
        {child}
        {index < childrenArray.length - 1 && divider}
      </React.Fragment>
    ));

    return (
      <Component className={classes} {...props}>
        {childrenWithDividers}
      </Component>
    );
  }

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

// StackDivider component for backward compatibility
export const StackDivider: React.FC<{ 
  borderColor?: string;
  className?: string;
}> = ({ borderColor = 'gray-300', className = '' }) => (
  <div className={`border-t border-${borderColor} ${className}`} />
);
