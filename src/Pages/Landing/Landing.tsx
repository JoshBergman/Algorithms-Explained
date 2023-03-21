import React, { useContext, useState, useLayoutEffect } from 'react';

import { StyleContext } from '../../Store/ThemeContext';
import LinkTree from '../../Components/UI/PageResources/LinkTree/LinkTree';

import styles from './Landing.module.css';
import AutoSweeper from '../../Components/UI/PageResources/AutoSolvingMS/AutoSweeper';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const styleCTX = useContext(StyleContext);

    const [size, setSize] = useState([0, 0]);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const includeMS = () => {
        return size[0] > 900;
    }

    const goToMS = () => {
        navigate("/minesweeper")
    }

    return (
        <div className={styles.pageContainer}>
                <div className={styles.headerContainer}>
                    <h2 style={styleCTX.theme.logoText1} className={styles.tagLineText} >Discover and Learn</h2>
                    <h2 style={styleCTX.theme.logoText1} className={styles.tagLineText} >With Visualized Algorithm's</h2>
                </div>
            <div className={styles.contentAlignmentContainer}>
                    <h2 style={styleCTX.theme.text1} className={styles.algoTextHeader} >Featured Algo's:</h2>
                <div className={styles.treeAndSweep}>
                {includeMS() &&
                    <div className={styles.ms} onClick={goToMS}>
                        <label style={styleCTX.theme.text1}>Minesweeper Solver (Click Me)</label>
                        <AutoSweeper />
                    </div>
                }
                    <LinkTree />
                </div>
            </div>
        </div>
    );
}

export default Landing;