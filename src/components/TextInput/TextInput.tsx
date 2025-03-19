import React from 'react';
import Styles from './TextInput.module.css';

export type TextInputProps = {
  forwardRef?: React.RefObject<HTMLInputElement>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const TextInput: React.FC<TextInputProps> = (props) => {
  const { className = '', forwardRef, ...rest } = props;

  return (
    <input
      type="text"
      ref={forwardRef}
      className={`${Styles.textInputElement} ${className}`}
      {...rest}
    />
  );
};
