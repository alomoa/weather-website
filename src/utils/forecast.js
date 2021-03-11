const request = require('../../node_modules/request');


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6f83343cb2487ac2bfbaf286872a3442&query=${latitude},${longitude}`;

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service');
        }
        else if (body.error) {
            callback('Unable to find location')
        }
        else {
            
            callback(undefined, {
                forecast: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress with ' + body.current.precip + '% of rain.' +
                `Wind speeds of ${body.current.wind_speed} miles per hour`,
                feel_temperature: body.current.feelslike,
            })    
        }
    })
    
};



module.exports = forecast;