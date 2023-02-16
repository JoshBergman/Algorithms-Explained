import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StyleContext } from '../../../../Store/ThemeContext';
import DarkModeButton from '../../PageResources/DarkMode/DarkModeButton';

import styles from './Header.module.css';

export default function Header() {
  const styleCTX = useContext(StyleContext).theme;

  const [currOpacity, setCurrOpacity] = useState(0);
  const opacityAnimationStyle = {
     "opacity" : currOpacity
    };

  useEffect(() => {
    setTimeout(() => {
      setCurrOpacity(1);
    }, 2000);
  }, []);

  return (
    <div className={styles.mainContainer} style={opacityAnimationStyle}>
      <div className={styles.alignmentContainer}>
        <div className={styles.leftContainer}>
          <Link to="/" className={styles.logo} style={styleCTX.logoText1}>Algos-X</Link>
        </div>
        <div className={styles.rightContainer}>
          <DarkModeButton />
          <Link to="/algorithms" className={styles.link} style={styleCTX.logoText1}>Algorithms</Link>
        </div>
      </div>
    </div>
  );
}
