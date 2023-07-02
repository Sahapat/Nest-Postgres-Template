import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*+(spec).[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@mocks/(.*)$': '<rootDir>/__mocks__/$1',
    '^@tests/(.*)$': '<rootDir>/__tests__/$1',
  },

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  testEnvironment: 'node',

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
}

export default config
