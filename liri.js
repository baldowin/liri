var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var dotEnv = require("dotenv").config();
var keys = require("./keys");
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
    if(title==="") title="Mr Nobody";
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
    if (name===""){ var name="the sign";}
    spotify.search({ type: 'track', query: name}).then(function(res){
        res.tracks.items.forEach(function(song){
            var artists="";
            song.album.artists.forEach(function(art){
                artists=artists+art.name+" ";
            })
            console.log("Artist: "+artists);
            console.log("Song: "+song.name);
            console.log("Album: "+song.album.name);
            console.log("Listen to this song here: "+song.preview_url);
            console.log(" ")
        });
    })
}
function readIn(){
    fs.readFile("random.txt","utf8",function(err,data){
        //console.log(data);
        var info = data.split(",");
        mode=info[0]
        if(input.length>1) input=info[1];
        else input="";
        main();
    })
}
function main(){
if (mode==="concert-this") concert(input);

else if(mode==="spotify-this-song") song(input);

else if(mode==="movie-this") movie(input);

else if(mode==="do-what-it-says") readIn();

else console.log("invalid input");
}
main();
