const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Twitter = require("twitter");
const dotenv = require("dotenv");
dotenv.config();
const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});
const message = false;

//api to getTweets - implemented by Rajendran Babu

app.post("/getTweets", function (req, res) {
  const screen_name = req.body.twitterHandle;
  const count = req.body.count;
  console.log("screen_name and Count", screen_name, count);
  const params = { screen_name, count };
  const tweetResult = [];
  client.get("statuses/user_timeline", params, function (
    error,
    tweets,
    response
  ) {
    if (!error) {
      console.log("success", tweets);
      tweets.forEach((tweet) => {
        const tweetObj = {
          user: tweet.user.screen_name,
          tweet: tweet.text,
          date: tweet.created_at,
          id: tweet.id,
          str_id: tweet.id_str,
        };
        tweetResult.push(tweetObj);
      });
      console.log("TweetResult", tweetResult);
      res.render("index", { tweetResult: tweetResult });
    } else {
      console.log("inside error");
      res.render("index", {
        message: true,
        messageText: "Some error occured!! Please try again.",
        className: "alert-danger",
      });
    }
  });
});

//api to Post Tweet - implemented by - Archana Shokeen

app.post("/postTweet", function (req, res) {
  const tweetText = req.body.tweetText;
  console.log("tweetText", tweetText);
  const params = { status: tweetText };
  client.post("statuses/update", params, function (err, data, response) {
    if (!err) {
      console.log("Tweet Posted");
      res.render("index", {
        message: true,
        messageText: "Tweet Post successful !!",
        className: "alert-success",
      });
    } else if (data) {
      console.log(data);
      res.render("index", {
        message: true,
        messageText: "Some error occured!! Please try again.",
        className: "alert-danger",
      });
    } else {
      console.log(err);
    }
  });
});

//api to delete Tweet - implemented by- Eric Cheng

app.post("/deleteTweet", function (req, res) {
  const tweetId = req.body.tweetId;
  client.post(`statuses/destroy/${tweetId}.json`, function (
    err,
    data,
    response
  ) {
    if (!err) {
      console.log("delete succesfull");

      res.render("index", {
        message: true,
        messageText: "Tweet deleted succesfully!, please refresh the page.",
        className: "alert-success",
      });
      res.json({ message: true, redirect: "/" });
    } else if (data) {
      console.log("data error", data);
      res.render("index", {
        message: true,
        messageText: "Some error occured!! Please try again.",
        className: "alert-danger",
      });
    } else {
      console.log(res);
      res.render("index", {
        message: true,
        messageText: "Some error occured!! Please try again.",
        className: "alert-danger",
      });
    }
  });
});

module.exports = app.listen(3000, () => {
  console.log("Server Started");
});
