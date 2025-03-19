import React from 'react';
import Modal from '../../Modal/Modal.tsx';
import { Button } from '../../Button/Button.tsx';
import { TextInput } from '../../TextInput/TextInput.tsx';

import Styles from '../Modals.module.css';
import { Spinner } from '../../Spinner/Spinner.tsx';

export type AddNodeModalViewProps = {
  isOpen: boolean;
  onClose: () => void;
  error: string | null;
  isLoading?: boolean;
  onAddNode: (nodeName: string) => void;
};

export const AddNodeModalView: React.FC<AddNodeModalViewProps> = (props) => {
  const { isOpen, error, isLoading, onClose, onAddNode } = props;
  const [inputValue, setInputValue] = React.useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Modal isOpen={isOpen} title="Add Node" onClose={onClose}>
      <div className={Styles.modalBody}>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={Styles.modalTextContent}>
            {error ? (
              error
            ) : (
              <TextInput
                placeholder={'Node Name'}
                value={inputValue}
                onChange={handleChange}
              />
            )}
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
                  onAddNode(inputValue);
                  setInputValue('');
                }}
                color={'blue'}
                size={'large'}
              >
                Add
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
