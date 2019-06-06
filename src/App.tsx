import React from 'react';
import './App.css';
import CurrencyTable from './components/CurrencyTable';
import CurrencyPicker from './components/CurrencyPicker';

const App: React.FC = () => {
    return (
        <React.Fragment>
        <aside>
            <CurrencyPicker />
        </aside>
        <section>
            <CurrencyTable />
        </section>
        </React.Fragment>
    );
}

export default App;
