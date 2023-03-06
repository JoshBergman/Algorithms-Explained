import React from 'react';
import { Link } from 'react-router-dom';

import styles from './PageStyle.module.css';

interface IRefLinkProps {
    children: React.ReactNode;
    to: string;
}

export default function RefLink({children, to}: IRefLinkProps) {
  return (
    <Link to={to} className={styles.RefLink}>{children}</Link>
  )
}
