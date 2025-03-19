import React from 'react';
import Styles from './Modal.module.css';

export type ModalProps = React.PropsWithChildren<{
  isOpen: boolean;
  title: string;
  onClose: () => void;
}>;

const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen, title, onClose } = props;
  if (!isOpen) return null;

  return (
    <div className={Styles.modalOverlay} onClick={onClose}>
      <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={Styles.modalHeader}>
          <h2>{title}</h2>
          <button className={Styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
