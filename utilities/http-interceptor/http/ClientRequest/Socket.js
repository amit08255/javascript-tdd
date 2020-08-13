/* eslint-disable */
import { EventEmitter } from 'events';
export class Socket extends EventEmitter {
    constructor(options, socketOptions) {
        super();
        if (socketOptions.usesHttps) {
            this.authorized = true;
        }
        this.bufferSize = 0;
        this.writableLength = 0;
        this.writable = true;
        this.readable = true;
        this.pending = false;
        this.destroyed = false;
        this.connecting = false;
        this.totalDelayMs = 0;
        this.timeoutMs = null;
        const ipv6 = options.family === 6;
        this.remoteFamily = ipv6 ? 'IPv6' : 'IPv4';
        this.localAddress = this.remoteAddress = ipv6 ? '::1' : '127.0.0.1';
        this.localPort = this.remotePort = this.resolvePort(options.port);
    }
    resolvePort(port) {
        if (port == null) {
            return 0;
        }
        if (typeof port === 'number') {
            return port;
        }
        return parseInt(port);
    }
    address() {
        return {
            port: this.remotePort,
            family: this.remoteFamily,
            address: this.remoteAddress,
        };
    }
    applyDelay(duration) {
        this.totalDelayMs += duration;
        if (this.timeoutMs && this.totalDelayMs > this.timeoutMs) {
            this.emit('timeout');
        }
    }
    /**
     * Enable/disable the use of Nagle's algorithm.
     * Nagle's algorithm delays data before it is sent via the network.
     */
    setNoDelay(noDelay = true) {
        if (noDelay) {
            this.totalDelayMs = 0;
        }
        return this;
    }
    /**
     * Enable/disable keep-alive functionality, and optionally set the initial delay before
     * the first keepalive probe is sent on an idle socket.
     */
    setKeepAlive() {
        return this;
    }
    setTimeout(timeout, callback) {
        setTimeout(() => {
            callback === null || callback === void 0 ? void 0 : callback();
            this.emit('timeout');
        }, timeout);
        return this;
    }
    getPeerCertificate() {
        return Buffer.from((Math.random() * 10000 + Date.now()).toString()).toString('base64');
    }
    // Mock methods required to write to the response body.
    pause() {
        return this;
    }
    resume() {
        return this;
    }
    cork() { }
    uncork() { }
    destroy(error) {
        this.destroyed = true;
        this.readable = this.writable = false;
        if (error) {
            this.emit('error', error);
        }
        return this;
    }
}
