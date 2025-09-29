import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

// Custom hook for modal state management (replaces useDisclosure)
export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return { isOpen, onOpen, onClose };
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
};

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  size = 'md' 
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20 z-40" />
        <Dialog.Content className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded p-4 ${sizeClasses[size]} w-full mx-4 z-50 max-h-[90vh] overflow-y-auto`}>
          {title && (
            <Dialog.Title className="text-lg font-semibold mb-3">
              {title}
            </Dialog.Title>
          )}
          <Dialog.Description className="sr-only">
            Modal content
          </Dialog.Description>
          <div className="relative">
            {children}
            <Dialog.Close asChild>
              <button
                onClick={onClose}
                className="absolute top-0 right-0 p-1 rounded"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

// ModalContent component for backward compatibility
export const ModalContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
