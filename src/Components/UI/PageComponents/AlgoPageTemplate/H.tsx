import React, { useContext } from 'react';
import { StyleContext } from '../../../../Store/ThemeContext';

import styles from './PageStyle.module.css';

interface IProps {
  children: React.ReactNode;
  centered?: boolean;
}

interface IStyleOptions {
  color? : string;
}

export default function H({ children, centered }: IProps) {
  const textColor = useContext(StyleContext).theme.mutedLogoText1;

  const appliedStyles: IStyleOptions = {
    ...textColor
  };

  let styleClass = styles.h;

  if (centered) {
    styleClass = styles.hc;
  }  

  return (
    <h2 className={styleClass} style={appliedStyles}>
      {children}
    </h2>
  );
}
