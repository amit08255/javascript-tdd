const { compose } = require('./index');

describe('compose utility', () => {
    test('should return function', () => {
        const increment = (a) => a + 1;
        const incFun = compose(increment);

        expect(incFun).toEqual(expect.any(Function));
    });

    test('should call function composed', () => {
        const increment = (a) => a + 1;
        const incFun = compose(increment, increment);
        const result = incFun(2);
        expect(result).toBe(4);
    });

    test('should throw error when composed function is null', () => {
        const increment = (a) => a + 1;
        const incFun = compose(null, increment);
        expect(() => incFun(2)).toThrow(Error);
    });

    test('should throw error when composed value is not function', () => {
        const increment = (a) => a + 1;
        const x = 23;
        const incFun = compose(x, increment);
        expect(() => incFun(2)).toThrow(Error);
    });
});
