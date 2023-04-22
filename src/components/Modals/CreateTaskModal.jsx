import React, { useCallback, useEffect, useState } from "react";
import { Cross } from "../../assets/svgs/Cross";
import { Button } from "../Button";
import { Container } from "../Container";
import { Input } from "../Input";
import { TagsMultiselect } from '../TagsMultiselect';
import styles from '../../styles/modal.module.css';
import { Modal } from "../Modal";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { createTicket } from "../../slices/ticketsSlice";
import { useNavigate, useParams } from "react-router-dom";


const modalContainer = document.getElementById('modal-container');

const defaultValues = {
    InputTitle: '',
    InputDescription: '',
}
export const CreateTaskModal = () => {
    const [activeTags, setActiveTags] = useState([]);
    const { handleSubmit, control } = useForm({ defaultValues: defaultValues });
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        modalContainer.style.display = 'flex';
    }, [])
    const closeModal = useCallback(() => {
        modalContainer.style.display = 'none';
        navigate(-1);
    }, [navigate]);

    const onSubmit = useCallback((data, e) => {
        e.preventDefault();
        data['tags'] = activeTags;
        if (params.column)
            data['status'] = params.column;
        else
            data['status'] = 'todos';
        console.log(data);
        dispatch(createTicket(data))
            .then(() => {
                closeModal();
            });
    }, [activeTags, closeModal, dispatch, params]);

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
                        title='Создать тикет'
                        width={340}
                    >
                        <Controller
                            control={control}    
                            name="title"
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
                            render={({ field }) => (
                                <Input
                                    isMultiline={true}
                                    isDisabled={false}
                                    placeholder="Описание"
                                    {...field}
                                />
                            )}
                        />
                        <TagsMultiselect
                            activeTags={activeTags}
                            setActiveTags={setActiveTags}
                        />
                        <Button
                            type='button-yellow'
                            text='Сохранить'
                            submit
                        />
                    </Container>
                </form>
            </div>
        </Modal>
    )
}