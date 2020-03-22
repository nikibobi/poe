import React from 'react';
import { IRangeProps } from '../data/ranges';

export interface IValueDeltaInputProps {
    value: IRangeProps
    delta: IRangeProps
    baseAlias: string
    range: [number, number]
    onChange: (range: [number, number]) => void
}

export default function ValueDeltaInput(props: IValueDeltaInputProps) {

    const { range: [from, to] } = props;
    let value = (from + to) / 2;
    let delta = (to - from) / 2;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === 'value') {
            value = event.target.valueAsNumber;
        } else if (event.target.id === 'delta') {
            delta = event.target.valueAsNumber;
        }
        const range: [number, number] = [value - delta, value + delta];
        props.onChange(range);
    }

    return (
        <div className="group">
            <input type="number" value={value} onChange={handleChange} id="value" placeholder={props.baseAlias} {...props.value} />
            <span className="gap">&plusmn;</span>
            <input type="number" value={delta} onChange={handleChange} id="delta" placeholder="delta" {...props.delta} />
        </div>
    );
}
