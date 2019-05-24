import React from 'react';

import styles from './fromError.module.css';

export function CountError() {

    return (
        <div className={styles.searchForm__errorCountContainer}>
            <div className={styles.searchForm__errorCount}>
                <span className={styles.error__countText}>
                    Значение должно быть больше 1 и меньше 21
                </span>
            </div>
        </div>
    )
}
