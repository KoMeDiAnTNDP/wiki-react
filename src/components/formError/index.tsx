import React from 'react';

import styles from './fromError.module.css';

export function CountError() {

    return (
        <div className={styles.searchForm__errorCount}>
            <span className={styles.error__countText}>
                Значение должно быть не более 20
            </span>
        </div>
    )
}
