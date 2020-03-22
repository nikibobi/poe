import React from 'react';
import { Currency } from '../models/Currency';

export interface ICurrencySelectProps {
    currencies: Map<string, Currency>
    selected: Currency[]
    onChange: (currencies: Currency[]) => void
}

export default function CurrencySelect(props: ICurrencySelectProps) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const values = Array.from(event.target.selectedOptions).map(x => x.value);
        const selected = values.map(alias => props.currencies.get(alias) as Currency);
        props.onChange(selected);
    }

    return (
        <select id="include" multiple={true} size={props.currencies.size} value={props.selected.map(c => c.alias)} onChange={handleChange}>
            {Array.from(props.currencies.values()).map(c => c.toOption())}
        </select>
    );
}
