import { IForm } from "./types";

export class WikiApi {
    query: string = '';
    count: string = '';

    constructor(query: IForm) {
        this.query = query.query;
        this.count = query.count;
    }

    getWikiData() {
        const number = Number(this.count);
        const count = number % 2 === 0 ? number : (number + 1) / 2;
        const apiRu: string = `https://ru.wikipedia.org/w/api.php?` +
            `action=query&format=json&origin=*&prop=extracts|info&generator=search&` +
            `utf8=1&exsentences=4&exlimit=${count}&exintro=1&explaintext=1&inprop=url&` +
            `gsrsearch=${this.query}&gsrnamespace=0&gsrlimit=${count}`;

        return fetch(apiRu)
            .then(response => response.json())
            .then(data => {
                if (!data.hasOwnProperty('query')) {
                    return [{title: this.query, extract: 'По вашему запросу ничего не найдено', fullurl: ''}]
                }

                return Object.values(data.query.pages)
            });
    }
}
