import React, { useContext } from 'react';

import styles from './PageStyle.module.css';
import { StyleContext } from '../../../../Store/ThemeContext';

interface IProps {
  children: React.ReactNode;
}

export default function DescriptionText({ children }: IProps) {
  const textColor = useContext(StyleContext).theme.text1;

  return (
    <div className={styles.descriptionText} style={textColor}>
      {children}
    </div>
  );
}
