import React, { useContext } from 'react';

import { StyleContext } from '../../Store/ThemeContext';
import LinkTree from '../../Components/UI/PageResources/LinkTree/LinkTree';

import styles from './Landing.module.css';
import AutoSweeper from '../../Components/UI/PageResources/AutoSolvingMS/AutoSweeper';

function Landing() {
    const styleCTX = useContext(StyleContext);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentAlignmentContainer}>
                <div className={styles.tagLineTextContainer}>
                    <h2 style={styleCTX.theme.logoText1} className={styles.tagLineText} >Learn, Visualize, And Interact</h2>
                    <h2 style={styleCTX.theme.logoText1} className={styles.tagLineText} >With Algorithm's</h2>
                </div>
                <div className={styles.optionsTreeContainer}>
                    <h2 style={styleCTX.theme.logoText1} className={styles.algoTextHeader} >Featured Algo's:</h2>
                    <LinkTree />
                </div>
                <AutoSweeper />
            </div>
        </div>
    );
}

export default Landing;