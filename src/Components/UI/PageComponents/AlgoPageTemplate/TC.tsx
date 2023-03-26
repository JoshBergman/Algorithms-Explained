import React, { useContext } from 'react';

import styles from './PageStyle.module.css';

interface IProps {
    children: React.ReactNode;
    type: string;
}

export default function TC({ children, type }: IProps) {

    return (
    <div className={styles.TCCard}>
            <div className={styles.TCHeader}>
                {type}
            </div>
            <div className={styles.TCBody}>
                {children}
            </div>
    </div>
  );
}

