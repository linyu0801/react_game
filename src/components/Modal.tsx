import React from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  min-width: 300px;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ccc;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string | React.ReactNode;
};
function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        {title && (
          <ModalHeader>
            {title} <CloseButton onClick={onClose}>✕</CloseButton>
          </ModalHeader>
        )}
        {children && <ModalBody>{children}</ModalBody>}
      </ModalContent>
    </ModalBackdrop>
  );
}

export default Modal;
