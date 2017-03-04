import express from 'express';
import data form '../src/data';

const router = express.Router();

router.get('/books', (req, res) => {
  res.send({ books: data.books });
});

export default router;
