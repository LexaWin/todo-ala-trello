import React, { useCallback, useState } from 'react';
import { ArrowDown } from '../assets/svgs/ArrowDown';
import { Button } from './Button';
import { MultiselectItem } from './MultiselectItem';
import styles from '../styles/multiselect.module.css'

const colors = ['red', 'yellow', 'blue', 'dark-blue', 'green', 'orange', 'light-green', 'violet',];
export const TagsMultiselect = ({activeTags, setActiveTags}) => {
    const [showSelect, setShowSelect] = useState(false);
   
    const selectItemAction = useCallback((checked, color) => {
        let temp = [...activeTags];
        if (checked)
            temp = temp.filter((tag) => color.localeCompare(tag) !== 0);
        else
            temp.push(color);
        setActiveTags(temp);
    }, [activeTags, setActiveTags]);

    const showList = useCallback(() => {
        setShowSelect((current) => !current);
    }, []);

    const drawItems = useCallback(() => {
        return (
            colors.map(tag => (
                    <MultiselectItem
                        key={ `tag_${tag}` }
                        chosen={ activeTags.includes(tag) }
                        action={ selectItemAction } 
                        color = { tag }
                    />
                ))
        )
    }, [activeTags, selectItemAction])

    return (
        <div className={styles.multiselect}>
            <Button
                action={showList}
                text={['Выбрать тег', <ArrowDown key="Multiselect_button" />]}
                type="button-multiselect"
            />

            {showSelect && <ul >
                {drawItems()}
            </ul>}
        </div>
    )
}