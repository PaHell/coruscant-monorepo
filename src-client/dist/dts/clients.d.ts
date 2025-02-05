export declare abstract class ClientBase {
    protected transformOptions(options: RequestInit): Promise<RequestInit>;
    protected transformResult(url: string, response: Response, processor: (response: Response) => Promise<any>): Promise<any>;
}
export interface IWeatherForecastClient {
    get(): Promise<WeatherForecast[]>;
}
export declare class WeatherForecastClient extends ClientBase implements IWeatherForecastClient {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    get(): Promise<WeatherForecast[]>;
    protected processGet(response: Response): Promise<WeatherForecast[]>;
}
export interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string | null;
}
export declare class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: {
        [key: string]: any;
    };
    result: any;
    constructor(message: string, status: number, response: string, headers: {
        [key: string]: any;
    }, result: any);
    protected isApiException: boolean;
    static isApiException(obj: any): obj is ApiException;
}
//# sourceMappingURL=clients.d.ts.map