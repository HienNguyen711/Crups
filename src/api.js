import axios from 'axios';

export const fetchBook = bookId => {
  return axios.get(`/api/books/${bookId}`)
              .then(resp => resp.data);
};

export const fetchBookList = () => {
  return axios.get('/api/books')
              .then(resp => resp.data.books);
};
