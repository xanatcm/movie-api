//Models
const { Actors } = require('../models/actors.model');
const { Movies } = require('../models/movies.model')

const initModels = () => {
    Movies.hasMany(Actors);
    Actors.belongsTo(Movies);


};

module.exports = {initModels}