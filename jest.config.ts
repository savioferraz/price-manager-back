export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testMatch: ["**/*.(test|spec).ts"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  setupFiles: ["<rootDir>/tests/setup-envs.ts"],
  moduleNameMapper: {
    "^@schemas/(.*)$": "<rootDir>/src/schemas/$1",
  },
};
