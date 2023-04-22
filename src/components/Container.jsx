import React from "react";
import styles from '../styles/container.module.css';
export const Container = ({ title, children, width = undefined, provided, innerRef}) => {
    return (
        <div
            className={styles.container}
            style={width ? { width: `${width}px` } : null}
            ref={innerRef ? innerRef : null}
            {...provided?.droppableProps}
        >
            <div className={styles['container-title']}>
                {title}
            </div>
            <div className={styles['container-content']}>
                {children}
            </div>
        </div>
    )
}