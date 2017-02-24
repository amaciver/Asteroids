const Ship = require('./ship.js');
const Asteroid = require('./asteroid.js');
const Bullet = require('./bullet.js');

function Game() {
  this.DIM_X = window.innerWidth;
  this.DIM_Y = window.innerHeight;
  this.NUM_ASTEROIDS = 5;
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition()));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
  this.asteroids.forEach(asteroid => {
    asteroid.draw(ctx);
  });
};

Game.prototype.randomPosition = function () {
  const xpos = getRandomInt(0, this.DIM_X);
  const ypos = getRandomInt(0, this.DIM_Y);
  return [xpos, ypos];
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach((ast) => ast.move());
};

module.exports = Game;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
