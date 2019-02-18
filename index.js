'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 8080 });

var moves = [
  'rock',
  'paper',
  'scissors'
];

var newGame = '/newGame';
var endpoints = moves.map( move => {
  return `/${move}`;
});

// return a random one of 'rock', 'paper', or 'scissors'
function selectComputerMove () {
  var roll = Math.floor(Math.random() * moves.length);
  return moves[roll];
}