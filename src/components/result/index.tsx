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
    const theme = isBlack ? styles.searchResult_theme_black : styles.searchResult;
    const timeClassName = reset ? styles.searchResult__time_reset : styles.searchResult__time;

    return (
        <div className={theme}>
            {
                time && <span className={timeClassName}>Время запроса: {time}сек</span>
            }
            <Articles articles={articles} isBlack={isBlack} reset={reset}/>
        </div>
    )
}
