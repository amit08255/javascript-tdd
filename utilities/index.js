/**
 * Compose utility to design reusable code with small functions in pipeline.
 * Functions in compose utility is executed from right to left.
 * Right-most function can receive any number of parameters but other functions
 * in pipeline can only receive one parameter from pipeline.
 * Below code will execute add function then inc function whereas add function receives
 * 2 and 3 as parameter whereas inc function receives value returned by add function.
 * @example
 * const addAndInc = compose(increment, add);
 * addAndInc(2, 3);
 * @param  {...any} fns Functions to execute in pipeline
 */
export const compose = (...fns) => (...args) => fns.reduceRight(
    (res, fn) => [fn.call(null, ...res)], args,
)[0];

/**
 * It expects a function as input and returns its curried version.
 * @param {Function} fn
 * @param {*} args
 * @returns {Function}
 * @example
 *      const fn = (a, b, c) => a + b + c
        const curried = curry(fn)
        const sum = curried(1,2)

        const result = sum(3) // => 6
 */
export function curry(fn, args = []) {
    return (..._args) => ((rest) => (rest.length >= fn.length ? fn(...rest) : curry(fn, rest)))([
        ...args,
        ..._args,
    ]);
}

/**
 * Map utility is used with mappable values like - array to map values with
 * given function to process on every value in mappable.
 * @example
 * const processArray = map(converValueToUpperCase);
 * processArray(stringArray);
 * @param {function} fn
 * @returns {(mappable:any) => any}
 */
export const map = (fn) => (mappable) => mappable.map(fn);

/**
 * Filters array values with given function and array
 * @example
 * const filterArr = filter(fiterNumberValues);
 * const filteredArray = filterArr(arrValue);
 * @param {function} fn
 * @returns {(arr:Array<any>) => Array<any>}
 */
export const filter = (fn) => (arr) => arr.reduce(
    (newArr, item) => (fn(item) ? newArr.concat([item]) : newArr), [],
);

/**
 * Returns sum of two numbers
 * @param {number} a
 * @returns {(b:number) => number}
 */
export const add = (a) => (b) => a + b;

export const inc = add(1);

/**
 * Calls function f when function cond returns true for value x
 * @param {function} cond
 * @param {function} f
 * @returns {(x:any) => any}
 */
export const when = (cond, f) => (x) => (cond(x) ? f(x) : x);

/**
 * Calls function f when function cond returns false for value x
 * @param {function} cond
 * @param {function} f
 * @returns {(x:any) => any}
 */
export const unless = (cond, f) => (x) => (cond(x) ? x : f(x));

/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @example
 *
 *      not(true); //=> false
 *      not(false); //=> true
 *      not(0); //=> true
 *      not(1); //=> false
 */
export const not = (a) => !a;

/**
 * Checks equality of values
 * @param {any} a
 * @returns {(b:any) => boolean}
 */
export const isEqual = curry((a, b) => a === b);

export const isNotEqual = curry((a, b) => a !== b);

/**
 * Returns `true` if both arguments are `true`; `false` otherwise.
 */
export const and = curry((a, b) => a && b);

/**
 * Returns `true` if either arguments are `true`; `false` otherwise.
 */
export const or = curry((a, b) => a || b);

export const concatString = (a) => (b) => a + b;

export const getEmptyObject = () => {};

export const isObject = (x) => Object.prototype.toString.call(x) === '[object Object]';

export const isValueEmpty = (val) => (`${val}`).trim().length <= 0;

export const isValueNumber = (val) => typeof val === 'number';

/**
 * Determine if the passed argument is an integer.
 *
 * @param {*} n
 * @return {Boolean}
 */

export const isInteger = (n) => typeof n === 'number' && n % 1 === 0;

export const isString = (x) => Object.prototype.toString.call(x) === '[object String]';

export const isValidValue = (val) => (val !== undefined && val !== null);

export const isArrayEmpty = (val) => Array.isArray(val) && val.length < 1;

export const isArray = (val) => (
    (val != null
        && val.length >= 0
        && Object.prototype.toString.call(val) === '[object Array]')
);

export const isNotArray = (val) => !Array.isArray(val);

export const getEmptyArray = () => [];

export const getNull = () => null;

/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * @param {number} a
 * @returns {function(number): number}
 */
export const modulo = (a) => (b) => a % b;

/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @example
 * call(add, 1, 2); //=> 3
 */
export function call(fn, ...args) {
    return fn.apply(this, Array.prototype.slice.call(args, 1));
}

/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      const t = always('Tee');
 *      t(); //=> 'Tee'
 */
export const always = (val) => () => val;

/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      identity(1); //=> 1
 *
 *      const obj = {};
 *      identity(obj) === obj; //=> true
 */
export const identity = (x) => x;

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 * @param {string} str
 * @returns {(list:Array<any>) => string}
 */
export const join = (str) => (list) => list.join(str);

