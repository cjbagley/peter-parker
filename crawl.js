const jsdom = require("jsdom");
const { JSDOM } = jsdom;


async function crawlPage(baseURL, currentURL, pages) {
    const response = await fetch(currentURL);
    if (response.status >= 400) {
        throw Error(`Status ${response.status} ${response.statusText}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType.includes('text/html')) {
        throw Error(`Expected content-type of 'text/html' but got: '${contentType}'`);
    }
    const body = await response.text();
    return body;
}

function normaliseURL(url = '') {
    if (url == '') {
        return '';
    }
    const parsed_url = new URL(url);
    let new_url = parsed_url.host.toLowerCase();
    if (parsed_url.pathname != '' && parsed_url.pathname != '/') {
        new_url += parsed_url.pathname.replace(/\/$/, '').toLowerCase();
    }
    if (parsed_url.search != '' && parsed_url.search != '/') {
        new_url += parsed_url.search;
    }
    return new_url;
}

function getURLsFromHTML(htmlBody, baseUrl) {
    const dom = new JSDOM(htmlBody);
    urls = [];
    found = dom.window.document.querySelectorAll('a');
    found.forEach((link) => {
        try {
            href = link.href;
            if (href.startsWith("/")) {
                href = baseUrl + href;
            }
            urls.push(href);
        } catch (err) {
            console.log(err.message);
        }
    });
    return urls;
}

function getBaseURL(url) {
    url = new URL(url);
    return `https://${url.host.toLowerCase()}`;
}

module.exports = {
    crawlPage,
    getBaseURL,
    getURLsFromHTML,
    normaliseURL
}
