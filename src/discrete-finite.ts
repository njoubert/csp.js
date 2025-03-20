interface Constraint {
    variables: readonly string[];
    fn: (this: null, ...variables: number[]) => boolean;
}

/**
 * Recursive backtracking solver for discrete-finite constraint satisfaction problems.
 */
export class DiscreteFiniteProblem_RecursiveBacktrackingSolver {
    private allAssignments: Record<string, number>[] = [];
    private variables: Record<string, readonly number[]> = {};
    private constraints: Constraint[] = [];

    addVariable(variableName: string, domain: readonly number[]) {
        this.variables[variableName] = domain;
    }

    removeVariable(variableName: string) {
        delete this.variables[variableName];
    }

    addConstraint<const VariableNames extends readonly string[]>(
        variables: VariableNames,
        constraintFunction: (this: null, ...variables: { [Name in keyof VariableNames]: number }) => boolean
    ): void {
        if (variables.length === 0) {
            return;
        }
        this.constraints.push({ variables, fn: constraintFunction as Constraint["fn"] });
    }

    getSingleSolution(): Record<string, number> {
        const assignments = {};
        return this.solve({ assignments, single: true }) ? assignments : {};
    }

    getAllSolutions(): Record<string, number>[] {
        const assignments = {};
        this.solve({ assignments, single: false });
        return this.allAssignments;
    }

    private solve({ assignments, single }) {
        if (Object.keys(assignments).length === Object.keys(this.variables).length) {
            if (!single) {
                this.allAssignments.push({ ...assignments });
            }
            return true;
        }

        // Find the next variable.
        let nextVar = null;
        for (const v in this.variables) {
            let found = false;
            for (const a in assignments) {
                if (v === a) {
                    found = true;
                }
            }
            if (!found) {
                nextVar = this.variables[v];
                break;
            }
        }

        const checkAssignment = (nextVar, val) => {
            assignments[nextVar.name] = val;
            for (const c in this.constraints) {
                const args = [];
                let valid = true;

                // Try to build the argument list for this constraint...
                for (const k in this.constraints[c].variables) {
                    const fp = this.constraints[c].variables[k];
                    if (typeof assignments[fp] != "undefined") {
                        args.push(assignments[fp]);
                    } else {
                        valid = false;
                        break;
                    }
                }

                if (valid) {
                    // We can check it, so check it.
                    if (!this.constraints[c].fn.apply(null, args)) {
                        delete assignments[nextVar.name];
                        return false;
                    }
                }
            }
            delete assignments[nextVar.name];
            return true;
        };

        // Try the values in its domain.
        for (const j in nextVar.domain) {
            const val = nextVar.domain[j];
            if (checkAssignment(nextVar, val)) {
                assignments[nextVar.name] = val;
                if (this.solve({ assignments, single })) {
                    if (single) {
                        return true;
                    }
                }
                delete assignments[nextVar.name];
            }
        }
        return false;
    }
}
