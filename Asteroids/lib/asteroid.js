const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');
const Ship = require('./ship.js');

function Asteroid (pos, game) {
  const COLOR = 'red';
  const RADIUS = 25;
  const VECT = this.randomVec(15);
  MovingObject.call(this, {color: COLOR, radius: RADIUS, pos: pos, vel: VECT, game: game});


}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.randomVec = function (length) {
  const deg = 2 * Math.PI * Math.random();
  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
};

Asteroid.prototype.collideWith = function(otherObject) {
  // this.game.remove(this);
  // if (otherObject instanceof Ship) {
  //   otherObject.relocate();
  // } else {
  //   this.game.remove(otherObject);
  // }
};

Asteroid.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

module.exports = Asteroid;
