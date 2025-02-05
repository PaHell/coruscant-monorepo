export abstract class ClientBase {
    protected transformOptions(options: RequestInit): Promise<RequestInit> {
        options.credentials = "include";
        return Promise.resolve(options);
    }

    protected transformResult(url: string, response: Response, processor: (response: Response) => Promise<any>): Promise<any> {
        return processor(response);
    }
}