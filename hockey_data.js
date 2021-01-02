const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');


const DATA_UPDATE_PATH = path.join(__dirname, 'NHL')

const date = `${new Date().toISOString()}-UTC`.replace(/:/g,'-').substring(0,19)
// const date = `${new Date().toISOString()}-UTC`.substring()

NHL_API_URLS = {
    standings: {
        baseURL:'https://statsapi.web.nhl.com/api/v1/standings',
        expandedRecords: 'https://statsapi.web.nhl.com/api/v1/standings?expand=standings.record',
        specificSeason: 'https://statsapi.web.nhl.com/api/v1/standings?season=',
    },
    teams: {
        baseURL: 'https://statsapi.web.nhl.com/api/v1/teams',
        expandRoster: 'expand=team.roster',
        expandName: 'expand=person.names',
        expandStats: 'expand=team.stats',
        specificSeason: 'season=',
    },
    people: {
        baseURL: `https://statsapi.web.nhl.com/api/v1/people/ID`,
        getStats: `https://statsapi.web.nhl.com/api/v1/people/ID/stats`,
        seasonStats: '?stats=statsSingleSeason&season=',
        yearByYear: '?stats=yearByYear',
    }
}

console.log(date)
console.log(NHL_API_URLS.teams.baseURL)

async function teamStats() {
    result = await fetch(`https://statsapi.web.nhl.com/api/v1/teams?expand=team.stats`);
    let mia = await result.json();
    const folder = path.join(`${DATA_UPDATE_PATH}/teams`) //${date}.json`);
    console.log(mia)
    // while(true) {
    if(!fs.existsSync(folder)) {
        try {
            fs.mkdirSync(folder, { recursive: true })
            console.log('created!')
        } catch(err) {
            console.log('what')
            console.log(err)
        }
    }
    try {
        fs.writeFileSync(path.join(folder,`${date}.json`), JSON.stringify(mia));
        // fs.writeFileSync(path.join(folder,`why.json`), JSON.stringify(mia));
        console.log('dododododo')
        // break;
    } catch(error) {
        console.log(error)
    }
// }
    console.log('beee')
}
teamStats()

console.log('hm')
const fetch_retry = async (url, options, n) => {
    try {
        return await fetch(url, options)
    } catch(err) {
        if (n === 1) throw err;
        return await fetch_retry(url, options, n - 1);
    }
};
    






