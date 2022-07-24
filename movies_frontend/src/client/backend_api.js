const axios = require("axios");
const apiUrl = process.env.REACT_APP_BACKEND_API;
const apiUser = process.env.REACT_APP_BASIC_AUTH_USER;
const apiPassword = process.env.REACT_APP_BASIC_AUTH_PASS;

export const upsertMovie = async (record) => {
  let method = "post";
  let path = "movies";
  if ("objectID" in record && record.objectID !== "") {
    method = "put";
    path = `movies/${record.objectID}`;
  }

  // Call backend api to add or update movie.
  try {
    axios({
      method: method,
      url: `${apiUrl}${path}`,
      data: record,
      auth: {
        username: apiUser,
        password: apiPassword,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        console.log("movie upsert error:", e.message);
      });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovie = async (id) => {
  // Call backend api to delete a movie.
  try {
    axios({
      method: "delete",
      url: `${apiUrl}movies/${id}`,
      auth: {
        username: apiUser,
        password: apiPassword,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        console.log("movie delete error:", e.message);
      });
  } catch (error) {
    console.log(error);
  }
};
