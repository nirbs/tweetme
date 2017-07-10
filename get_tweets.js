var twit =  require('twit');
var config = require('./config');
var client = new twit(config);

var params = {
    q: "world",
    count: 10
}
client.get('search/tweets', params, result)

function result(error, data, response) {
    if (error) {
        console.log("Couldn't get tweets!");
    }
    else {
        var tweets = data.statuses;
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
    }
}