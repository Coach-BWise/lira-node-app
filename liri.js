// //manifest
// require("dotenv").config();
// var axios = require("axios");
// var keys = require("./keys.js");
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);
// var fs = require("fs");
// var moment = require(`moment`);
// var inquirer = require("inquirer");

// // vars for calls
// var logger = fs.createWriteStream(`log.txt`,{flags:`a`});
// var artist = ""
// var movieQ = 'http://www.omdbapi.com/?i=tt3896198&apikey=65fae755'
// var concertQ = `"https://rest.bandsintown.com/artists/" + ${artist} + "/events?app_id=codingbootcamp"`

// // create timestamp
// let timestamp = moment().format(`MM/DD/YYYY h:mm:ss a`)

// // command line args
// var variable =process.argv[3]
// var statement=process.argv[2]

// // Create a variable to handle the full search argument
// let argument = "";
// getArgument();

// function getArgument(){

//     // grab the command line arguments
//     let args = process.argv;
//     // loop through the arguments starting at the 3rd index
//     for (let i=3; i<args.length; i++) {
//         if (i>3 && i<args.length) {argument = argument + " " + args[i]
//     } else argument += args[i];
//     }
// }

// switch (statement) {
//     case "concert-this":
//       concertThis(variable);
//       break;
    
//     case "spotify-this-song":
//       spotifySong(variable);
//       break;
    
//     case "movie-this":
//       movieThis(variable);
//       break;
    
//     case "do-what-it-says":
//       doWhat(variable);
//       break;
//     }

require("dotenv").config();

const keys = require("./keys");
const axios = require("axios");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
// const pry = require("Pryjs")


const fs = require("fs");
const moment = require(`moment`);
const inquirer = require("inquirer");
const logger = fs.createWriteStream(`log.txt`,{flags:`a`});

// create timestamp
let timestamp = moment().format(`MM/DD/YYYY h:mm:ss a`)

//var variable =process.argv[3]
var statement=process.argv[2]
// Create a variable to handle the full search argument
var argument = "";
getArgument();

//Create timestamp each time the application is run.
logger.write(`-------------------------\n ${timestamp} , ${statement} , ${argument}\n`);

  

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
switch (statement) {
    case "concert-this":
      concertThis(argument);
      break;
    
    case "spotify-this-song":
      spotifySong();
      break;
    
    case "movie-this":
      movieThis(argument);
      break;
    
    case "do-what-it-says":
      doWhat(argument);
      break;
}
    
// Grab argument from process.argv

function getArgument(){

    // grab the command line arguments
    let args = process.argv;
  
    // loop through the arguments starting at the 3rd index
    for (let i=3; i<args.length; i++) {
        if (i>3 && i<args.length) {argument = argument + " " + args[i]
    } else argument += args[i];
    }
}



// concertThis function
function concertThis(){
;
// Then run a request with axios to the Bands in Town API with the artist specified
axios.get("https://rest.bandsintown.com/artists/" + argument + "/events?app_id=codingbootcamp").then(
  function(response) {
      // Grab the artist name and log it to the console.
let artistName = response.data[0].artist.name 
console.log(`"Upcoming concerts for ${artistName}:"`)

// Loop through the response data and log the city, region, country, venue, and date for each result found
for (let i=0; i < response.data.length; i++) {
    let city = response.data[i].venue.city;
    let region = response.data[i].venue.region;
    let venue = response.data[i].venue.name;
    let date = moment(response.data[i].datetime).format(`MM/DD/YYYY`);
    console.log(`Result #${i+1}`);
    console.log(`City: ${city}, ${region}, at ${venue} on ${date}\n`);
}}) 

  .catch(function(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  

  )}

//spotify-this-song

function spotifySong(){
    console.log(argument);
     if (argument=="") { 
         argument = "The Sign"
    } else{  
        // Then run a request with axios to the Bands in Town API with the artist specified
        spotify.search({type: 'track', query: argument}, (function(err, response){
            if (err){
                return console.log('Error occurred: ' + err);
            } else{
                let items = response.tracks.items;

                for (var i=0; i< items.length; i++){
                    let artists = "";
                    for (var j =0; j<items[i].artists[j].length; j++){
                        if (j==parseInt(items[i].artists[j].length) - 1){
                        artists += items[i].artists[j].name;
                        } else {
                            artists += `${items[i].artists[j].name} and `;
                        }
                    }
                    let song=items[i].name;
                    let preview = "";
                    if (items[i].preview_Url == null) { 
                        preview ="No preview link available"
                    } else {
                        preview = items[i].preview_Url;
                    }
                    let album = items[i].album.name
                    console.log(`------------------------\nResult #${i+1}`)
                    console.log(`Song Name: ` + song);
                    console.log(`artist(s): `+ typeof(artists) + "\n");
                    console.log(`Preview Song: ` + preview);
                    console.log(`Album: ` + album)
                    logger.write(`-----------------------` + "\n");
                    logger.write(i + "\n");
                    logger.write(`Artist(s)`+ artists + "\n");
                    logger.write("Song name: " + song + `\n`);
                    logger.write(`Preview Song: ` + preview + "\n");
                    logger.write('Album: ' + album)
                }
            }
        }))
    }
}
//  movie-this
    function movieThis(argument){
        if (argument="") { argument = "Mr. Nobody" }
        else{
            axios.get("http://www.omdbapi.com/?t=" + argument + "&apikey=trilogy").then(
                function(response) {
                  console.log("Title: " + response.data.title);
                  console.log("Year: " + response.data.Year);
                  console.log("The movie's rating is: " + response.data.imdbRating);
                  console.log("The movie's rating is: "+ response.data.Ratings[1].Value);
                  console.log("Country: " + response.data.Country);
                  console.log("Language: " + response.data.Language);
                  console.log("Plot: " + response.data.Plot);
                  console.log("Actors: " + response.data.Actors);
                  logger.write(`------------------------------`);
                  logger.write("Title: " + response.data.title);
                  logger.write("Year: " + response.data.Year);
                  logger.write("The movie's rating is: " + response.data.imdbRating);
                  logger.write("The movie's rating is: "+ response.data.Ratings[1].Value);
                  logger.write("Country: " + response.data.Country);
                  logger.write("Language: " + response.data.Language);
                  logger.write("Plot: " + response.data.Plot); 
                  logger.write("Actors: " + response.data.Actors)
                })
          .catch(function(error) {if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
          }
      
    
   , 
)}
        // do-what-it-says
        function doWhat(){
             // This block of code will read from the "random.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        let action = dataArr[0];
        let query = dataArr[1];

        if (action = "concert-this") {concertThis(query)}
        else if (action = "spotify-this-song") {spotifySong(query)}
        else if (action = "movie-this") {movieThis(query)}
        else {console.log("I don't know what to do????????")}

            })}}