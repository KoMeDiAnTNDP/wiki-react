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

    handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({lang: event.target.value});
    };

    handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({query: event.target.value});
    };

    handleCountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const count = event.target.validity.valid ? Number(event.target.value) : 0;
        this.setState({count: count})
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({query: ''});
    };

    handleReset = () => {
        this.props.onReset();
    };

    render() {
        const {query, lang, count} = this.state;
        const isDisabled = !query || (count < 0 || count > 20);
        const curCount = count === 0 ? '' : count;

        return (
            <form className={styles.searchForm} onSubmit={this.handleSubmit} onReset={this.handleReset}>
                <input
                    className={styles.searchForm__inputQuery}
                    type="search" onChange={this.handleQueryChange}
                    placeholder="Ваш запрос"
                />
                <div className={styles.containerTooltip}>
                    <input
                        className={styles.searchForm__inputCount}
                        type="text" onChange={this.handleCountChange}
                        pattern="[0-9]*" value={curCount}
                    />
                    <span className={styles.containerTooltip__tooltip}>Количество статей</span>
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
