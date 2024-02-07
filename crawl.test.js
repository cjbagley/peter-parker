const { test, expect } = require('@jest/globals')
const { normalizeURL, normaliseURL } = require('./crawl.js')

test('expects URL to be normalised', () => {

    let expected = 'www.boot.dev'
    expect(normaliseURL('https://www.boot.dev')).toBe(expected);
    expect(normaliseURL('http://www.boot.dev')).toBe(expected);

    expected = 'blog.boot.dev/path'
    expect(normaliseURL('https://blog.boot.dev/path/')).toBe(expected);
    expect(normaliseURL('https://blog.boot.dev/path')).toBe(expected);
    expect(normaliseURL('http://blog.boot.dev/path/')).toBe(expected);
    expect(normaliseURL('http://blog.boot.dev/path')).toBe(expected);

    expected = 'go.dev/doc/effective_go'
    expect(normaliseURL('https://go.dev/doc/effective_go#blank_import')).toBe(expected);
    expect(normaliseURL('https://go.dev/doc/effective_go/#blank_import')).toBe(expected);
    expect(normaliseURL('http://go.dev/doc/effective_go#blank_import')).toBe(expected);
    expect(normaliseURL('https://go.dev/doc/effective_go/')).toBe(expected);
    expect(normaliseURL('https://go.dev/doc/effective_go')).toBe(expected);

    expected = 'github.com/ohmyzsh/ohmyzsh/issues?q=is%3Aissue+is%3Aopen'
    expect(normaliseURL('https://github.com/ohmyzsh/ohmyzsh/issues?q=is%3Aissue+is%3Aopen')).toBe(expected);
    expect(normaliseURL('https://github.com/ohmyzsh/ohmyzsh/issues/?q=is%3Aissue+is%3Aopen')).toBe(expected);
    expect(normaliseURL('http://github.com/ohmyzsh/ohmyzsh/issues?q=is%3Aissue+is%3Aopen')).toBe(expected);
})
