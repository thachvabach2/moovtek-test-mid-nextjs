export { }

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface ILogin {
        user: {
            _id: string,
            email: string,
            name: string,
            role: string,
        }
        access_token: string,
    }
}