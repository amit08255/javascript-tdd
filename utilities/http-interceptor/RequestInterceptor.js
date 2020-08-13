/* eslint-disable */
import { overrideModules } from './overrideModules';
const debug = require('debug')('RequestInterceptor');
export class RequestInterceptor {
    constructor() {
        this.applyMiddleware = async (req, ref) => {
            debug('applying middleware...', req);
            for (let middleware of this.middleware) {
                const res = await middleware(req, ref);
                if (res) {
                    return res;
                }
            }
        };
        this.middleware = [];
        debug('created new RequestInterceptor');
        this.overrides = overrideModules.map((override) => override(this.applyMiddleware));
    }
    /**
     * Restores original instances of patched modules.
     */
    restore() {
        debug('restore');
        this.overrides.forEach((restore) => restore());
    }
    /**
     * Applies given middleware to any intercepted request.
     */
    use(middleware) {
        debug('use', middleware);
        this.middleware.push(middleware);
    }
}
