// function sum() {
//   const args = Array.from(arguments);
//   let result = 0;
//   args.forEach( (el) => result += el );
//   return result;
// }

// function sum(...rest) {
//
//   let result = 0;
//   rest.forEach( (el) => result += el );
//   return result;
// }

// console.log(sum(1,2,3,4));

//
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
Function.prototype.myBind = function (context,...rest) {

  return (...args) => {
    const newArgs = rest.concat(args);
    this.apply(context, newArgs);
  };
};
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// // markov.says("meow", "Ned");
//
// markov.says.myBind(breakfast, "meow", "Kush")();
// //
// markov.says.myBind(breakfast)("meow", "a tree");
// //
// markov.says.myBind(breakfast, "meow")("Markov");
// //
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");

function curriedSum(numArgs) {
  let numbers = [];
  const _curriedSum = function(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      let result = 0;
      numbers.forEach (el => result += el);
      return result;
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;
}

const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56

// Function.prototype.curry = function(numArgs) {
//   let args = [];
//   const _curried = arg => {
//     args.push(arg);
//     if (args.length === numArgs) {
//       return this.apply(this, args);
//     } else {
//       return _curried;
//     }
//   };
//   return _curried;
// };
//
// function sumThree(num1, num2, num3) {
//   return num1 + num2 + num3;
// }


//with spread op
Function.prototype.curry = function(numArgs) {
  let args = [];
  const _curried = arg => {
    args.push(arg);
    if (args.length === numArgs) {
      return this.call(this, ...args);
    } else {
      return _curried;
    }
  };
  return _curried;
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30

// or more briefly:
console.log(sumThree.curry(3)(4)(20)(6)); // == 30
