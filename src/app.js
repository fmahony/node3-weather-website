//---------Dependencies
//core
const path = require('path')

//npm
const express = require('express')
const app = express()
const hbs = require('hbs')
const { argv } = require('process')
const request = require('request')

//local
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

//---------------Configurations
//Define Paths
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory
app.use(express.static(publicDirectory))

//Setup handlebars engien and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//---------Set API Endpoints
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Momo Twotoes'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Momo Twotoes'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        msg: 'Appa is Sick!',
        name: 'Momo Twotoes'
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: 'Not Found',
        msg: 'Help article not found',
        name: 'Momo Twotoes'
    })
})

app.get('/weather', (req, res) => {
    address= req.query.address
    if(!address){
        return res.send({
            error:'Please provide address'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData.temp,
                location: location,
                address: address
            })
        })
    })

})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: 'Not Found',
        msg: 'Page not found',
        name: 'Momo Twotoes'
    })
})

//----------Start Server
app.listen(3000, () => {
    console.log('Server started on port 3000!')
})