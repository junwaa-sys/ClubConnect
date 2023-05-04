const config = {
  verbose: true,
  // transform: {
  //   '^.+\\.(js|jsx)$': 'babel-jest',
  //   '^.+\\.[jt]sx?$': 'babel-jest',
  //   '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  // },
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['node_modules', '<rootDir>/server/server.ts'],
}

module.exports = config
