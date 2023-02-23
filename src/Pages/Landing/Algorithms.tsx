import React, { useContext } from 'react';

import styles from './Algorithms.module.css';
import { Link } from 'react-router-dom';
import { StyleContext } from '../../Store/ThemeContext';
import { LinksContext } from '../../Store/LinksContext';

export default function Algorithms() {
    const styleCTX = useContext(StyleContext);
    const linksCTX = useContext(LinksContext);

    const borderColor = {
        "borderColor" : styleCTX.theme.text1.color
    };

  return (
    <React.Fragment>
        <h1 className={styles.title} style={styleCTX.theme.logoText1}>All Algorithms</h1>
        <div className={styles.linksContainer}>

            {linksCTX.allLinks.links.map((link) => {
                return (
            <div className={styles.singleLinkContainer} style={borderColor} key={link[0] + 1}>
                <Link to={link[1]} className={styles.linkTitle} style={styleCTX.theme.text1}>{link[0]}</Link>
                <label className={styles.linkDesc} style={styleCTX.theme.text1}>{link[2]}</label>
            </div>
            );
            })
            }

        </div>
    </React.Fragment>
  )
}
