const { test, expect } = require('@jest/globals');
const { normaliseURL, getURLsFromHTML } = require('./crawl.js');

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

test('find list of links in html', () => {
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

test('find empty list of links in html', () => {
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
