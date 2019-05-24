import React, {ChangeEvent, Component, FormEvent} from 'react';

import {IForm} from "../../types";
import { ImageButton } from "../button";
import { LanguageSelector } from "../languages";
import iconSearch from "../../pic/search.svg";
import iconRefresh from "../../pic/refresh.svg";
import styles from './form.module.css';
import {CountError} from "../formError";

interface IFormProps {
    onSubmit(query: IForm): void;
    onReset(): void;
    disabled: boolean;
}

export class Form extends Component<IFormProps, IForm> {
    state: IForm = {
        query: '',
        lang: 'en',
        count: '10',
        countValid: true,
        languageValid: true
    };

    validField(fieldName: string, value: string) {
        let countValid = this.state.countValid;
        let langValid = this.state.languageValid;

        switch (fieldName) {
            case 'count':
                countValid = Number(value) > 0 && Number(value) <= 20;
                break;
            case 'lang':
                langValid = Form.checkLanguage(value, this.state.lang);
                break;
            default:
                break;
        }

        console.log('langValid', langValid);

        this.setState({
            countValid: countValid,
            languageValid: langValid
        });

        console.log(this.state)
    }

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

    handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({lang: event.target.value});
    };

    handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        this.setState({query: query}, () => this.validField('lang', query));
    };

    handleCountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const count = event.target.validity.valid ? event.target.value : '';
        this.setState({count: count}, () => this.validField('count', count));
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({query: ''});
    };

    handleReset = () => {
        this.props.onReset();
        this.setState({count: ''})
    };

    render() {
        const {query, lang, count, countValid} = this.state;
        const {disabled} = this.props;

        const isDisabled = !query || !countValid;
        const inputTheme = countValid ? styles.searchForm__inputCount : styles.searchForm__inputCount_error;

        return (
            <form className={styles.searchForm} onSubmit={this.handleSubmit} onReset={this.handleReset}>
                <div className={styles.searchForm__formContainer}>
                    <input
                        className={styles.searchForm__inputQuery}
                        type="search" onChange={this.handleQueryChange}
                        placeholder="Введите запрос" value={query === '' ? '' : query}
                    />
                    <div className={styles.searchForm__inputCountContainer}>
                        <input
                            className={inputTheme}
                            type="text" onChange={this.handleCountChange}
                            pattern="[0-9]*" value={count}
                        />
                        {
                            !countValid && <CountError />
                        }
                    </div>
                    <ImageButton type={"submit"} disable={isDisabled} src={iconSearch} alt={"Search"} title={"Найти"}/>
                    <ImageButton type={"reset"} disable={disabled} src={iconRefresh} alt={"Resfresh"} title={"Отчистить"}/>
                    <div className={styles.searchLanguage}>
                        <LanguageSelector onChange={this.handleLanguageChange} lang="en" checked={lang === "en"}/>
                        <LanguageSelector onChange={this.handleLanguageChange} lang="ru" checked={lang === "ru"}/>
                    </div>
                </div>
            </form>
        )
    }
}
