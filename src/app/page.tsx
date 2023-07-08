import CurrencyConverterWrapper from "@/components/CurrencyConverterWrapper";
import {ICurrencyExchangeRate, ICurrencyExchangeResponse, ICurrencyRate} from "@/interfaces";

function mapCurrencyToValue(acceptedCurrencies: ({ value: string; key: string })[], currency: string) {
    return (acceptedCurrencies.find(({key}) => key === currency)?.value) || 'EMPTY';
}

function mapExchangeRateToCurrencyRate(filteredRate: [string, ICurrencyExchangeRate], acceptedCurrencies: ({
    value: string;
    key: string
})[]) {
    const currency = filteredRate[0];
    return ({
        currency: currency,
        value: mapCurrencyToValue(acceptedCurrencies, currency),
        rate: Number(filteredRate[1]) as number
    }) as ICurrencyRate;
}

function filterToAcceptedCurrencies(response: ICurrencyExchangeResponse) {
    const acceptedCurrencies = [
        {key: 'USD', value: 'US Dollars'},
        {key: 'EUR', value: 'Euro'},
        {key: 'INR', value: 'Indian Rupee'},
        {key: 'JPY', value: 'Japanese Yen'}]; // TODO: Avoid filter after better ui

    const rates = response.rates as ICurrencyExchangeRate[];
    return Object.entries(rates)
        .filter(([currency]) => acceptedCurrencies.some(({key}) => key === currency))
        .map((filteredRate) => mapExchangeRateToCurrencyRate(filteredRate, acceptedCurrencies));
}

async function getExchangeRates(): Promise<{ rate: number; currency: string; value: string }[]> {
    const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_RATES_APP_ID}`, {
        next: {
            revalidate: 30
        }
    });

    if (!res.ok) {
        throw new Error('Error in getting latest exchange rate!');
    }

    return filterToAcceptedCurrencies(await res.json() as ICurrencyExchangeResponse);
}


export default async function Home() {
    const data = await getExchangeRates();
    if (!data) {
        return <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p>Service not available</p>
        </main>
    }

    console.log(data);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <CurrencyConverterWrapper rates={data}/>
        </main>
    )
}
