const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js');


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
        url = new URL(argv[2]); 
        baseURL = `https://${url.host.toLowerCase()}`;
        console.log(`Starting web crawl for ${baseURL}`);
    } catch (error) {
        console.log(`Error with given URL: ${error.message}`);
        return;
    }

    try {
        console.log(await crawlPage(baseURL, baseURL));
    } catch (error) {
        console.log(`Error getting content from page (${baseURL}): ${error.message}`);
        return;
    }
}

main();
