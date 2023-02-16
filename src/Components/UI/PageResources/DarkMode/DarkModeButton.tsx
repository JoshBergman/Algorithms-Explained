import React, { useContext, useState } from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { FaLightbulb } from 'react-icons/fa';

import styles from './DarkModeButton.module.css';
import { StyleContext } from '../../../../Store/ThemeContext';

export default function DarkModeButton() {
    const styleCTX = useContext(StyleContext);
    const [isLight, setIsLight] = useState(!styleCTX.isDark);
    const [currTransform, setCurrTransform] = useState(0);

    const toLightModeHandler = () => {
      styleCTX.toggleDark();
      animateChange(true);
    };

    const toDarkModeHandler = () => {
      styleCTX.toggleDark();
      animateChange(false);
    };

    const animateChange = (newState: boolean) => {
      setCurrTransform(360);
      
      setTimeout(() => {
        setIsLight(newState);
        setTimeout(() => {
          setCurrTransform(0);
        }, 30)
      }, 380);
    };

    const animationStyle = {
      ...styleCTX.theme.text1,
      "transform" : "rotate(" + currTransform + "deg)"
    };

  return (
    <React.Fragment>
      {isLight && 
        <button onClick={toDarkModeHandler} className={styles.button}>
          <FaLightbulb className={styles.sun} style={animationStyle} />
        </button>
      }
      {!isLight && 
        <button onClick={toLightModeHandler} className={styles.button}>
          <BsFillMoonFill className={styles.moon} style={animationStyle} />
        </button>
      }
    </React.Fragment>
  );
}
