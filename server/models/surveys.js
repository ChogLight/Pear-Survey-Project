let mongoose = require('mongoose');

// create a model class just with questions 
let Survey = mongoose.Schema({
    Author: String,
    Title: String,
    MCQuestions: [String],
    TFQuestions:[String],
},
{
  collection: "surveys"
});



module.exports = mongoose.model('Survey', Survey);