const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");

function Bullet (pos, game, ship) {
  const COLOR = 'black';
  const RADIUS = 3;
  const VECT = [((Util.magnitude(ship.vel)+5)*Math.cos(ship.theta)), ((Util.magnitude(ship.vel)+5)*Math.sin(ship.theta))];
  console.log(ship.vel);
  console.log(ship.theta);
  console.log(VECT);
  MovingObject.call(this, {color: COLOR, radius: RADIUS, pos: (pos + 10), vel: VECT, game: game});
  this.mass = (4/3) * Math.PI * Math.pow(this.radius, 3);
}
Util.inherits(Bullet, MovingObject);
module.exports = Bullet;
