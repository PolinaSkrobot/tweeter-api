const express = require("express");
require("dotenv").config();
const app = express();
const Twit = require("twit");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
//console.log(process.env);
const T = new Twit({
  consumer_key: process.env.TWEETER_API_KEY,
  consumer_secret: process.env.TWEETER_API_SECRET,
  access_token: process.env.TWEETER_ACCESS_TOKEN,
  access_token_secret: process.env.TWEETER_ACCESS_TOKEN_SECRET,
});

app.get("/", (req, res) => {
  T.get(
    "search/tweets",
    { q: req.query.search || "banana", count: 10 },
    function (err, data, response) {
      console.log(data.statuses);
      res.json(data);
    }
  );
});
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Server is listening on " + port);
});
