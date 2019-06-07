import React from 'react';
import './App.css';
import CurrencyTable from './components/CurrencyTable';
import CurrencyFilter from './components/CurrencyFilter';

const App: React.FC = () => {
    return (
        <React.Fragment>
        <aside>
            <CurrencyFilter />
        </aside>
        <section>
            <CurrencyTable />
        </section>
        </React.Fragment>
    );
}

export default App;
