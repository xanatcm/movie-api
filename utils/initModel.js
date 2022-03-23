//Models
const { User } = require('../models/user.model');
const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');
const { Review } = require('../models/review.model');
const { ActorInMovies } = require('../models/actorInMovies.model');

const initModel = () => {
  // 1 User <--> M Review
  User.hasMany(Review);
  Review.belongsTo(User);

  //1 Movie <--> M Review
  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  //M Movies <--> M Actors
  Movie.belongsToMany(Actor, { through: ActorInMovies });
  Actor.belongsToMany(Movie, { through: ActorInMovies });
};

module.exports = { initModel };
