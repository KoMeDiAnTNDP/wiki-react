import React, {Component} from 'react';

import styles from './app.module.css';
import { Form } from "./components/form";
import { Articles } from "./components/articles";
import { Footer } from "./components/footer";
import { IWiki,  IQuery } from "./types";
import { WikiApi } from './api';


export default class App extends Component {
    state: IWiki = {
        query: '',
        articles: [],
        requestFailed: false,
        isBlack: false
    };

    handleFormSubmit = (query: IQuery) => {
        const wikiApi = new WikiApi(query);

        wikiApi.getWikiData()
            .then(articles => this.setState({
                query: query.query,
                articles: articles
            }))
            .catch(() => this.setState({requestFailed: true}))
    };

    handleReset = () => {
        this.setState({
            query: '',
            articles: []
        })
    };

    handleThemeClick = () => {
        this.setState({isBlack: !this.state.isBlack});
    };

    render() {
        const theme = this.state.isBlack ? styles.blackTheme : styles.theme;

        if (this.state.isBlack) {
            document.body.classList.add('black-theme');
        }
        else {
            document.body.classList.remove('black-theme');
        }

        return (
            <div className={styles.wikiSearcher}>
                <header className={styles.wikiHead}>
                    <h1>Wiki Searcher</h1>
                </header>
                <div className={theme} onClick={this.handleThemeClick} />
                <Form onSubmit={this.handleFormSubmit} onReset={this.handleReset}/>
                <Articles articles={this.state.articles} isBlack={this.state.isBlack}/>
                <Footer/>
            </div>
        )
    }
}
