import * as React from 'react';
import { useCallback, useEffect, useState, useRef, } from 'react';
import { block } from 'bem-cn';
import WarningIcon from "../../icons/warning-full";
import Button from "../Button/Button";
import './Textfield.css';

const b = block('text-field');
const Textfield = ({
    className,
    name,
    placeholder,
    required,
    isAutoFocused = true,
    onBlur,
    onChange,
    onFocus,
    onKeyUp,
    value = '',
    inputRef,
    inputMode,
    errorMessage = '',
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [isErrorDescriptionOpened, setIsErrorDescriptionOpened] = useState(true);

    const fieldNode = useRef();

    useEffect(() => {
        if (!fieldNode.current) {
            return;
        }
    }, [inputValue]);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = e => {
        setInputValue(e.target.value);

        onChange?.(e);
    };

    const handleFocus = useCallback(e => {
            onFocus?.(e);
            moveCaretAtEnd(e);
        }, [onFocus],
    );

    const handleBlur = useCallback( e => {
            onBlur?.(e);
        }, [onBlur],
    );

    const handleInputClick = e => {
        e.stopPropagation();
    }

    const handleWarningClick = e => {
        e.stopPropagation();

        setIsErrorDescriptionOpened(prevState => !prevState);
    }

    const moveCaretAtEnd = e => {
        const valueLength = e.target.value.length;

        e.target.setSelectionRange(valueLength, valueLength);
    }

    const inputParams = {
        name,
        value: inputValue,
        onChange: handleInputChange,
        onBlur: handleBlur,
        onFocus: handleFocus,
        onKeyUp,
        required,
        inputMode,
        autoFocus: isAutoFocused,
        placeholder,
        className: b('input', { invalid: !!errorMessage })
    };

    const getFieldNode = node => {
        if (!node) {
            return;
        }

        fieldNode.current = node;
        inputRef?.(node);
    };

    return (
        <div className={b({}).mix(className)}>
            <input
                {...inputParams} 
                ref={getFieldNode} 
                onClick={handleInputClick} 
            />
            <div className={b('actions')}>
                {!!errorMessage && 
                    <Button
                        className={b('warning-button')}
                        onClick={handleWarningClick}
                    >
                        <WarningIcon />
                    </Button>
                }
            </div>
            {!!errorMessage && isErrorDescriptionOpened && 
                <div className={b('error-text-popup text-left')}>
                    {!!errorMessage && <p dangerouslySetInnerHTML={{ __html: errorMessage }} />}
                </div>
            }
        </div>
    );
};

export default Textfield;