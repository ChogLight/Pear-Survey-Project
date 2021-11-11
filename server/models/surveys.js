let mongoose = require('mongoose');

// create a model class
let Survey = mongoose.Schema({
    //eventually properties may be a list but for now
    Title: String,
    Author: String,
    Question1: String,
    Question2: String,
    Question3: String
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', Survey);