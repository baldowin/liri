var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var dotEnv = require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var spotify = new Spotify(keys.spotify); 
