const { algolia } = require("./config");
const axios = require("axios");
const algoliasearch = require("algoliasearch");

const getAlgoliaMovieRecords = async function () {
  const records = await axios
    .get(`${algolia.dataset}`)
    .then((response) => {
      let data = "No data available";
      // Make sure we have an object for the response and data key
      if (typeof response === "object" && "data" in response) {
        data = response.data;
      }
      // Remove element that is not an object because this will not be a movie object and should not be indexed.
      data = data.filter((d) => typeof d === "object");

      // Let's just get the first 100 records to index.
      data = data.slice(0, 100);

      return data;
    })
    .catch((e) => {
      console.log("getAlgoliaMovieRecords error:", e.message);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: e.message,
        }),
      };
    });

  return records;
};

const indexToAlgolia = async function (records) {
  const client = algoliasearch(algolia.applicationId, algolia.adminApiKey);
  const index = client.initIndex(algolia.index)

  try {
    if (typeof index.saveObjects === "function") {
      await index.saveObjects(records)(({ objectIDs }) => {
        console.log(objectIDs);
      });
    }
  }
  catch(e) {
    console.error("index.saveObjects error:", e)
  }
};

module.exports = {
  getAlgoliaMovieRecords,
  indexToAlgolia
};
