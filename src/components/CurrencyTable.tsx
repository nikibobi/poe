import React, { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { from } from 'rxjs';
import { scan } from 'rxjs/operators';
import Heap from 'mnemonist/heap';
import { Currency } from '../models/Currency';
import { CurrencyAmount } from '../models/CurrencyAmount';
import { CurrencyValue, ICurrencyValue } from '../models/CurrencyValue';

function CurrencyTableCell(props: ICurrencyValue) {
    return (
        <td>{props.value} {props.currency.toImg()} {props.currency.name}</td>
    );
}

interface ICopyButtonProps {
    text: string;
}

function CopyButton(props: ICopyButtonProps) {

    const [isClicked, setClicked] = useState(false);

    const handleClick = async () => {
        await navigator.clipboard.writeText(props.text);
        setClicked(true);
        setTimeout(() => setClicked(false), 1000);
    }

    return (
        <td className="copy-button" onClick={handleClick}>
            <span role="img" aria-label="Copy">📋</span>
            <CSSTransition
                in={isClicked}
                timeout={200}
                classNames="tooltip"
                unmountOnExit>
                <span className="tooltip-text">copied</span>
            </CSSTransition>
        </td>
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
            <CopyButton text={props.value.toString()}/>
        </tr>
    );
}

export interface ICurrencyTableProps {
    isLoading: boolean
    base: Currency
    selected: Currency[]
    range: [number, number]
    rates: { [s: string]: number }
}

function *generateRows(props: ICurrencyTableProps): IterableIterator<ICurrencyTableRowProps> {
    const base = props.base;
    const [start, end] = props.range;
    const amounts = props.selected.map(currency =>
        new CurrencyAmount(currency, base, props.rates[currency.alias] as number));
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

    const columns = ['Chaos', 'Currency', ''];

    const [rows, setRows] = useState([] as ICurrencyTableRowProps[]);

    useEffect(() => {
        const sub = from(generateRows(props)).pipe(
            scan((rows, value) => [...rows, value], [] as ICurrencyTableRowProps[]),
        ).subscribe(setRows, error => console.error(error));
        return () => {
            sub.unsubscribe();
            setRows([]);
        }
    }, [props]);

    return (
        <table id="currencies">
            <thead>
                <tr>{columns.map(column => (<th key={column}>{column}</th>))}</tr>
            </thead>
            {!props.isLoading &&
            <tbody>
                <TransitionGroup component={null}>
                    {rows.map(({ base, value }) => (
                        <CSSTransition
                            key={value.toString()}
                            timeout={300}
                            classNames="row">
                                <CurrencyTableRow base={base} value={value}/>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </tbody>}
        </table>
    );
}
