

export async function tokengetbyeventid(id) {
    const fetch = require('node-fetch');

    let url = 'https://cors-anyhere.herokuapp.com/https://demetergift-database.vercel.app/api/tokensbyevent';

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        },
    };
    var allTokens;
    var booltrue = true;
    while (booltrue) {
        try {
            await fetch(url, options).then(res => res.json())
                .then(json => allTokens = json)
        } catch (er) {
            continue;
        }
        break;
    }

    return allTokens;
}

