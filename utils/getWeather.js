const request = require("request");
const moment = require('moment');

function getWeather(res, lng, lat, city){
    console.log(lng, lat, 'come from getWeather')
    const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY}/${lat},${lng}`
    request({url: url, json:true}, (error, {body}) => {
        if (error) {
            console.log(error)
          return res.render("weather", { error: "something wrong when fetching the weather" });
        }
        console.log("body",body)
        const temp = Math.round((body.currently.temperature-32)*5/9)
        const currently = body.currently.summary
        const summary = body.hourly.summary
        const time = moment(body.currently.time, 'X').format('hh A')
        const forecastHourly = body.hourly.data
        const hourly = forecastHourly.slice(0,8)
        for(let i=0; i<hourly.length; i++){
            hourly[i].temperature = Math.round((hourly[i].temperature-32)*5/9)
            hourly[i].time = moment(`${hourly[i].time}`, 'X').format('hh A') 
        }

        // console.log(body.hourly.data)
        res.render("weather",{
            time: time,
            temp:temp,
            city:city,
            currently: currently,
            summary:summary,
            hourly: hourly
        })
    })
}

module.exports = getWeather