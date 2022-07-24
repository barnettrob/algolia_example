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

  // Call backend api.
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
        console.log("addMovie response", response);
        return response;
      })
      .catch((e) => {
        console.log("movie post error:", e.message);
      });
  } catch (error) {
    console.log(error);
  }
};
