import React from "react";
import styles from '../styles/extraaction.module.css';

export const ExtraAction = ({ action, children, drawChildren }) => {
    return (
        <div onClick={action()} className={styles['extra-info']}>
            <div className={styles.dot}/>
            <div className={styles.dot}/>
            <div className={styles.dot} />
            {drawChildren && children}
        </div>
    );
};
