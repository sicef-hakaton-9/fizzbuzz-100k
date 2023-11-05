import React, { useEffect, useRef } from 'react';
import "./style.css";

interface ModalProps {
  children: React.ReactElement;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const BottomSheet: React.FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalOverlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      overlayRef.current?.classList.remove('hidden-modal');
      modalOverlay.current?.classList.remove('hidden-modal');
    } else {
      document.body.style.overflow = 'auto';

      setTimeout(() => {
        modalOverlay.current?.classList.add('hidden-modal');
      }, 200);

      setTimeout(() => {
        overlayRef.current?.classList.add('hidden-modal');
      }, 250);
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`overlay ${isOpen ? 'open-modal' : 'closed-modal'}`}
        onClick={() => setIsOpen(false)}
        ref={overlayRef}
      ></div>
      <div className={`modal-content ${isOpen ? 'swipe-up' : 'swipe-down'}`} ref={modalOverlay}>
        {children}
      </div>
    </>
  );
};

export default BottomSheet;
