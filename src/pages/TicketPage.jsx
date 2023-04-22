import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Return } from "../assets/svgs/Return";
import { Container } from "../components/Container";
import { ExtraAction } from "../components/ExtraAction";
import { ExtraPopup } from "../components/ExtraPopup";
import { TicketDetails } from "../components/TicketDetails";
import styles from '../styles/ticketpage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTicket, updateTicket, selectCurrentTicket } from "../slices/ticketsSlice";
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";

export const TicketPage = () => {
    const [popup, setPopup] = useState(false);
    const [edit, setEdit] = useState(false);
    const [activeTags, setActiveTags] = useState([]);
    const currentTicket = useSelector(selectCurrentTicket);
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const modalContainer = useMemo(() => document.getElementById('modal-container'), []);
    const { handleSubmit, control, reset } = useForm();
    
    const openConfirmationModal = useCallback(() => () => {
        modalContainer.style.display = 'flex';
        navigate(location.pathname + '/delete')
    }, [location, modalContainer, navigate]);
    
    const saveChanges = useCallback((data, event) => {
        event.preventDefault();
        let temp = JSON.parse(JSON.stringify(currentTicket));
        temp['tags'] = activeTags;
        console.log('temp comments', temp.comments);
        dispatch(updateTicket(temp))
            .then(() => {
                dispatch(updateCurrentTicket(ticketId));
                setEdit(false);
            });
    }, [activeTags, currentTicket, dispatch, ticketId]);

    const goBack = useCallback(() => { navigate('/'); }, [navigate]);
    
    const toggleEdit = useCallback(() => () => {
        setEdit((current) => !current);
    }, [])

    const togglePopup = useCallback(() => () => {
        setPopup((current) => !current);
    }, []);

    useEffect(() => {
        if (location.pathname.includes('create'))
            setEdit(true);
    }, [location]);

    return (
        <div className={styles.ticketpage}>
            <div className={styles.return} onClick={goBack}>
                <Return/> Вернуться к задачам
            </div>
            <form onSubmit={handleSubmit(saveChanges)}>
                <Container title={[
                    "Todo",
                    <ExtraAction
                        key="extra_ticket_details"
                        drawChildren={popup}
                        action={togglePopup}
                    >
                        <ExtraPopup
                            actionDelete={openConfirmationModal }
                            actionEdit={toggleEdit}
                        />
                    </ExtraAction>]}
                    width={469}
                >
                    <TicketDetails
                        activeTags={activeTags}
                        setActiveTags={setActiveTags}
                        edit={edit}
                        control={control}
                        reset={reset}
                    />
                </Container>
            </form>
            <Outlet/>
        </div>
    )
}