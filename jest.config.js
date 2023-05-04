module.exports = {
  roots: ["<rootDir>/src"],
  coverageDirectory: './coverage',
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
