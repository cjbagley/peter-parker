const { argv } = require('node:process');
const { normaliseURL, crawlPage } = require('./crawl.js');


async function main() {
    if (argv.length === 2) {
        console.log("Please provide a url to scrape as a command line argument");
        return;
    }
    if (argv.length > 3) {
        console.log("Expected one argument, but multiple given");
        return;
    }
    try {
        url = 'https://' + normaliseURL(argv[2]);
        console.log(`Starting web crawl for ${url}`);
    } catch (error) {
        console.log(`Error with given URL: ${error.message}`);
    }

    try {
        console.log(await crawlPage(url));
    } catch (error) {
        console.log(`Error getting content from page (${url}): ${error.message}`);
    }
}

main();
