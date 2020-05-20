import React, { useState } from 'react';
import GithubCorner from 'react-github-corner';
import CurrencySelect from './components/CurrencySelect';
import CurrencyTable from './components/CurrencyTable';
import FromToInput from './components/FromToInput';
import ValueDeltaInput from './components/ValueDeltaInput';
import { IRangeProps } from './data/ranges';
import { useGetRates } from './hooks/useGetRates';
import { currencies, Currency } from './models/Currency';

export default function App() {

    const ranges: { [key: string]: IRangeProps }  = {
        value: { min: 0, max: 1000, step: 1 },
        delta: { min: 0, max: 1, step: 0.1 },
        from: { min: 0, max: 1000, step: 1 },
        to: { min: 0, max: 1000, step: 1 },
    };
    const base = currencies.get('chaos') as Currency;

    const [selected, setSelected] = useState(Array.from(currencies.values()));
    const [range, setRange] = useState([0, 1] as [number, number]);

    const { isLoading, rates } = useGetRates({ user: 'nikibobi' });

    return (
        <React.Fragment>
        <aside>
            <CurrencySelect selected={selected} onChange={setSelected} currencies={currencies}/>
            <ValueDeltaInput range={range} onChange={setRange} value={ranges.value} delta={ranges.delta} baseAlias={base.alias}/>
            <FromToInput range={range} onChange={setRange} from={ranges.from} to={ranges.to}/>
        </aside>
        <section>
            <CurrencyTable isLoading={isLoading} base={base} selected={selected} range={range} rates={rates}/>
        </section>
        <GithubCorner href={'https://github.com/nikibobi/poe'} bannerColor="#fff" octoColor="#0b0207"/>
        </React.Fragment>
    );
}
