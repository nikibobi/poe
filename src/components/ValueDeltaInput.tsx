import React from 'react';
import { IRangeProps, IRangeState } from '../data/ranges';

export interface IValueDeltaInputProps {
    value: IRangeProps
    delta: IRangeProps
}

export default class ValueDeltaInput extends React.Component<IValueDeltaInputProps, IRangeState> {

    constructor(props: IValueDeltaInputProps) {
        super(props);
        this.state = { range: [this.props.value.min, this.props.value.min] };
    }

    public get value(): number {
        const { range: [from, to] } = this.state;
        const value = (from + to) / 2;
        return value;
    }

    public get delta(): number {
        const { range: [from, to] } = this.state;
        const delta = (to - from) / 2;
        return delta;
    }

    public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = this.value;
        let delta = this.delta;
        if (event.target.id === 'value') {
            value = event.target.valueAsNumber;
        } else if (event.target.id === 'delta') {
            delta = event.target.valueAsNumber;
        }
        this.changeState(value, delta);
    }

    private changeState(value: number, delta: number) {
        const range: [number, number] = [value - delta, value + delta];
        this.setState({ range });
    }

    public render() {
        return (
            <div className="group">
                <input type="number" value={this.value} onChange={this.handleChange} id="value" placeholder="chaos" {...this.props.value} />
                <span className="gap">&plusmn;</span>
                <input type="number" value={this.delta} onChange={this.handleChange} id="delta" placeholder="delta" {...this.props.delta} />
            </div>
        );
    }
}
