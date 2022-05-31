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
    // '.+\\.(ts|tsx)$': 'ts-jest',
    // https://github.com/swc-project/swc-node/issues/635#issuecomment-1070766669
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        transform: {
          react: { runtime: 'automatic' }
        }
      }
    }],
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  // https://jestjs.io/docs/27.x/configuration#setupfilesafterenv-array
  // https://jestjs.io/docs/27.x/configuration#setupfiles-array
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
