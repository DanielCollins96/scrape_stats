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

async function allSeasons() {
    let currentYear = new Date().getFullYear()
    for (i = 1980; i < currentYear; i++) {
        let years = `${i}${i+1}`
        console.log(years)
        let result = await fetch(`https://statsapi.web.nhl.com/api/v1/teams?expand=team.stats&season=${years}`);
        console.log(result.status)
        if (result.status == 404) {
            console.log('hoho')
            break;
            // console.log(result)
        }
        let data = await result.json()
        const folder = path.join(`${DATA_UPDATE_PATH}/teams`, years) 
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
            fs.writeFileSync(path.join(folder,`${date}.json`), JSON.stringify(data));
            // fs.writeFileSync(path.join(folder,`why.json`), JSON.stringify(mia));
            console.log('dododododo')
            // break;
        } catch(error) {
            console.log(error)
        }

    }
}
allSeasons()

async function teamStats() {
    let result = await fetch(`https://statsapi.web.nhl.com/api/v1/teams?expand=team.stats`);
    let data = await result.json();
    const folder = path.join(`${DATA_UPDATE_PATH}/teams`) //${date}.json`);
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
        fs.writeFileSync(path.join(folder,`${date}.json`), JSON.stringify(data));
        // fs.writeFileSync(path.join(folder,`why.json`), JSON.stringify(mia));
        console.log('dododododo')
        // break;
    } catch(error) {
        console.log(error)
    }
// }
    console.log('beee')
}
// teamStats()


console.log('hm')
const fetch_retry = async (url, options, n) => {
    try {
        return await fetch(url, options)
    } catch(err) {
        if (n === 1) throw err;
        return await fetch_retry(url, options, n - 1);
    }
};
    






