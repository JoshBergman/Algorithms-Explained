import React, { useContext } from "react";
import { StyleContext } from "../../../../Store/ThemeContext";

import styles from "./PageStyle.module.css";

interface ITimeTableProps {
  best: React.ReactNode;
  average: React.ReactNode;
  worst: React.ReactNode;
}

export default function TimeTable({ best, average, worst }: ITimeTableProps) {
  const theme = useContext(StyleContext).theme;

  const borderPlusText = {
    borderColor: theme.text1.color,
    ...theme.text1,
  };

  return (
    <table className={styles.timeTable} style={borderPlusText}>
      <thead>
        <tr>
          <td className={styles.cell}>Best</td>
          <td className={styles.cell}>Average</td>
          <td className={styles.cell}>Worst</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={styles.cell}>{best}</td>
          <td className={styles.cell}>{average}</td>
          <td className={styles.cell}>{worst}</td>
        </tr>
      </tbody>
    </table>
  );
}
