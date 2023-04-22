import classNames from 'classnames';
import React from 'react';
import styles from '../styles/button.module.css';
export const Button = ({text, type, action = ()=>()=>{}, submit = false}) => {
    return (
        <button
            type={submit ? 'submit' : 'button'}
            className={classNames(styles.button, styles[`${type}`])}
            onClick={action}
        >
            {text}
        </button>
    )
}