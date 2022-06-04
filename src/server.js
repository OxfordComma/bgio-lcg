// src/server.js
const { Server, Origins } = require("boardgame.io/server");
const { CardGame } = require("./Game");

const server = Server({
  games: [CardGame],
  origins: [Origins.LOCALHOST],
  apiOrigins: [Origins.LOCALHOST],
});

server.run(8000);
