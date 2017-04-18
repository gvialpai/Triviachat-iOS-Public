import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  AsyncStorage
} from 'react-native';

var api = require('../Utils/api');
var Score = require('./Score');
var Timer = require('./Timer');
var Question = require('./Question');
var Answers = require('./Answers');

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
      topScoresByDifficultyLevel: {},
    }
    var allScores = {}
  }

  componentDidMount(){
    let allShuffledAnswers = this.shuffle(this.state.allShuffledAnswers);

    this.setState({
      allShuffledAnswers: allShuffledAnswers,
    });
    this.timerInterval()
  }

  componentWillUnmount(){
    clearInterval(this.state.interval)
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
      this.setScore(this.state.difficultySelected)
    }
  }

  showResultScreen(difficulty){
    console.log('difficulty in showResultScreen', difficulty)
    console.log("this.state.topScoresByDifficultyLevel: ", this.state.topScoresByDifficultyLevel)
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
      let latestScore = this.state.score;
      let scoresByDifficultyLevel = allScores[difficulty].scores
      console.log('allScores in setScore', allScores);
      scoresByDifficultyLevel =   scoresByDifficultyLevel.concat(latestScore);
      console.log('allScores for difficulty', scoresByDifficultyLevel);
      scoresByDifficultyLevel = scoresByDifficultyLevel.sort(this.sortArray);
      console.log('allScores for difficulty after sorting', scoresByDifficultyLevel);
      let topFiveScores = scoresByDifficultyLevel.splice(0, scoresByDifficultyLevel.length - (scoresByDifficultyLevel.length -5))
      console.log('topFiveScores', topFiveScores)
      let topScoresByDifficultyLevel = this.state.topScoresByDifficultyLevel;
      topScoresByDifficultyLevel[difficulty] = {'topFiveScores': topFiveScores};
      console.log('topScoresByDifficultyLevel', topScoresByDifficultyLevel)
      this.setState({
        topScoresByDifficultyLevel: topScoresByDifficultyLevel,
      })

      try {
        AsyncStorage.setItem('scores', JSON.stringify(allScores));
        this.showResultScreen(difficulty);
      } catch (error) {
        console.log('Error saving data', error);
      }
    })
  }

  sortArray(a,b){
    return b - a;
  }

  getAllScores(difficulty){
    return new Promise((resolve) => {
      AsyncStorage.getItem('scores').then((allScores) => {
        allScores = JSON.parse(allScores)

        if(!allScores[difficulty]){
          allScores[difficulty] = {scores: []}
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
    return questionAnswers
  }

  handleAnswer(answer){
    let userAnswer = answer
    let isUserAnswerCorrect = this.state.isUserAnswerCorrect;
    let score = this.state.score;
    let questionSet = this.state.questions;
    let questionNumber = this.state.questionNumber;
    let i = questionNumber + 1;
    let difficulty = this.state.difficultySelected

    if (answer == this.state.correctAnswer){
      isUserAnswerCorrect = true;
      score = score + 10;
    }
    else {
      isUserAnswerCorrect = false;
      score = score;
    }

    if (i == questionSet.length){
      this.setScore(difficulty)
    }

    for (i ; i < questionSet.length; i++){
      nextQuestion = this.props.questionSet[i];
      nextQuestionTitle = nextQuestion.question;
      nextCorrectAnswer = nextQuestion.correct_answer;
      nextIncorrectAnswers =   nextQuestion.incorrect_answers;
      allShuffledAnswers = [...nextIncorrectAnswers,nextCorrectAnswer];
      break
    }

    this.shuffle(allShuffledAnswers)

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
  }

  render(){
    let _this = this;
    let allShuffledAnswers = this.state.allShuffledAnswers;
    let userAnswer = this.state.userAnswer;
    let isUserAnswerCorrect = this.state.isUserAnswerCorrect;
    let correctAnswer = this.state.correctAnswer;

    let score = this.state.score;
    let timer = this.state.timer;
    let currentQuestionTitle = this.state.currentQuestionTitle;
    let questionNumber = this.state.questionNumber;

    let modalBackgroundStyle = {
      backgroundColor: 'rgba(33, 150, 243, 0.53)',
    };
    let innerContainerTransparentStyle = {backgroundColor: 'white', padding: 20};

    return (
      <View style={styles.mainContainer}>

        <View>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            supportedOrientations={['portrait']}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
           <View style={[styles.modalContainer, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <View style={styles.modalText}>
                <Text style={styles.mainModalTitle}>Results</Text>
                <Text style={styles.modalTitle}>Difficulty: {this.state.difficultySelected}</Text>
                <Text style={styles.modalTitle}>Final Score: {this.state.score}</Text>
                <Text style={styles.modalTitle}>Total Answers: {this.state.questionNumber}</Text>
                <Text style={styles.modalTitle}>Correct Answers: {this.state.score / 10}</Text>
              </View>
              <View style={styles.modalRowButton}>
                <TouchableOpacity style={styles.modalButton} onPress={() => {
                  this.goToHome(!this.state.modalVisible)
                }}><Text style={styles.modalButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => {
                  this.restartGame(!this.state.modalVisible)
                }}><Text style={styles.modalButtonText}>Restart</Text>
                </TouchableOpacity>
              </View>
            </View>
           </View>
          </Modal>
        </View>

        <View style={styles.playerInfo}>
          <Score score={score} />
          <Timer timer={timer} />
        </View>
        <View style={styles.gameScreen}>
          <Question questionNumber={questionNumber} currentQuestionTitle={currentQuestionTitle} />
          <Answers allShuffledAnswers={allShuffledAnswers} userAnswer={userAnswer} correctAnswer={correctAnswer} isUserAnswerCorrect={isUserAnswerCorrect} handleOnPress={(item) => _this.handleAnswer(item)}/>
        </View>
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
        backgroundColor: 'rgba(33, 150, 243, 0.53)',
    },
    modalContainer: {
      flex: 1,
      padding: 30,
      marginTop: 65,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'rgba(33, 150, 243, 0.53)'
    },
    innerContainer: {
      borderRadius: 5,
      flex: 1,
      justifyContent: 'space-around'
    },
    modalText: {
      flex: 0.5
    },
    mainModalTitle: {
      fontFamily: 'Satisfy',
      fontSize: 50,
      marginBottom: 50,
      textAlign: 'center',
      color: 'rgba(254, 193, 1, 0.76)'
    },
    modalTitle: {
        marginBottom: 10,
        fontSize: 25,
        color: 'black'
    },
    leaderboard: {
      flex: .5,
      flexDirection: 'column'
    },
    modalRowButton: {
      flex: 0.15,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    modalButton: {
      height: 50,
      width: 125,
      borderWidth: 5,
      borderRadius: 8,
      borderColor: 'rgba(87, 85, 86, 0.17)',
      backgroundColor: '#FEC101',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalButtonText: {
      fontSize: 25,
      color: 'white',
      alignSelf: 'center',
      fontFamily: 'Roboto-Bold',
    },
    playerInfo: {
      flex: .1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    gameScreen: {
      flex: 1,
      flexDirection: 'column',
    },
});

module.exports = Game;
