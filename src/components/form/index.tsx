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
        countValid: true
    };

    validCount(value: string) {
        this.setState({
            countValid: Number(value) > 0 && Number(value) <= 20
        });
    }

    static checkNumber(number:string): boolean {
        if (number.length === 1) {
            return true;
        }

        return number[0] !== '0';
    }

    handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const lang = event.target.value;
        this.setState({lang: lang});
    };

    handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        this.setState({query: query});
    };

    handleCountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const count = event.target.validity.valid && Form.checkNumber(event.target.value) ? event.target.value : '';
        this.setState({count: count}, () => this.validCount(count));
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    };

    handleReset = () => {
        this.props.onReset();
        this.setState({count: '10'})
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
                        type="text" onChange={this.handleQueryChange}
                        placeholder="Введите запрос" value={query}
                    />
                    <div className={styles.searchForm__inputCountContainer}>
                        <input
                            className={inputTheme}
                            type="text" onChange={this.handleCountChange}
                            pattern="^\d*$" value={count}
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
