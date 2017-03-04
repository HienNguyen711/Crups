import config from './config';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());

server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));
