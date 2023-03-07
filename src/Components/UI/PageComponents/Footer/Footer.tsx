import React, { useContext } from 'react';
import { StyleContext } from '../../../../Store/ThemeContext';

import styles from './Footer.module.css';

export default function Footer() {
    const styleCTX = useContext(StyleContext);
    const theme = styleCTX.theme;

    return (
        <div className={styles.footerContainer}>
            <div className={styles.textContainer}>
                <h5 style={theme.mutedLogoText1}>Navigation</h5>
            </div>
            <div className={styles.textContainer}>
                <h5 style={theme.mutedLogoText1}>More</h5>
                <a href="https://joshuabergman.dev" rel="noreferrer" target="_blank" style={theme.text1}>SiteTest</a>
            </div>
        </div>
    );
};
