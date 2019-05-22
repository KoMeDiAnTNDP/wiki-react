export interface IArticleData {
    title: string;
    extract: string;
    fullurl: string;
}

export interface IQuery {
    query: string;
    lang: string;
    count: number;
    countValid: boolean;
    languageValid: boolean;
    formValid: boolean;
}

export interface IWiki {
    articles: IArticleData[];
    requestFailed: boolean;
    isBlack: boolean;
    time: string;
    reset: boolean;
    showInstruction: boolean;
}
