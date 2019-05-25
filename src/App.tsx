import React, {Component} from 'react';

import styles from './app.module.css';
import { Form } from "./components/form";
import { Instruction } from "./components/instruction";
import { ModalError } from "./components/modalWindow";
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
        showInstruction: true,
        showModal: false
    };

    handleFormSubmit = (query: IForm) => {
        const start = new Date().getTime() / 1000;
        const wikiApi = new WikiApi(query).getWikiData();
        const end = new Date().getTime() / 1000;
        const data = `${query.query}: ${(end - start).toFixed(3)} ${new Date()}`;
        localStorage.setItem(query.query, data);

        this.setState({time: (end - start).toFixed(3), showModal: !App.checkLanguage(query.query, query.lang) });

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

    static checkLanguage(query: string, lang: string): boolean {
        switch (lang) {
            case 'en':
                return /[a-zA-z]/.test(query);
            case 'ru':
                return /[а-яА-ЯёЁ]/.test(query);
            default:
                return false;
        }
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
        const {articles, requestFailed, isBlack, time, reset, showInstruction, showModal} = this.state;

        const themeClassName = isBlack ? styles.wikiSearcher_theme_black : styles.wikiSearcher;
        const headClassName = isBlack ? styles.headContainer_theme_black : styles.headContainer;
        const titleClassName = isBlack ? styles.head__title_theme_black : styles.head__title;
        const hintClassName = isBlack ? styles.function__hint_theme_black : styles.function__hint;
        const moonClassName = isBlack ? styles.moonColor : styles.moon;

        return (
            <div className={themeClassName}>
                <div className={headClassName}>
                    <header className={styles.head}>
                        <h1 className={titleClassName}>Wiki Searcher</h1>
                    </header>
                    <div className={styles.function}>
                        <div className={hintClassName} title="Подсказка" onClick={this.handleInstructionClick}/>
                        <div className={moonClassName} title="Тема" onClick={this.handleThemeClick} />
                    </div>
                    <Form
                        onSubmit={this.handleFormSubmit}
                        onReset={this.handleReset}
                        disabled={articles.length === 0}
                    />
                </div>
                {showModal && <ModalError onClose={this.handleCloseModel}/>}
                {showInstruction && <Instruction onClick={this.handleInstructionClick}/>}
                {
                    !requestFailed ? !showModal &&
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
