import {Sheet} from './sheet.js'
import fetch from 'node-fetch'

(async function (){

    const res = await fetch('https://jobicy.com/api/v2/remote-jobs?count=50&industry=dev')
    const json = await res.json()

    const rows = json.jobs.map(job => {
        return {
            company: job.companyName,
            title: job.jobTitle,
            location: job.jobGeo,
            date: job.pubDate,
            url: job.url
        }
    })

    const sortedRows = rows.filter(job => job.location === 'Anywhere')

    const sheet = new Sheet()
    await sheet.load()

    await sheet.addRows(sortedRows)
    console.log(sortedRows)
})()

