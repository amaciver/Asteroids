const Game = require('./game.js');
// const Keymaster = require('../keymaster.js');
const Ship = require('./ship.js');

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  setInterval(() => {
    this.bindKeyHandlers();
    // this.game.checkCollisons();
    this.game.moveObjects();
    this.game.draw(this.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function() {

  key('w', () => {
    this.game.ship.power('up');
  });
  key('a', () => {
    this.game.ship.power('left');
  });
  key('s', () => {
    this.game.ship.power('down');
  });
  key('d', () => {
    this.game.ship.power('right');
  });
  key('j', () => {
    this.game.ship.fireBullet();
  });
};

module.exports = GameView;
