import React, {ChangeEvent, Component, FormEvent} from 'react';

import { IQuery } from "../../types";
import iconSearch from "../../pic/search.svg";
import iconRefresh from "../../pic/refresh.svg";
import './index.css'

interface IFormProps {
    onSubmit(query: IQuery): void;
    onReset(): void;
}

export default class Form extends Component<IFormProps, IQuery> {
    state: IQuery = {
        query: ''
    };

    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({query: event.target.value});
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({query: ''});
    };

    handleReset = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onReset();
    };

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit} onReset={this.handleReset}>
                <input className="form__input" onChange={this.handleInputChange} />
                <button className="form__button" disabled={!this.state.query} type="submit">
                    <img className="form__button-icon" src={iconSearch} alt="Search" title="Найти" />
                </button>
                <button className="form__button" type="reset">
                    <img className="form__button-icon" src={iconRefresh} alt="Refresh" title="Отчистить" />
                </button>
            </form>
        )
    }
}
