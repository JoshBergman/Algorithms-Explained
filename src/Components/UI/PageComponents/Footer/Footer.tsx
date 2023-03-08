import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { StyleContext } from '../../../../Store/ThemeContext';
import styles from './Footer.module.css';

export default function Footer() {
    const styleCTX = useContext(StyleContext);
    const theme = styleCTX.theme;
    const wordStyle = {
        color : theme.text1.color,
        borderColor : theme.text1.color
    };

    return (
        <div className={styles.footerContainer}>
            <div className={styles.textContainer}>
                <h5 className={styles.copy} style={wordStyle}>© 2023 Joshua Bergman, Trent Young</h5>
                <Link to="/" style={wordStyle} className={styles.word}>Home</Link>
                <Link to="/algorithms" style={wordStyle} className={styles.word}>All Algorithms</Link>
                <a href="https://joshuabergman.dev" rel="noreferrer" target="_blank" style={wordStyle} className={styles.word}>SiteTest</a>
            </div>
        </div>
    );
};
