let mongoose = require("mongoose");
let user = require("./user");

// create a model class just with questions
let Survey = mongoose.Schema(
  {
    User: String,
    Author: String,
    Title: String,
    MCQuestions: [
      {
        Title: String,
        Option1: String,
        Option1Total: Number,
        Option2: String,
        Option2Total: Number,
        Option3: String,
        Option3Total: Number,
        Option4: String,
        Option4Total: Number,
      },
    ],
    TFQuestions: [
      {
        Title: String,
        Option1: String,
        Option1Total: Number,
        Option2: String,
        Option2Total: Number,
      },
    ],
  },
  {
    collection: "surveys",
  }
);

module.exports = mongoose.model("Survey", Survey);
