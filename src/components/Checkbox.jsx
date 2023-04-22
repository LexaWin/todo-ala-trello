import React, { useCallback, useState } from 'react';
export const Checkbox = ({name, action}) => {
    const [isChecked, setChecked] = useState(false);
    const handleChange = useCallback(() => {
        setChecked((currentChecked) => !currentChecked);
        action(!isChecked, name);
    }, [action, isChecked, name]);
    return (
        <div>
            <label>
                <input
                    type={'checkbox'}
                    text={name}
                    checked={isChecked}
                    onChange={handleChange}
                />
                {name}
            </label>
        </div>
    )
}