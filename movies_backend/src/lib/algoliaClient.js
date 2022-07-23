const { algolia } = require("../../config");
const axios = require("axios");
const algoliasearch = require("algoliasearch");
const client = algoliasearch(algolia.applicationId, algolia.adminApiKey);
const index = client.initIndex(algolia.index);

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
  try {
    if (typeof index.saveObjects === "function") {
      await index.saveObjects(records)(({ objectIDs }) => {
        console.log(objectIDs);
      });
    }
  } catch (e) {
    console.error("index.saveObjects error:", e);
  }
};

const addSingleAlgoliaRecord = async function (record) {
  let addedRecord = null;
  try {
    if (typeof record === "object") {
      // Filter out unwanted keys.
      const cleanedObj = cleanObject(record);
      addedRecord = await index
        .saveObject(cleanedObj, { autoGenerateObjectIDIfNotExist: true })
        .then(() => {
          return cleanedObj;
        });
    }
  } catch (e) {
    console.error("index.saveObject error:", e);
    return e.message;
  }

  return addedRecord;
};

const deleteSingleAlgoliaRecord = async function (objectId) {
  let deletedRecord = null;
  try {
    deletedRecord = await index.deleteObject(objectId).then(() => {
      return objectId;
    });
  } catch (e) {
    console.error("index.saveObject error:", e);
    return e.message;
  }

  return deletedRecord;
};

const updateSingleAlgoliaRecord = async function (record) {
  let updatedRecord = null;
  try {
    if (typeof record === "object" && "objectID" in record) {
      // Filter out unwanted keys.
      const cleanedObj = cleanObject(record);
      updatedRecord = await index
        .partialUpdateObject(cleanedObj)
        .then(({ objectID }) => {
          return objectID;
        });
    }
  } catch (e) {
    console.error("index.partialUpdateObject error:", e);
  }

  return updatedRecord;
};

const getSingleAlgoliaRecord = async function (objectId) {
  let record = null;
  try {
    record = await index.getObject(objectId).then((object) => {
      return object;
    });
  } catch (e) {
    console.error("index.getObject error:", e);
  }

  return record;
};

// Removes unwanted keys from object.
const cleanObject = (object) => {
  // Convert object keys into array.
  const fields = typeof object === "object" ? Object.keys(object) : [];

  // Allowed fields to index to Algolia.
  const allowedFields = [
    "objectID",
    "title",
    "alternative_titles",
    "actors",
    "year",
    "image",
    "color",
    "score",
    "rating",
    "actor_facets",
    "genre",
  ];

  // Filter out and include on fields from incoming object that match allowedFields.
  const filteredKeys = allowedFields.filter(function (f) {
    return fields.includes(f);
  });

  // Rebuild object with allowed key/values
  let filteredObject = {};
  for (let key in filteredKeys) {
    filteredObject[filteredKeys[key]] = object[filteredKeys[key]];
  }

  return filteredObject;
};

module.exports = {
  getAlgoliaMovieRecords,
  indexToAlgolia,
  addSingleAlgoliaRecord,
  updateSingleAlgoliaRecord,
  getSingleAlgoliaRecord,
  deleteSingleAlgoliaRecord,
};
