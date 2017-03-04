import config from './config';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import apiRouter from './api';
import express from 'express';
import bodyParser from 'body-parser';
import serverRender from './serverRender';

const server = express();
server.use(bodyParser.json());
server.use(express.static('public'));
server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));
//set ejs view
server.set('view engine', 'ejs');

server.get('/',(req,res) => {
  serverRender()
    .then(({ initialMarkup, initialData }) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch((err) => {
      console.error(err);
  });
});

server.use('/api', apiRouter);

server.listen(config.port, config.host, () => {
  console.info(`Running on port ${config.port}`);
});
