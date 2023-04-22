import React from "react";
import { Tag } from './Tag';
import styles from '../styles/taglist.module.css';
import { Cross } from "../assets/svgs/Cross";
export const TagList = ({tags, tagAction}) => {
    return (
            <div className={styles.tags}>
                {tags.length > 0 && 
                    tags.map((tag, index) => (
                        <Tag
                            key={`tag_${tag}`}
                            color = {tag}
                            size={'md'}
                            onClick={tagAction(index)}
                        >
                            <Cross></Cross>
                        </Tag>
                ))}
            </div>
    )
}