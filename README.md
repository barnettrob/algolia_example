# Algolia Assigment

<p>This project demonstrates an Algolia administrative search page with movie records.  You can add, edit, and delete movies from the Algolia index from the single-page application (SPA).</p>

<p>It consists of a back-end Node.js Express server and a front-end React.js SPA.  
* The back-end Node.js server has APIs to index all movie records to Algolia as well as POST for adding a movie object to the index, PUT for updating a movie, and DELETE for deleting a movie.  
* The front-end is a React.js SPA that uses Algolia's API to display a search page of movies with the ability to add, edit, and delete movies by calling the back-end Express server's api endpoints.
</p>

## Getting Started

1. To run this project on your local computer, you will need to install [Node.js](https://nodejs.org/en/).
2. Clone the project: `git clone https://github.com/barnettrob/algolia_example.git`
3. cd into the root of the project.

## Back-end Express Server setup

1. cd into the movies_backend directory.
2. Create an environment variables file: .env
3. You can use the contents of the .env.example file in this movies_backend directory to know what to add to the .env file.
4. Install the NPM packages: `npm install`
5. You will need to install either [PM2](https://pm2.keymetrics.io/docs/usage/monitoring/) or [Nodemon](https://nodemon.io/) to start and stop the Express server.
6. Start the Express server using either the instructions from PM2 or Nodemon.

## Front-end React.js SPA setup

1. From the root of the project cd into the movies_frontend directory.
2. Install the NPM packages: `npm install`
3. Create an environment variables file: .env.local
4. You can use the contents of the .env.example file in this movies_frontend directory to know what to add to the .env.local file.
5. The `REACT_APP_BACKEND_API` value will be the url for the React.js server. Something like: http://localhost:3100/api/v1/ It must end with /api/v1/ after the port.
6. The values for `REACT_APP_BASIC_AUTH_USER` and `REACT_APP_BASIC_AUTH_PASS` will be the same as what you gave for `BASIC_AUTH_USER` and `BASIC_AUTH_PASS` in the .env file in the movies_backend directory.
7. Start the React SPA: `npm start`
