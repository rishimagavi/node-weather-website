const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

const app = express()

//Define path for express config
const publicDirrectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirrectoryPath))


app.get('' , (req,res) => {
    res.render('index', {
        title:'Weather',
        name: 'Rishi'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rishi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
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
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        name: 'Rishi'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name:'Rishi',
        ErrorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: ' 404',
        name: 'Rishi',
        ErrorMessage : 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Listening on 3000')
})