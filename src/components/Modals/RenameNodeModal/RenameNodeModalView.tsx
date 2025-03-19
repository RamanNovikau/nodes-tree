import React from 'react';
import Modal from '../../Modal/Modal.tsx';
import { Button } from '../../Button/Button.tsx';
import { TextInput } from '../../TextInput/TextInput.tsx';

import Styles from '../Modals.module.css';
import { Spinner } from '../../Spinner/Spinner.tsx';

export type RenameNodeModalViewProps = {
  nodeName: string;
  isOpen: boolean;
  onClose: () => void;
  error: string | null;
  isLoading?: boolean;
  onRenameNode: (nodeName: string) => void;
};

export const RenameNodeModalView: React.FC<RenameNodeModalViewProps> = (
  props,
) => {
  const { isOpen, nodeName, error, isLoading, onClose, onRenameNode } = props;
  const [inputValue, setInputValue] = React.useState(nodeName);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Modal isOpen={isOpen} title="Rename Node" onClose={onClose}>
      <div className={Styles.modalBody}>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
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
                  onRenameNode(inputValue);
                  setInputValue('');
                }}
                color={'blue'}
                size={'large'}
              >
                Rename
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
