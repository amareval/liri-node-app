//Calling the dotenv package

require("dotenv").config();

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
            console.log(songdata[i].artists.external_urls);
            console.log(songdata[i].name);
            console.log(songdata[i].album.name);

            
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
  
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
      }
    });
  };

  getMovie();

//OPEN ISSUES
//ARTIST NAME ON SPOTIFY
//Need to add the function to pass the song name into the spotify function
//Need to add the function of passing in the designated request
