import React, { useContext, useState } from 'react';
import { StyleContext } from '../../../../Store/ThemeContext';
import { BiLeftArrow, BiRightArrow} from 'react-icons/bi';

import styles from './Speedometer.module.css';

interface ISpeedoProps {
    currSpeed: number;
    setSpeed: (newSpeed: number) => void;
}

export default function Speedometer({currSpeed, setSpeed}: ISpeedoProps) {
    const styleCTXreal = useContext(StyleContext);
    const isDark = styleCTXreal.isDark;
    const styleCTX = styleCTXreal.theme;
    const [currPointer, setPointer] = useState(3);

    const speeds = [1000, 500, 100, 50, 10, 1, 0];

    const nextSpeed = () => {
        if(currPointer < speeds.length-1){
            const newPointerSpot = currPointer + 1;
            setPointer(newPointerSpot);
            setSpeed(speeds[newPointerSpot]);
        }
    };

    const prevSpeed = () => {
        if(currPointer > 0){
            const newPointerSpot = currPointer - 1;
            setPointer(newPointerSpot);
            setSpeed(speeds[newPointerSpot])
        }
    };

    const darkStyles = {
        borderWidth: "1px",
        padding: "2px"
    }

    const borderClr = {
        borderColor: styleCTX.text1.color
    };

  return (
    <div className={styles.mainContainer} style={borderClr}>
        <div className={styles.currSpeedContainer}>
            <button onClick={prevSpeed} className={styles.btn}>
                <BiLeftArrow style={styleCTX.text1} />
            </button>
            {
                speeds.map((speedBar) => {
                    let thisBarStyle = {
                        backgroundColor: styleCTX.mutedLogoText1.color,
                        borderColor: styleCTX.text1.color
                    };
                    if(isDark){
                        thisBarStyle = {
                            ...thisBarStyle, ...darkStyles
                        };
                    }
                    if(currSpeed <= speedBar){
                        thisBarStyle.backgroundColor = styleCTX.logoText1.color;
                    }
                    return (
                        <div key={speedBar} className={styles.speedBar} style={thisBarStyle} />
                        );
                    })
                }
            <button onClick={nextSpeed} className={styles.btn}>
                <BiRightArrow style={styleCTX.text1} />
            </button>
                <label className={styles.label} style={styleCTX.mutedLogoText1}>Adjust Speed</label>
        </div>
    </div>
  );
}
