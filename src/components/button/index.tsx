import React from 'react';
import styles from './button.module.css';

interface IImageButtonProps {
    type: string;
    disable: boolean;
    src: string;
    alt: string;
    title: string
}

export function ImageButton({type, disable, src, alt, title}: IImageButtonProps) {
    return (
        <button className={styles.searchForm__button}
                disabled={disable}
                type={type === 'submit' ? "submit" : "reset"}
        >
            <img className={styles.searchFrom__buttonIcon} src={src} alt={alt} title={title}/>
        </button>
    )
}
