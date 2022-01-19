

export async function eventgetbyid(id) {
    const fetch = require('node-fetch');

    let url = 'http://localhost:8080/https://demetergift-database.vercel.app/api/events';

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        },
    };
    var allEvents;
    await fetch(url, options).then(res => res.json())
        .then(json => allEvents = json)
        .catch(err => console.error('error:' + err));
    for (let i = 0; i < allEvents.length; i++) {
        if (Number(allEvents[i].id) == id) {
            return allEvents[i];
        }
    }


}

