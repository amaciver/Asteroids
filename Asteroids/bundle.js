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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(7);
	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(3);
	const Ship = __webpack_require__(2);
	const Asteroid = __webpack_require__(5);
	const Bullet = __webpack_require__(6);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(2);
	const Asteroid = __webpack_require__(5);
	const Bullet = __webpack_require__(6);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);

	class Ship {

	}

	module.exports = Ship;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);

	function MovingObject(options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
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
	};

	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits (childClass, parentClass) {
	    childClass.prototype = Object.create(parentClass.prototype);
	    childClass.prototype.constructor = childClass;
	  },


	  // Scale the length of a vector by the given amount.
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};

	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Util = __webpack_require__(4);

	function Asteroid (pos) {
	  const COLOR = 'red';
	  const RADIUS = 25;
	  const VECT = this.randomVec(50);
	  MovingObject.call(this, {color: COLOR, radius: RADIUS, pos: pos, vel: VECT});


	}

	Util.inherits(Asteroid, MovingObject);

	Asteroid.prototype.randomVec = function (length) {
	  const deg = 2 * Math.PI * Math.random();
	  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	};

	module.exports = Asteroid;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);

	class Bullet {

	}

	module.exports = Bullet;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);

	function GameView(ctx) {
	  this.game = new Game();
	  this.ctx = ctx;
	}

	GameView.prototype.start = function () {
	  setInterval(() => {
	    this.game.draw(this.ctx);
	    this.game.moveObjects();
	  }, 20);
	};

	module.exports = GameView;


/***/ }
/******/ ]);