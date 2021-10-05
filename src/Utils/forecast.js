const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e984ec6ba3dc921927abbefa30946522&query='+ latitude + ',' + longitude +  '&units=m'
    request({ url, json:true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather services!', undefined)
        } 
        else if(body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else{
            callback(undefined, (body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degrees. The Humidity is ' + body.current.humidity + '.'))
                
            
        }
    })
}

module.exports = forecast

