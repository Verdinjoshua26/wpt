// META: global=worker

'use strict';

const deflate_chunk_value = new Uint8Array([120, 156, 75, 173, 40, 72, 77, 46, 73, 77, 81, 200, 47, 45, 41, 40, 45, 1, 0, 48, 173, 6, 36]);
const gzip_chunk_value = new Uint8Array([31, 139, 8, 0, 0, 0, 0, 0, 0, 3, 75, 173, 40, 72, 77, 46, 73, 77, 81, 200, 47, 45, 41, 40, 45, 1, 0, 176, 1, 57, 179, 15, 0, 0, 0]);
const true_chunk_value = new TextEncoder().encode('expected output');

promise_test(async t => {
    const ds = new DecompressionStream('deflate');
    const reader = ds.readable.getReader();
    const writer = ds.writable.getWriter();
    const writePromise = writer.write(deflate_chunk_value);
    const readPromise = reader.read();
    const returnValue = await readPromise;
    const value = returnValue.value;
    assert_array_equals(Array.from(value), true_chunk_value, "value should match");
}, 'decompressing deflated input should work');


promise_test(async t => {
    const ds = new DecompressionStream('gzip');
    const reader = ds.readable.getReader();
    const writer = ds.writable.getWriter();
    const writePromise = writer.write(gzip_chunk_value);
    const readPromise = reader.read();
    const returnValue = await readPromise;
    const value = returnValue.value;
    assert_array_equals(Array.from(value), true_chunk_value, "value should match");
}, 'decompressing gzip input should work');
