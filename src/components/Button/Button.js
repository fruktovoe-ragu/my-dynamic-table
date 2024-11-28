import React, { forwardRef } from 'react';
import { block } from 'bem-cn';
import './Button.css';

const b = block('button');
const Button = forwardRef(({
    className = '',
    disabled,
    children,
    onClick,
    isFloated,
    theme = '',
}, ref) => {
    const handleClick = React.useCallback(e => {
        if (disabled) {
            e.preventDefault();

            return;
        }

        onClick && onClick(e);
    }, [disabled, onClick]);

    return (
        <button
            type="button"
            className={b({
                disabled,
                theme,
                floated: isFloated,
            }).mix(className)}
            onClick={handleClick}
            disabled={disabled}
            ref={ref}
        >
            <div className={b('inner')}>
                {children}
            </div>
        </button>
    );
});

export default Button;