var api = {
  getQuestions(difficulty){
    difficulty = difficulty.toLowerCase();
    var url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`;
    return fetch(url).then((res) => res.json());
  }
}

module.exports = api;
