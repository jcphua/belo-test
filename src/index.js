import React from 'react';
import ReactDom from 'react-dom';

import './styles/App.css';

import App from './App';

ReactDom.render(<App rows={6} cols={6} />, document.getElementById('root'));