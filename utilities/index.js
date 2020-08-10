import deepClone from './deep-clone';

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
 * Checks equality of values
 * @param {any} a
 * @returns {(b:any) => boolean}
 */
export const isEqual = (a) => (b) => a === b;

export const isNotEqual = (a) => (b) => a !== b;

export const concatString = (a) => (b) => a + b;

export const getEmptyObject = () => {};

export const isObject = (value) => typeof value === 'object';

export const isValueEmpty = (val) => (`${val}`).trim().length <= 0;

export const isValueNumber = (val) => typeof val === 'number';

export const isValidValue = (val) => (val !== undefined && val !== null);

export const isArrayEmpty = (val) => Array.isArray(val) && val.length < 1;

export const isArray = (val) => Array.isArray(val);

export const isNotArray = (val) => !Array.isArray(val);

export const getEmptyArray = () => [];

export const getNull = () => null;

export const getFirstArrayElement = (data) => data[0];

export const setJsonValue = (key) => (value) => (json = {}) => {
    const newJson = deepClone(json);
    newJson[key] = value;
    return newJson;
};

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
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
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
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
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
 *      R.mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const withDefaults = R.mergeRight({x: 0, y: 0});
 *      withDefaults({y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeRight(a, b) = {...a, ...b}
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
 *      R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const resetToDefault = R.mergeLeft({x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeLeft(a, b) = {...b, ...a}
 */
export const mergeLeft = (l) => (r) => objectAssign({}, r, l);
