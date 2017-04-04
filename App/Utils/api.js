var api = {
  getQuestions(difficulty){
    difficulty = difficulty.toLowerCase();
    var url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`;
    return fetch(url).then((res) => res.json());
  }
}

module.exports = api;
