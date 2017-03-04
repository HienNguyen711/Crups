import express from 'express';
import data form '../src/data';

const router = express.Router();

router.get('/books', (req, res) => {
  res.send({ contests: data.contests });
});

export default router;
