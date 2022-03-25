//Create Express server
const express = require('express');

//Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

//Routers
const { userRouter } = require('./routes/user.routes');
const { moviesRouter } = require('./routes/movie.routes');
const { acotrsRouter } = require('./routes/actor.routes');

//Utils

//Init express app
const app = express();

//Enable JSON incoming data
app.use(express.json());

//Enable multipart/form-data incoming data (to receve files)
//app.use(express.urlencoded({extended: true}));

//Endpoints
app.use('/api-movies/v1/users', userRouter);
app.use('/api-movies/v1/movies', moviesRouter);
app.use('/api-movies/v1/actors', acotrsRouter);

//Error handler
app.use(globalErrorHandler);

module.exports = { app };
