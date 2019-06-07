import React from 'react';
import currenciesArgs from '../data/currencyData';

export class Currency {
    alias: string;
    name: string;
    image: string;

    constructor(alias: string, name: string, image: string) {
        this.alias = alias;
        this.name = name;
        this.image = image;
    }

    get imageUrl(): string {
        return `https://web.poecdn.com/image/Art/2DItems/Currency/${this.image}.png?scale=1&w=1&h=1`;
    }

    get optionStyle(): object {
        return {
            backgroundImage: `url('${this.imageUrl}')`,
        }
    }

    toOption(): JSX.Element {
        return <option key={this.alias} value={this.alias} style={this.optionStyle}>{this.name}</option>;
    }

    toImg(): JSX.Element {
        return <img src={this.imageUrl} alt={this.alias}/>;
    }
}

export const currencies: Map<string, Currency> = new Map(currenciesArgs.map(args => new Currency(...args)).map(c => [c.alias, c]));
