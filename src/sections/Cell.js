import React, { useState, useRef, useEffect } from 'react';
import EditPanel from "./EditPanel";

const Cell = ({
    children,
    className = '',
    id = '',
    content = '',
    colspan = 0,
    isEditPanelFloated = false,
    isEditMode = false,
    isControlled = false,
    onSubmitClick,
    onCancelClick,
}) => {
    const [isEditModeState, setIsEditModeState] = useState(isEditMode);

    const cellRef = useRef(null);

    const handleClickOutside = e => {
        if (!cellRef.current) {
            return;
        }

        const eventHappened = cellRef.current.contains(e.target);

        if (eventHappened && !isControlled) {
            setIsEditModeState(true);
        } else {
            setIsEditModeState(false);

            onCancelClick?.();
        }
    };

    useEffect(() => {
        isControlled && setIsEditModeState(() => (isEditMode));
    }, [isEditMode, isControlled]);
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleSubmitClick = (value, id) => {
        setIsEditModeState(false);

        onSubmitClick?.(value, id);
    };

    const handleCancelClick = () => {
        setIsEditModeState(false);
    };

    const hasFloatedStyles = isEditPanelFloated ? 
        'absolute left-0 top-1/2 transform -translate-y-1/2 shadow-xl rounded-lg min-h-full min-w-full px-4 bg-white z-10' : 
        'relative';

    return (
        <th
            className={`py-2 relative max-w-60 ${className}`}
            ref={cellRef}
            colSpan={colspan}
        >
            {isEditPanelFloated ? children : !isEditModeState && children}
            {isEditModeState &&
                <div className={`
                    ${hasFloatedStyles} flex items-center py-2
                `}>
                    <EditPanel
                        cellId={id}
                        cellContent={content}
                        onSubmitClick={handleSubmitClick}
                        onCancelClick={handleCancelClick}
                    />
                </div>
            }
        </th>
    );
};

export default Cell;