/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @param {String} prop The property name to set
 * @returns {(newValue:any) => (obj:any) => any}
 * @example
 *
 *      assoc('c')(3)({a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */

export const assoc = (prop) => (newValue) => (obj = {}) => ({
    ...obj, [prop]: newValue,
});

export const getPromiseFromValue = (value) => (new Promise(
    (resolve) => {
        resolve(value);
    },
));

export const isFunction = (x) => {
    const type = Object.prototype.toString.call(x);

    return type === '[object Function]'
      || type === '[object AsyncFunction]'
      || type === '[object GeneratorFunction]'
      || type === '[object AsyncGeneratorFunction]';
};

export const isPromise = (promise) => {
    if (promise == null || !isFunction(promise.then)) {
        return false;
    }

    return true;
};

/**
 * Returns the result of applying the onSuccess function to the value
 * inside a successfully resolved promise.
 * This is useful for working with promises inside function compositions.
 * @param {function} callback
 * @returns{(promise:Promise) => any}
 */
export const andThen = (callback) => (promise) => (
    isPromise(promise) === true ? promise.then(callback) : null
);

/**
 * Returns the result of applying the onFailure function to the value inside a failed promise.
 * This is useful for handling rejected promises inside function compositions.
 * @param {function} callback
 * @returns{(promise:Promise) => any}
 */
export const otherwise = (callback) => (promise) => (
    isPromise(promise) === true ? promise.then(null, callback) : null
);

// An utility function to be used with async function to handle promise (API calls) with await
// without writing exception codes
export const then = (promise) => promise.then((data) => [null, data])
    .catch((err) => [err]);

/**
 * Runs array of promises in parallel and returns a promise which resolves when all
 * promises are resolved.
 * @param array
 * @returns {Promise<unknown[]>}
 */
export const promiseAll = (array) => Promise.all(array);

/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 * @param {Array<string>} _path
 * @returns {(obj:any) => boolean}
 */
export const hasPath = (_path) => (obj) => {
    if (_path.length === 0 || isValidValue(obj)) {
        return false;
    }
    let val = obj;
    let idx = 0;
    while (idx < _path.length) {
        if (!isValidValue(val) && Object.prototype.hasOwnProperty.call(_path[idx], val)) {
            val = val[_path[idx]];
            idx += 1;
        } else {
            return false;
        }
    }
    return true;
};

/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @param {string} prop
 * @returns {(obj:any) => boolean}
 */
export const has = (prop) => (obj) => hasPath([prop], obj);

/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @example
 *
 *      pick(['a', 'd'])({a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      pick(['a', 'e', 'f'])({a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */
export const pick = (names, obj) => {
    const result = {};
    let idx = 0;
    while (idx < names.length) {
        if (names[idx] in obj) {
            result[names[idx]] = obj[names[idx]];
        }
        idx += 1;
    }
    return result;
};

function objectAssign(target, ...args) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    const output = Object(target);
    let idx = 0;
    const { length } = args;

    while (idx < length) {
        const source = args[idx];
        if (source != null) {
            Object.keys(source).forEach((key) => {
                output[key] = source[key];
            });
        }

        idx += 1;
    }

    return output;
}

/**
 * Merges a list of objects together into one object.
 *
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @example
 *      mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 */
export const mergeAll = (list) => objectAssign(...[{}].concat(list));

/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @param {Object} l
 * @return {(r:Object) => Object}
 * @example
 *
 *      mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const withDefaults = mergeRight({x: 0, y: 0});
 *      withDefaults({y: 2}); //=> {x: 0, y: 2}
 */
export const mergeRight = (l) => (r) => objectAssign({}, l, r);

/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the first object will be used.
 *
 * @param {Object} l
 * @return {(r:Object) => Object}
 * @example
 *
 *      mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const resetToDefault = mergeLeft({x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 */
export const mergeLeft = (l) => (r) => objectAssign({}, r, l);

/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 * @param {Number} offset
 * @returns {(list:any) => any}
 * @example
 *
 *      const list = ['foo', 'bar', 'baz', 'quux'];
 *      nth(1)(list); //=> 'bar'
 *      nth(-1)(list); //=> 'quux'
 *      nth(-99)(list); //=> undefined
 *
 *      nth(2)('abc'); //=> 'c'
 *      nth(3)('abc'); //=> ''
 */

export const nth = (offset) => (list) => {
    const idx = offset < 0 ? list.length + offset : offset;
    return isString(list) ? list.charAt(idx) : list[idx];
};

/**
 * Retrieves the values at given paths of an object.
 * @param {Array} pathsArray The array of paths to be fetched.
 * @return {(obj:Object) => Array} obj The object to retrieve the nested properties from.
 * @example
 *
 *      paths([['a', 'b'], ['p', 0, 'q']])({a: {b: 2}, p: [{q: 3}]}); //=> [2, 3]
 *      paths([['a', 'b'], ['p', 'r']])({a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]
 */
export const paths = (pathsArray) => (obj) => pathsArray.map((path) => {
    let val = obj;
    let idx = 0;
    let p;

    while (idx < path.length) {
        if (val == null) {
            return;
        }
        p = path[idx];
        val = isInteger(p) ? nth(p)(val) : val[p];
        idx += 1;
    }

    // eslint-disable-next-line consistent-return
    return val;
});

/**
 * Retrieve the value at a given path.
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {(obj:Object) => any} The data at `path`.
 * @example
 *
 *      path(['a', 'b'])({a: {b: 2}}); //=> 2
 *      path(['a', 'b'])({c: {b: 2}}); //=> undefined
 *      path(['a', 'b', 0])({a: {b: [1, 2, 3]}}); //=> 1
 *      path(['a', 'b', -2])({a: {b: [1, 2, 3]}}); //=> 2
 */
export const path = (pathAr) => (obj) => paths([pathAr])(obj)[0];

export const concatList = (set1) => (set2) => {
    const seta = set1 || [];
    const setb = set2 || [];
    let idx;
    const len1 = set1.length;
    const len2 = set2.length;
    const result = [];

    idx = 0;
    while (idx < len1) {
        result[result.length] = seta[idx];
        idx += 1;
    }
    idx = 0;
    while (idx < len2) {
        result[result.length] = setb[idx];
        idx += 1;
    }
    return result;
};

/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 * @param {*} el The element to add to the end of the new list.
 * @return {(list:Array) => Array}
 * A new list containing the elements of the old list followed by `el`.
 * @example
 *
 *      append('tests')(['write', 'more']); //=> ['write', 'more', 'tests']
 *      append('tests')([]); //=> ['tests']
 *      append(['tests'])(['write', 'more']); //=> ['write', 'more', ['tests']]
 */
export const append = (el) => (list) => concatList(list)([el]);

/**
 * Tests whether or not an object is similar to an array.
 * @param {*} x The object to test.
 * @return {Boolean}
 * `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      isArrayLike([]); //=> true
 *      isArrayLike(true); //=> false
 *      isArrayLike({}); //=> false
 *      isArrayLike({length: 10}); //=> false
 *      isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
const isArrayLike = (x) => {
    if (isArray(x)) { return true; }
    if (!x) { return false; }
    if (typeof x !== 'object') { return false; }
    if (isString(x)) { return false; }
    if (x.nodeType === 1) { return !!x.length; }
    if (x.length === 0) { return true; }
    if (x.length > 0) {
        return (
            Object.prototype.hasOwnProperty.call(x, 0)
            && Object.prototype.hasOwnProperty.call(x, x.length - 1)
        );
    }
    return false;
};

/**
 * `makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 */
export default function makeFlat(recursive) {
    return function flatt(list) {
        let value; let jlen; let
            j;
        const result = [];
        let idx = 0;
        const ilen = list.length;

        while (idx < ilen) {
            if (isArrayLike(list[idx])) {
                value = recursive ? flatt(list[idx]) : list[idx];
                j = 0;
                jlen = value.length;
                while (j < jlen) {
                    result[result.length] = value[j];
                    j += 1;
                }
            } else {
                result[result.length] = list[idx];
            }
            idx += 1;
        }
        return result;
    };
}

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 * @func
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @example
 *
 *      flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
export const flatten = makeFlat(true);

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
function checkForMethod(methodname, fn) {
    function func(...args) {
        const { length } = args;
        if (length === 0) {
            return fn();
        }
        const obj = args[length - 1];
        return (isArray(obj) || typeof obj[methodname] !== 'function')
            ? fn.apply(this, args)
            : obj[methodname].apply(obj, ...args);
    }
    return func;
}

/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @example
 *
 *      const printXPlusFive = x => console.log(x + 5);
 *      forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 *      forEach(f, [a, b, c]) = [a, b, c]
 */
export const forEach = checkForMethod('forEach', (fn) => (list) => {
    const len = list.length;
    let idx = 0;
    while (idx < len) {
        fn(list[idx]);
        idx += 1;
    }
    return list;
});

/**
 * Remove duplicate values from array by comparing a given list of values returned by a function
 * @param {Function} func Function to return array of values used to filter item with
 * @return {(arr:Array) => Array}
 * @example
 *      const fun = (item) => [item.id, item.name];
 *      const data = [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 1, name: 'a'}];
 *      const result = uniqBy(fun)(data) //=> [{id: 1, name: 'a'}, {id: 2, name: 'b'}]
 */
export const uniqBy = (func) => (arr) => {
    const seen = new Set();

    return arr.filter((it) => {
        const values = func(it);
        const exists = values.filter((v) => seen.has(v));
        if (exists.length === values.length) {
            return false;
        }
        values.map((v) => seen.add(v));
        return true;
    });
};
