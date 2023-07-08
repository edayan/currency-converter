export interface ICurrencyExchangeResponse {
    "base": string;
    "rates": ICurrencyExchangeRate[]
}
export interface ICurrencyExchangeRate {
    [key:string]: number
}

export interface ICurrencyRate {
    currency: string;
    rate: number;
    value: string;
}

export interface IConvertedData {
    source: string,
    target: string,
    total: number,
    amount: number,
}
