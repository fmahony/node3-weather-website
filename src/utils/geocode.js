const request = require('request')

const geocode = (address, callback) => {
    const baseGeoUri = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const tailGeoUri= '.json?access_token=pk.eyJ1IjoiZnJhbmNpc21haG9ueSIsImEiOiJjazl2bDVhMDAwMGMzM2RwYjNpZzN1NWJyIn0.Ba211gXvO_GwJfImN3PVpQ&limit=1'
    geoUri = baseGeoUri + encodeURIComponent(address) + tailGeoUri

    request({url: geoUri, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if (response.body.features.length === 0) {
            callback('Unable to find location.  Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            } )          
        }
    })

}

module.exports = geocode