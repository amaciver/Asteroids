function Surrogate() {

}

// Function.prototype.inherits = function(parent, child) {
//   Surrogate.prototype = parent.prototype;
//   child.prototype = new Surrogate();
//   child.prototype.constructor = child;
// };

Function.prototype.inherits = function(parent, child) {
  child.prototype = Object.create(parent.prototype);
};



function MovingObject() {
  this.velocity = 20;
}

function Ship(velocity) {
  MovingObject.call(this, velocity);
}
// Ship.inherits(MovingObject, Ship);

function Asteroid(velocity) {
  MovingObject.call(this, velocity);
}
// Asteroid.inherits(MovingObject, Asteroid);



const s = new Ship;

const s2 = new Ship(30);

// console.log(s.velocity);
// console.log(s2.velocity);

s2.velocity = 40;
// console.log(s2.velocity);

Asteroid.prototype.explode = function(size) {
  console.log(size);
};

const a = new Asteroid;
// s2.explode();
a.explode(100);
console.log(typeof a);
console.log(a.__proto__);
