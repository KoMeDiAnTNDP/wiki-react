import React from 'react';

import styles from './footer.module.css'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.contacts}>
                <div className={styles.contacts__git}>
                    <a
                        className={styles.contacts__link}
                        href="https://github.com/KoMeDiAnTNDP/wiki-react"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className={styles.contacts__gitIcon} />
                        Source code
                    </a>
                </div>
                <div className="contacts__mail">
                    <a className={styles.contacts__link}
                       href="mailto:nikitachikunov42@gmail.com"
                       target="_blank"
                       rel="noopener noreferrer"
                    >
                        <span className={styles.contacts__mailIcon} />
                        Email
                    </a>
                </div>
            </div>
            <div className={styles.wikiApi}>
                <a className={styles.wikiApi__link}
                   href="https://www.mediawiki.org/wiki/API:Search"
                   target="_blank"
                   rel="noopener noreferrer"
                >
                    <span className={styles.wikiApi__icon} />
                    API
                </a>
            </div>
        </footer>
    );
}
