import React from 'react';

import { IArticleData } from "../../types";
import styles from './articles.module.css';

interface IArticlesProps {
    articles: IArticleData[];
    isBlack: boolean;
    reset: boolean;
}

export function Articles({articles, isBlack, reset}: IArticlesProps) {
    if (articles.length === 0) {
        return null;
    }

    const articlesClassName = reset ? styles.articlesContainer_reset : styles.articlesContainer;
    const linkClassName = isBlack ? styles.article__titleLink_color_white : styles.article__titleLink;

    return (
        <div className={articlesClassName}>
            <div className={styles.articles}>
                {
                    articles.map((article, index) => {
                        const articleClassName = index === 0 ? styles.article_first : styles.article;

                        return (
                            <article className={articleClassName} key={index} >
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
        </div>
    )
}
