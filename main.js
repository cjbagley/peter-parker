const { argv } = require('node:process');
const { crawlPage, getBaseURL } = require('./crawl.js');


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
        baseURL = getBaseURL(argv[2]);
    } catch (error) {
        console.log(`Error with given URL: ${error.message}`);
        return;
    }

    try {
        console.log(`Starting web crawl for ${baseURL}`);
        pages = await crawlPage(baseURL, baseURL);
        console.log(`Finished web crawl for ${baseURL}`);
        console.log(pages);
    } catch (error) {
        console.log(`Could not complete crawl: ${error.message}`);
        return;
    }
}

main();
