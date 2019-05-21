import React, {Component} from 'react';

import styles from './app.module.css';
import { Form } from "./components/form";
import { Footer } from "./components/footer";
import { IWiki,  IQuery } from "./types";
import { WikiApi } from './api';
import {Result} from "./components/result";


export default class App extends Component {
    state: IWiki = {
        articles: [],
        requestFailed: false,
        isBlack: false,
        time: '',
        reset: false
    };

    handleFormSubmit = (query: IQuery) => {
        const start = new Date().getTime() / 1000;
        const wikiApi = new WikiApi(query).getWikiData();
        const end = new Date().getTime() / 1000;
        const data = `${query.query}: ${(end - start).toFixed(3)} ${new Date()}`;
        localStorage.setItem(query.query, data);

        this.setState({time: (end - start).toFixed(3)});

        wikiApi.then(articles =>
        {
            if (this.state.articles.length !== 0) {
                this.setState({articles: []});
            }

            this.setState({
                query: query.query,
                articles: articles
            })
        })
            .catch(() => this.setState({requestFailed: true}))
    };

    handleReset = () => {
        this.setState({
            reset: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    articles: [],
                    time: '',
                    reset: false
                })}, 400)
        })
    };

    handleThemeClick = () => {
        this.setState({isBlack: !this.state.isBlack});

    };

    render() {
        const {articles, requestFailed, isBlack, time, reset} = this.state;

        const moonClassName = isBlack ? styles.moonColor : styles.moon;
        const themeClassName =  isBlack ? styles.wikiSearcher_theme_black: styles.wikiSearcher;

        return (
            <div className={themeClassName}>
                <header className={styles.head}>
                    <h1 className={styles.head__title}>Wiki Searcher</h1>
                </header>
                <div className={moonClassName} onClick={this.handleThemeClick} />
                <Form onSubmit={this.handleFormSubmit} onReset={this.handleReset} disabled={articles.length === 0}/>
                {
                    !requestFailed ? <Result articles={articles} isBlack={isBlack} reset={reset} time={time}/> : <h1>Failed</h1>
                }
                <Footer/>
            </div>
        )
    }
}
