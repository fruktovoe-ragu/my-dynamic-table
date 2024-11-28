import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import Textfield from "../components/Textfield/Textfield";

const maxLimitExceededMessage = 'The maximum of letter limit was exceeded.';

const EditPanel = forwardRef(({
    onSubmitClick,
    onCancelClick,
    cellContent = '',
    cellId = '',
    className = '',
}, ref) => {
    const [inputValue, setInputValue] = useState(cellContent);
    const [invalidInputMessage, setInvalidInputMessage] = useState('');
    const maxLength = 6000;

    const checkSymbolMaxLimit = (value = '') => {
        return value.length > maxLength;
    };

    const detectInvalidInput = useCallback(value => {
        if (checkSymbolMaxLimit(value)) {
            setInvalidInputMessage(maxLimitExceededMessage);
        } else {
            setInvalidInputMessage('');
        }      
    }, [checkSymbolMaxLimit]);

    useEffect(() => {
        detectInvalidInput(inputValue); 
    }, [detectInvalidInput, inputValue]);

    const handleKeyUp = e => {
        if (e.key === 'Enter') {
            const actualId = cellId !== '' ? cellId : Date.now();

            onSubmitClick?.(inputValue, actualId);

            return false;
        }

        if (e.key === 'Escape') {
            onCancelClick?.();

            return false;
        }

        return true;
    };

    const handleOnChange = e => {
        setInputValue(e.target.value);

        detectInvalidInput(e.target.value);
    };

    return (
        <div className={`inline-flex min-w-full ${className}`} ref={ref}>
            <Textfield
                onChange={handleOnChange}
                value={cellContent}
                errorMessage={invalidInputMessage}
                onKeyUp={handleKeyUp}
            />
        </div>
    );
});

export default EditPanel;