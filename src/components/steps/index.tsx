import React from 'react';

import cn from 'classnames';

import styles from './steps.module.css';
import resetIcon from '../../pic/refresh.svg';
import searchIcon from '../../pic/search.svg';

export function Plan() {
    const requiredText = cn(styles.plan__text_required, styles.plan__text);
    const optionalText = cn(styles.plan__text_optional, styles.plan__text);
    const requiredDash = cn(styles.plan__text_required, styles.plan__dash);
    const optionalDash = cn(styles.plan__text_optional, styles.plan__dash);

    return (
        <div className={styles.instruction__plan}>
            <div className={styles.plan__item}>
                <div className={styles.plan__languagesIcons}>
                    <span className={styles.plan__enIcon}/>
                    <span className={styles.plan__ruIcon}/>
                </div>
                <span className={requiredDash}>&mdash; </span>
                <span className={requiredText}>
                    Выберите язык Википедии
                </span>
            </div>
            <div className={styles.plan__item}>
                <input
                    className={styles.plan__inputQuery}
                    placeholder="Введите запрос"
                    disabled
                />
                <span className={requiredText}>&mdash; </span>
                <span className={requiredText}>Введите ваш запрос</span>
            </div>
            <div className={styles.plan__item}>
                <button className={styles.plan__button} disabled>
                    <img className={styles.button__icon} src={searchIcon} alt="Search" title="Найти"/>
                </button>
                <span className={requiredDash}>&mdash; </span>
                <span className={requiredText}>Поиск по выашему запросу</span>
            </div>
            <div className={styles.plan__item}>
                <input className={styles.plan__inputCount} value="10" disabled/>
                <span className={optionalDash}>&mdash; </span>
                <span className={optionalText}>
                    Введите нужное количество статей (не больше 20)
                </span>
            </div>
            <div className={styles.plan__item}>
                <button className={styles.plan__button} disabled>
                    <img className={styles.button__icon} src={resetIcon} alt="Reset" title="Отчистить"/>
                </button>
                <span className={optionalDash}>&mdash; </span>
                <span className={optionalText}>Убрать найденные статьи</span>
            </div>
            <div className={styles.plan__item}>
                <div className={styles.plan__functions}>
                    <span className={styles.plan__hint}/>
                    <span className={styles.plan__theme}/>
                </div>
                <span className={optionalDash}>&mdash; </span>
                <span className={optionalText}>
                    Показать подсказку и сменить тему соотвественно
                </span>
            </div>
        </div>
    )
}
