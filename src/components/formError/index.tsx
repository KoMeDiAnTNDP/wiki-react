import React from 'react';

import styles from './fromError.module.css';
import {IErrors} from "../../types";

export function CountErrors({error, message}: IErrors) {
    const errorContainer = error === 'count' ? styles.searchForm__errorCountContainer : '';
    const errorClassName = error === 'count' ? styles.searchForm__errorCount : '';

    return (
        <div className={errorContainer}>
            <div className={errorClassName}>
                <span className={styles.error__text}>{message}</span>
            </div>
        </div>
    );
}

