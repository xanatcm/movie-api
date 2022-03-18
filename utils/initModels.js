//Models
const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');
const { Review } = require('../models/review.model');
const { ActorInMovies } = require('../models/actorInMovies.model');

const initModels = () => {
  // 1 User <--> M Review
  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  //M Movies <--> M Actors
  Movie.belongsToMany(Actor, { through: ActorInMovies });
  Actor.belongsToMany(Movie, { through: ActorInMovies });
};

module.exports = { initModels };
