import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => (
  <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
    {children}
  </table>
);

export const Thead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <thead>{children}</thead>
);

export const Tbody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);

export const Tr: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => (
  <tr className={className}>{children}</tr>
);

export const Th: React.FC<{ 
  children?: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => (
  <th className={`px-3 py-2 text-left text-xs font-medium uppercase tracking-wider ${className}`}>
    {children}
  </th>
);

export const Td: React.FC<{ 
  children?: React.ReactNode; 
  className?: string;
  colSpan?: number;
}> = ({ children, className = '', colSpan }) => (
  <td className={`px-3 py-2 whitespace-nowrap text-sm ${className}`} colSpan={colSpan}>
    {children}
  </td>
);

export const TableCaption: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => (
  <caption className={`px-3 py-2 text-sm ${className}`}>
    {children}
  </caption>
);
