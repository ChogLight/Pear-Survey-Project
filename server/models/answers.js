let mongoose = require("mongoose");
let user = require("./user");

// create a model class just with questions
let Answer = mongoose.Schema(
  {
    SurveyID: String,
    Title: String,
    MCAnswers: [
      {
        Question: String,
        Answer: String,
      },
    ],
    TFQuestions: [
      {
        Question: String,
        Answer: String,
      },
    ],
  },
  {
    collection: "answers",
  }
);

module.exports = mongoose.model("Answer", Answer);
