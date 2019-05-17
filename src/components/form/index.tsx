import React, {ChangeEvent, Component, FormEvent} from 'react';
import cn from 'classnames';

import { IQuery } from "../../types";
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

    handelLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        return (
            <form className={styles.form} onSubmit={this.handleSubmit} onReset={this.handleReset}>
                <input className={styles.input} type="search" onChange={this.handleQueryChange} />
                <button className={styles.button} disabled={!this.state.query} type="submit">
                    <img className={styles.buttonIcon} src={iconSearch} alt="Search" title="Найти" />
                </button>
                <button className={styles.button} type="reset">
                    <img className={styles.buttonIcon} src={iconRefresh} alt="Refresh" title="Отчистить" />
                </button>
                <div className={styles.searchLanguage}>
                    <input
                        className={styles.radioLang}
                        type="radio"
                        name="lang"
                        id="en"
                        value="en"
                        onChange={this.handelLanguageChange}
                        checked={this.state.lang === 'en'}
                    />
                    <label className={cn(styles.labelLang, styles.iconEng)} htmlFor="en" />
                    <input
                        className={styles.radioLang}
                        type="radio"
                        name="lang"
                        id="ru"
                        value="ru"
                        onChange={this.handelLanguageChange}
                        checked={this.state.lang === 'ru'}
                    />
                    <label className={cn(styles.labelLang, styles.iconRu)} htmlFor="ru" />
                </div>
            </form>
        )
    }
}
