var express = require('express');
var router = express.Router();
const getCoords = require('../utils/getCoord')
const getWeather = require('../utils/getWeather')
// const getForecast = require('../utils/getForecast')
/* GET home page. */

router.get('/weather', function(req, res){
  const query = req.query
  // console.log(query)
// we use city name to get geo coordinate
if(!query.city){
  return res.redirect("/")
}
// chain function
getCoords(res, query.city, getWeather) // get coordinate from city
// we render template inside getCoords

// we use coordinate to fetch API weather
  // res.render('weather',{
  //   city: query.city
  // })
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to my weather app' });
});

module.exports = router;
