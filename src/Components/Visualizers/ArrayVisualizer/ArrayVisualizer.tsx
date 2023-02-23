import React from 'react';

import styles from './ArrayVisualizer.module.css';

interface IArrayVisualizerProps {
    newArray: number[];
}

export default function ArrayVisualizer({newArray}: IArrayVisualizerProps) {
  return (
    <div className={styles.barContainer} >
        {
           newArray.map((arrayInt) => {
                return (
                <div key={arrayInt + Math.random()} style={{height: arrayInt * 2 + "px"}} className={styles.graphBar} />

            );
        })
        }
    </div>
  )
}
