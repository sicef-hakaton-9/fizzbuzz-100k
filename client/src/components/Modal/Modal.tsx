import { ReactNode } from "react";
import styles from "./Modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  isOpen,
  setIsOpen,
}) => {
  if (!isOpen) {
    return null;
  }
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div
        className={`${
          isOpen
            ? styles.modal__overlay
            : styles.modal__overlay + " " + styles.closing
        }`}
        onClick={handleClose}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.modal}>
          <div className={styles.modal__header}>
            <h1>{title}</h1>
            <button className={styles.modal__closeBtn} onClick={handleClose}>
              <AiOutlineClose />
            </button>
          </div>
          <hr />
          <div className={styles.modal__content}>{children}</div>
        </div>
      </div>
    </>
  );
};
export default Modal;
