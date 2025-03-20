import { benchmarkSuite } from "jest-bench";
import { DiscreteFiniteProblem_RecursiveBacktrackingSolver } from "./discrete-finite";

benchmarkSuite("generic", {
    ["three variables, two constraints"]: () => {
        const csp = new DiscreteFiniteProblem_RecursiveBacktrackingSolver();

        csp.addVariable("a", [1, 2, 3]);
        csp.addVariable("b", [4, 5, 6]);
        csp.addVariable("c", [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

        csp.addConstraint(
            ["a", "b"],
            function (a, b) { return a * 2 === b; }
        );

        csp.addConstraint(
            ["b", "c"],
            function (b, c) { return b * 2 === c; }
        );

        csp.getAllSolutions();
    },
});
