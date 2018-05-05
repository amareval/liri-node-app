//Calling the dotenv package

require("dotenv").config();

// fs is a core Node package for reading and writing files
var fs = require("fs");
// Load the NPM Package inquirer
var inquirer = require("inquirer");

//Bring in the keys js file

var keys = require("./keys");

//CALL THE REQUIRE TWITTER FILE

var Twitter = require('twitter');

//CALL THE REQUIRE SPOTIFY FILE

var Spotify = require("node-spotify-api");


//VARIABLES TO PULL SPOTIFY KEYS

var spotify = new Spotify(keys.spotify);

//REQUEST NPM PACKAGE

var request = require("request");

//DISPLAY THE LAST 20 TWEETS FROM STUPID TWITTER

var mytweets = function (){

    //PULL IN YOUR KETS FOR THE TWITTER ACCESS
    var client = new Twitter(keys.twitter);

    var params = {
        screen_name: 'revho2'
    };

        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log("---------------------------------");
                    console.log(tweets[i].text);
                    console.log("---------------------------------"); 
                  }
        }
        else{
            console.log(error);
        }
    });
}

var spotifythissong = function(song){
    if (song === undefined) {
        song = "Friday";
      }

    //SPOTIFY SEARCH FROM NPM

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        var songdata = data.tracks.items;

//GET THE SONG DATA, CAN'T GET THE ARTIST'S NAME RIGHT NOW
        for(var i = 0; i<10; i++){
            console.log("Result #: " + i);
            console.log("Artist Name: " + songdata[i].album.artists[0].name);
            console.log("Track Name: " + songdata[i].name);
            console.log("Album Name: " + songdata[i].album.name);
            console.log("Release Date: " + songdata[i].album.release_date);


            
        }

      });

}

// Function for running a Movie Search
var getMovie = function(movie) {
    if (movie === undefined) {
      movie = "Avengers Infinity War";
    }
  
    var urlHit = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
    request(urlHit, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);

        // console.log(jsonData);
  
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
      }
    });
  };


//FUNCTION TO TAKE THE TXT INPUT AND PLUG IT INTO THE SPOTIFY FUNCTION

var dowhatitsays = function(){

// This block of code will read from the "random.txt" file.
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // We will then re-display the content as an array for later use.
    spotifythissong(data);

});
}

//FUNCTION TO CAPTURE INPUT OF THE NODE INPUTS, USE INQUIRER TO CAPTURE TWO WORD VALUES FOR SONGS

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we create a basic list prompt.
    {
      type: "list",
      message: "What do you want to do?",
      name: "action",
     //BASED ON INQUIRER INPUT, TWEETS WON'T HAVE A SECOND QUESTION

      choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]

    },
    //BASED ON INQUIRER INPUT, ASK FOR THE SONG BEING SEARCHED
    {
      type: "input",
      message: "What song are you searching?",
      name: "search",
      when: function( answers ) {
        // Only run if user answered Pizza to the first prompt
        return answers.action === "spotify-this-song";
      },
    },
        //BASED ON INQUIRER INPUT, ASK FOR THE MOVIE BEING SEARCHED

    {
        type: "input",
        message: "What movie are you searching?",
        name: "search",
        when: function( answers ) {
          // Only run if user answered Pizza to the first prompt
          return answers.action === "movie-this";
        },
      }
  ])
  .then(function(inquirerResponse) {
    if (inquirerResponse.action === "my-tweets") {

        //NOW WE ADD LOGIC TO RUN OUR FUNCTIONS TO PULL THE INFORMATION
        var search = inquirerResponse.search;
        mytweets();

      console.log("you selected tweets");
      console.log(JSON.stringify(inquirerResponse, null, 2));
    }
    else if (inquirerResponse.action === "spotify-this-song") {
        console.log(JSON.stringify(inquirerResponse, null, 2));
        var search = inquirerResponse.search;
        
        spotifythissong(search);

      }
    else if (inquirerResponse.action === "movie-this") {
        console.log(JSON.stringify(inquirerResponse, null, 2));
        var search = inquirerResponse.search;
        getMovie(search);

      }
    else if (inquirerResponse.action === "do-what-it-says") {
        console.log(JSON.stringify(inquirerResponse, null, 2));
        var search = inquirerResponse.search;
        dowhatitsays();

      }
  });



//OPEN ISSUES


