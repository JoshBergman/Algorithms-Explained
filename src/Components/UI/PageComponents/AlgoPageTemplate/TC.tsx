import React, { useContext } from "react";

import styles from "./PageStyle.module.css";

interface IProps {
  children: React.ReactNode;
  type: string;
}

export default function TC({ children, type }: IProps) {
  return (
    <React.Fragment>
      <tr className={styles.TCHeader}>
        <td>{type}</td>
      </tr>
      <tr className={styles.TCBody}>
        <td>{children}</td>
      </tr>
    </React.Fragment>
  );
}
