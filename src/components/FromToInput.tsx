import React from 'react';
import { IRangeProps } from '../data/ranges';

export interface IFromToInputProps {
    from: IRangeProps
    to: IRangeProps
    range: [number, number]
    onChange: (range: [number, number]) => void
}

export default class FromToInput extends React.Component<IFromToInputProps> {

    public get from(): number {
        const [from, ] = this.props.range;
        return from;
    }

    public get to(): number {
        const [, to] = this.props.range;
        return to;
    }

    public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let from = this.from;
        let to = this.to;
        if (event.target.id === 'from') {
            from = event.target.valueAsNumber;
        } else if (event.target.id === 'to') {
            to = event.target.valueAsNumber;
        }
        this.props.onChange([from, to]);
    }

    public render() {
        return (
            <div className="group">
                <input type="number" value={this.from} onChange={this.handleChange} id="from" placeholder="from" {...this.props.from} />
                <span className="gap">&divide;</span>
                <input type="number" value={this.to} onChange={this.handleChange} id="to" placeholder="to" {...this.props.to} />
            </div>
        );
    }
}
