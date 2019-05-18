import React from 'react';

import { IArticleData } from "../../types";
import styles from './articles.module.css';

interface IArticlesProps {
    articles: IArticleData[];
    isBlack: boolean;
}

export function Articles({articles, isBlack}: IArticlesProps) {
    if (articles.length === 0) {
        return null;
    }

    const link = isBlack ? styles.titleLinkWhite : styles.titleLink;

    return (
        <div className={styles.container}>
            {
                articles.map((article, index) => {
                    return (
                        <article className={styles.wikiArticle} key={index} >
                            <h3>
                                <a className={link}
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
