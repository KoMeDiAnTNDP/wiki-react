export interface IArticleData {
    title: string;
    extract: string;
    fullurl: string;
}

export interface IQuery {
    query: string;
    lang: string;
    count: number;
}

export interface IWiki {
    articles: IArticleData[];
    requestFailed: boolean;
    isBlack: boolean;
    time: string;
    reset: boolean;
    showInstruction: boolean;
}
