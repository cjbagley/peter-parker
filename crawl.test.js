const { test, expect } = require('@jest/globals');
const { normaliseURL, getURLsFromHTML, getBaseURL } = require('./crawl.js');
const { sortPages } = require('./report.js');

test('Normalise root URL', () => {
    const expected = 'www.boot.dev'
    expect(normaliseURL('https://www.boot.dev')).toBe(expected);
    expect(normaliseURL('http://www.boot.dev')).toBe(expected);
});

test('Normalise URL with path', () => {
    const expected = 'blog.boot.dev/path'
    expect(normaliseURL('https://blog.boot.dev/path/')).toBe(expected);
    expect(normaliseURL('https://blog.boot.dev/path')).toBe(expected);
    expect(normaliseURL('http://blog.boot.dev/path/')).toBe(expected);
    expect(normaliseURL('http://blog.boot.dev/path')).toBe(expected);
});

test('Normalise URL with path and hash', () => {
    const expected = 'go.dev/doc/effective_go'
    expect(normaliseURL('https://go.dev/doc/effective_go#blank_import')).toBe(expected);
    expect(normaliseURL('https://go.dev/doc/effective_go/#blank_import')).toBe(expected);
    expect(normaliseURL('http://go.dev/doc/effective_go#blank_import')).toBe(expected);
});

test('Normalise URL with caps', () => {
    const expected = 'go.dev/doc/effective_go'
    expect(normaliseURL('https://GO.dev/doc/effective_go/')).toBe(expected);
    expect(normaliseURL('https://go.dev/doc/EFFECTIVE_GO')).toBe(expected);
});

test('Normalise URL with path and search', () => {
    const expected = 'github.com/ohmyzsh/ohmyzsh/issues?q=is%3Aissue+is%3Aopen'
    expect(normaliseURL('https://github.com/ohmyzsh/ohmyzsh/issues?q=is%3Aissue+is%3Aopen')).toBe(expected);
    expect(normaliseURL('https://github.com/ohmyzsh/ohmyzsh/issues/?q=is%3Aissue+is%3Aopen')).toBe(expected);
    expect(normaliseURL('http://github.com/ohmyzsh/ohmyzsh/issues?q=is%3Aissue+is%3Aopen')).toBe(expected);
});

test('Get base URL from a given URL', () => {
    const expected = 'https://go.dev';
    expect(getBaseURL('https://go.dev')).toBe(expected);
    expect(getBaseURL('http://go.dev')).toBe(expected);
    expect(getBaseURL('https://GO.dev/doc/effective_go/')).toBe(expected);
    expect(getBaseURL('https://go.dev/doc/EFFECTIVE_GO')).toBe(expected);
});

test('Find list of links in html', () => {
    let expected = ['bbc.co.uk', 'https://bbc.co.uk/sport', 'https://blog.boot.dev/images', 'https://blog.boot.dev/images/'];
    let html = `<html>
        <body>
            <h1>This is a test</h1>
            <div>
                <div>
                    <p>here is some text</p>
                    <a href="bbc.co.uk" class="test">Test</a>
                    <a href="https://bbc.co.uk/sport" class="test">Test 2</a>
                    <p>Enjoy!</p>
                </div>
            </div>
            <a href="/images"><span>Go to Images</span></a>
            <a href="/images/"><span>Go to Images, again</span></a>
        </body>
    </html>`;
    expect(getURLsFromHTML(html, 'https://blog.boot.dev')).toEqual(expected);
});

test('Find empty list of links in html', () => {
    let html = `<html>
        <body>
            <h1>This is a test</h1>
            <div>
                <div>
                    <p>here is some text</p>
                    <p>Enjoy!</p>
                </div>
            </div>
        </body>
    </html>`;
    expect(getURLsFromHTML(html, 'https://blog.boot.dev')).toEqual([]);
});

test('Sort pages, largest value first and then by alphabetical keys', () => {
    const unsorted = {
        'test.com/contact': 4,
        'test.com': 88,
        'test.com/about': 4,
        'test.com/pages/hello': 2,
        'test.com/pages/hello-4': 1,
        'test.com/pages/hello-1': 1,
        'test.com/pages/something': 1,
        'test.com/pages/answer': 1,
        'test.com/pages/popular': 7,
    };
    const sorted = {
        'test.com': 88,
        'test.com/pages/popular': 7,
        'test.com/about': 4,
        'test.com/contact': 4,
        'test.com/pages/hello': 2,
        'test.com/pages/answer': 1,
        'test.com/pages/hello-1': 1,
        'test.com/pages/hello-4': 1,
        'test.com/pages/something': 1,
    };
    expect(sortPages(unsorted)).toEqual(sorted);
});
