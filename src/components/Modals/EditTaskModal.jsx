import React, { useCallback, useEffect, useState } from "react";
import { Cross } from "../../assets/svgs/Cross";
import { Button } from "../Button";
import { Container } from "../Container";
import { Input } from "../Input";
import { TagsMultiselect } from '../TagsMultiselect';
import styles from '../../styles/modal.module.css';
import { TagList } from "../TagList";
import { Modal } from "../Modal";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { getTicketById, updateCurrentTicket, updateTicket, selectCurrentTicket } from "../../slices/ticketsSlice";


export const EditTaskModal = () => {
    const [activeTags, setActiveTags] = useState([]);
    const { handleSubmit, control, reset } = useForm();
    const { ticketId } = useParams();
    const dispatch = useDispatch();
    const currentTicket = useSelector(selectCurrentTicket);

    useEffect(() => {
        reset();
        dispatch(getTicketById(ticketId)
            .then((ticket) => {
                if (ticket)
                    setActiveTags(ticket.tags);
                }
            )
        );
    }, [dispatch, reset, ticketId]);

    const onSubmit = useCallback((data, e) => {
        e.preventDefault();
        data['tags'] = activeTags;
        dispatch(updateTicket(data))
            .then(() => dispatch(updateCurrentTicket(ticketId)));
    }, [activeTags, dispatch, ticketId]);

    const closeModal = useCallback(() => {
        
    }, []);

    const tagAction = useCallback((index) => {
        let temp = [...activeTags];
        temp.splice(index, 1);
        setActiveTags(temp);
    }, [activeTags]);
    return (
        <Modal>
            <div className={styles.modal}>
                <Button
                    text={<Cross />}
                    action={closeModal}
                    type={'button-close'}
                    />
                <Container
                    title='Редактировать'
                    width={340}
                    className={styles.modal}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Controller
                            control={control}    
                            name="title"
                            defaultValue={currentTicket.title}
                            rules={{required: true}}
                            render={({ field }) => (
                                <Input
                                    isMultiline={false}
                                    isDisabled={false}
                                    placeholder="Название"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}    
                            name="description"
                            defaultValue={currentTicket.description}
                            render={({ field }) => (
                                <Input
                                    isMultiline={true}
                                    isDisabled={false}
                                    placeholder="Описание"
                                    {...field}
                                />
                            )}
                        />
                        <TagList tags={activeTags} tagAction={tagAction} />
                        <TagsMultiselect
                            chosen={activeTags}
                            setChosen={setActiveTags}
                            />
                        <Button
                            type='button-yellow'
                            text='Сохранить'
                            submit
                            />
                    </form>
                </Container>
            </div>
        </Modal>
    )
}