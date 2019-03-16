
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('../knexfile');


const db = knex(knexConfig.development);

const router = require('../zoo/zooRouter');


const server = express();

server.use(express.json());
server.use(helmet());

server.use('api/zoos', zooRouter);

module.exports = server;