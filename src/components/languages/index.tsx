import React, {ChangeEvent} from "react";
import styles from "./language.module.css";
import cn from "classnames";


interface ILanguageProps {
    onChange(event: ChangeEvent<HTMLInputElement>): void;
    lang: string;
    checked: boolean;
}

export function LanguageSelector({onChange, lang, checked}: ILanguageProps) {
    const iconLangClassName = lang === 'en' ? styles.searchForm__iconEng : styles.searchForm__iconRu;
    const opacityClassName = checked ? cn(styles.searchForm__iconLang_opacity_full, iconLangClassName)
        : iconLangClassName;

    return (
        <label className={opacityClassName} htmlFor={lang}>
            <input
                className={styles.searchForm__radioLang}
                type="radio"
                name="lang"
                id={lang}
                value={lang}
                onChange={onChange}
                checked={checked}
            />
        </label>
    )
}
