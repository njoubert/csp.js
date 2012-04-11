require.config({
  baseUrl: "../../src/"
});

require(
  
  ['csp'],
  
  function(csp) {
    
    
    var p = csp.DiscreteProblem();
    
    //We will name the variables on the board
    //rows are a...i
    //cols are 1...9
    var rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    var cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (var ri in rows) {
      for (var ci in cols) {
        var row = rows[ri];
        var col = cols[ci];
        p.addVariable(row+""+col, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
    }
    
    
    //Each row must contain 1 through 9
    for (var ri in rows) {      
      var row = rows[ri];
      var rowels = [];
      for (var ci in cols) {
        var col = cols[ci];
        rowels.push(row + "" + col);
      }
      p.addConstraint(
        rowels, 
        function(a, b, c, d, e, f, g, h, i) {
          return (a === 1 || b === 1 || c === 1 || d === 1 || e === 1 || f === 1 || g === 1 || h === 1 || i === 1) &&
                 (a === 2 || b === 2 || c === 2 || d === 2 || e === 2 || f === 2 || g === 2 || h === 2 || i === 2) &&
                 (a === 3 || b === 3 || c === 3 || d === 3 || e === 3 || f === 3 || g === 3 || h === 3 || i === 3) &&
                 (a === 4 || b === 4 || c === 4 || d === 4 || e === 4 || f === 4 || g === 4 || h === 4 || i === 4) &&
                 (a === 5 || b === 5 || c === 5 || d === 5 || e === 5 || f === 5 || g === 5 || h === 5 || i === 5) &&
                 (a === 6 || b === 6 || c === 6 || d === 6 || e === 6 || f === 6 || g === 6 || h === 6 || i === 6) &&
                 (a === 7 || b === 7 || c === 7 || d === 7 || e === 7 || f === 7 || g === 7 || h === 7 || i === 7) &&
                 (a === 8 || b === 8 || c === 8 || d === 8 || e === 8 || f === 8 || g === 8 || h === 8 || i === 8) &&
                 (a === 9 || b === 9 || c === 9 || d === 9 || e === 9 || f === 9 || g === 9 || h === 9 || i === 9);
        });  
    }
    
    //Each column must contain 1 though 9
    for (var ci in cols) {      
      var col = cols[ci];
      var colels = [];
      for (var ri in rows) {
        var row = rows[ri];
        colels.push(row + "" + col);
      }
      p.addConstraint(
        colels, 
        function(a, b, c, d, e, f, g, h, i) {
          return (a === 1 || b === 1 || c === 1 || d === 1 || e === 1 || f === 1 || g === 1 || h === 1 || i === 1) &&
                 (a === 2 || b === 2 || c === 2 || d === 2 || e === 2 || f === 2 || g === 2 || h === 2 || i === 2) &&
                 (a === 3 || b === 3 || c === 3 || d === 3 || e === 3 || f === 3 || g === 3 || h === 3 || i === 3) &&
                 (a === 4 || b === 4 || c === 4 || d === 4 || e === 4 || f === 4 || g === 4 || h === 4 || i === 4) &&
                 (a === 5 || b === 5 || c === 5 || d === 5 || e === 5 || f === 5 || g === 5 || h === 5 || i === 5) &&
                 (a === 6 || b === 6 || c === 6 || d === 6 || e === 6 || f === 6 || g === 6 || h === 6 || i === 6) &&
                 (a === 7 || b === 7 || c === 7 || d === 7 || e === 7 || f === 7 || g === 7 || h === 7 || i === 7) &&
                 (a === 8 || b === 8 || c === 8 || d === 8 || e === 8 || f === 8 || g === 8 || h === 8 || i === 8) &&
                 (a === 9 || b === 9 || c === 9 || d === 9 || e === 9 || f === 9 || g === 9 || h === 9 || i === 9);
        });  
    }
    
    //Each 3x3 block should constain 1 through 9
    
    var constrainBlock = function(top_i, left_i) {
      var els = [];
      for (var i = top_i; i < top_i + 3; i++) {
        for (var j = left_i; j < left_i + 3; i++) {
          els.push(rows[i] + "" + cols[j]);
        }
      }
      p.addConstraint(
        els,
        function(a, b, c, d, e, f, g, h, i) {
          return (a === 1 || b === 1 || c === 1 || d === 1 || e === 1 || f === 1 || g === 1 || h === 1 || i === 1) &&
                 (a === 2 || b === 2 || c === 2 || d === 2 || e === 2 || f === 2 || g === 2 || h === 2 || i === 2) &&
                 (a === 3 || b === 3 || c === 3 || d === 3 || e === 3 || f === 3 || g === 3 || h === 3 || i === 3) &&
                 (a === 4 || b === 4 || c === 4 || d === 4 || e === 4 || f === 4 || g === 4 || h === 4 || i === 4) &&
                 (a === 5 || b === 5 || c === 5 || d === 5 || e === 5 || f === 5 || g === 5 || h === 5 || i === 5) &&
                 (a === 6 || b === 6 || c === 6 || d === 6 || e === 6 || f === 6 || g === 6 || h === 6 || i === 6) &&
                 (a === 7 || b === 7 || c === 7 || d === 7 || e === 7 || f === 7 || g === 7 || h === 7 || i === 7) &&
                 (a === 8 || b === 8 || c === 8 || d === 8 || e === 8 || f === 8 || g === 8 || h === 8 || i === 8) &&
                 (a === 9 || b === 9 || c === 9 || d === 9 || e === 9 || f === 9 || g === 9 || h === 9 || i === 9);
        });  
    }
    constrainBlock(0, 0);
    constrainBlock(3, 0);
    constrainBlock(6, 0);
    constrainBlock(0, 3);
    constrainBlock(3, 3);
    constrainBlock(6, 3);
    constrainBlock(0, 6);
    constrainBlock(3, 6);
    constrainBlock(6, 6);
    
    //INSIGHT: Maybe these functions should just take a set!
    //Maybe these domains should be a "Set" and the function also gets a set...



    //Set up values in board:
    p.changeVariable("d1", [1]);
    p.changeVariable("f1", [6]);
    p.changeVariable("h1", [9]);
    
    p.changeVariable("c2", [3]);
    p.changeVariable("d2", [4]);
    p.changeVariable("f2", [2]);
    p.changeVariable("h2", [5]);
    
    p.changeVariable("b3", [2]);
    p.changeVariable("c3", [9]);
    p.changeVariable("e3", [3]);
    p.changeVariable("f3", [7]);
    p.changeVariable("g3", [1]);
    
    p.changeVariable("b4", [8]);
    p.changeVariable("g4", [2]);
    p.changeVariable("h4", [6]);
    p.changeVariable("i4", [3]);
    
    p.changeVariable("c5", [6]);
    p.changeVariable("d5", [2]);
    p.changeVariable("f5", [3]);
    p.changeVariable("g5", [9]);
    
    p.changeVariable("a6", [2]);
    p.changeVariable("b6", [3]);
    p.changeVariable("c6", [7]);
    p.changeVariable("h6", [1]);
    
    p.changeVariable("c7", [8]);
    p.changeVariable("d7", [6]);
    p.changeVariable("e7", [7]);
    p.changeVariable("g7", [4]);
    p.changeVariable("h7", [2]);
    
    p.changeVariable("b8", [6]);
    p.changeVariable("d8", [8]);
    p.changeVariable("f8", [4]);
    p.changeVariable("g8", [7]);
    
    p.changeVariable("b9", [5]);
    p.changeVariable("d9", [3]);
    p.changeVariable("f9", [9]);
    


    document.getElementById("version").innerHTML = csp.version;
    
    vhtml = document.getElementById("variables");
    vhtml.innerHTML = "";
    for (v in p.variables) {
      vhtml.innerHTML += (p.variables[v].toString() + "<br/>");
    }
    
    document.getElementById("constraints").innerHTML = p.constraints.reduce(function(pV, cV, i, a) {
      return pV + cV + "<br/>"; 
    }, "")
    
    var sol = p.getSolution();
    var sh = document.getElementById("solution");
    for (var v in sol) {
      sh.innerHTML += (v + " = " + sol[v] + "<br/>");
    }
    
    var allSoln = p.getSolutions();
    var sh = document.getElementById("allsolutions");
    for (var i in allSoln) {
      var soln = allSoln[i];
      sh.innerHTML += "{ ";
      for (var j in soln) {
        sh.innerHTML += (j + "=" + soln[j] + " ");
      }
      sh.innerHTML += "}<br/>"
    }   
    
  }
);