const express = require("express");
const app = express();
const { expressPort } = require("./config");
const { getAlgoliaMovieRecords } = require("./algoliaClient.js")

app.get("/", (req, res) => {
  res.send(
    "Welcome to Algolia index api.  Go to /index to index movie items from https://github.com/algolia/datasets/blob/master/movies/records.json"
  );
});

app.get("/index", async (req, res) => {
  const movies = await getAlgoliaMovieRecords()
  .then(response => {
    return response
  })
  .catch(e => {
    console.log(`${e.message}`)
    return false
  })

  console.log("movies", movies)
  console.log('length', movies.length)
  res.send(`You've reached the index page`);
});

app.listen(expressPort, function() {
  console.log(`Algolia api is listening on port ${expressPort}`)
});