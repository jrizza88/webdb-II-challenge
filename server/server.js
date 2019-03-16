
const express = require('express');
const helmet = require('helmet');

const zooRouter = require('../zoo/zooRouter');
const bearRouter = require('../zoo/bearRouter');


const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zooRouter);
server.use('/api/bears', bearRouter);

module.exports = server;