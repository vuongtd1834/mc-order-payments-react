declare namespace ErrorModel {
    export interface IError {
        status: number;
        message?: string | Array<string>;
        error?: string;
    }
}

export { ErrorModel };
