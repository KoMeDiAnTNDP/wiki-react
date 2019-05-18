import { IQuery } from "./types";

export class WikiApi {
    query: IQuery = {
        query: '',
        lang: ''
    };

    constructor(query: IQuery) {
        this.query.lang = query.lang;
        this.query.query = query.query;
    }

    getWikiData() {
        const api: string = `https://${this.query.lang}.wikipedia.org/w/api.php?` +
            `action=query&format=json&origin=*&prop=extracts|info&generator=search&` +
            `utf8=1&exsentences=2&exlimit=10&exintro=1&explaintext=1&inprop=url&` +
            `gsrsearch=${this.query.query}&gsrnamespace=0&gsrlimit=10`;

        return fetch(api)
            .then(response => response.json())
            .then(data => {
                if (!data.hasOwnProperty('query')) {
                    const url: string = `https://${this.query.lang}.wikipedia.org/wiki/${this.query.query}`;
                    return [{title: this.query.query, extract: 'There are no such pages', fullurl: url}]
                }

                return Object.values(data.query.pages)
            });
    }
}
