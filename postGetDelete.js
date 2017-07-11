/*
* Script that contains all services in order to use them all in heroku
*/

var twit = require('twit');
var config = require('./config');
var client = new twit(config);

/*******************************
** Posting tweets
*****************************/

var tweet;
var num = 0;

postTweet();

//Setting an iterval for posting every 6 minutes
setInterval(postTweet, 320000)

//Post function
function postTweet() {
    num++;
    tweet = { status: "hello world" + num + "!" }
    client.post('statuses/update', tweet, postResult);
}

//callback function that prints the right result after post
function postResult(error, data, response) {
    if (error) {
        console.log("Couldn't post the tweet!");
    }
    else {
        console.log("Tweet posted!");
    }
}

/*******************************
** Getting tweets
*****************************/
//Searching for last 10 tweets that contains 'world'
var getParams = {
    q: "world",
    count: 10
}

//Get function
client.get('search/tweets', getParams, getResult)

//callback function that prints the error in case of failure and the relevant tweets otherwise
function getResult(error, data, response) {
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

/*******************************
** Deleting tweets
*****************************/

var tweetId;
var tweetToDelete;
var num = 0;

//User name is 'tweetmecomp' and searching in last 150 tweets
var deleteParams = {
    screen_name: 'tweetmecomp',
    count: 150
};

deleteTweet();

//Setting an iterval for posting every 5 minutes
setInterval(deleteTweet, 300000)

//Get function for current user
function deleteTweet() {
    num++;
    tweetToDelete = "hello world" + num + "!";
    client.get('statuses/user_timeline', deleteParams, deleteResult)
}

function deleteResult(error, data, response) {
    if (error) {
        console.log("Couldn't get tweets!");
    }
    else {
        //Checking if any result is the relevant tweet
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].text);
            if (data[i].text == tweetToDelete) {
                tweetId = data[i].id_str;
                //In case tweet is found, removing it from timeline
                client.post('statuses/destroy/:id', { id: tweetId }, function (error, data, response) {
                    if (error) {
                        console.log("Couldn't remove tweets!");
                    } else {
                        console.log("Deleted tweet!");
                    }
                })
            }
        }
    }
}
