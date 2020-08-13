/* eslint-disable */
import { EventOverride } from './EventOverride';
export class ProgressEventPolyfill extends EventOverride {
    constructor(type, init) {
        super(type);
        this.lengthComputable = (init === null || init === void 0 ? void 0 : init.lengthComputable) || false;
        this.composed = (init === null || init === void 0 ? void 0 : init.composed) || false;
        this.loaded = (init === null || init === void 0 ? void 0 : init.loaded) || 0;
        this.total = (init === null || init === void 0 ? void 0 : init.total) || 0;
    }
}
