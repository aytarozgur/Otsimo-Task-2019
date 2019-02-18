'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 8080 });