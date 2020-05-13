const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Divyankar Bhargav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Divyankar Bhargav',
        message: 'OpenWeatherMap is an online service that provides weather data. It is owned by OpenWeather Ltd, headquartered in London, United Kingdom. It provides current weather data, forecasts and historical data to more than 2 million customers, including Fortune 500 companies and thousands of other businesses globally. OpenWeatherMap is one of the leading digital weather information providers. We are a small IT company, established in 2014 by a group of engineers and experts in Big Data, data processing, and satellite imagery processing. Our maps learn from every application they’re embedded in. We use real-time data from 600 million MAUs to ship hundreds of thousands of map updates per day so developers can build precise maps that perform across platforms. The Mapbox Vision SDK describes every curb, lane, street sign, and road hazard it sees as data. Developers use the SDK AI-powered semantic segmentation, object detection, and classification to deliver precise navigation guidance, display driver assistance alerts, and detect and map road incidents.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Divyankar Bhargav',
        message: "For any queries visit the link below:" 
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Divyankar Bhargav',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Divyankar Bhargav',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
