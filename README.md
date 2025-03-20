# CSP.JS

Constraint Satisfaction Problem Solver

This is a TypeScript library for expressing and solving constraint satisfaction problems. It solves discrete finite-domain problems via recursive backtracking.

## Example

Install the package via:

```
npm install csp-js
```

It can then be used like so:

```js
// ES Module
import { CSP } from "csp-js";

// CommonJS
// const { CSP } = require("csp-js");

const csp = new CSP();

csp.addVariable("a", [1,2,3]);
csp.addVariable("b", [4,5,6]);
csp.addVariable("c", [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);

csp.addConstraint(
	["a", "b"],
	function(a, b) { return a*2 === b; }
);

csp.addConstraint(
	["b", "c"],
	function(b, c) { return b*2 === c; }
);

// { a: 2, b: 4, c: 8 }
const oneSolution = csp.getSingleSolution();
console.log(oneSolution);

// [ { a: 2, b: 4, c: 8 }, { a: 3, b: 6, c: 12 } ]
const allSolutions = csp.getAllSolutions();
console.log(allSolutions);
```

## Intro to CSPs

### What is a CSP?

A Constraint Satisfaction Problem is formally defined as:

- A set of variables, `Xi ... Xn`
- Each variable has a domain of values it can take, `Di ... Dn`
- A set of constraints `Ci ... Cn` that specifies allowable combinations of values for a subset of the variables.

That is, a set of variables, with relations between the valid values of these variables.

There are multiple classes of CSPs:

- *Discrete problems*, where the values of each variable can be enumerated
- *Finite problems*, where the size of domain is finite
- *Continuous problems*, where the values of each variable is a range
- *Infinite problems*, where the domain of a variable is of infinite extent

Then there are subclasses of these:

- *Integer problems*, discrete infinite problems on the integers
- *Binary constraint problems*, where all the constraints are between two variables
- *Linear problems*, where all the constraints are linear
- *Integer Linear problems*, where all the constraints are linear and the values integers. This is the hardest kind of constraint problem.
- And many more...

### Examples of real-world CSPs

There are tons and tons of problems that can reduce to constraint satisfaction problems, and it is a rich field of study. But, here's some that everyone knows about:

- Sudoku
- Coloring maps
- Scheduling blocks of time

## Credits

This project started as a port of the [python-constraint](http://labix.org/python-constraint) library.

It was originally developed by [Niels Joubert](https://github.com/njoubert/csp.js) before I modernized the project for the current JavaScript ecosystem.
