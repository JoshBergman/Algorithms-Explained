import React from "react";

import styles from "./AESpinner.module.css";

export default function AE() {
  return (
    <div className={styles.barContainer}>
      <div className={styles.medBar} />
      <div className={styles.smallBar} />
      <div className={styles.largeBar} />
    </div>
  );
}
