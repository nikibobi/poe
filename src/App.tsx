import React from 'react';
import { IRangeProps } from './data/ranges';
import rates from './data/rates';
import { Currency, currencies } from './models/Currency';
import CurrencySelect from './components/CurrencySelect';
import FromToInput from './components/FromToInput';
import ValueDeltaInput from './components/ValueDeltaInput';
import CurrencyTable from './components/CurrencyTable';

interface IAppState {
    base: Currency
    selected: Currency[]
    range: [number, number]
}

export default class App extends React.Component<any, IAppState> {

    readonly ranges: { [key: string]: IRangeProps }  = {
        value: { min: 0, max: 1000, step: 1 },
        delta: { min: 0, max: 1, step: 0.1 },
        from: { min: 0, max: 1000, step: 1 },
        to: { min: 0, max: 1000, step: 1 },
    }

    constructor(props: any) {
        super(props);
        this.state = {
            base: currencies.get('chaos') as Currency,
            selected: Array.from(currencies.values()),
            range: [0, 1]
        };
    }

    handleSelectedChange = (selected: Currency[]) => {
        this.setState({ selected });
    }

    handleRangeChange = (range: [number, number]) => {
        this.setState({ range });
    }

    render() {
        return (
            <React.Fragment>
            <aside>
                <CurrencySelect selected={this.state.selected} onChange={this.handleSelectedChange} currencies={currencies}/>
                <ValueDeltaInput range={this.state.range} onChange={this.handleRangeChange} value={this.ranges.value} delta={this.ranges.delta} baseAlias={this.state.base.alias}/>
                <FromToInput range={this.state.range} onChange={this.handleRangeChange} from={this.ranges.from} to={this.ranges.to}/>
            </aside>
            <section>
                <CurrencyTable base={this.state.base} selected={this.state.selected} range={this.state.range} rates={rates} />
            </section>
            </React.Fragment>
        );
    }
}
