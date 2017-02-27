/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(2);

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}


MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  if (Util.distance(this.pos, otherObject.pos) < (this.radius + otherObject.radius)) {
    return true;
  }
  else { return false; }
};

MovingObject.prototype.collideWith = function(otherObject) {
};

module.exports = MovingObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Game = __webpack_require__(3);
const Util = __webpack_require__(2);


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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Util = {
  inherits (childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },


  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  distance (pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0],2) + Math.pow(pos1[1] - pos2[1], 2));
  },

  resolveCollison(obj1, obj2) {
    const x1 = obj1.pos[0];
    const y1 = obj1.pos[1];
    const x2 = obj2.pos[0];
    const y2 = obj2.pos[1];

    const r1 = obj1.radius;
    const r2 = obj2.radius;

    const m1 = obj1.mass;
    const m2 = obj2.mass;

    const u1 = obj1.vel;
    const u2 = obj2.vel;

    const u1mag = Math.sqrt((u1[0]*u1[0]) + (u1[1]*u1[1]));
    const u2mag = Math.sqrt((u2[0]*u2[0]) + (u2[1]*u2[1]));


    const cpx = ((x1*r2) + (x2*r1)) / (r1 + r2);
    const cpy = ((y1*r2) + (y2*r1)) / (r1 + r2);
    // const cpx2 = ((x2*r1) + (x1*r2)) / (r1 + r2);
    // const cpy2 = ((y2*r1) + (y1*r2)) / (r1 + r2);

    let phi1 = Math.atan((cpy-y1)/(cpx-x1));
    if (phi1 < 0) {
      phi1 = 2*Math.PI + phi1;
    }

    // let phi2 = Math.PI - phi1;
    // if (phi2 < 0) {
    //   phi2 = 2*Math.PI + phi2;
    // }
    // let phi2 = Math.acos((cpx-x2) / r2);
    let theta1 = Math.atan(u1[1]/u1[0]);
    let theta2 = Math.atan(u2[1]/u2[0]);

    if (theta1 < 0 ) {
      theta1 = 2*Math.PI + theta1;
    }
    if (theta2 < 0 ) {
      theta2 = 2*Math.PI + theta2;
    }

    // console.log(theta1, theta2, phi1);

    // const v1x = ( (u1[0]*(m1-m2) + 2*m2*u2[0]) / (m1 + m2));
    // const v1y = ( (u1[1]*(m1-m2) + 2*m2*u2[1]) / (m1 + m2));
    // const v2x = ( (u2[0]*(m2-m1) + 2*m1*u1[0]) / (m1 + m2));
    // const v2y = ( (u2[1]*(m2-m1) + 2*m1*u1[1]) / (m1 + m2));

    const v1x = ((( (u1mag*Math.cos(theta1-phi1)*(m1-m2)) + (2*m2*u2mag*Math.cos(theta2-phi1)) ) / (m1+m2) ) * Math.cos(phi1)) +
                     ( u1mag*Math.sin(theta1-phi1)*Math.cos(phi1+(Math.PI/2)) );
    const v1y = ((( (u1mag*Math.cos(theta1-phi1)*(m1-m2)) + (2*m2*u2mag*Math.cos(theta2-phi1)) ) / (m1+m2) ) * Math.sin(phi1)) +
                     ( u1mag*Math.sin(theta1-phi1)*Math.sin(phi1+(Math.PI/2)) );
    const v2x = ((( (u2mag*Math.cos(theta2-phi1)*(m2-m1)) + (2*m1*u1mag*Math.cos(theta1-phi1)) ) / (m1+m2) ) * Math.cos(phi1)) +
                     ( u2mag*Math.sin(theta2-phi1)*Math.cos(phi1+(Math.PI/2)) );
    const v2y = ((( (u2mag*Math.cos(theta2-phi1)*(m2-m1)) + (2*m1*u1mag*Math.cos(theta1-phi1)) ) / (m1+m2) ) * Math.sin(phi1)) +
                     ( u2mag*Math.sin(theta2-phi1)*Math.sin(phi1+(Math.PI/2)) );



    obj1.vel = [v1x, v1y];
    obj2.vel = [v2x, v2y];
  }

};

module.exports = Util;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Ship = __webpack_require__(1);
const Asteroid = __webpack_require__(4);
const Bullet = __webpack_require__(5);

function Game() {
  this.DIM_X = window.innerWidth;
  this.DIM_Y = window.innerHeight;
  this.NUM_ASTEROIDS = 10;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship(this.randomPosition(), this);
}

Game.prototype.everyObj = function() {
  let result = [];
  result = result.concat(this.asteroids);
  result.push(this.ship);
  // console.log(result);
  return result;
};


Game.prototype.addAsteroids = function () {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
  this.everyObj().forEach(el => {
    el.draw(ctx);
  });
};

Game.prototype.wrap = function(pos) {
  const result = pos;
  if (pos[0] > this.DIM_X) {
    result[0] = 0;
  }
  if (pos[0] < 0) {
    result[0] = this.DIM_X;
  }
  if (pos[1] > this.DIM_Y) {
    result[1] = 0;
  }
  if (pos[1] < 0) {
    result[1] = this.DIM_Y;
  }
  return result;
};

Game.prototype.randomPosition = function () {
  const xpos = getRandomInt(0, this.DIM_X);
  const ypos = getRandomInt(0, this.DIM_Y);
  return [xpos, ypos];
};

Game.prototype.moveObjects = function() {
  this.checkCollisons();
  this.everyObj().forEach((obj) => obj.move());
};

Game.prototype.checkCollisons = function() {
  for (var i = 0; i < this.everyObj().length - 1; i++) {
    for (var j = i + 1; j < this.everyObj().length; j++) {
      if (this.everyObj()[i].isCollidedWith(this.everyObj()[j])) {
        this.everyObj()[i].collideWith(this.everyObj()[j]);
      }
    }
  }
};

Game.prototype.remove = function(obj) {
  if (obj instanceof Asteroid) {
    const idx = this.asteroids.indexOf(obj);
    this.asteroids.splice(idx, 1);
  }
};


module.exports = Game;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Util = __webpack_require__(2);
const Ship = __webpack_require__(1);

function Asteroid (pos, game) {
  const COLOR = 'red';
  const RADIUS = 25 * Math.random() + 15;
  const VECT = this.randomVec(5);
  MovingObject.call(this, {color: COLOR, radius: RADIUS, pos: pos, vel: VECT, game: game});
  this.mass = (4/3) * Math.PI * Math.pow(this.radius, 3);


}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.randomVec = function (length) {
  const deg = 2 * Math.PI * Math.random();
  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
};

Asteroid.prototype.collideWith = function(otherObject) {
  Util.resolveCollison(this, otherObject);
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);

class Bullet {

}

module.exports = Bullet;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(3);
// const Keymaster = require('../keymaster.js');
const Ship = __webpack_require__(1);

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
};

module.exports = GameView;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(3);
const GameView = __webpack_require__(6);
const Util = __webpack_require__(2);
const MovingObject = __webpack_require__(0);
const Ship = __webpack_require__(1);
const Asteroid = __webpack_require__(4);
const Bullet = __webpack_require__(5);

window.Game = Game;
window.Ship = Ship;
window.Asteroid = Asteroid;
window.Bullet = Bullet;
window.MovingObject = MovingObject;
window.GameView = GameView;
window.Util = Util;

document.addEventListener("DOMContentLoaded", function(event) {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const ctx = canvasEl.getContext("2d");
  const gv = new GameView(ctx);
  gv.start();
  });


/***/ })
/******/ ]);