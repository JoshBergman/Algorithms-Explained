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
                <Link to="/" style={wordStyle} className={styles.word}>Home</Link>
                <Link to="/algorithms" style={wordStyle} className={styles.word}>All Algorithms</Link>
                <p className={styles.copy} style={{...wordStyle, borderColor: "transparent"}}>© 2023 Joshua Bergman, Trent Young</p>
            </div>
        </div>
    );
};
