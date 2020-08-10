const { compose, map } = require('./index');

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

describe('map utility', () => {
    test('should call mapped function on mappable', () => {
        const increment = (a) => a + 1;
        const values = [1, 2, 3, 4, 5];
        const expected = [2, 3, 4, 5, 6];
        const finalValue = map(increment)(values);

        expect(finalValue).toEqual(expected);
    });

    test('should through error when value is not valid mappable', () => {
        const increment = (a) => a + 1;
        const values = 23;
        const mapValue = map(increment);

        expect(() => mapValue(values)).toThrow(Error);
    });

    test('should through error when passed function is not valid function', () => {
        const increment = 23;
        const values = [1, 2, 3, 4, 5];
        const mapValue = map(increment);

        expect(() => mapValue(values)).toThrow(Error);
    });
});
