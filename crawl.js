function normaliseURL(url = '') {
    if (url == '') {
        return ''
    }
    const parsed_url = new URL(url)
    let new_url = parsed_url.host
    if (parsed_url.pathname != '' && parsed_url.pathname != '/') {
        new_url += parsed_url.pathname.replace(/\/$/, '')
    }
    if (parsed_url.search != '' && parsed_url.search != '/') {
        new_url += parsed_url.search
    }
    return new_url
}

module.exports = {
    normaliseURL
}
