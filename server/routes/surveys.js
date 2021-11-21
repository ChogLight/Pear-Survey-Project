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
      console.log(surveys)
      res.render('surveys/list', {
        title: 'surveys',
        surveys: surveys
      });
    }
  });

  router.get('/add', (req, res, next) => {
  console.log("survey details page");
  res.render('surveys/add', {
    title: 'Create Survey',
    surveys: ''
  });

});

router.post('/add', (req, res, next) => {
  console.log(req.body);//author, title, question, row

  let newSurvey = survey({
    "Title": req.body.title,
     "Author": req.body.author,
     "MCQuestions": req.body.questionMC,
     "TFQuestions": req.body.questionTF
   
   });
   survey.create(newSurvey, (err, survey)=>{
    if(err){
        console.log(err);
        res.end(err);
    }
    else{
        //refresh the survey index page
        res.redirect('/surveys');
      }
    });
  });

router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  survey.findById(id, (err, surveyToEdit) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.render('surveys/edit', {title: 'Edit Survey', surveys: surveyToEdit});
    }
  });
});

router.post('/edit/:id', (req, res, next) => {
   let id = req.params.id;
   let editedSurvey = survey({
     "_id": id,
     "Title": req.body.title,
     "Author": req.body.author,
     "MCQuestions": req.body.questionMC,
     "TFQuestions": req.body.questionTF,
   });
   survey.updateOne({_id: id}, editedSurvey, (err)=>{
     if(err){
       console.log(err);
       res.end(err);
     }
     else
     {
       res.redirect('/surveys');
     }
   });


});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  survey.remove({_id:id}, (err)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/surveys');
    }
  });
});

});



module.exports = router;