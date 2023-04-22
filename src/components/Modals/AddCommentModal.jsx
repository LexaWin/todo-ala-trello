import React, { useCallback, useEffect, useMemo } from "react";
import { Button } from "../Button";
import { Container } from "../Container";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentTicket, updateCurrentTicket, updateTicket } from "../../slices/ticketsSlice";
import styles from '../../styles/modal.module.css';
import { Cross } from "../../assets/svgs/Cross";

export const AddCommentModal = () => {
    const dispatch = useDispatch();
    const currentTicket = useSelector(selectCurrentTicket);
    const { handleSubmit, control, reset } = useForm();
    const { ticketId } = useParams();
    const modalContainer = useMemo(() => document.getElementById('modal-container'), []);
    const navigate = useNavigate();
    useEffect(() => {
        modalContainer.style.display = 'flex';
    }, [modalContainer, reset])
    
    const closeModal = useCallback( () => {
        modalContainer.style.display = 'none';
        navigate(-1);
    }, [modalContainer, navigate]);

    const onSubmit = useCallback((data, event) => {
        event.preventDefault();
        let temp = JSON.parse(JSON.stringify(currentTicket));
        temp.comments.push(data);
        dispatch(updateTicket(temp))
            .then(() => {
                dispatch(updateCurrentTicket(ticketId));
                closeModal();
            });
    }, [closeModal, currentTicket, dispatch, ticketId]);
    
    return (
        <Modal>
            <div className={styles.modal}>
                <Button
                    text={<Cross />}
                    action={closeModal}
                    type={'button-close'}
                />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container
                    title="Добавить комментарий"
                    width={340}
                    className={styles.modal}
                >
                        <Controller
                            control={control}    
                            name="author"
                            defaultValue={''}
                            rules={{required: true}}
                            render={({ field }) => (
                                <Input
                                    isMultiline={false}
                                    isDisabled={false}
                                    placeholder="Имя"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}    
                            name="comment"
                            defaultValue={''}
                            rules={{required: true}}
                            render={({ field }) => (
                                <Input
                                isMultiline={true}
                                    isDisabled={false}
                                    placeholder="Комментарий"
                                    {...field}
                                />
                            )}
                        />
                        <Button
                            text={"Сохранить"}
                            type="button-yellow"
                            submit
                        />
                </Container>
            </form>
            </div>
        </Modal>
    )
}