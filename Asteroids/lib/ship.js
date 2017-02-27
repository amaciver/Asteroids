const MovingObject = require("./moving_object.js");
const Game = require('./game.js');
const Util = require('./utils.js');
const Bullet = require('./bullet.js');

function Ship(pos, game) {
  const COLOR = 'blue';
  const RADIUS = 10;
  const VEL = [0,0];
  this.pos = pos;
  MovingObject.call(this, {color: COLOR, radius: RADIUS, pos: pos, vel: VEL, game: game});
}
Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.game.addShip();
};

Ship.prototype.power = function(impulse) {
  if (impulse === "up") {
    this.vel[1] -= .001;
  }
  if (impulse === "down") {
    this.vel[1] += .001;
  }
  if (impulse === "left") {
    this.vel[0] -= .001;
  }
  if (impulse === "right") {
    this.vel[0] += .001;
  }
};

Ship.prototype.fireBullet = function () {
  const bullet = new Bullet(this.pos, this.game, this);
  this.game.addBullet(bullet);
  // console.log(bullet);
};

module.exports = Ship;
