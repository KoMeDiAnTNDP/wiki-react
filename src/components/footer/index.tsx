import React from 'react';

import styles from './footer.module.css'

import cn from 'classnames';

interface IFooter {
    isBlack: boolean;
    isZero: boolean;
}

export function Footer({isBlack, isZero}: IFooter) {
    const footer = isZero ? styles.footer_count_null : styles.footer;
    const footerTheme = isBlack ? cn(styles.footer_theme_black, footer) : footer;
    const contactsLinkTheme = isBlack ? styles.contacts__link_theme_black : styles.contacts__link;
    const wikiLinkTheme = isBlack ? styles.wikiApi__link_theme_black : styles.wikiApi__link;
    const iconGitTheme = isBlack ? styles.contacts__gitIcon_theme_black : styles.contacts__gitIcon;

    return (
        <footer className={footerTheme}>
            <div className={styles.contacts}>
                <div className={styles.contacts__git}>
                    <a
                        className={contactsLinkTheme}
                        href="https://github.com/KoMeDiAnTNDP/wiki-react"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className={iconGitTheme} />
                        Source code
                    </a>
                </div>
                <div className="contacts__mail">
                    <a className={contactsLinkTheme}
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
                <a className={wikiLinkTheme}
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
