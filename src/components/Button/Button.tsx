import React from 'react';
import Styles from './Button.module.css';

export type ButtonProps = React.PropsWithChildren<{
  alt?: boolean; // (default false)
  textButton?: boolean; // (default false)
  color?: 'blue' | 'red'; // (default 'blue')
  size?: 'large' | 'small'; //default large
  forwardRef?: React.RefObject<HTMLButtonElement>;
}>;

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    alt,
    color = 'blue',
    size = 'large',
    className = '',
    forwardRef,
    textButton = false,
    ...otherProps
  } = props;

  const cssClasses = [
    Styles.button,
    alt ? Styles.alternate : Styles.primary,
    Styles[color],
    textButton ? Styles.textButton : '',
  ].join(' ');

  return (
    <button
      className={`${cssClasses} ${className}`}
      {...otherProps}
      ref={forwardRef}
    ></button>
  );
};
