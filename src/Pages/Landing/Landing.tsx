import React from 'react';

import styles from './Landing.module.css';

function Landing() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.welcomeTextContainer}>
                Welcome to Algorithm Visualizer TBD!
            </div>
            <div className={styles.contentAlignmentContainer}>
                <div className={styles.tagLineTextContainer}>
                    <h2>Select an algorithm to explore,</h2>
                    <h2>interact, and learn</h2>
                </div>
                <div className={styles.optionsTreeContainer}>
                    Algorithms:
                    Tree(Djkrstra's, Mukudsas)
                </div>
            </div>
        </div>
    );
}

export default Landing;