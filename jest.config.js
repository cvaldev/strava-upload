module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js", "json", "jsx", "tsx", "node"],
    setupFiles: ["./test/test.mocks.ts"]
};
