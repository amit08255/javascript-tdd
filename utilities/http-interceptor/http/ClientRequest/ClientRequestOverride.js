/* eslint-disable */
// @ts-nocheck
import { inherits } from 'util';
import http, { IncomingMessage } from 'http';
import { until } from '@open-draft/until';
import { reduceHeadersObject } from 'headers-utils';
import { Socket } from './Socket';
/* Utils */
import { DEFAULT_PATH } from '../../utils/getUrlByRequestOptions';
import { bodyBufferToString } from './utils/bodyBufferToString';
import { concatChunkToBuffer } from './utils/concatChunkToBuffer';
import { inheritRequestHeaders } from './utils/inheritRequestHeaders';
import { normalizeHttpRequestParams } from './utils/normalizeHttpRequestParams';
import { normalizeHttpRequestEndParams } from './utils/normalizeHttpRequestEndParams';
const createDebug = require('debug');
export function createClientRequestOverrideClass(middleware, performOriginalRequest, originalClientRequest) {
    function ClientRequestOverride(...args) {
        var _a;
        const [url, options, callback] = normalizeHttpRequestParams(...args);
        const usesHttps = url.protocol === 'https:';
        let requestBodyBuffer = [];
        const debug = createDebug(`http ${options.method} ${url.href}`);
        // Inherit ClientRequest properties from RequestOptions.
        this.method = options.method || 'GET';
        this.path = options.path || DEFAULT_PATH;
        debug('intercepted %s %s (%s)', options.method, url.href, url.protocol);
        http.OutgoingMessage.call(this);
        // Propagate options headers to the request instance.
        inheritRequestHeaders(this, options.headers);
        const socket = new Socket(options, {
            usesHttps,
        });
        this.socket = this.connection = socket;
        if (options.timeout) {
            debug('setting socket timeout to %a', options.timeout);
            socket.setTimeout(options.timeout);
        }
        // Create a mocked response instance.
        const response = new IncomingMessage(socket);
        if (((_a = options.headers) === null || _a === void 0 ? void 0 : _a.expect) === '100-continue') {
            debug('encountered "100 Continue" header');
            this.emit('continue');
        }
        process.nextTick(() => {
            this.emit('socket', socket);
            socket.emit('connect');
            if (socket.authorized) {
                debug('emitting authorized socket event');
                socket.emit('secureConnect');
            }
        });
        if (callback) {
            this.once('response', callback);
        }
        const emitError = (error) => {
            process.nextTick(() => {
                this.emit('error', error);
            });
        };
        this.write = (chunk, ...args) => {
            debug('write', chunk, args);
            const callback = typeof args[1] === 'function' ? args[1] : args[2];
            if (this.aborted) {
                debug('cannot write: request aborted');
                emitError(new Error('Request aborted'));
            }
            else {
                if (chunk) {
                    debug('request write: concat chunk to buffer', chunk);
                    requestBodyBuffer = concatChunkToBuffer(chunk, requestBodyBuffer);
                }
                if (typeof callback === 'function') {
                    callback();
                }
            }
            setImmediate(() => {
                this.emit('drain');
            });
            return false;
        };
        this.end = async (...args) => {
            const [chunk, encoding, callback] = normalizeHttpRequestEndParams(...args);
            debug('end', { chunk, encoding, callback });
            debug('request headers', options.headers);
            const writtenRequestBody = bodyBufferToString(Buffer.concat(requestBodyBuffer));
            debug('request written body', writtenRequestBody);
            // Resolve the entire request body, including:
            // - buffer written via `req.write()`
            // - chunk provided to `req.end(chunk)`
            // So that the request middleware has access to the resolved body.
            const resolvedRequestBody = bodyBufferToString(Buffer.concat(chunk
                ? concatChunkToBuffer(chunk, requestBodyBuffer)
                : requestBodyBuffer));
            debug('request resolved body', resolvedRequestBody);
            const outHeaders = this.getHeaders();
            const resolvedRequestHeaders = Object.assign({}, outHeaders, options.headers);
            const requestHeaders = resolvedRequestHeaders
                ? reduceHeadersObject(resolvedRequestHeaders, (headers, name, value) => {
                    headers[name.toLowerCase()] = value;
                    return headers;
                }, {})
                : {};
            debug('request headers', requestHeaders);
            // Construct the intercepted request instance exposed to the request middleware.
            const formattedRequest = {
                url,
                method: options.method || 'GET',
                headers: requestHeaders,
                body: resolvedRequestBody,
            };
            debug('awaiting mocked response...');
            const [middlewareException, mockedResponse] = await until(async () => middleware(formattedRequest, response));
            // When the request middleware throws an exception, error the request.
            // This cancels the request and is similar to a network error.
            if (middlewareException) {
                debug('middleware function threw an exception!');
                this.emit('error', middlewareException);
                return this;
            }
            if (mockedResponse) {
                debug('received mocked response:', mockedResponse);
                // Prevent modifying an already finished response.
                if (!response.complete) {
                    const { headers = {} } = mockedResponse;
                    response.statusCode = mockedResponse.status;
                    response.statusMessage = mockedResponse.statusText;
                    debug('writing response headers...');
                    // Converts mocked response headers to actual headers
                    // (lowercases header names and merges duplicates).
                    response.headers = Object.entries(headers).reduce((acc, [name, value]) => {
                        const headerName = name.toLowerCase();
                        const headerValue = acc.hasOwnProperty(headerName)
                            ? [].concat(acc[headerName], value)
                            : value;
                        acc[headerName] = headerValue;
                        return acc;
                    }, {});
                    // Converts mocked response headers to raw headers.
                    // @see https://nodejs.org/api/http.html#http_message_rawheaders
                    response.rawHeaders = Object.entries(headers).reduce((acc, [name, value]) => {
                        return acc.concat(name, value);
                    }, []);
                    if (mockedResponse.body) {
                        debug('writing response body...');
                        response.push(Buffer.from(mockedResponse.body));
                    }
                }
                debug('response is complete, finishing request...');
                // Invoke the "req.end()" callback.
                callback === null || callback === void 0 ? void 0 : callback();
                this.finished = true;
                this.emit('finish');
                this.emit('response', response);
                // Pushing `null` indicates that the response body is complete
                // and must not be modified anymore.
                response.push(null);
                response.complete = true;
                return this;
            }
            debug('no mocked response received');
            debug('performing original %s %s (%s)', options.method, url.href, url.protocol);
            debug('original request options', options);
            debug('original request body (written)', writtenRequestBody);
            debug('original request body (end)', chunk);
            let req;
            debug('using', performOriginalRequest);
            const { ClientRequest } = http;
            // Decide whether to use HTTPS based on the URL protocol.
            // XHR can trigger http.request for HTTPS URL.
            if (url.protocol === 'https:') {
                debug('reverting patches...');
                http.ClientRequest = originalClientRequest;
                // Override the global pointer to the original client request.
                // This way whenever a bypass call bubbles to `handleRequest`
                // it always performs respecting this `ClientRequest` restoration.
                originalClientRequest = null;
                req = performOriginalRequest(options);
                debug('re-applying patches...');
                http.ClientRequest = ClientRequest;
                originalClientRequest = ClientRequest;
            }
            else {
                req = performOriginalRequest(options);
            }
            // Propagate headers set after `ClientRequest` is constructed
            // onto the original request instance.
            inheritRequestHeaders(req, outHeaders);
            // Propagate a request body buffer written via `req.write()`
            // to the original request.
            if (requestBodyBuffer.length > 0 && req.writable) {
                req.write(Buffer.concat(requestBodyBuffer));
            }
            req.on('finish', () => {
                this.emit('finish');
            });
            req.on('response', (response) => {
                debug(response.statusCode, options.method, url.href);
                this.emit('response', response);
            });
            req.on('error', (error) => {
                debug('original request error', error);
                this.emit('error', error);
            });
            // Provide a callback when an original request is finished,
            // so it can be debugged.
            req.end(...[
                chunk,
                encoding,
                () => {
                    debug('request ended', this.method, url.href);
                    callback === null || callback === void 0 ? void 0 : callback();
                },
            ].filter(Boolean));
            return req;
        };
        this.abort = () => {
            debug('abort');
            if (this.aborted) {
                debug('already aborted');
                return;
            }
            this.aborted = Date.now();
            const error = new Error();
            error.code = 'aborted';
            response.emit('close', error);
            socket.destroy();
            this.emit('abort');
        };
        return this;
    }
    inherits(ClientRequestOverride, http.ClientRequest);
    return ClientRequestOverride;
}
