import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { Container } from "../components/Container";
import { TaskList } from "../components/TaskList";
import styles from '../styles/mainpage.module.css';
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, getTicketsWithFilters, updateColumns, selectTodos, selectWips, selectDone, updateBackend } from "../slices/ticketsSlice";
import { Outlet, useNavigate } from "react-router-dom";


const nameToFilterMap = {
    'Комментарий': 'hasComments',
    'Описание': 'hasDescription',
    'Тег': 'hasTags',
}

export const MainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const todos  = useSelector(selectTodos);
    const wips = useSelector(selectWips);
    const done = useSelector(selectDone);
    const [filters, setFilters] = useState({
        hasComments: false,
        hasDescription: false,
        hasTags: false,
    });
    
    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);

    
    const onDragEnd = useCallback((result) => { 
        const { destination, source } = result;
        if (!destination)
            return;
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index)
            return;
        if (destination.droppableId !== source.droppableId) {
            dispatch(updateColumns({
                columns: [source.droppableId, destination.droppableId],
                data: [source.index, destination.index],
            }));
        }
        else {
            dispatch(updateColumns({
                columns: source.droppableId,
                data: [source.index, destination.index],
            }));
        }
        dispatch(updateBackend());
    }, [dispatch]);

    const filterAction = useCallback((check, name) => {
        let tempFilters = filters;
        tempFilters[nameToFilterMap[name]] = check;
        console.log('tempFilters', tempFilters);
        dispatch(getTicketsWithFilters(tempFilters));
        setFilters(tempFilters);
    }, [dispatch, filters]);

    const openCreateModal = useCallback((column)=>() => { navigate(`/create/${column}`)}, [navigate]);

    return (
        <div className={styles.mainpage}>
            <div className={styles.filters}>
                <Checkbox name="Комментарий" action={filterAction} />
                <Checkbox name="Описание" action={filterAction} />
                <Checkbox name="Тег" action={filterAction}/>
            </div>
            <div className={styles.tasks}>
                <DragDropContext
                    onDragEnd={onDragEnd}
                >

                    <Droppable droppableId="todos">  
                    {(provided) => (
                        <Container
                            title={'Todo'}
                            provided={provided}
                            innerRef={provided.innerRef}
                            width={277}
                        >
                            {todos.length > 0 &&
                                <TaskList tasks={todos}/>
                            }
                            {provided.placeholder}
                                <Button
                                    type={'button-yellow'}
                                    text={"+ Добавить тикет"}
                                    action={openCreateModal('todos')}
                                />
                        </Container>
                        )}
                    </Droppable>

                    <Droppable droppableId="wips">  
                    {(provided) => (
                        <Container
                            title={'In Progress'}
                            provided={provided}
                            innerRef={provided.innerRef}
                            width={277}
                        >
                            {wips.length > 0 &&
                                 <TaskList tasks={wips}/>
                            }
                            {provided.placeholder}
                                <Button
                                    type={'button-yellow'}
                                    text={"+ Добавить тикет"}
                                    action={openCreateModal('wips')}
                                />
                        </Container>
                        )}
                    </Droppable>

                    <Droppable droppableId="done">  
                    {(provided) => (
                        <Container
                            title={'Done'}
                            provided={provided}
                            innerRef={provided.innerRef}
                            width={277}
                        >
                            {done.length > 0 &&
                                <TaskList tasks={done}/>
                            }
                            {provided.placeholder}
                        </Container>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <Outlet/>
        </div>
    )
}