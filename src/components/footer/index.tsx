import React from 'react';

import './index.css'

export default function Footer() {
    return (
        <footer className="Wiki-footer">
            <div className="contacts">
                <div className="contacts-git">
                    <a
                        className="contacts__link"
                        href="https://github.com/KoMeDiAnTNDP/wiki-react"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="contacts__icon git__icon" />
                        Source code
                    </a>
                </div>
                <div className="contacts-mail">
                    <a className="contacts__link"
                       href="mailto:nikitachikunov42@gmail.com"
                       target="_blank"
                       rel="noopener noreferrer"
                    >
                        <span className="contacts__icon mail__icon" />
                        Email
                    </a>
                </div>
            </div>
            <div className="wiki-api">
                <a className="wiki-api__link"
                   href="https://www.mediawiki.org/wiki/API:Search"
                   target="_blank"
                   rel="noopener noreferrer"
                >
                    <span className="wiki-api__icon" />
                    API
                </a>
            </div>
        </footer>
    );
}
