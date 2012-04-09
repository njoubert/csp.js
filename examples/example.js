require.config({
	baseUrl: "../src/"
});

require(
	
	['csp'],
	
	function(csp) {
		
		
		var p = csp.DiscreteProblem();
		
		p.addVariable("a", [1,2,3]);
		p.addVariable("b", [4,5,6]);
		
		p.addConstraint(
			["a", "b"],
			function(v1, v2) { return v1*2 === v2; }
		);
		

		document.getElementById("version").itterHTML = csp.version;
		
		document.getElementById("variables").innerHTML = p.variables.reduce(function(pV, cV, i, a) {
			return pV + cV + "<br/>"; 
		}, "")
		
		document.getElementById("constraints").innerHTML = p.constraints.reduce(function(pV, cV, i, a) {
			return pV + cV + "<br/>"; 
		}, "")
		
	}
);