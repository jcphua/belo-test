import React from 'react';
import ReactDom from 'react-dom';

import './styles/App.css';

import GridPage from './GridPage';

ReactDom.render(<GridPage rows={6} cols={6} />, document.getElementById('root'));