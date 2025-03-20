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

    private solve({ assignments, single }: { assignments: Record<string, number>, single: boolean }) {
        if (Object.keys(assignments).length === Object.keys(this.variables).length) {
            if (!single) {
                this.allAssignments.push({ ...assignments });
            }
            return true;
        }

        // Find the next variable.
        let nextVar: string | undefined;
        for (const v in this.variables) {
            let found = false;
            for (const a in assignments) {
                if (v === a) {
                    found = true;
                }
            }
            if (!found) {
                nextVar = v;
                break;
            }
        }

        const checkAssignment = (nextVar: string, val: number) => {
            assignments[nextVar] = val;
            for (const c in this.constraints) {
                const args = [];
                let valid = true;

                // Try to build the argument list for this constraint...
                for (const k in this.constraints[c].variables) {
                    const fp = this.constraints[c].variables[k];
                    if (assignments[fp] !== undefined) {
                        args.push(assignments[fp]);
                    } else {
                        valid = false;
                        break;
                    }
                }

                if (valid) {
                    // We can check it, so check it.
                    if (!this.constraints[c].fn.apply(null, args)) {
                        delete assignments[nextVar];
                        return false;
                    }
                }
            }
            delete assignments[nextVar];
            return true;
        };

        if (nextVar !== undefined) {
            // Try the values in its domain.
            const domain = this.variables[nextVar];
            for (const j in domain) {
                const val = domain[j];
                if (checkAssignment(nextVar, val)) {
                    assignments[nextVar] = val;
                    if (this.solve({ assignments, single })) {
                        if (single) {
                            return true;
                        }
                    }
                    delete assignments[nextVar];
                }
            }
        }
        return false;
    }
}
