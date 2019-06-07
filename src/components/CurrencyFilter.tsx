import React from 'react';
import CurrencySelect from './CurrencySelect';
import FromToInput from './FromToInput';
import { currencies } from '../models/Currency';
import { IRangeProps } from '../data/ranges';

const ranges: { [key: string]: IRangeProps }  = {
    value: { min: 1, max: 1000, step: 1 },
    delta: { min: 0, max: 1, step: 0.1 },
    from: { min: 0, max: 1000, step: 1 },
    to: { min: 0, max: 1000, step: 1 },
}

const CurrencyFilter: React.FC = (props) => {
    return (
        <React.Fragment>
            <CurrencySelect currencies={currencies}/>
            <FromToInput from={ranges.from} to={ranges.to}/>
        </React.Fragment>
    );
}

export default CurrencyFilter;