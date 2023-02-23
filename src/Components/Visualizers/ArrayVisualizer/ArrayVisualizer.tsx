import React, { useContext } from 'react';
import { StyleContext } from '../../../Store/ThemeContext';

import styles from './ArrayVisualizer.module.css';

interface IArrayVisualizerProps {
    newArray: number[];
}

export default function ArrayVisualizer({newArray}: IArrayVisualizerProps) {
  const styleCTX = useContext(StyleContext);
  const combineStyles = (barValue: number) => {
    const appliedStyles = {
      ...styleCTX.theme.mutedLogoBackground1,
      height: (barValue * 2) + "px",
    };

    return appliedStyles;
  };

  const borderColor = {
    borderColor: styleCTX.theme.text1.color,
  };

  return (
    <div className={styles.barContainer} style={borderColor} >
        {
           newArray.map((arrayInt) => {
                return (
                <div key={arrayInt + Math.random()} style={combineStyles(arrayInt)} className={styles.graphBar} />

            );
        })
        }
    </div>
  )
}
