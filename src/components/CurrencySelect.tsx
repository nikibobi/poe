import React from 'react';
import { Currency } from '../models/Currency';

export interface ICurrencySelectProps {
    currencies: Map<string, Currency>
}

export interface ICurrencySelectState {
    selected: Currency[]
}

export default class CurrencySelect extends React.Component<ICurrencySelectProps, ICurrencySelectState> {

    constructor(props: ICurrencySelectProps) {
        super(props);
        this.state = { selected: Array.from(this.props.currencies.values()) };
    }

    public handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const values = Array.from(event.target.selectedOptions).map(x => x.value);
        const selected = values.map(alias => this.props.currencies.get(alias) as Currency);
        this.setState({ selected });
    }

    public render() {
        return (
            <select id="include" multiple={true} size={this.props.currencies.size} value={this.state.selected.map(c => c.alias)} onChange={this.handleChange}>
                {Array.from(this.props.currencies.values()).map(c => c.toOption())}
            </select>
        );
    }
}
