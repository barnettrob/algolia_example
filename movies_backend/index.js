const express = require("express");
const app = express();
const { expressPort } = require("./config");
const { apiRouter } = require("./src/api/");
const cors = require("cors");

// Cors to allow communication between sites.
app.use(cors());
// Middleware to handle body in requests.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APIs
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send(
    "Welcome to Algolia index api.  Go to /index to index movie items from https://github.com/algolia/datasets/blob/master/movies/records.json"
  );
});

app.listen(expressPort, function () {
  console.log(`Algolia api is listening on port ${expressPort}`);
});
