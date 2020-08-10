module.exports = {
    rootDir: './',
    verbose: true,
    testEnvironment: 'node',
    /* "moduleNameMapper": {
      "^utilities/(.*)": "<rootDir>/utilities/$1",
      "^services/(.*)": "<rootDir>/services/$1",
      "^contexts/(.*)": "<rootDir>/contexts/$1",
      "^components/(.*)": "<rootDir>/components/$1",
      "^containers/(.*)": "<rootDir>/containers/$1"
    }, */
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/.next/',
        'enzyme.js',
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'node',
    ],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/dist/'],
};
