import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => (
  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
    <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
      {children}
    </table>
  </div>
);

export const Thead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <thead className="bg-gray-50">{children}</thead>
);

export const Tbody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
);

export const Tr: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <tr className={`hover:bg-gray-50 ${className}`}>{children}</tr>
);

export const Th: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
    {children}
  </th>
);

export const Td: React.FC<{
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
}> = ({ children, className = '', colSpan }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`} colSpan={colSpan}>
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
