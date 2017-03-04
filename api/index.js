import express from 'express';
import data from '../src/data';

const router = express.Router();
const books = data.books.reduce((obj, book) => {
  obj[book.id] = book;
  return obj;
}, {});

router.get('/books', (req, res) => {
  res.send({
    books: books//books
  });
});

router.get('/books/:bookId', (req, res) => {
  let book = books[req.params.bookId];
  book.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


  res.send(book);
});

export default router;
