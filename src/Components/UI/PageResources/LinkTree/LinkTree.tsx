import React, { useContext } from 'react';

import styles from './LinkTree.module.css';
import { LinksContext } from '../../../../Store/LinksContext';
import { StyleContext } from '../../../../Store/ThemeContext';
import { Link } from 'react-router-dom';

export default function LinkTree() {
    const styleCTX = useContext(StyleContext);
    const links = useContext(LinksContext).links;

    const themeBorder = {
        "borderColor": styleCTX.theme.logoBackground1.backgroundColor
    };

  return (
    <div className={styles.linksContainer} style={themeBorder}>
        {links.map((link) => {return (
                <div key={link[1]} className={styles.singleLinkContainer}>
                    <div className={styles.textContainer}>
                    <Link to={link[1]} style={styleCTX.theme.logoText1} className={styles.linkText} >
                        {link[0]}
                    </Link>
                    </div>
                    <div className={styles.connectingLine} style={styleCTX.theme.logoBackground1} />
                </div>
            );
        })}
    </div>
  )
}
