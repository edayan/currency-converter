import CurrencyConverterWrapper from "@/components/CurrencyConverterWrapper";
import {ICurrencyExchangeRate, ICurrencyExchangeResponse, ICurrencyRate} from "@/interfaces";
import {acceptedCurrencies} from "@/data/constants";

function mapCurrencyToValue(acceptedCurrencies: ({ value: string; key: string })[], currency: string) {
    return (acceptedCurrencies.find(({key}) => key === currency)?.value) || 'EMPTY';
}

function mapExchangeRateToCurrencyRate(filteredRate: [string, ICurrencyExchangeRate]) {
    const currency = filteredRate[0];
    return ({
        currency: currency,
        value: mapCurrencyToValue(acceptedCurrencies, currency),
        rate: Number(filteredRate[1]) as number
    }) as ICurrencyRate;
}

function filterCurrencies(response: ICurrencyExchangeResponse): ICurrencyRate[] {
    const rates = response.rates as ICurrencyExchangeRate[];
    return Object.entries(rates)
        .filter(([currency]) => acceptedCurrencies.some(({key}) => key === currency))
        .map((filteredRate) => mapExchangeRateToCurrencyRate(filteredRate));
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

    return filterCurrencies(await res.json() as ICurrencyExchangeResponse);
}


export default async function Home() {
    try {
        const data = await getExchangeRates();
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <CurrencyConverterWrapper rates={data}/>
            </main>
        )
    } catch (e) {
        return <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p>Service not available</p>
        </main>
    }
}
