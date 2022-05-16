//dependencies
const express = require('express');
const app = express ();
const axios = require("axios");

//Server should log each request using morgan's dev format
const morgan = require("morgan");
app.use(morgan('dev'));
//.env file (Environmental Variables ie. api_key, url,etc)
require ('dotenv').config();
let API_KEY_VALUE = process.env.API_KEY_VALUE;
//data storage
let movies = [];




//Server should respond to GET requests to /?i=tt3896198 with movie data
//Server should respond to GET requests to /?t=baby%20driver with movie data

app.get('/',  (req, res) => {
if(movies.hasOwnProperty(req.url)) {
  console.log(movies);
  res.json(movies[req.url]);
}
else{
  //Server should respond to GET requests to /?t=baby%20driver with movie data, without fetching from the OMDb API
  axios.get('https://www.omdbapi.com/' + req.url + '&apikey=' + API_KEY_VALUE)
  .then((response) => {
    movies[req.url] = response.data;
    res.send(response.data);
  })

  .catch((err) =>{
    res.send('error has occured!')
  })
}




// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;
})