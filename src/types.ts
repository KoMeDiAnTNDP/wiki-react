export interface IArticleData {
    title: string;
    extract: string;
    fullurl: string;
}

export interface IForm {
    query: string;
    lang: string;
    count: string;
    countValid: boolean;
    languageValid: boolean;
}

export interface IErrors {
    isClose: boolean;
}

export interface IWiki {
    articles: IArticleData[];
    requestFailed: boolean;
    isBlack: boolean;
    time: string;
    reset: boolean;
    showInstruction: boolean;
    showModal: boolean;
}
