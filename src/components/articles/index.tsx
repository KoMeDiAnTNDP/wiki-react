import React, { createRef } from 'react';

import { IArticleData } from "../../types";
import './index.css'

interface IArticlesProps {
    articles: IArticleData[];
}

export default function Articles({articles}: IArticlesProps) {
    const containerRef = createRef<HTMLDivElement>();

    return (
        <div className="container" ref={containerRef}>
            {
                articles.map((article, index) => {
                    const url = `https://en.wikipedia.org/wiki/${article.title}`;

                    return (
                        <article className="wiki-article" key={index} >
                            <h3 className="article__title">
                                <a className="article__title-link" href={url} target="_blank" rel="noopener noreferrer">
                                    {article.title}
                                </a>
                            </h3>
                            <span className="article__snippet" dangerouslySetInnerHTML={{__html: article.snippet}} />
                        </article>
                    )
                })
            }
        </div>
    )
}
