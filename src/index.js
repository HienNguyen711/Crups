import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
  <App initialBooks={window.initialData.books}/>,
  document.getElementById('root')
);
