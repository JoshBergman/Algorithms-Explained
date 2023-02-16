import React, { useContext, useState, useEffect } from 'react';

import { StyleContext } from '../../Store/ThemeContext';
import LinkTree from '../../Components/UI/PageResources/LinkTree/LinkTree';

import styles from './Landing.module.css';

function Landing() {
    const styleCTX = useContext(StyleContext);

    const [currAnimationTitle, setCurrAnimationTitle] = useState(-250);
    const [currAnimationAlgos, setCurrAnimationAlgos] = useState(200);

    useEffect(() => {
        setTimeout(() => {
            setCurrAnimationTitle(0);
        }, 300);

        setTimeout(() => {
            setCurrAnimationAlgos(0);
        }, 600);

    }, []);

    const titleAnimationStyle = {
        "transform" : "translateX(" + currAnimationTitle + "px)",
        "opacity" : currAnimationTitle + 1
    };

    const algoAnimation = {
        "transform" : "translateX(" + currAnimationAlgos + "px)",
        "opacity" : (currAnimationAlgos * -1) + 1
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentAlignmentContainer}>
                <div className={styles.tagLineTextContainer} style={titleAnimationStyle}>
                    <h2 style={styleCTX.theme.logoText1} className={styles.tagLineText} >Learn, Visualize, And Interact</h2>
                    <h2 style={styleCTX.theme.logoText1} className={styles.tagLineText} >With Algorithm's</h2>
                </div>
                <div className={styles.optionsTreeContainer} style={algoAnimation}>
                    <h2 style={styleCTX.theme.logoText1} className={styles.algoTextHeader} >Algorithms:</h2>
                    <LinkTree />
                </div>
            </div>
        </div>
    );
}

export default Landing;