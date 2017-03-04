import axios from 'axios';

export const fetchBook = bookId => {
  return axios.get(`/api/books/${bookId}`)
              .then(resp => resp.data);
};

export const fetchBookList = () => {
  return axios.get('/api/books')
              .then(resp => resp.data.books);
};

export const fetchReaders = readerIds => {
  return axios.get(`/api/readers/${readerIds.join(',')}`)
              .then(resp => resp.data.readers);
};

export const addReader = (newReader, bookId) => {
  return axios.post('/api/readers', { newReader, bookId })
              .then(resp => resp.data);
};
