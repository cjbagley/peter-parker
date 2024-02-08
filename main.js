const { argv } = require('node:process');
const { normaliseURL, getURLsFromHTML } = require('./crawl.js');

function main() {
    if (argv.length === 2) {
        console.log("Please provide a url to scrape as a command line argument");
        return;
    }
    if (argv.length > 3) {
        console.log("Expected one argument, but multiple given");
        return;
    }
    try {
        url = normaliseURL(argv[2]);
        console.log(`Starting web crawl for ${argv[2]}`);
    } catch (error) {
        console.log(`Error with given URL: ${error.message}`);
    }
}

main();