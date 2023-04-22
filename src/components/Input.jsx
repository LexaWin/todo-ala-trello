import React from 'react';
import styles from '../styles/input.module.css';

export const Input = React.forwardRef(({ isMultiline = false, isDisabled = false, placeholder, ...field }, ref) => {
   
    return (
        <>
            {isMultiline
                ? <textarea
                    className={styles.input}
                    disabled={isDisabled}
                    placeholder={placeholder ? placeholder : 'Описание'}
                    {...field}
                    ref={ref}
                />
                : <input
                    type="text"
                    className={styles.input}
                    disabled={isDisabled}
                    placeholder={placeholder ? placeholder : 'Название'}
                    {...field}
                    ref={ref}
                />
            }
        </>
    );
});