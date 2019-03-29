var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var dotEnv = require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs"); 
var spotify = new Spotify(keys.spotify);
var mode = process.argv[2];
var input = process.argv.slice(3).join(" ");
function concert(artist){
    axios.get("https://rest.bandsintown.com/artists/"+artist+"/events?app_id=codingbootcamp")
    .then(function(res){
        var info = res.data
        if(info.length>0){
            console.log("Upcoming concerts for this artist:")
            var event=info[i];
            for(var i=0;i<info.length;i++){
                console.log(moment(info[i].datetime).format("MMMM Do YYYY")+": "+info[i].venue.name+", "+info[i].venue.city+", "+info[i].venue.country);
            }
        }
        else{
            console.log("no results for this artist")
        }
    })
}
function movie(title){
    axios.get("http://www.omdbapi.com/?t="+title+"&plot=short&apikey=trilogy")
    .then(function(res){
        var info =res.data;
        console.log("Title: "+ info.Title);
        console.log("Year Released: "+ info.Year);
        console.log("IMDB Rating: "+ info.imdbRating);
        for(var i=0;i<info.Ratings.length;i++){
            if(info.Ratings[i]["Source"]==="Rotten Tomatoes"){
                console.log("Rotten Tomatoes Rating: "+ info.Ratings[i]["Value"]);
            }
        }
        console.log("Country: "+ info.Country);
        console.log("Language: "+ info.Language);
        console.log("Plot: "+ info.Plot);
        console.log("Actors: "+ info.Actors);
    })
}
function song(name){
    console.log(name);
    spotify.search({ 
        type: 'track', 
        querry: input
    },function(err,res){
        if(err){
            return console.log(err);
        }
        console.log(res);
    })
}
function readIn(){
    console.log("input");
}

if (mode==="concert-this") concert(input);

else if(mode==="spotify-this-song") song(input);

else if(mode==="movie-this") movie(input);

else if(mode==="do-what-it-says") readIn();

else console.log("invalid input");
