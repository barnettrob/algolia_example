const express = require("express");
const app = express();
const { expressPort } = require("./config");
const { getAlgoliaMovieRecords, indexToAlgolia } = require("./algoliaClient.js")

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

  if (movies.length > 0) {
    indexToAlgolia(movies)
    .then(res => {
      return res
    })
    .catch(e => {
      console.log("indexToAlgolia error:", e.message)
      return res.status(500).send("Something went wrong indexing")
    })
  }

  res.send(`Movies have been indexed.`);
});

app.listen(expressPort, function() {
  console.log(`Algolia api is listening on port ${expressPort}`)
});