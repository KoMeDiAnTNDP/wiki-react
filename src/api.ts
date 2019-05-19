import { IQuery } from "./types";

export class WikiApi {
    query: IQuery = {
        query: '',
        lang: '',
        count: 0
    };

    constructor(query: IQuery) {
        this.query.lang = query.lang;
        this.query.query = query.query;
        this.query.count = query.count === 0 ? 10 : query.count;
    }

    getWikiData() {
        const api: string = `https://${this.query.lang}.wikipedia.org/w/api.php?` +
            `action=query&format=json&origin=*&prop=extracts|info&generator=search&` +
            `utf8=1&exsentences=2&exlimit=${this.query.count}&exintro=1&explaintext=1&inprop=url&` +
            `gsrsearch=${this.query.query}&gsrnamespace=0&gsrlimit=${this.query.count}`;

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
