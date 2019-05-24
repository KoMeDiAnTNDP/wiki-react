import React from 'react';

import styles from './result.module.css';
import {IArticleData} from "../../types";
import {Articles} from "../articles";

interface IResult {
    articles: IArticleData[];
    isBlack: boolean;
    reset: boolean;
    time: string;
}

export function Result({articles, isBlack, reset, time}: IResult) {
    if (articles.length === 0) {
        return null;
    }

    const timeClassName = reset ? styles.searchResult__time_reset : styles.searchResult__time;
    const fadingClassName = isBlack ? styles.searchResult__fading_theme_black : styles.searchResult__fading;

    return (
        <div className={styles.searchResult}>
            {
                time && <span className={timeClassName}>Время запроса: {time}сек</span>
            }
            <div className={fadingClassName}/>
            <Articles articles={articles} isBlack={isBlack} reset={reset}/>
        </div>
    )
}
