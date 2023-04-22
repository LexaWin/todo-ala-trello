import React, { useMemo } from "react";
import * as ReactDOM from 'react-dom';
export const Modal = ({ children }) => {
    const containerElement = useMemo(
        () => document.getElementById('modal-container'),
        []
    );
    return ReactDOM.createPortal(children, containerElement);
}