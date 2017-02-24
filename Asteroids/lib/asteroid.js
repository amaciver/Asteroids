const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

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

module.exports = Asteroid;
