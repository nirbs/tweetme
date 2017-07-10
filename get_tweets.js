/*
* Script that uses twit module and gets tweets
*/

var twit = require('twit');
var config = require('./config');
var client = new twit(config);

//Searching for last 10 tweets that contains 'world'
var params = {
    q: "world",
    count: 10
}

//Get function
client.get('search/tweets', params, result)

//callback function that prints the error in case of failure and the relevant tweets otherwise
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


/*
* This is another option only in case of web application, when a user inputs tweets to search 
*
*    get_tweet = function (tweet, num) {
*      client.post('statuses/update', {q: tweet,  count: num}, result);
*    }
*/