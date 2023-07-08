import {IConvertedData} from "@/interfaces";

export default function ConversionHistory(props: { history: IConvertedData[] }) {
    return <table className="min-w-full divide-y divide-gray-200">
        <thead>
        <tr>
            <th className="py-3 px-6 bg-gray-100 text-sm font-medium text-gray-700">Index</th>
            <th className="py-3 px-6 bg-gray-100 text-sm font-medium text-gray-700">Source</th>
            <th className="py-3 px-6 bg-gray-100 text-sm font-medium text-gray-700">Target</th>
            <th className="py-3 px-6 bg-gray-100 text-sm font-medium text-gray-700">Amount</th>
            <th className="py-3 px-6 bg-gray-100 text-sm font-medium text-gray-700">Total</th>
        </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {props.history.map((currency, index) => (<tr key={index}>
            <td className="py-4 px-6 whitespace-nowrap text-center">{index + 1}</td>
            <td className="py-4 px-6 whitespace-nowrap text-center">{currency.source}</td>
            <td className="py-4 px-6 whitespace-nowrap text-center">{currency.target}</td>
            <td className="py-4 px-6 whitespace-nowrap text-center">{currency.amount}</td>
            <td className="py-4 px-6 whitespace-nowrap text-center">{currency.total}</td>
        </tr>))}

        </tbody>
    </table>;
}
