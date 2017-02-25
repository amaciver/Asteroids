const MovingObject = require("./moving_object.js");
const Game = require('./game.js');
const Util = require('./utils.js');


function Ship(pos, game) {
  const COLOR = 'blue';
  const RADIUS = 10;
  const VEL = [0,0];
  this.pos = pos;
  MovingObject.call(this, {color: COLOR, radius: RADIUS, pos: pos, vel: VEL, game: game});

}
Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = 0;
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

module.exports = Ship;
