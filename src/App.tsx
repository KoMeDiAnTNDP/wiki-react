import React, {Component} from 'react';

import cn from 'classnames';

import styles from './app.module.css';
import { Form } from "./components/form";
import { Instruction } from "./components/instruction";
import { Footer } from "./components/footer";
import { IWiki,  IForm } from "./types";
import { WikiApi } from './api';
import { Result } from "./components/result";


export default class App extends Component {
    state: IWiki = {
        articles: [],
        requestFailed: false,
        isBlack: false,
        time: '',
        reset: false,
        showInstruction: true
    };

    handleFormSubmit = (query: IForm) => {
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
        }).catch(() => this.setState({requestFailed: true}))
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

    handleInstructionClick = () => {
        this.setState({showInstruction: !this.state.showInstruction})
    };

    handleCloseModel = () => {
        this.setState({showModal: true}, () =>
            setTimeout(() => {
                this.setState({showModal: false})
            }, 400));
    };

    render() {
        const {articles, requestFailed, isBlack, time, reset, showInstruction} = this.state;
        const appClassName = showInstruction ? styles.wikiSearcher_scroll : styles.wikiSearcher;
        const themeClassName = isBlack ? cn(styles.wikiSearcher_theme_black, appClassName) : appClassName;
        const headClassName = isBlack ? styles.headContainer_theme_black : styles.headContainer;
        const titleClassName = isBlack ? styles.head__title_theme_black : styles.head__title;
        const hintClassName = isBlack ? styles.hint_theme_black : styles.hint;
        const moonClassName = isBlack ? styles.moonColor : styles.moon;

        return (
            <div className={themeClassName}>
                <div className={headClassName}>
                    <header className={styles.head}>
                        <h1 className={titleClassName}>Wiki Searcher</h1>
                    </header>
                    <div className={hintClassName} title="Подсказка" onClick={this.handleInstructionClick}/>
                    <div className={moonClassName} title="Тема" onClick={this.handleThemeClick} />
                    <Form
                        onSubmit={this.handleFormSubmit}
                        onReset={this.handleReset}
                        disabled={articles.length === 0}
                    />
                </div>
                {showInstruction && <Instruction onClick={this.handleInstructionClick}/>}
                {
                    !requestFailed ?
                        <Result
                            articles={articles}
                            isBlack={isBlack}
                            reset={reset}
                            time={time}
                        /> : <h1>Failed</h1>
                }
                <Footer isBlack={isBlack}/>
            </div>
        )
    }
}
