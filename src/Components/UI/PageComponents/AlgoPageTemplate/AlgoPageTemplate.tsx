import React, { useContext } from 'react';
import { StyleContext } from '../../../../Store/ThemeContext';

import styles from './AlgoPageTemplate.module.css';

interface IAlgoProps {
    algo: React.ReactNode;
    children: React.ReactNode;
    title: string;
}

export default function AlgoPageTemplate({algo, children, title}: IAlgoProps) {
    const styleCTX = useContext(StyleContext).theme;

    const borderColor = {
        "borderColor" : styleCTX.text1.color
    };
    
  return (
    <div className={styles.alignmentContainer}>
        <h1 className={styles.title} style={styleCTX.logoText1}>{title}</h1>
        <div className={styles.algoContainer} style={borderColor}>{algo}</div>
        <div className={styles.wordsContainer} >{children}</div>
    </div>
  );
}
