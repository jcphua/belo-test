import * as React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import GridPage from './components/GridPage';

const useQuery = () => new URLSearchParams(useLocation().search);

const re_gridSize = /^([\d]+)[x]([\d]+)$/;

const QueryScreen = () => {
    const query = useQuery();
    
    const params = {
        grid: query.get('grid'),
        rows: query.get('rows'),
        cols: query.get('cols')
    };

    // Retrieve grid size by 'grid' parameter and auto-parse string (pattern: '<cols>x<rows>'), 
    // otherwise fallback to 6x6 grid size. Disallow grids smaller than 3x3
    let rows = 6, 
        cols = 6;
    const [, gridCols, gridRows] = re_gridSize.test(params.grid) && re_gridSize.exec(params.grid);
    if ((typeof(+gridRows) === 'number' && +gridRows >= 3) || (typeof(+gridCols) === 'number' && +gridCols >= 3)) {
        rows = +gridRows;
        cols = +gridCols;
    }

    // If 'rows' or 'cols' parameter is valid (a number and >= 3),
    // override previous rows/cols settings
    if ((params.rows && typeof(+params.rows) === 'number' && +params.rows >= 3) || (params.cols && typeof(+params.cols) === 'number' && +params.cols >= 3)) {
        cols = +params.cols || +params.rows;
        rows = +params.rows || +params.cols;
    }

    return (
        <GridPage rows={+rows} cols={+cols} />
    )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = () => {
    return (
        <Router>
            <QueryScreen />
        </Router>
    );
}

export default App;