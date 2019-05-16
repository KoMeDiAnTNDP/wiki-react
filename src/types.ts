export interface IArticleData {
    title: string;
    snippet: string;
}

export interface IQuery {
    query: string;
}
export interface IWiki {
    query: string;
    articles: IArticleData[];
    requestFailed: boolean;
}

export const API = `https://en.wikipedia.org/w/` +
    `api.php?action=query&list=search&` +
    `utf8=&format=json&origin=*&srlimit=20&srsearch=`;
