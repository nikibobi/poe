import React from 'react'
import { Currency, currencies } from "./Currency";

export class CurrencyAmount {
    static base: Currency = currencies.get('chaos') as Currency;

    static comparator = (a: CurrencyAmount, b: CurrencyAmount) => a.chaos - b.chaos;

    currency: Currency;
    amount: number;
    rate: number;

    constructor(currency: Currency, rate: number) {
        this.currency = currency;
        this.amount = 1;
        this.rate = rate;
    }

    get chaos(): number {
        return this.amount * this.rate;
    }

    set chaos(value: number) {
        this.amount = Math.ceil(value / this.rate);
    }

    next() {
        this.amount += 1;
    }

    private get key(): string {
        return `${this.currency.alias}-${this.amount}`;
    }

    private toCell(value: string | number, currency: Currency): JSX.Element {
        return <td>{value} {currency.toImg()} {currency.name}</td>;
    }

    toRow(): JSX.Element {
        const chaos = this.toCell(this.chaos.toFixed(2), CurrencyAmount.base);
        const currency = this.toCell(this.amount, this.currency);
        return <tr key={this.key}>{chaos}{currency}</tr>;
    }
}
