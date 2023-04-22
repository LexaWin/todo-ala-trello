import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskCard } from "./TaskCard";

export const TaskList = ({tasks, innerRef, provided}) => {
    return (
        <>
            {tasks.map((task, index) => (
                <Draggable
                    draggableId={task.id}
                    index={index}
                    key={task.id}
                >
                    {(provided) => (
                        <TaskCard
                            provided={provided}
                            innerRef={provided.innerRef}
                            {...task}
                        >

                        </TaskCard>
                    )
                    }
                </Draggable>
            ))}
        </>
    )
}