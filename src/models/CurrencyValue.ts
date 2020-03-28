import { Currency } from './Currency';

export interface ICurrencyValue {
    value: number | string
    currency: Currency
}

export class CurrencyValue implements ICurrencyValue {
    constructor(
        public value: number,
        public currency: Currency,
    ) { }

    toString(): string {
        return `${this.value}${this.currency.alias}`;
    }
}