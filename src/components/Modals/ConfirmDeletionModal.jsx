import React, { useCallback, useEffect, useMemo } from "react";
import { Button } from "../Button";
import styles from '../../styles/modal.module.css';
import { Modal } from "../Modal";
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { deleteTicket } from "../../slices/ticketsSlice";

export const ConfirmDeletionModal = () => {
    const { ticketId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modalContainer = useMemo(() => document.getElementById('modal-container'), []);
    useEffect(() => {
        modalContainer.style.display = 'flex';
    }, [modalContainer]);

    const handleDelete = useCallback(() => {
        dispatch(deleteTicket(ticketId)).then(() => {
            modalContainer.style.display = 'none';
            navigate('/');
        });
    }, [dispatch, modalContainer, navigate, ticketId]);

    const closeModal = useCallback(() => {
        modalContainer.style.display = 'none';
        navigate(-1);
    }, [modalContainer, navigate])

    return (
        <Modal>
            <div className={styles['modal-confirm-deletion']}>
                <div className={styles['modal-content']}>
                    <div>Удалить тикет?</div>
                    <div className={styles['modal-buttons']}>
                        <Button type="button-simple" text='Да' action={handleDelete} />
                        <Button type="button-simple" text='Нет' action={closeModal}/>
                    </div>
                </div>
            </div>
        </Modal>
    )
}