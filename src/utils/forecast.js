const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7c93786c8fdbac231766be56a65d5585&query='+latitude+','+longitude+''
    request({ url , json : true },(error, {body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Could not find location',undefined)
        }else{
            callback(undefined, {
                text:'At the current time ' + body.current.observation_time +' the climate is ' + body.current.weather_descriptions +'. With a temperature of ' + body.current.temperature +' C and the probability of rain is '+ body.current.precip+ '%.',
                imgUrl: body.current.weather_icons
            })
        }
    })
}

module.exports = forecast