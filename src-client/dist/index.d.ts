declare abstract class ClientBase {
    protected transformOptions(options: RequestInit): Promise<RequestInit>;
    protected transformResult(url: string, response: Response, processor: (response: Response) => Promise<any>): Promise<any>;
}
interface IWeatherForecastClient {
    get(): Promise<WeatherForecast[]>;
}
declare class WeatherForecastClient extends ClientBase implements IWeatherForecastClient {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    get(): Promise<WeatherForecast[]>;
    protected processGet(response: Response): Promise<WeatherForecast[]>;
}
interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string | null;
}
declare class ApiException extends Error {
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

declare enum Theme {
    Light = 0,
    Dark = 1,
    OperatingSystem = 2
}

export { ApiException, ClientBase, type IWeatherForecastClient, Theme, type WeatherForecast, WeatherForecastClient };
//# sourceMappingURL=index.d.ts.map
