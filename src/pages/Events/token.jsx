

export async function tokengetbyeventid(id) {
    const fetch = require('node-fetch');

    let url = 'http://localhost:8080/https://demetergift-database.vercel.app/api/tokensbyevent';

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        },
    };
    var allTokens;
    await fetch(url, options).then(res => res.json())
        .then(json => allTokens = json)
        .catch(err => console.error('error:' + err));
    return allTokens;
}

