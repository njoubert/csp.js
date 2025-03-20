import { DiscreteFiniteProblem_RecursiveBacktrackingSolver } from "./discrete-finite";

describe("DiscreteFiniteProblem_RecursiveBacktrackingSolver", () => {
    test("simple example with three variables", () => {
        const csp = new DiscreteFiniteProblem_RecursiveBacktrackingSolver();

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

        const oneSolution = csp.getSingleSolution();
        expect(oneSolution).toEqual({ a: 2, b: 4, c: 8 });

        const allSolutions = csp.getAllSolutions();
        expect(allSolutions).toEqual(expect.arrayContaining([ { a: 2, b: 4, c: 8 }, { a: 3, b: 6, c: 12 } ]));
    });
});