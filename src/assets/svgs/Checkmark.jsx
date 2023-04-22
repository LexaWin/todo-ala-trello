import React from "react"
import styles from '../../styles/checkmark.module.css';
export const Checkmark = () => {
    return (
        <svg className={styles['checkmark-border']} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.33333 14.1917L5 10.8583L6.175 9.68334L8.33333 11.8333L13.825 6.34167L15 7.52501L8.33333 14.1917Z" fill="#333333"/>
        </svg>
    )
}
