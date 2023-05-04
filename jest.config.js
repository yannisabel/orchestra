module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageReporters: [
    'json-summary', 'lcov'
  ],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*?(.)types.{ts,tsx}',
    '!**/*?(.)stories.{ts,tsx}',
    '!**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 28.57,
      functions: 15.15,
      lines: 7.76,
      statements: 7.76
    }
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironment: 'jsdom',
  fakeTimers: {
    enableGlobally: true,
    legacyFakeTimers: true,
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$":
      "<rootDir>/__mock__/mock.js",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
}
