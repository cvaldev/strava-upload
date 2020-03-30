module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js", "tsx", "json"],
    setupFiles: ["./test/test.mocks.ts"],
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    globals: {
        "ts-jest": {
            tsConfig: "<rootDir>/tsconfig.jest.json"
        }
    }
};
