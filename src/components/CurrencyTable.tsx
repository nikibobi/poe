import React from 'react';
import Heap from 'mnemonist/heap';
import { Currency } from '../models/Currency';
import { CurrencyAmount } from '../models/CurrencyAmount';
import { CurrencyValue, ICurrencyValue } from '../models/CurrencyValue';

function CurrencyTableCell(props: ICurrencyValue) {
    return (
        <td>{props.value} {props.currency.toImg()} {props.currency.name}</td>
    );
}

interface ICurrencyTableRowProps {
    base: CurrencyValue,
    value: CurrencyValue,
}

function CurrencyTableRow(props: ICurrencyTableRowProps) {
    return (
        <tr key={`${props.value.currency.alias}-${props.value.value}`}>
            <CurrencyTableCell value={props.base.value.toFixed(2)} currency={props.base.currency}/>
            <CurrencyTableCell {...props.value}/>
        </tr>
    );
}

export interface ICurrencyTableProps {
    base: Currency
    selected: Currency[]
    range: [number, number]
    rates: Map<string, number>
}

function *generateRows(props: ICurrencyTableProps): IterableIterator<ICurrencyTableRowProps> {
    const base = props.base;
    const [start, end] = props.range;
    const amounts = props.selected.map(currency =>
        new CurrencyAmount(currency, base, props.rates.get(currency.alias) as number));
    if (start !== 0) {
        amounts.forEach(a => a.chaos = start);
    }

    const heap = Heap.from(amounts, CurrencyAmount.comparator);
    while (true) {
        const amount = heap.pop() as CurrencyAmount;

        if (amount.chaos > end)
            break;

        yield {
            base: amount.toBaseValue(),
            value: amount.toValue(),
        };
        amount.next();
        heap.push(amount);
    }
}

export default function CurrencyTable(props: ICurrencyTableProps) {
    return (
        <table id="currencies">
            <thead>
                <tr><th>Chaos</th><th>Currency</th></tr>
            </thead>
            <tbody>
                {Array.from(generateRows(props), (props, key) => <CurrencyTableRow key={key} {...props}/>)}
            </tbody>
        </table>
    );
}
