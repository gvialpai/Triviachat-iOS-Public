import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';

var api = require('../../Utils/api');
var PlayerInfo = require('./PlayerInfo/PlayerInfo');
var GameScreen = require('./GameScreen/GameScreen');
var ResultsModal = require('./Results/ResultsModal');

class Game extends Component{
  constructor(props){
    super(props);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.state = {
      difficultySelected: this.props.difficultySelected,
      questions: this.props.questionSet,
      currentQuestion: this.props.questionSet[0],
      currentQuestionTitle: this.props.questionSet[0].question,
      correctAnswer: this.props.questionSet[0].correct_answer,
      incorrectAnswers: this.props.questionSet[0].incorrect_answers,
      userAnswer: null,
      isUserAnswerCorrect: null,
      allShuffledAnswers: [...this.props.questionSet[0].incorrect_answers,this.props.questionSet[0].correct_answer],
      score: 0,
      questionNumber: 0,
      timer: 30000,
      interval: null,
      modalVisible: false,
      topScoresByDifficultyLevel: {easy:{topFiveScores: []}, medium:{topFiveScores: []}, hard:{topFiveScores: []}},
    }
    allScores = {};
  }

  componentDidMount(){
    let allShuffledAnswers = this.shuffle(this.state.allShuffledAnswers);
    this.setState({
      allShuffledAnswers: allShuffledAnswers,
    });
    this.timerInterval();
  }

  componentWillUnmount(){
    clearInterval(this.state.interval);
  }

  timerInterval(){
    let interval = setInterval(this.counter.bind(this), 1000);
    this.setState({interval: interval});
  }
  counter(){
    let timeLeft = this.state.timer;
    if (timeLeft >= 1000){
      this.setState({
        timer: timeLeft - 1000
      })
    } else {
      clearInterval(this.state.interval);
      this.setScore(this.state.difficultySelected);
    }
  }

  showResultScreen(difficulty){
    if (!this.state.modalVisible){
      this.setState({
        modalVisible: true,
      })
    } else {
      this.setState({
        modalVisible: false,
      })
    }
  }

  setScore(difficulty){
    this.getAllScores(difficulty).then(allScores => {
      if(!allScores[difficulty]){
        allScores[difficulty] = {scores: []};
      }

      let latestScore = this.state.score;
      scores = allScores[difficulty].scores.slice()
      scores = scores.concat(latestScore);
      scores = scores.sort(this.sortArray);
      let topFiveScores = scores.splice(0, scores.length - (scores.length -5));
      let topScoresByDifficultyLevel = this.state.topScoresByDifficultyLevel;
      topScoresByDifficultyLevel[difficulty] = {'topFiveScores': topFiveScores};
      allScores[difficulty] = {scores: topFiveScores};

      this.setState({
        topScoresByDifficultyLevel: topScoresByDifficultyLevel,
        modalVisible: true,
      })

      try {
        AsyncStorage.setItem('scoresDB26', JSON.stringify(allScores));
      } catch (error) {
        console.log('error', error);
      }
    })
  }

  sortArray(a,b){
    return b - a;
  }

  getAllScores(difficulty){
    return new Promise((resolve) => {
      AsyncStorage.getItem('scoresDB26').then((allScores) => {
        var allScores = JSON.parse(allScores);
        if(!allScores){
          allScores = {};
        }
        resolve(allScores);
      })
    })
  }

  goToHome(modalVisibility){
    this.showResultScreen(!this.state.modalVisible)
    this.props.navigator.popToTop();
  }

  restartGame(modalVisibility){
    api.getQuestions(this.state.difficultySelected)
      .then((questionSet) => {
        var questionSet = questionSet.results
        this.setState({
          currentQuestion: questionSet[0],
          currentQuestionTitle: questionSet[0].question,
          correctAnswer: questionSet[0].correct_answer,
          incorrectAnswers: questionSet[0].incorrect_answers,
          userAnswer: null,
          isUserAnswerCorrect: null,
          allShuffledAnswers: [...questionSet[0].incorrect_answers,questionSet[0].correct_answer],
          score: 0,
          questionNumber: 0,
          timer: 30000,
          interval: null,
          modalVisible: false,
        })
        this.timerInterval()
      })
  }

