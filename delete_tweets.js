/*
* Script that uses twit module and deletes tweets
*/

var twit = require('twit');
var config = require('./config');
var client = new twit(config);
var tweetId;
var tweetToDelete = "hello world!";

//User name is 'tweetmecomp' and searching in last 150 tweets
var options = {
    screen_name: 'tweetmecomp',
    count: 150
};

//Get function for current user
client.get('statuses/user_timeline', options, result)

function result(error, data, response) {
    if (error) {
        console.log("Couldn't get tweets!");
    }
    else {
        //Checking if any result is the relevant tweet
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].text);
            if (data[i].text == tweetToDelete) {
                tweetId = data[i].id_str;
                console.log(tweetId);
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

/*
* This is another option only in case of web application, when a user inputs a tweet to delete 
*
*    delete_tweet = function (tweet) {
*      tweetToDelete = tweet;
*    }
*/

