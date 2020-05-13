// const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=28.7041&lon=77.1025&units=metric&appid=7c0049fc7eeabdc073b6add3ca4d1028'

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to weather service!")
//     }
//     else if (response.body.error) {
//         console.log("Unable to find Location")
//     } 
//     else {
//         // console.log(response.body.current)
//         console.log(response.body.daily[0].weather[0].description + ". It is currently " + response.body.current.temp + " degrees out. There is a " + response.body.current.clouds + "% chance of rain.")
//     }
// })

const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=7c0049fc7eeabdc073b6add3ca4d1028'
    request ({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        }
        else if (body.cod === 400) {
            callback("Unable to find Location", undefined)
        }
        else {
            const Location = body.daily[0].weather[0].description
            callback(undefined, Location.charAt(0).toUpperCase() + Location.slice(1) + ". It is currently " + body.current.temp + " degrees out. The maximum temperature is " + body.daily[0].temp.max + " and the minimum temperature is " + body.daily[0].temp.min +  ". There is a " + body.current.clouds + "% chance of rain.")
        }
    })
}

module.exports = forecast