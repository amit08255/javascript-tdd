/* eslint-disable */
export function bodyBufferToString(buffer) {
    const utfEncodedBuffer = buffer.toString('utf8');
    const bufferCopy = Buffer.from(utfEncodedBuffer);
    const isUtf8 = bufferCopy.equals(buffer);
    return isUtf8 ? utfEncodedBuffer : buffer.toString('hex');
}
