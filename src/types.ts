export interface IArticleData {
    title: string;
    extract: string;
    fullurl: string;
}

export interface IQuery {
    query: string;
    lang: string;
}

export interface IWiki {
    articles: IArticleData[];
    requestFailed: boolean;
    isBlack: boolean;
}
