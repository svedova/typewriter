module.exports = {
  verbose: true,
  bail: true,
  testPathIgnorePatterns: ["test/"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/*.test.{js,jsx}"
  ],
  coverageDirectory: "coverage/"
}
