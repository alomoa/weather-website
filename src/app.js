const express = require('express');
const path = require('path');
const hbs = require('hbs')

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;
//Path for express configs
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Muhmammad Alam'
    });
});

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About me',
        name: 'Muhammad Alam'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a placeholder for help',
        name: 'Muhammad Alam'

    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, name} = {}) =>{
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude,longitude, (error, {forecast, temperature, rain_chance}) => {
            if(error){
                return res.send({
                    error
                })
            }
    
         
            res.send({
                address: req.query.address,
                location: name,
                forecast
        
            })
        });
    });

    
})


app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Error 404',
        message: 'Help article not found',
        name:'Muhammad Alam'
    });
})
app.get('*', (req, res) => {
    res.render('404',{
        message: 'Page not found',
        title: 'Error 404',
        name:'Muhammad Alam'
    });
})


//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server started at port' + port);
});