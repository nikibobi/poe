import React from 'react';
import Heap from 'mnemonist/heap';
import { Currency } from '../models/Currency';
import { CurrencyAmount } from '../models/CurrencyAmount';

interface ICurrencyTableProps {
    selected: Currency[]
    range: [number, number]
    rates: Map<string, number>
}

export default class CurrencyTable extends React.Component<ICurrencyTableProps> {

    *renderRows(): IterableIterator<JSX.Element> {
        const [start, end] = this.props.range;
        const amounts = this.props.selected.map(currency =>
            new CurrencyAmount(currency, this.props.rates.get(currency.alias) as number));
        if (start !== 0) {
            amounts.forEach(a => a.chaos = start);
        }

        const heap = Heap.from(amounts, CurrencyAmount.comparator);
        while (true) {
            const amount = heap.pop() as CurrencyAmount;
            if (amount.chaos > end)
                break;
            yield amount.toRow();
            amount.next();
            heap.push(amount);
        }
    }

    render() {
        return (
            <table id="currencies">
                <thead>
                    <tr><th>Chaos</th><th>Currency</th></tr>
                </thead>
                <tbody>
                    {Array.from(this.renderRows())}
                </tbody>
            </table>
        );
    }
}
