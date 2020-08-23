const jestCommon = require('./jest-common');

module.exports = {
    ...jestCommon,
    displayName: 'client',
    testEnvironment: 'jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx$',
};
