import React from 'react';
import { IRangeProps, IRangeState } from '../data/ranges';

export interface IFromToInputProps {
    from: IRangeProps
    to: IRangeProps
}

export default class FromToInput extends React.Component<IFromToInputProps, IRangeState> {

    constructor(props: IFromToInputProps) {
        super(props);
        this.state = { range: [props.from.min, props.to.min] };
    }

    public get from(): number {
        const [from, ] = this.state.range;
        return from;
    }

    public get to(): number {
        const [, to] = this.state.range;
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
        this.setState({ range: [from, to] })
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
