/* 
 * DiscreteFinite.JS
 *
 * Implementation for a discrete, finite-domain CSP solver
 *
 *
 */
 
define(
  
  ['util'],
  
  function (util) {
  
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
  
  /* 
   * Problem 
   */ 
  var Problem = function() {
    this.solver = new RecursiveBacktrackingSolver();
    this.variables = {};
    this.constraints = [];
  };
  
  Problem.prototype.addVariable = function(name, domain) {
    this.variables[name] = new Variable(name,domain);
  }
  Problem.prototype.changeVariable = function(name, newdomain) {
    if (this.variables[name]) {
      this.variables[name].domain = newdomain;      
    } else {
      throw new Error("Attempted to change a nonexistant variable.");
    }
  }

  Problem.prototype.addConstraint = function(variables, fn) {
      if (variables.length == 0) {
          return;
      }
    this.constraints.push(new Constraint(variables, fn));
  }
  
  Problem.prototype.setSolver = function(solver) {
    this.solver = solver;
  }
  
  Problem.prototype.getSolution = function() {
    return this.solver.getSolution(this);
  }

  Problem.prototype.getSolutions = function() {
    return this.solver.getSolutions(this);
  }
  
  Problem.prototype.getSolutionIter = function() {
    return this.solver.getSolutions(this);
  }
  
  /* 
   * Solver 
   */
  var RecursiveBacktrackingSolver = function() {
    
  };
  
  RecursiveBacktrackingSolver.prototype.getSolution = function(csp) {
    var assignment = {}
    if (this.solve(assignment, csp.variables, csp.constraints, true)) {
      return assignment;
    } else {
      return {};
    }
  }

  RecursiveBacktrackingSolver.prototype.getSolutions = function(csp) {
    this.allAssignments = [];
    this.solve({}, csp.variables, csp.constraints, false);
    return this.allAssignments;
  }

  RecursiveBacktrackingSolver.prototype.getSolutionIter = function(csp) {
    throw {
      error: "Unsupported",
      message: "RecursiveBacktrackingSolver does not support a solution iterator"
    }
  }
  
  RecursiveBacktrackingSolver.prototype.solve = function(assignments, variables, constraints, single) {
    
    
    
    function recursiveSolve(assignments, variables, constraints, single) {
      //Move stuff in here to not re-evaluate the checkAssignment function...
      
    }
    
    if (Object.keys(assignments).length === Object.keys(variables).length) {
      if (!single) {
        this.allAssignments.push(util.hashcopy(assignments));
      }
      return true;
    }
    //find the next variable
    var nextVar = null;
    for (v in variables) {
      var found = false;
      for (a in assignments) {
        if (v === a) {
          found = true;
        }
      }
      if (!found) {
        nextVar = variables[v];
        break;
      }
    }
    
    function checkAssignment(nextVar, val) {
      assignments[nextVar.name] = val;
      for (var c in constraints) {
        args = []
        var valid = true;
        
        //try to build the argument list for this constraint...
        for (var k in constraints[c].variables) {
          var fp = constraints[c].variables[k];
          if (typeof assignments[fp] != "undefined") {
            args.push(assignments[fp]);
          } else {
            valid = false;
            break;
          }
        }
        
        if (valid) {
          //we can check it, so check it.
          if (!constraints[c].fn.apply(null,args)) {
            delete assignments[nextVar.name];
            return false;
          }
        }

      }
      delete assignments[nextVar.name];
      return true;
    }
    
    //now try the values in its domain
    for (var j in nextVar.domain) {
      var val = nextVar.domain[j];
      var valid = true;
      if (checkAssignment(nextVar, val)) {
        assignments[nextVar.name] = val;
        if (this.solve(assignments, variables, constraints, single)) {
          if (single) {
            return true
          }
        }
        delete assignments[nextVar.name];
      }
    }
    return false;
    
  }
  
  
  /*
   * Public API
   */
  return {
    
    DiscreteProblem: function() {
      return new Problem();
    }
    
    
  }
  
});