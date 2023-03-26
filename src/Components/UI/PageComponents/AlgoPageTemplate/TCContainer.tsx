import React, { useContext } from 'react';

import styles from './PageStyle.module.css';
import H from '../../../../Components/UI/PageComponents/AlgoPageTemplate/H';

interface IProps {
    children: React.ReactNode;
}

export default function TCContainer({ children }: IProps) {

    return (
    <div>
        <H centered={true}>Time Complexity</H>
        <div className={styles.TCContainer}>
            {children}
        </div>
    </div>

  );
}

