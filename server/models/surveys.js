let mongoose = require('mongoose');
let user =require('./user');

// create a model class just with questions 
let Survey = mongoose.Schema({
    User: String,
    Author: String,
    Title: String,
    MCQuestions: [String],
    TFQuestions:[String],
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', Survey);