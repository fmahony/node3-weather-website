//*********Dependencies**************************
//core

//npm
const request = require('request')
const chalk = require('chalk')
//local

//***********Configuration Parameters**************


//********************Code Body********************
const forecast = (latitude, longitude, callback)=> {
    //weather API
    const baseWeatherUri = 'http://api.weatherstack.com/current?access_key=1ac382823560d94bbc4038a38dfa14ab&query='
    const weatherCoord = latitude + ',' + longitude 
    const weatherUnits = '&units=f'
    const weatherUri = baseWeatherUri + weatherCoord + weatherUnits 
    
    request({url: weatherUri, json: true}, (error,response)=> {
        if(error) {
            
            callback('Check network connectivity!', undefined)
        } else if (response.body.error){
            callback('Location not found.  Check spelling.', undefined)
        } else {
            callback(undefined, {
                temp: response.body.current.temperature
            })
        }
    })

}

module.exports = forecast