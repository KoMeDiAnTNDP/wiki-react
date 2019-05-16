import React, { Component } from 'react';

import './App.css';
import Form from "./components/form";
import Articles from "./components/articles";
import {IWiki, API, IQuery} from "./types";
import Footer from "./components/footer";


export default class App extends Component {
    state: IWiki = {
        query: '',
        articles: [],
        requestFailed: false
    };

    handleSubmit = (query: IQuery) => {
        fetch(`${API}${query.query}`)
            .then(response => response.json())
            .then(data => this.setState({
                query: query.query,
                articles: data.query.search
            }))
            .catch(() => this.setState({requestFailed: true}))
    };

    handelReset = () => {
        this.setState({
            query: '',
            articles: []
        })
    };

    render() {
        return (
            <div className="Wiki-searcher">
                <header className="Wiki-head">
                    <h1 className="head__title">Wiki Searcher</h1>
                </header>
                <Form onSubmit={this.handleSubmit} onReset={this.handelReset} />
                <Articles articles={this.state.articles} />
                <Footer/>
            </div>
        )
    }
}
