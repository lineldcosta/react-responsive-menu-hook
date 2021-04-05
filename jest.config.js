module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '\\.(js|ts|tsx)?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/?(*.)test.{js,ts,tsx}'], // looks for your test
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
}
