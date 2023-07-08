"use client"
import ConverterForm from "@/components/ConverterForm";
import {IConvertedData, ICurrencyRate} from "@/interfaces";
import {useState} from "react";
import ConversionHistory from "@/components/ConversionHistory";


export default function CurrencyConverterWrapper(props: { rates: ICurrencyRate[] }) {

    const [convertedCurrencies, setConvertedCurrencies] = useState<IConvertedData[]>([]);

    function currencyConvertedHandler(convertedData: IConvertedData) {
        setConvertedCurrencies((prevCurrencies: IConvertedData[]) => {
            // Add the new convertedData to the beginning of the array
            const updatedCurrencies = [convertedData, ...prevCurrencies];

            // Keep only the last 10 elements in the array
            if (updatedCurrencies.length > 10) {
                updatedCurrencies.splice(10);
            }

            return updatedCurrencies;
        });
    }

    return <div>
        <ConverterForm rates={props.rates} onCurrencyConverted={currencyConvertedHandler}/>
        {convertedCurrencies.length > 0 &&
            <div className="mt-12"><h3 className="text-2xl font-bold mb-4">Previous conversions</h3><ConversionHistory
                history={convertedCurrencies}/>
            </div>
        }
    </div>;
}