# CSP.JS

Constraint Satisfaction Problem Solver

This is a library for expressing and solving constraint satisfaction problems, in pure JavaScript. Currently it only solves discrete finite-domain problems, and provides a couple of solvers. In the future I hope to support infinite-domain problems and continuous problems as well.

## Example

	var p = csp.DiscreteProblem();
	
	p.addVariable("a", [1,2,3]);
	p.addVariable("b", [4,5,6]);
	p.addVariable("c", [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
	
	p.addConstraint(
		["a", "b"],
		function(a, b) { return a*2 === b; }
	);

	p.addConstraint(
		["b", "c"],
		function(b, c) { return b*2 === c; }
	);
	
	var one_solution = p.getSolution();
	var all_solutions = p.getSolutions();

## Solvers and Problems we support

Currently we support finite-domain problems, with the following solvers:

- Recursive Backtracking
- Forward-Checking (in progress)
- AC3 Arc Consistency (in progress)	

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

This project started as a port of the [python-constraint](http://labix.org/python-constraint) library