import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  let bookCount = 0;
  db.collection('books').find({}).each((err, book) => {
    assert.equal(null, err);
    if (!book) { return; }

    bookCount++;
    db.collection('readers')
      .find({ id: { $in: book.readerIds }})
      .project({ _id: 1 })
      .toArray()
      .then(_ids => {
        const newIds = _ids.map(o => o._id);
        db.collection('books').updateOne(
          { id: book.id },
          { $set: { readerIds: newIds } }
        ).then(() => {
          console.info('Updated', book._id);
          bookCount--;
          if (bookCount === 0) { db.close(); }
        });
      })
      .catch(console.error);
  });

});
