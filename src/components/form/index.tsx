import React, {ChangeEvent, Component, FormEvent} from 'react';

import { IQuery } from "../../types";
import { ImageButton } from "../button";
import { LanguageSelector } from "../languages";
import iconSearch from "../../pic/search.svg";
import iconRefresh from "../../pic/refresh.svg";
import styles from './form.module.css'

interface IFormProps {
    onSubmit(query: IQuery): void;
    onReset(): void;
}

export class Form extends Component<IFormProps, IQuery> {
    state: IQuery = {
        query: '',
        lang: 'en'
    };

    handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({lang: event.target.value});
    };

    handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({query: event.target.value});
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
        const {query, lang} = this.state;

        return (
            <form className={styles.searchForm} onSubmit={this.handleSubmit} onReset={this.handleReset}>
                <input className={styles.searchForm__input} type="search" onChange={this.handleQueryChange} />
                <ImageButton type={"submit"} disable={!query} src={iconSearch} alt={"Search"} title={"Найти"}/>
                <ImageButton type={"reset"} disable={false} src={iconRefresh} alt={"Resfresh"} title={"Отчистить"}/>
                <div className={styles.searchLanguage}>
                    <LanguageSelector onChange={this.handleLanguageChange} lang="en" checked={lang === "en"}/>
                    <LanguageSelector onChange={this.handleLanguageChange} lang="ru" checked={lang === "ru"}/>
                </div>
            </form>
        )
    }
}
