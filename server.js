import config from './config';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

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
  res.render('index',{
    content:'Some thing goes here ... '
  });
});



server.listen(config.port, config.host, () => {
  console.info(`Running on port ${config.port}`);
});
