import React, { useContext } from 'react';
import { StyleContext } from '../../../../Store/ThemeContext';

import styles from './AlgoPageTemplate.module.css';

interface IAlgoProps {
    algo: React.ReactNode;
    buttonContainer?: React.ReactNode;
    children: React.ReactNode;
    title: string;
}

export default function AlgoPageTemplate({algo, children, title, buttonContainer}: IAlgoProps) {
    const styleCTX = useContext(StyleContext).theme;
    
  return (
    <div className={styles.alignmentContainer}>
        <h1 className={styles.title} style={styleCTX.text1}>{title}</h1>
        <div className={styles.algoContainer} >{algo}</div>
        {buttonContainer &&
        <div className={styles.buttonContainer} >{buttonContainer}</div>
        }
        <div className={styles.wordsContainer} >{children}</div>
    </div>
  );
}
