import React from 'react';
import styles from '../styles/comment.module.css';

export const Comment = ({author, text}) => {
    return (
        <div className={styles.comment}>
            <div className={styles['comment-author']}>
                {author}
            </div>
            <p className={styles['comment-text']}>
                {text}
            </p>
        </div>
    )
}