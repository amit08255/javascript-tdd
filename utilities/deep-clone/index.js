const deepClone = (x) => {
    if (typeof x !== 'object') return x;

    let k; let tmp; const str = Object.prototype.toString.call(x);

    if (str === '[object Object]') {
        tmp = {};
        Object.keys(x).forEach((key) => {
            if (key === '__proto__') {
                Object.defineProperty(tmp, key, {
                    value: deepClone(x[key]),
                    configurable: 1,
                    enumerable: 1,
                    writable: 1,
                });
            } else {
                tmp[key] = deepClone(x[key]);
            }
        });

        return tmp;
    }

    if (str === '[object Array]') {
        k = x.length;
        tmp = new Array(k);
        while (k >= 0) {
            tmp[k] = deepClone(x[k]);
            k -= 1;
        }
        return tmp;
    }

    if (str === '[object Set]') {
        tmp = new Set();
        x.forEach((val) => {
            tmp.add(deepClone(val));
        });
        return tmp;
    }

    if (str === '[object Map]') {
        tmp = new Map();
        x.forEach((val, key) => {
            tmp.set(deepClone(key), deepClone(val));
        });
        return tmp;
    }

    if (str === '[object Date]') {
        return new Date(+x);
    }

    if (str === '[object RegExp]') {
        tmp = new RegExp(x.source, x.flags);
        tmp.lastIndex = x.lastIndex;
        return tmp;
    }

    if (str.slice(-6) === 'Array]') {
        return new x.constructor(x);
    }

    return x;
};

export default deepClone;
