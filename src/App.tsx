import React, {Component} from 'react';

import styles from './app.module.css';
import { Form } from "./components/form";
import { Articles } from "./components/articles";
import { Footer } from "./components/footer";
import { IWiki,  IQuery } from "./types";
import { WikiApi } from './api';


export default class App extends Component {
    state: IWiki = {
        articles: [],
        requestFailed: false,
        isBlack: false,
        time: ''
    };

    handleFormSubmit = (query: IQuery) => {
        const start = new Date().getTime() / 1000;
        const wikiApi = new WikiApi(query).getWikiData();
        const end = new Date().getTime() / 1000;
        const data = `${query.query}: ${(end - start).toFixed(3)} ${new Date()}`;
        localStorage.setItem(query.query, data);

        this.setState({time: (end - start).toFixed(3)});

        wikiApi.then(articles => this.setState({
                query: query.query,
                articles: articles
            }))
            .catch(() => this.setState({requestFailed: true}))
    };

    handleReset = () => {
        this.setState({
            articles: [],
            time: ''
        })
    };

    handleThemeClick = () => {
        this.setState({isBlack: !this.state.isBlack});
    };

    render() {
        const {articles, requestFailed, isBlack, time} = this.state;

        const moon = isBlack ? styles.moonColor : styles.moon;
        const theme =  isBlack ? styles.wikiSearcher_theme_black: styles.wikiSearcher;

        return (
            <div className={theme}>
                <header className={styles.head}>
                    <h1>Wiki Searcher</h1>
                </header>
                <div className={moon} onClick={this.handleThemeClick} />
                <Form onSubmit={this.handleFormSubmit} onReset={this.handleReset} disabled={articles.length === 0}/>
                {
                    time && <span className={styles.time}>Время запроса: {time}сек</span>
                }
                {
                    !requestFailed ? <Articles articles={articles} isBlack={isBlack}/> : <h1>Failed</h1>
                }
                <Footer/>
            </div>
        )
    }
}
