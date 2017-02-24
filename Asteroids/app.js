const Game = require('./lib/game.js');
const GameView = require('./lib/game_view.js');
const Util = require('./lib/utils.js');
const MovingObject = require('./lib/moving_object.js');
const Ship = require('./lib/ship.js');
const Asteroid = require('./lib/asteroid.js');
const Bullet = require('./lib/bullet.js');

window.Game = Game;
window.Ship = Ship;
window.Asteroid = Asteroid;
window.Bullet = Bullet;
window.MovingObject = MovingObject;
window.GameView = GameView;
window.Util = Util;


const canvasEl = document.getElementsByTagName("canvas")[0];
const ctx = canvasEl.getContext("2d");
// canvasEl.height = window.innerHeight;
// canvasEl.width = window.innerWidth;
// new Game(
//   canvasEl.width,
//   canvasEl.height
// ).start(canvasEl);

const gv = new GameView(ctx);
gv.start();
