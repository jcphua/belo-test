import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import './styles/App.css';

import GridPage from './components/GridPage';

const useQuery = () => new URLSearchParams(useLocation().search);

const QueryScreen: React = () => {
    const query = useQuery();
    const re_gridSize = /^([\d]+)[x]([\d]+)$/;
    const qs_grid = query.get('grid'),
        qs_rows = query.get('rows'),
        qs_cols = query.get('cols');

    let [, rows = 6, cols = 6] = re_gridSize.test(qs_grid) && re_gridSize.exec(qs_grid);
    if (qs_rows && qs_cols && typeof(+qs_rows) === 'number' && typeof(+qs_cols) === 'number') {
        rows = +qs_rows;
        cols = +qs_cols;
    }
    return (
        <GridPage rows={+rows} cols={+cols} />
    )
}

const App: React = () => {
    return (
        <Router>
            <QueryScreen />
        </Router>
    );
}

ReactDom.render(<App />, document.getElementById('root'));