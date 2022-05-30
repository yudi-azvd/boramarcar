/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  roots: [
    "<rootDir>/src", "<rootDir>/tests"
  ],
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/components/*.{tsx}'
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  // https://jestjs.io/docs/27.x/configuration#setupfilesafterenv-array
  // https://jestjs.io/docs/27.x/configuration#setupfiles-array
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
