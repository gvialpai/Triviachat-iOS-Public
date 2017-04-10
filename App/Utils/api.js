var encoder = require('./encoder');

var api = {
  getQuestions(difficulty){
    return new Promise((resolve,reject) => {
      difficulty = difficulty.toLowerCase();
      var url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`;
      fetch(url)
        .then((res) => res.json())
        .then((questionSet) => {
          for (let value of questionSet.results){
            value.question = encoder.htmlDecode(value.question);
            value.correct_answer = encoder.htmlDecode(value.correct_answer);
            value.incorrect_answers = value.incorrect_answers.map((s) => encoder.htmlDecode(s))
          }
        console.log('questionSet', questionSet)
        resolve(questionSet)
      });
    })
  }
}

module.exports = api;
