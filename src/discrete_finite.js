/* 
 * DiscreteFinite.JS
 *
 * Implementation for a discrete, finite-domain CSP solver
 *
 *
 */
 
define(function () {
	
	/* 
	 * Variable
	 */
	var Variable = function(name,domain) {
		this.name = name;
		this.domain = domain;
	}
	
	Variable.prototype.toString = function() {
		return "" + this.name + " => [" + this.domain.toString() + "]";
	}

	/* 
	 * Constraint 
	 */
	
	var Constraint = function(variables, fn) {
		this.fn = fn;
		this.variables = variables;
	}
	
	Constraint.prototype.toString = function() {
		return "(" + this.variables.toString() + ") => " + this.fn.toString();
	}
	
	Constraint.prototype.forwardCheck = function(vars, doms, assigns) {
		
	}

	/* 
	 * Problem 
	 */	
	var Problem = function() {
		this.solver = new RecursiveBacktrackingSolver();
		this.variables = [];
		this.constraints = [];
	};
	
	Problem.prototype.addVariable = function(name, domain) {
		if (!this.variables.some(function(el) {el.name === name})) {
			this.variables.push(new Variable(name,domain));			
		} else {
			throw new Error("Cannot insert duplicate variables into CSP");
		}
	}

	Problem.prototype.addConstraint = function(variables, fn) {
		this.constraints.push(new Constraint(variables, fn));
	}
	
	Problem.prototype.setSolver = function(solver) {
		this.solver = solver;
	}
	
	Problem.prototype.getSolution = function() {
		
	}

	Problem.prototype.getSolutions = function() {
		
	}
	
	Problem.prototype.getSolutionIter = function() {
		
	}
	
	/* 
	 * Solver 
	 */
	var RecursiveBacktrackingSolver = function() {
		
		assignments = {}; //For a variable, what value has been assigned?
		
	};
	
	
	/*
	 * Public API
	 */
	return {
		
		DiscreteProblem: function() {
			return new Problem();
		}
		
		
	}
	
});