var twit =  require('twit');
var config = require('./config');
var client = new twit(config);

var tweet = {status: "hello world!"}


client.post('statuses/update', tweet, result);



function result(error, data, response) {
    if (error) {
        console.log("Couldn't post the tweet!");
    }
    else {
        console.log("Tweet posted!");
    }
}