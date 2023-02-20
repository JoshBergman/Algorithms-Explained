import React, { useContext } from 'react';

import { StyleContext } from '../../../../Store/ThemeContext';
import styles from './ArrayDisplay.module.css';

export default function ArrayAnimation() {
  const textClr = useContext(StyleContext).theme.text1;

  return (
    <div className={styles.showcaseContainer} style={textClr}>
      <h2 className={styles.showcase}>
        [1, 2, 3, 4, 5, 6, 7, 8, 9]
      </h2>
      <h2 className={styles.showcase}>
        ["String", 621, 0.1241, false, null]
      </h2>
    </div>
  )
}
