import { IQuery } from "./types";

export class WikiApi {
    lang: string = '';
    query: string = '';
    count: number = 0;

    constructor(query: IQuery) {
        this.lang = query.lang;
        this.query = query.query;
        this.count = query.count === 0 ? 10 : query.count;
    }

    getWikiData() {
        const api: string = `https://${this.lang}.wikipedia.org/w/api.php?` +
            `action=query&format=json&origin=*&prop=extracts|info&generator=search&` +
            `utf8=1&exsentences=2&exlimit=${this.count}&exintro=1&explaintext=1&inprop=url&` +
            `gsrsearch=${this.query}&gsrnamespace=0&gsrlimit=${this.count}`;

        return fetch(api)
            .then(response => response.json())
            .then(data => {
                if (!data.hasOwnProperty('query')) {
                    const url: string = `https://${this.lang}.wikipedia.org/wiki/${this.query}`;
                    return [{title: this.query, extract: 'There are no such pages', fullurl: url}]
                }

                return Object.values(data.query.pages)
            });
    }
}
