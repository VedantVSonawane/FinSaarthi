import React, { forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    startIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, startIcon, className, ...props }, ref) => {
        return (
            <div className={`${styles.container} ${className || ''}`}>
                {label && <label className={styles.label}>{label}</label>}

                <div className={styles.inputWrapper}>
                    {startIcon && <span className={styles.icon}>{startIcon}</span>}
                    <input
                        ref={ref}
                        className={`${styles.input} ${error ? styles.hasError : ''} ${startIcon ? styles.withIcon : ''}`}
                        {...props}
                    />
                </div>

                {error ? (
                    <span className={styles.errorText}>⚠️ {error}</span>
                ) : helperText ? (
                    <span className={styles.helperText}>{helperText}</span>
                ) : null}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
