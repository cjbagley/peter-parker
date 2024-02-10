const jsdom = require("jsdom");
const { JSDOM } = jsdom;


async function crawlPage(baseURL, currentURL, pages = {}) {
    // Only crawl links for the same website
    if (baseURL != getBaseURL(currentURL)) {
        return pages;
    }

    currentURL = normaliseURL(currentURL);

    // Don't fetch the content again, just increase the counter
    if (currentURL in pages) {
        pages[currentURL]++;
        return pages;
    }
    pages[currentURL] = (currentURL == baseURL) ? 0 : 1;

    console.log(`Getting page content: ${currentURL}`);
    const response = await fetch('https://' + currentURL);
    if (response.status >= 400) {
        console.log(`Ignored ${currentURL} - Status ${response.status} ${response.statusText}`);
        return pages;
    }
    const contentType = response.headers.get('content-type');
    if (!contentType.includes('text/html')) {
        console.log(`Ignored ${currentURL} - Expected content-type of 'text/html' but got: '${contentType}'`);
        return pages;
    }
    const body = await response.text();
    const links = getURLsFromHTML(body, baseURL);
    if (links.length === 0) {
        return pages;
    }

    for (const url of links) {
        pages = await crawlPage(baseURL, url, pages);
    }

    return pages;
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