  shuffle(questionAnswers){
    for (let i = questionAnswers.length-1; i >=0; i--) {
      let randomIndex = Math.floor(Math.random()*(i+1));
      let itemAtIndex = questionAnswers[randomIndex];
         
      questionAnswers[randomIndex] = questionAnswers[i];
      questionAnswers[i] = itemAtIndex;
    }
    return questionAnswers;
  }

  handleAnswer(answer){
    let userAnswer = answer
    let isUserAnswerCorrect = this.state.isUserAnswerCorrect;
    let score = this.state.score;
    let questionSet = this.state.questions;
    let questionNumber = this.state.questionNumber;
    let i = questionNumber + 1;
    let difficulty = this.state.difficultySelected;

    if (answer == this.state.correctAnswer){
      isUserAnswerCorrect = true;
      score = score + 10;
    } else {
      isUserAnswerCorrect = false;
      score = score;
    };

    if (i == questionSet.length){
      this.setScore(difficulty)
    };

    for (i ; i < questionSet.length; i++){
      nextQuestion = this.props.questionSet[i];
      nextQuestionTitle = nextQuestion.question;
      nextCorrectAnswer = nextQuestion.correct_answer;
      nextIncorrectAnswers =   nextQuestion.incorrect_answers;
      allShuffledAnswers = [...nextIncorrectAnswers,nextCorrectAnswer];
      break
    };

    this.shuffle(allShuffledAnswers);

    this.setState({
      userAnswer: userAnswer,
      isUserAnswerCorrect: isUserAnswerCorrect,
      score: score,
    });

    setTimeout(() => {
      this.setState({
        currentQuestion: nextQuestion,
        currentQuestionTitle: nextQuestionTitle,
        correctAnswer: nextCorrectAnswer,
        incorrectAnswers: nextIncorrectAnswers,
        allShuffledAnswers: allShuffledAnswers,
        userAnswer: null,
        isUserAnswerCorrect: null,
        questionNumber: questionNumber+1
      });
    }, 1500);
  };

  render(){
    let _this = this;
    let allShuffledAnswers = this.state.allShuffledAnswers;
    let userAnswer = this.state.userAnswer;
    let isUserAnswerCorrect = this.state.isUserAnswerCorrect;
    let correctAnswer = this.state.correctAnswer;
    let difficultySelected = this.state.difficultySelected;
    let score = this.state.score;
    let timer = this.state.timer;
    let currentQuestionTitle = this.state.currentQuestionTitle;
    let questionNumber = this.state.questionNumber;
    let modalVisible = this.state.modalVisible;
    let topScoresByDifficultyLevel = this.state.topScoresByDifficultyLevel;

    return (
      <View style={styles.mainContainer}>
        <ResultsModal
          visible={modalVisible}
          difficultySelected={difficultySelected}
          score={score}
          questionNumber={questionNumber}
          topScoresByDifficultyLevel={topScoresByDifficultyLevel}
          modalVisible={modalVisible}
          goToHome={(item) => _this.goToHome(item)}
          restartGame={(item) => _this.restartGame(item)}
        />
        <PlayerInfo
          score={score}
          timer={timer}
        />
        <GameScreen
          questionNumber={questionNumber}
          currentQuestionTitle={currentQuestionTitle}
          allShuffledAnswers={allShuffledAnswers}
          userAnswer={userAnswer} correctAnswer={correctAnswer}
          isUserAnswerCorrect={isUserAnswerCorrect}
          handleAnswer={(item) => _this.handleAnswer(item)}
        />
      </View>
    )
  }
};

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
    },
});

module.exports = Game;
