import React, { useCallback, useEffect } from "react";
import { Input } from './Input';
import { Comment } from "./Comment";
import { Button } from "./Button";
import { Plus } from "../assets/svgs/Plus";
import { TagList } from "./TagList";
import { Cross } from "../assets/svgs/Cross";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTicketById, selectCurrentTicket, updateCurrentTicket, updateTicket } from "../slices/ticketsSlice";
import { TagsMultiselect } from "./TagsMultiselect";
import { Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

export const TicketDetails = ({ edit, activeTags, setActiveTags, control, reset }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { ticketId } = useParams();
    const dispatch = useDispatch();
    const currentTicket = useSelector(selectCurrentTicket);

    const openAddCommentModal = useCallback(() => {
        navigate(location.pathname + '/comment/create');
    }, [navigate, location]);

    useEffect(() => {
        dispatch(getTicketById(ticketId))
            .then((action) => {
                if (action.payload)
                    setActiveTags(action.payload.tags);
                reset(action.payload);
            }
        );
    }, [dispatch, reset, setActiveTags, ticketId]);

    const removeComment = useCallback((index) => () => {
        let temp = JSON.parse(JSON.stringify(currentTicket));
        temp.comments.splice(index, 1);
        dispatch(updateTicket(temp))
            .then(() => { dispatch(updateCurrentTicket(ticketId)); });
    }, [currentTicket, dispatch, ticketId]);

    const tagAction = useCallback((index) => () => {
        if (!edit)
            return;
        let temp = [...activeTags];
        temp.splice(index, 1);
        setActiveTags(temp);
    }, [activeTags, edit, setActiveTags]);

    return (
        <>
            <Controller
                control={control}    
                name="title"
                defaultValue={currentTicket.title}
                rules={{required: true}}
                render={({ field }) => (
                    <Input
                        isMultiline={false}
                        isDisabled={!edit}
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
                        isDisabled={!edit}
                        placeholder="Описание"
                        {...field}
                    />
                )}
            />

            <TagList tags={activeTags} tagAction={tagAction} />

            {edit && <TagsMultiselect activeTags={activeTags} setActiveTags={setActiveTags} />}
            {currentTicket.comments.length > 0 &&
                currentTicket.comments.map((comment, index) => (
                    <Comment
                        key={`comment_from_${comment.author}_on_${index}`}
                        author={[
                            comment.author,
                            edit
                            ? <Button type='button-close' text={<Cross />} action={removeComment(index)} />
                            : null]}
                        text={comment.comment}
                    />
                ))
            }
            {edit && <Button
                text={[<Plus key="button_svg" />, 'Добавить комментарий']}
                type={'button-comment'}
                action={openAddCommentModal}
            />}
            {edit && <Button
                text={'Сохранить'}
                type={'button-yellow'}
                submit
            />}
        </>
    )
}