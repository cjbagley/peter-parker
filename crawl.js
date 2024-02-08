const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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
            console.log(err.message)
        }
    });
    return urls;
}

module.exports = {
    normaliseURL,
    getURLsFromHTML
}
