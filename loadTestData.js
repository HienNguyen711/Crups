import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  db.collection('books').insertMany([
    { id: 1, categoryName: 'Front-end', bookName: 'Pro React',
      description: `
The book teaches you how to use React completely, and learn best practices for creating interfaces in a composable way.
      `,
      readerIds: [101, 102] },
    { id: 2, categoryName: 'Fullstack', bookName: 'MEAN and MERN stack',
      description: `
Using MongoDB for database, Node and Express Js for server and React or Angular for front-end UI
      `,
      readerIds: [] },
    { id: 3, categoryName: 'Back-end', bookName: 'Big Data Analytics for Cash Circulation',
    description: `
Data is created at every touch point in a notes life-cycle. Because of the volume of the data, it can be difficult to store, analyse and gain insight. Collecting, processing and analysing the data using big data technologies and displaying the results in an interactive display makes it easy to make informative decisions, overcome problem and plan for the future.
It works using big data technologies and displays the results in modern browsers, combining powerful visualisation components and a data-driven approach to interact with the data.
It enables you to analyse data that were not previously possible. The volume, variety, complexity of the analytical processing involved, and the responsiveness required are now achievable with the product. Gaining smarter decision making but also provide faster time to value.
    `,
      readerIds: [103, 104, 105] },
    { id: 4, categoryName: 'UX/UI', bookName: 'The art of web design',
    description: `
Web design for web developers
    `,
      nameIds: [] }
  ]).then(response => {
    console.info('books', response.insertedCount);
    db.collection('readers').insertMany([
      { id: 101, name: 'Hien Nguyen', timestamp: new Date() },
      { id: 102, name: 'Jane Lorance', timestamp: new Date() },
      { id: 103, name: 'Anna Lynn', timestamp: new Date() },
      { id: 104, name: 'Taylor Swift', timestamp: new Date() },
      { id: 105, name: 'Lucas John', timestamp: new Date() },
      { id: 106, name: 'Ray Loran', timestamp: new Date() },
    ]).then(response => {
      console.info('Readers', response.insertedCount);
      db.close();
    });
  });
});
