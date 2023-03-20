import React from 'react';

import styles from './CodeSnippet.module.css';

interface ISnippetProps {
    children: string;
}

export default function CodeSnippet({ children }: ISnippetProps) {

  return (
    <div className={styles.snippetContainer}>
        {
            <p className={styles.snippetLine} key={Math.random()}>
                {children}
            </p>
        }
    </div>
  );
}