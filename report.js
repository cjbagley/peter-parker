function printReport(pages = {}) {
    console.log('Starting report');

    const sorted = sortPages(pages);
    for (let [url, count] of Object.entries(sorted)) {
        console.log(`Found ${count} internal links to ${url}`);
    }
}

function sortPages(pages = {}) {
    return sorted = Object.fromEntries(
        Object.entries(pages).sort((a, b) => {
            // compare values first, largest first
            if (a[1] > b[1]) return -1;
            if (a[1] < b[1]) return 1;
            // values are equal, sort by the keys instead, alphabetical
            if (a[0] < b[0]) return -1;
            if (a[0] > b[0]) return 1;
            return 0;
        })
    );
}

module.exports = {
    printReport,
    sortPages
}
