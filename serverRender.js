import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';


const getApiUrl = bookId => {
  if(bookId) {
    return `${config.serverUrl}/api/books/${bookId}`;
  }
  else {
    return `${config.serverUrl}/api/books`;
  }
};




const getInitialData = (bookId, apiData) => {
  if (bookId) {
    return {
      currentBookId: apiData.id,
      books: {
        [apiData.id]: apiData
      }
    };
  }
  return {
    books: apiData.books
  };
};







const serverRender = (bookId) =>
  axios.get(getApiUrl(bookId))
    .then(resp => {
      const initialData = getInitialData(bookId, resp.data);
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App initialData={initialData} />
        ),
        initialData
      };
    });

export default serverRender;
