export interface IArticleData {
    title: string;
    extract: string;
    fullurl: string;
}

export interface IForm {
    query: string;
    count: string;
    countValid: boolean;
}

export interface IWiki {
    articles: IArticleData[];
    requestFailed: boolean;
    isBlack: boolean;
    time: string;
    reset: boolean;
    showInstruction: boolean;
}
