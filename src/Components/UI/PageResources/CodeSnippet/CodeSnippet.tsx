import React from 'react';

import styles from './CodeSnippet.module.css';

interface ISnippetProps {
    children: string;
}

export default function CodeSnippet({ children }: ISnippetProps) {

    // "^" is a newline

    const parseSnippetString = (snippetString: string) => {
        let lastBreak = 0;
        const snippetLines = [];

        for(let i = 0; i < snippetString.length; i++){
            if(snippetString[i] === "^"){
                snippetLines.push(snippetString.slice(lastBreak, i).trim());
                lastBreak = i + 1;   
            }
        }
        snippetLines.push(snippetString.slice(lastBreak, snippetString.length).trim());

        return snippetLines;
    };

    const lines = parseSnippetString(children);
  return (
    <div className={styles.snippetContainer}>
        <div className={styles.pseudoBtn} />
        <div className={styles.pseudoBtn} />
        <div className={styles.pseudoBtn} />
        {
        lines.map((line) => {
        if(line === '') {
            return (
                <p className={styles.invis} key={Math.random()}>secret whitespace</p>
            );
        }
            return (
        <p className={styles.snippetLine} key={Math.random()}>
            {line}
        </p>
        );
        })
        }
    </div>
  );
}