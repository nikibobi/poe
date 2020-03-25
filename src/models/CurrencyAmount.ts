import { Currency } from './Currency';
import { CurrencyValue } from './CurrencyValue';

export class CurrencyAmount {

    static comparator = (a: CurrencyAmount, b: CurrencyAmount) => a.chaos - b.chaos;

    constructor(
        public currency: Currency,
        public base: Currency,
        public rate: number,
        public amount: number = 1
    ) { }

    get chaos(): number {
        return this.amount * this.rate;
    }

    set chaos(value: number) {
        this.amount = Math.ceil(value / this.rate);
    }

    next() {
        this.amount += 1;
    }

    toBaseValue(): CurrencyValue {
        return new CurrencyValue(this.chaos, this.base);
    }

    toValue(): CurrencyValue {
        return new CurrencyValue(this.amount, this.currency);
    }
}
