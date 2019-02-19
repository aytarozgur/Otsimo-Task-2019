'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({  
  host: 'localhost',
  port: 8080
})

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

// returns true if player won
// returns false if computer won
// returns null if tie
function playGameAgainstComputer (playerMove) {
  var ComputerMove = selectComputerMove();
  console.log(playerMove, ComputerMove);
  var results = {
    ComputerMove: ComputerMove,
    playerMove: playerMove,
    isWin: null
  };
  if (ComputerMove === playerMove) {
    return results;
  }
  if (ComputerMove === 'rock') {
    // this is a win for the player only if they did not play scissors into rock
    // we have already ruled out all ties so the player can't be rock
    results.isWin = (playerMove !== 'scissors');
    return results;
  }
  if (ComputerMove === 'scissors') {
    // this is a win for the player if he is not paper
    results.isWin = (playerMove !== 'paper');
    return results;
  }
  if (ComputerMove === 'paper') {
    results.isWin = (playerMove !== 'rock');
    return results;
  }
}

function humanWinResult (isWin) {
  if (isWin === null) {
    return "tie";
  }
  if (isWin) {
    return "Win!";
  }
  return "Loss!";
}

// Rest Api
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply({endpoints: newGame});
    }
});

server.route({
    method: 'GET',
    path: '/newGame',
    handler: function (request, reply) {
        reply({endpoints: endpoints});
    }
});

endpoints.map( (endpoint, index) => {
  server.route({
    method: 'GET',
    path: endpoint,
    handler: function (request, reply) {
      var results = playGameAgainstComputer(moves[index]);
      results.humanWinResult = humanWinResult(results.isWin)
      reply(results);
    }
  })
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});