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

        console.log(api);
        return fetch(api)
            .then(response => response.json())
            .then(data => Object.values(data.query.pages))
            .catch(() => {
                throw Error('Error')
            });
    }
}
