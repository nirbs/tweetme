/*
* Script that uses twit module and posts a tweet
*/

var twit = require('twit');
var config = require('./config');
var client = new twit(config);

var tweet;
var num = 0;

postTweet();

//Setting an iterval for posting every 5 minutes
setInterval (postTweet, 300000)

//Post function
function postTweet() {
    num++;
    tweet = {status: "hello world" + num + "!"}
    client.post('statuses/update', tweet, result);
}

//callback function that prints the right result after post
function result(error, data, response) {
    if (error) {
        console.log("Couldn't post the tweet!");
    }
    else {
        console.log("Tweet posted!");
    }
}

/*
* This is another option only in case of web application, when a user inputs a tweet to post 
*
*    post_tweet = function (tweet) {
*      client.post('statuses/update', {status: tweet}, result);
*    }
*/

