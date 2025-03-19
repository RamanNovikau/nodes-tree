import React from 'react';
import Styles from './Icons.module.css';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { IconName, library } from '@fortawesome/fontawesome-svg-core';
/** FA icon imports; */
import {
  faPenToSquare,
  faTrash,
  faSquarePlus,
  faCaretDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';

/** FA icon library;*/
library.add(faSquarePlus, faTrash, faPenToSquare, faCaretDown, faCaretRight);

/** FA icon string literal types;  */
export type IconPropSubset =
  | 'square-plus'
  | 'trash'
  | 'pen-to-square'
  | 'caret-down'
  | 'caret-right';

export type IconSize = 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x';
export type IconProps = Omit<FontAwesomeIconProps, 'icon' | 'size'> & {
  icon: IconPropSubset;
} & {
  size?: IconSize;
};

export const Icon: React.FC<IconProps> = (props) => {
  const { icon, color, className, size, ...otherProps } = props;

  const getIconSize = (size?: IconSize): string => {
    switch (size) {
      case 'xs':
        return Styles.iconExtraSmall ?? '';
      case 'sm':
        return Styles.iconSmall ?? '';
      case 'lg':
        return Styles.iconLarge ?? '';
      case '1x':
        return Styles.icon1x ?? '';
      case '2x':
        return Styles.icon2x ?? '';
      case '3x':
        return Styles.icon3x ?? '';
      case '4x':
        return Styles.icon4x ?? '';
      default:
        return '';
    }
  };

  return (
    <FontAwesomeIcon
      icon={icon as IconName}
      color={color || 'inherit'}
      className={`${className ?? ''} ${getIconSize(size)}`}
      {...otherProps}
    />
  );
};
