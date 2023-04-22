import React from "react";
import styles from '../styles/extrapopup.module.css';
import { Button } from "./Button";
import { Cross } from '../assets/svgs/Cross'

export const ExtraPopup = ({actionDelete, actionEdit}) => {
    return (
        <div className={styles.popup}>
            <Button type='button-close' text={<Cross></Cross>} />
            <div className={styles["popup-content"]}>
                <div onClick={actionDelete()}>Удалить</div>
                <div onClick={actionEdit()}>Редактировать</div>
            </div>
        </div>
    )
}