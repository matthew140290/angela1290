module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/assets/js/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};