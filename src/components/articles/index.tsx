import React from 'react';

import { IArticleData } from "../../types";
import styles from './articles.module.css';

interface IArticlesProps {
    articles: IArticleData[];
    isBlack: boolean;
    reset: boolean;
    time: string;
}

export function Articles({articles, isBlack, reset, time}: IArticlesProps) {
    if (articles.length === 0) {
        return null;
    }

    const articlesClassName = reset ? styles.articles_reset : styles.articles;
    const linkClassName = isBlack ? styles.article__titleLink_color_white : styles.article__titleLink;

    return (
        <div className={articlesClassName}>
            {
                articles.map((article, index) => {
                    return (
                        <article className={styles.article} key={index} >
                            <h3>
                                <a className={linkClassName}
                                   href={article.fullurl}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                >
                                    {article.title}
                                </a>
                            </h3>
                            <span>{article.extract}</span>
                        </article>
                    )
                })
            }
        </div>
    )
}
