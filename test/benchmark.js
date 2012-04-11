/* 

Benchmarks for the different solvers... 

Look at jQuery to see how they benchmark without function call overhead.
*/

require.config({
  baseUrl: "../src/"
});

require(
  
  ['csp', 'benchmarker'],
  
  function(csp, benchmarker) {
    
    
    function benchmarkMe() {
          
      var currentdiv;

      outerdiv = document.getElementById("output");


      function pushChunkEl() {
        currentdiv = document.createElement("table");
        currentdiv.className = "output_table"
        outerdiv.appendChild(currentdiv);
      }

      function getOutputEl(par) {
        var newdiv = document.createElement("tr");
        newdiv.className = "output_row";
        par.appendChild(newdiv);
        return newdiv;      
      }

      //-------------------------------------------

      pushChunkEl();


      var Setup1 = function() {

        this.p = csp.DiscreteProblem();

        this.p.addVariable("a", [1,2,3]);
        this.p.addVariable("b", [4,5,6]);
        this.p.addVariable("c", [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);

        this.p.addConstraint(
          ["a", "b"],
          function(a, b) { return a*2 === b; }
        );

        this.p.addConstraint(
          ["b", "c"],
          function(b, c) { return b*2 === c; }
        );

      }

      benchmarker.config(getOutputEl(currentdiv));
      benchmarker.measure(
        "DiscreteProblem.getSolution 3 vars 2 consts",
        100,
        {
          setup: Setup1,
          test: function() {
            var sol = this.p.getSolution();
          }
        });

      benchmarker.config(getOutputEl(currentdiv));
      benchmarker.measure(
        "DiscreteProblem.getSolutions 3 vars 2 consts",
        100,
        {
          setup: Setup1,
          test: function() {
            var allSoln = this.p.getSolutions();
          }
        });

      //-------------------------------------------

      pushChunkEl();


      var Setup2 = function() {

        this.p = csp.DiscreteProblem();

        allVars = [];
        for (var a = 65; a < 91; a++) {
          allVars.push(String.fromCharCode(a));
          this.p.addVariable(String.fromCharCode(a), [1,2,3]);
        }


        this.p.addConstraint(
          ["A", "B"],
          function(a, b) { return (a === 1); }
        );
        
        // this.p.addConstraint(
        //   allVars,
        //   function() { 
        //     var first = 9;
        //     for (var i in arguments) {
        //       
        //       if (arguments[i] !== first) {
        //         return false;
        //       }
        //     }
        //     return true; 
        //   }
        // );



      }

      benchmarker.config(getOutputEl(currentdiv));
      benchmarker.measure(
        "DiscreteProblem.getSolution 50 vars 10 ints 2 constraintS",
        1,
        {
          setup: Setup2,
          test: function() {
            var sol = this.p.getSolution();
            console.log(sol);
          }
        });

      // benchmarker.config(getOutputEl(currentdiv));
      // benchmarker.measure(
      //   "DiscreteProblem.getSolutions 100 vars 10 ints 1 constraint",
      //   1,
      //   {
      //     setup: Setup2,
      //     test: function() {
      //       var allSoln = this.p.getSolutions();
      //       console.log(allSoln);
      //     }
      //   });
        
      document.getElementById("spinner").style.display = "none";
      
    }
    
    document.onreadystatechange = function() {
      if (document.readyState == "complete") {
        document.getElementById("spinner").style.display = "block";
        benchmarkMe();
      }
    }
    

    
      
      
      
    
    
  }
);