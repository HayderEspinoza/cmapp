module.exports = {
  testEnvironment: 'node',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/(node_modules)/',
    '<rootDir>/(index|jest.config|routes|setupTest).js'
  ],
  collectCoverage: true,
  coverageReporters: ['lcov']
};
