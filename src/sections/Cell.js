import React, { useState, useRef, useEffect } from 'react';
import EditPanel from "./EditPanel";

const Cell = ({
    children,
    className = '',
    id = '',
    content = '',
    colspan = 0,
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

    return (
        <th
            className={`py-2 relative ${className}`}
            ref={cellRef}
            colSpan={colspan}
        >
            {children}
            {isEditModeState &&
                <div className="absolute flex left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-xl rounded-lg z-10 px-4 py-2 min-w-full">
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