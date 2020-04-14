const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoPath = path.join(__dirname,'../utils/geocode.js')
const forePath = path.join(__dirname,'../utils/forecast.js')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define Paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory
app.use(express.static(publicDirPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Facundo Pujol'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Facundo Pujol'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help Page',
        message: 'For those who need help',
        name: 'Facundo Pujol'
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
                forecast: forecastData.text,
                imgUrl: forecastData.imgUrl,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Must Provide Search'
        })
    }
    res.send({
        productos:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        errorMsg: 'help article not found',
        name: 'Facundo Pujol'
    })
})


app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        errorMsg: 'Page not found',
        name: 'Facundo Pujol'
    })
})



app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})