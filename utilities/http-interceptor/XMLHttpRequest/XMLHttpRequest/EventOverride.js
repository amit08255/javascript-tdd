/* eslint-disable */
export class EventOverride {
    constructor(type, options) {
        this.AT_TARGET = 0;
        this.BUBBLING_PHASE = 0;
        this.CAPTURING_PHASE = 0;
        this.NONE = 0;
        this.type = '';
        this.srcElement = null;
        this.currentTarget = null;
        this.eventPhase = 0;
        this.isTrusted = true;
        this.composed = false;
        this.cancelable = true;
        this.defaultPrevented = false;
        this.bubbles = true;
        this.lengthComputable = true;
        this.loaded = 0;
        this.total = 0;
        this.cancelBubble = false;
        this.returnValue = true;
        this.type = type;
        this.target = (options === null || options === void 0 ? void 0 : options.target) || null;
        this.currentTarget = (options === null || options === void 0 ? void 0 : options.currentTarget) || null;
        this.timeStamp = Date.now();
    }
    composedPath() {
        return [];
    }
    initEvent(type, bubbles, cancelable) {
        this.type = type;
        this.bubbles = !!bubbles;
        this.cancelable = !!cancelable;
    }
    preventDefault() {
        this.defaultPrevented = true;
    }
    stopPropagation() { }
    stopImmediatePropagation() { }
}
