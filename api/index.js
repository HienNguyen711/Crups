import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';
import config from '../config';


let mdb;
MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  mdb = db;
});

const router = express.Router();


router.get('/books', (req, res) => {
   let books = {};
  mdb.collection('books').find({})
     .project({
       categoryName: 1,
       bookName: 1
     })
     .each((err, book) => {
       assert.equal(null, err);

       if (!book) { // no more books
         res.send({ books });
         return;
       }

       books[book._id] = book;
     });
});
router.get('/readers/:readerIds', (req, res) => {
  const readerIds = req.params.readerIds.split(',').map(ObjectID);
  let readers = {};
  mdb.collection('readers').find({ _id: { $in: readerIds }})
     .each((err, reader) => {
       assert.equal(null, err);

       if (!reader) { // no more readers
         res.send({ readers });
         return;
       }

       readers[reader._id] = reader;
     });
});


router.get('/books/:bookId', (req, res) => {
  mdb.collection('books')
     .findOne({ _id: ObjectID(req.params.bookId) })
     .then(book => res.send(book))
     .catch(error => {
       console.error(error);
       res.status(404).send('Bad Request');
     });
});


router.post('/readers', (req, res) => {
  const bookId = ObjectID(req.body.bookId);
  const reader = req.body.newReader;
  // validation ...
  mdb.collection('readers').insertOne({ reader }).then(result =>
    mdb.collection('books').findAndModify(
      { _id: bookId },
      [],
      { $push: { readerIds: result.insertedId } },
      { new: true }
    ).then(doc =>
      res.send({
        updatedBook: doc.value,
        newReader: { _id: result.insertedId, reader }
      })
    )
  )
  .catch(error => {
    console.error(error);
    res.status(404).send('Bad Request');
  });
});

export default router;

