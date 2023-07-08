"use client"
import ConverterForm from "@/components/ConverterForm";
import {IConvertedData} from "@/interfaces";


function currencyConvertedHAndler (convertedData: IConvertedData) {
    console.log('convertedData', convertedData)
}


export default function  CurrencyConverterWrapper(props: { rates: { rate: number; currency: string; value: string }[] }) {
    return <div>
        <ConverterForm rates={props.rates} onCurrencyConverted={currencyConvertedHAndler}/>
        <>Get latest</>
    </div>;
}