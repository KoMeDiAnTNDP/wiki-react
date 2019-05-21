import React, {ChangeEvent, Component, FormEvent} from 'react';

import { IQuery } from "../../types";
import { ImageButton } from "../button";
import { LanguageSelector } from "../languages";
import iconSearch from "../../pic/search.svg";
import iconRefresh from "../../pic/refresh.svg";
import styles from './form.module.css';

interface IFormProps {
    onSubmit(query: IQuery): void;
    onReset(): void;
    disabled: boolean;
}

export class Form extends Component<IFormProps, IQuery> {
    state: IQuery = {
        query: '',
        lang: 'en',
        count: 0
    };

    checkLanguage = (query: string, lang: string): boolean => {
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

    handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({lang: event.target.value});
    };

    handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({query: event.target.value});
    };

    handleCountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const count = event.target.validity.valid ? Number(event.target.value) : 0;

        if (count > 20) {
            alert("Count of articles can not be more than 20");
            this.setState({count: 0});
        } else {
            this.setState({count: count})
        }
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!this.checkLanguage(this.state.query, this.state.lang)) {
            alert('The selected language does not match the entered one, you may not find what you are looking for.')
        }

        this.props.onSubmit(this.state);
        this.setState({query: ''});
    };

    handleReset = () => {
        this.props.onReset();
    };

    render() {
        const {query, lang, count} = this.state;
        const validCount = count < 0 || count > 20;
        const isDisabled = !query || validCount;
        const curCount = count === 0 ? '' : count;

        return (
            <form className={styles.searchForm} onSubmit={this.handleSubmit} onReset={this.handleReset}>
                <input
                    className={styles.searchForm__inputQuery}
                    type="search" onChange={this.handleQueryChange}
                    placeholder="Введите запрос"
                />
                <div className={styles.containerTooltip}>
                    <input
                        className={styles.searchForm__inputCount}
                        type="text" onChange={this.handleCountChange}
                        pattern="[0-9]*" value={curCount === '' ? 10 : curCount}
                    />
                    <div className={styles.containerTooltip__tooltip}>
                        <span className={styles.tooltip__text}>Количество статей</span>
                    </div>
                </div>
                <ImageButton type={"submit"} disable={isDisabled} src={iconSearch} alt={"Search"} title={"Найти"}/>
                <ImageButton type={"reset"} disable={this.props.disabled} src={iconRefresh} alt={"Resfresh"} title={"Отчистить"}/>
                <div className={styles.searchLanguage}>
                    <LanguageSelector onChange={this.handleLanguageChange} lang="en" checked={lang === "en"}/>
                    <LanguageSelector onChange={this.handleLanguageChange} lang="ru" checked={lang === "ru"}/>
                </div>
            </form>
        )
    }
}
