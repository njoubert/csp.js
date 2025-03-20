/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: "jest-bench/environment",
    reporters: ["default", "jest-bench/reporter"],
    testRegex: "\\.bench\\.tsx?$",
    transform: {
        "^.+\.tsx?$": ["ts-jest", {}],
    },
};