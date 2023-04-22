import React from 'react';
import styles from '../styles/tag.module.css';
import classnames from 'classnames';
export const Tag = ({ color, size, children, onClick }) => {
    return (
        <div
            //sizes: sm, md or lg
            className={classnames(styles.tag, styles[`tag-${color}`], styles[`tag-${size}`])}
            onClick={onClick}
        >
            {children}
        </div>
    )
}