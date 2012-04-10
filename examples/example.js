require.config({
	baseUrl: "../src/"
});

require(
	
	['csp'],
	
	function(csp) {
		
		
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