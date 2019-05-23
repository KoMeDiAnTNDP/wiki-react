import React, {ChangeEvent, Component, FormEvent} from 'react';

import { IForm } from "../../types";
import { ImageButton } from "../button";
import { LanguageSelector } from "../languages";
import iconSearch from "../../pic/search.svg";
import iconRefresh from "../../pic/refresh.svg";
import styles from './form.module.css';
import {CountErrors} from "../formError";

interface IFormProps {
    onSubmit(query: IForm): void;
    onReset(): void;
    disabled: boolean;
    isBlack: boolean;
}

export class Form extends Component<IFormProps, IForm> {
    state: IForm = {
        query: '',
        lang: 'en',
        count: '10',
        countValid: true,
        languageValid: false
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

        this.setState({
            countValid: countValid,
            languageValid: langValid
        })
    }

    static checkLanguage(query: string, lang: string): boolean {
        switch (lang) {
            case 'en':
                return /[a-zA-z]/.test(query);
            case 'ru':
                return /[а-яА-ЯёЁ]/.test(query);
            default:
                alert("Unsupported language");
                return false;
        }
    };

    static errorClass(error: string): string {
        return error.length === 0 ? '' : 'searchForm__input_error';
    }

    handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({lang: event.target.value});
    };

    handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({query: event.target.value});
    };

    handleCountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const count = event.target.validity.valid ? event.target.value : '';
        this.setState({count: count}, () => this.validField('count', count));
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.validField('lang', this.state.query);
        this.props.onSubmit(this.state);
        this.setState({query: ''});
    };

    handleReset = () => {
        this.props.onReset();
        this.setState({count: ''})
    };

    render() {
        const {query, lang, count, countValid} = this.state;
        const {isBlack, disabled} = this.props;

        const isDisabled = !query || !countValid;
        const tooltipTheme = isBlack ? styles.containerTooltip__tooltip_theme_black : styles.containerTooltip__tooltip;
        const inputTheme = countValid ? styles.searchForm__inputCount : styles.searchForm__inputCount_error;

        return (
            <form className={styles.searchForm} onSubmit={this.handleSubmit} onReset={this.handleReset}>
                <div className={styles.searchForm__errors}>
                    {!countValid && <CountErrors error="count" message={"Значение должно быть больше 0 и меньше 21"}/>}
                </div>
                <div className={styles.searchForm__formContainer}>
                    <input
                        className={styles.searchForm__inputQuery}
                        type="search" onChange={this.handleQueryChange}
                        placeholder="Введите запрос" value={query}
                    />
                    <div className={styles.containerTooltip}>
                        <input
                            className={inputTheme}
                            type="text" onChange={this.handleCountChange}
                            pattern="[0-9]*" value={count}
                        />
                        <div className={tooltipTheme}>
                            <span className={styles.tooltip__text}>Количество статей</span>
                        </div>
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
