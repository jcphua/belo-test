import * as React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import GridPage from './components/GridPage';

const useQuery = () => new URLSearchParams(useLocation().search);

const QueryScreen: React = () => {
    const query = useQuery();
    const re_gridSize = /^([\d]+)[x]([\d]+)$/;
    const qs_grid = query.get('grid'),
        qs_rows = query.get('rows'),
        qs_cols = query.get('cols');

    let [, cols = 6, rows = 6] = re_gridSize.test(qs_grid) && re_gridSize.exec(qs_grid);
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

export default App;