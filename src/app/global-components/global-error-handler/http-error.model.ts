export class HTTPError {
    public error: any;
    public headers: any;
    public message: string;
    public name: string;
    public ok: boolean;
    public status: number;
    public statusText: string;
    public url: any;


    constructor(error: any,
        headers: any,
        message: string,
        name: string,
        ok: boolean,
        status: number,
        statusText: string,
        url: any) {
        this.error = error;
        this.headers = headers;
        this.message = message;
        this.name = name;
        this.ok = ok;
        this.status = status;
        this.statusText = statusText;
        this.url = url;
    }
}
