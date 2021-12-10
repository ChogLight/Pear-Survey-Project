// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let jwt = require("jsonwebtoken");

//Heylisse
let passport = require("passport");
//let surveysControllers = require('../controllers/surveys');

// helper function for guard purposes H
function requireAuth(req, res, next) {
  // check if the user is logged in H
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}
// define the survey model
let survey = require("../models/surveys");
let answer = require("../models/answers");

/* GET surveys List page. READ */
router.get("/", (req, res, next) => {
  // find all surveys in the surveys collection
  survey.find((err, surveys) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(surveys);
      res.render("surveys/list", {
        title: "surveys",
        surveys: surveys,
        displayName: req.user ? req.user.displayName : "",
        user: req.user,
      });
    }
  });

  router.get("/add", requireAuth, (req, res, next) => {
    console.log("survey details page");
    res.render("surveys/add", {
      title: "Create Survey",
      surveys: "",
      displayName: req.user ? req.user.displayName : "",
    });
  });

  router.post("/add", requireAuth, (req, res, next) => {
    console.log(req.body.questionsMC);
    console.log(req.body.questionsTF);
    console.log("Parsed information");
    console.log(JSON.parse(req.body.questionsMC));
    console.log(JSON.parse(req.body.questionsTF));

    let newSurvey = survey({
      User: req.user.id,
      Title: req.body.title,
      Author: req.body.author,
      MCQuestions: JSON.parse(req.body.questionsMC),
      TFQuestions: JSON.parse(req.body.questionsTF),
      // Participants: 0,
    });

    survey.create(newSurvey, (err, survey) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        //refresh the survey index page
        res.redirect("/surveys");
      }
    });
  });

  router.get("/edit/:id", requireAuth, (req, res, next) => {
    let id = req.params.id;
    survey.findById(id, (err, surveyToEdit) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        console.log(surveyToEdit);
        res.render("surveys/edit", {
          title: "Edit Survey",
          surveys: surveyToEdit,
          displayName: req.user ? req.user.displayName : "",
        });
      }
    });
  });

  router.post("/edit/:id", requireAuth, (req, res, next) => {
    console.log(req.body);
    let id = req.params.id;
    let editedSurvey = survey({
      _id: id,
      Title: req.body.title,
      Author: req.body.author,
      MCQuestions: JSON.parse(req.body.questionsMC),
      TFQuestions: JSON.parse(req.body.questionsTF),
    });
    survey.updateOne({ _id: id }, editedSurvey, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect("/surveys");
      }
    });
  });
});

//route for the take survey page
router.get("/take/:id", (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  survey.findById(id, (err, surveyToTake) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log(surveyToTake);
      // res.send(surveyToTake);
      res.render("surveys/take", {
        title: "Take Survey",
        surveys: surveyToTake,
      });
    }
  });
});

//post take survey
router.post("/take/:id", (req, res, next) => {
  console.log(req.body);
  // res.end();
  let id = req.params.id;
  let completed = answer({
    SurveyID: id,
    MCQuestions: JSON.parse(req.body.answersMC),
    TFQuestions: JSON.parse(req.body.answersTF),
  });
  answer.create(completed, (err, answer) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/");
    }
  });
});
// GET - process the delete by user id
router.get("/delete/:id", requireAuth, (req, res, next) => {
  let id = req.params.id;
  survey.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/surveys");
    }
  });
});

module.exports = router;
