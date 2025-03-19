import React from 'react';
import Modal from '../../Modal/Modal.tsx';
import { Button } from '../../Button/Button.tsx';

import Styles from '../Modals.module.css';
import { Spinner } from '../../Spinner/Spinner.tsx';

export type DeleteNodeModalViewProps = {
  isOpen: boolean;
  nodeName: string;
  onClose: () => void;
  error: string | null;
  isLoading?: boolean;
  onDeleteNode: (nodeName: string) => void;
};

export const DeleteNodeModalView: React.FC<DeleteNodeModalViewProps> = (
  props,
) => {
  const { isOpen, nodeName, error, isLoading, onClose, onDeleteNode } = props;
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Modal isOpen={isOpen} title="Delete Node" onClose={onClose}>
      <div className={Styles.modalBody}>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={Styles.modalTextContent}>
            {error ? error : `Do you want to delete ${nodeName}?`}
          </div>
        )}
        <div className={Styles.modalControls}>
          {error ? (
            <Button
              className={Styles.modalButton}
              onClick={onClose}
              color={'blue'}
              size={'large'}
              alt
            >
              Close modal
            </Button>
          ) : (
            <>
              <Button
                className={Styles.modalButton}
                onClick={onClose}
                color={'blue'}
                size={'large'}
                alt
              >
                Cancel
              </Button>
              <Button
                className={Styles.modalButton}
                onClick={() => {
                  onDeleteNode(inputValue);
                  setInputValue('');
                }}
                color={'red'}
                size={'large'}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
