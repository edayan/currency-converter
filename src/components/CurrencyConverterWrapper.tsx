"use client"
import ConverterForm from "@/components/ConverterForm";
import {IConvertedData, ICurrencyRate} from "@/interfaces";


function currencyConvertedHandler(convertedData: IConvertedData) {
    console.log('convertedData', convertedData)
}


export default function CurrencyConverterWrapper(props: { rates: ICurrencyRate[] }) {
    return <div>
        <ConverterForm rates={props.rates} onCurrencyConverted={currencyConvertedHandler}/>
        <>Get latest</>
    </div>;
}