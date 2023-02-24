import React, { useContext } from 'react';
import { StyleContext } from '../../../../Store/ThemeContext';

import styles from './Button.module.css';

interface IButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

export default function Button({children, onClick}: IButtonProps) {
    const styleCTX = useContext(StyleContext).theme;

    const appliedStyles = {
        ...styleCTX.logoBackground1,
        borderColor: styleCTX.text1.color,
    };

  return (
    <button onClick={onClick} className={styles.button} style={appliedStyles}>
        {children}
    </button>
  )
}
