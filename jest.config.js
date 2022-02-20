module.exports = {
  roots: [
    "<rootDir>/src", "<rootDir>/tests"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/*.{tsx}'
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
};
