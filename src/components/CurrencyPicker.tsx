import React from 'react';

const CurrencyPicker: React.FC = () => {
    return (
        <React.Fragment>
            <select id="include" multiple>
            </select>
            <div className="group">
                <input type="number" id="value" min="1" max="1000" step="1" placeholder="chaos" /><span className="gap">&plusmn;</span><input type="number" id="delta" min="0" max="1" step="0.01" placeholder="delta" />
            </div>
            <div className="group">
                <input type="number" id="from" min="0" max="1000" step="1" placeholder="from" /><span className="gap">&divide;</span><input type="number" id="to" min="0" max="1000" step="1" placeholder="to" />
            </div>
        </React.Fragment>
    );
}

export default CurrencyPicker;