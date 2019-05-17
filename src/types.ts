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
    query: string;
    articles: IArticleData[];
    requestFailed: boolean;
    isBlack: boolean;
}

export interface ITheme {
    isBlack: boolean;
}