/* eslint-disable */
export function inheritRequestHeaders(req, headers) {
    // Cannot write request headers once already written,
    // or when no headers are given.
    if (req.headersSent || !headers) {
        return;
    }
    Object.entries(headers).forEach(([name, value]) => {
        if (value != null) {
            req.setHeader(name, value);
        }
    });
}
