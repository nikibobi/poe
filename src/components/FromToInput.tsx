import React from 'react';
import { IRangeProps } from '../data/ranges';

export interface IFromToInputProps {
    from: IRangeProps
    to: IRangeProps
    range: [number, number]
    onChange: (range: [number, number]) => void
}

export default function FromToInput(props: IFromToInputProps) {

    let [from, to] = props.range;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === 'from') {
            from = event.target.valueAsNumber;
        } else if (event.target.id === 'to') {
            to = event.target.valueAsNumber;
        }
        props.onChange([from, to]);
    }

    return (
        <div className="group">
            <input type="number" value={from} onChange={handleChange} id="from" placeholder="from" {...props.from} />
            <span className="gap">&divide;</span>
            <input type="number" value={to} onChange={handleChange} id="to" placeholder="to" {...props.to} />
        </div>
    );
}
