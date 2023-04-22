import React from 'react';
import { Tag } from './Tag';
import styles from '../styles/taskCard.module.css';
import { DescriptionIcon } from '../assets/svgs/DescriptionIcon';
import { CommentsIcon } from '../assets/svgs/CommentsIcon';
import { ExtraAction } from './ExtraAction';
import { useNavigate } from "react-router-dom";

export const TaskCard = ({ tags, title, id, comments = [], description = undefined, innerRef, provided }) => {
    const navigate = useNavigate();
    const action = () => () => navigate(`/full/${id}`);
    return (
        <div
            className={styles['card']}
            ref={innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div className={styles['card-header']}>
                <div className={styles['card-text']}>
                    {title}
                </div>
                <ExtraAction action={action} />
            </div>
            <div className={styles['card-footer']}>
                <div className={styles['card-tags']}>
                    {tags !== undefined && 
                        tags.map(tag => (
                            <Tag
                                key={`tag_${tag}`}
                                color = {tag}
                                size = {'sm'}
                            />
                    ))}

                </div>
                <div className={styles.icons}>
                    { description && <DescriptionIcon /> }
                    { comments.length > 0 && <CommentsIcon/> }
                </div>
            </div>
        </div>
    )
}