"use client"
import {IConvertedData, ICurrencyRate} from "@/interfaces";
import {useCallback, useEffect, useState} from "react";

function convertAmountFromSourceToTarget(sourceRateValue: number, targetRateValue: number, amount: number) {
    const convertedValue = (1 / sourceRateValue) * targetRateValue * Number(amount);
    return convertedValue.toFixed(2);
}

export default function ConverterForm(props: {
    rates: ICurrencyRate[],
    onCurrencyConverted: (convertedData: IConvertedData) => void
}) {

    const [selectedSource, setSelectedSource] = useState("EUR");
    const [selectedTarget, setSelectedTarget] = useState("EUR");
    const [amount, setAmount] = useState(0);
    const [total, setTotal] = useState(0);

    const [convertedData, setConvertedData] = useState({
        source: '',
        target: '',
        amount: 0,
        total: 0
    })

    const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSource(event.target.value);
    };

    const handleTargetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTarget(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(event.target.value));
    };

    const handleCurrencyConverted = useCallback((data: IConvertedData) => {
        props.onCurrencyConverted(data);
    }, [props.onCurrencyConverted]);

    useEffect(() => {
        const convertedData: IConvertedData = {
            source: selectedSource,
            target: selectedTarget,
            total: total,
            amount: amount,
        };
        setConvertedData(convertedData);
        handleCurrencyConverted(convertedData);
    }, [total, handleCurrencyConverted]);



    const handleConvert = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const sourceRate = props.rates.find((rate) => rate.currency === selectedSource);
        const targetRate = props.rates.find((rate) => rate.currency === selectedTarget);

        if (!sourceRate || !targetRate || !amount) {
            setTotal(0);
            return;
        }

        setTotal(parseFloat(convertAmountFromSourceToTarget(sourceRate.rate, targetRate.rate, amount)));
    };

    const getBaseRate = () => {
        const source = props.rates.find((rate) => rate.currency === selectedSource);
        const target = props.rates.find((rate) => rate.currency === selectedTarget);

        if (!source?.rate || !target?.rate) {
            return ""
        }

        return `1 ${source.currency} is equivalent to ${convertAmountFromSourceToTarget(source.rate, target.rate, 1)} ${target.currency}`;
    };

    return <form onSubmit={handleConvert}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9">
            <div className="sm:col-span-3">
                <label htmlFor="source" className="block text-sm font-medium leading-6 text-gray-900">
                    From
                </label>
                <div className="mt-2">
                    <select
                        id="source"
                        name="source"
                        autoComplete="country-name"
                        onChange={handleSourceChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        {props.rates.map(rate => <option key={rate.currency}
                                                         value={rate.currency}>{rate.value}</option>)}
                    </select>
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                    Amount
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="amount"
                        id="last-name"
                        autoComplete="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="target" className="block text-sm font-medium leading-6 text-gray-900">
                    To
                </label>
                <div className="mt-2">
                    <select
                        id="target"
                        name="target"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={handleTargetChange}
                    >
                        {props.rates.map(rate => <option key={rate.currency}
                                                         value={rate.currency}>{rate.value}</option>)}
                    </select>
                </div>
            </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-x-6">
            <p id="base-rate" className="mt-1 text-md font-bold text-gray-700">
                {getBaseRate()}
            </p>

            <p id="total" className="mt-1 text-lg font-bold text-gray-700">
                {convertedData.source} {convertedData.amount} = <span
                className="text-indigo-600">{convertedData.total}</span> {convertedData.target}
            </p>

            <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Convert
            </button>
        </div>

    </form>;
}