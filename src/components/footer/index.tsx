import React from 'react';

import styles from './footer.module.css'

export function Footer() {
    return (
        <footer className={styles.wikiFooter}>
            <div className={styles.contacts}>
                <div className={styles.contactsGit}>
                    <a
                        className={styles.contactsLink}
                        href="https://github.com/KoMeDiAnTNDP/wiki-react"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className={styles.gitIcon} />
                        Source code
                    </a>
                </div>
                <div className="contacts-mail">
                    <a className={styles.contactsLink}
                       href="mailto:nikitachikunov42@gmail.com"
                       target="_blank"
                       rel="noopener noreferrer"
                    >
                        <span className={styles.mailIcon} />
                        Email
                    </a>
                </div>
            </div>
            <div className={styles.wikiApi}>
                <a className={styles.wikiApiLink}
                   href="https://www.mediawiki.org/wiki/API:Search"
                   target="_blank"
                   rel="noopener noreferrer"
                >
                    <span className={styles.wikiApiIcon} />
                    API
                </a>
            </div>
        </footer>
    );
}
