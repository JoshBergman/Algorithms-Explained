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
          <Link to="/" className={styles.logo} style={styleCTX.mutedLogoText1}>Algo Example</Link>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.linksContainer} >
            <Link to="/algorithms" className={styles.link} style={styleCTX.mutedLogoText1}>Algorithms</Link>
          <DarkModeButton />
          </div>
        </div>
      </div>
    </div>
  );
}
