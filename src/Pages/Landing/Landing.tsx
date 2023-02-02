import React, {useContext} from 'react';
import { StyleContext } from '../../Store/ThemeContext';

import styles from './Landing.module.css';

function Landing() {
    const styleCTX = useContext(StyleContext);
    return (
        <div className={styles.pageContainer}>
            <div className={styles.welcomeTextContainer}>
                Welcome to Algorithm Visualizer TBD!
            </div>
            <div className={styles.contentAlignmentContainer}>
                <div className={styles.tagLineTextContainer} style={styleCTX.theme.background1}>
                    <h2>Select an algorithm to explore,</h2>
                    <h2>interact, and learn</h2>
                </div>
                <div className={styles.optionsTreeContainer}>
                    Algorithms:
                    Tree(Djkrstra's, Mukudsas)
                </div>
                <button onClick={styleCTX.toggleDark} />
            </div>
        </div>
    );
}

export default Landing;