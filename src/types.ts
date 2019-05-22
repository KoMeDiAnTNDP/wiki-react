export interface IArticleData {
    title: string;
    extract: string;
    fullurl: string;
}

export interface IForm {
    query: string;
    lang: string;
    count: string;
    formErrors: IErrors;
    countValid: boolean;
    languageValid: boolean;
    formValid: boolean;
}

export interface IErrors {
    lang: string;
    count: string;
}

export interface IWiki {
    articles: IArticleData[];
    requestFailed: boolean;
    isBlack: boolean;
    time: string;
    reset: boolean;
    showInstruction: boolean;
}
