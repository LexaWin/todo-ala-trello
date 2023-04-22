import React from "react";
import { Tag } from "./Tag";
import { Checkmark } from "../assets/svgs/Checkmark";
export const MultiselectItem = ({action, chosen, color}) => {
    return (
        <li onClick={()=>action(chosen, color)}>
            <Tag
                color={color}
                size={'lg'}
            />
            {chosen && <Checkmark/>}
        </li>
    )
}