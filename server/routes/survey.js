// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the survey model
let survey = require('../models/surveys');

/* GET surveys List page. READ */
router.get('/', (req, res, next) => {
  // find all surveys in the surveys collection
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/index', {
        title: 'surveys',
        surveys: surveys
      });
    }
  });

});

//  GET the survey Details page in order to add a new survey
router.get('/add', (req, res, next) => {

    console.log("survey details page");
    res.render('surveys/details', {
      title: 'Add survey',
      surveys: ''
    });

});