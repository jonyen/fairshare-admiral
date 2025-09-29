import React from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface AlertProps {
  status?: 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle
};

export const Alert: React.FC<AlertProps> = ({ 
  status = 'info', 
  children,
  className = ''
}) => {
  const IconComponent = iconMap[status];
  
  return (
    <div className={`border rounded p-3 ${className}`}>
      <div className="flex items-start">
        <IconComponent className="flex-shrink-0 mr-2 w-4 h-4" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export const AlertIcon: React.FC<{ status: AlertProps['status'] }> = ({ status = 'info' }) => {
  const IconComponent = iconMap[status];
  return <IconComponent className="flex-shrink-0 mr-2 w-4 h-4" />;
};

export const AlertTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-medium">{children}</h3>
);

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-1 text-sm">{children}</div>
);
