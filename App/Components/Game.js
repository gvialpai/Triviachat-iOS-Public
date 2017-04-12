import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

var api = require('../Utils/api');

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
    }
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
      this.showResultScreen()
    }
  }

  showResultScreen(){
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

  goToHome(modalVisibility){
    this.showResultScreen(!this.state.modalVisible)
    this.props.navigator.popToTop();
  }

  restartGame(modalVisibility){
    api.getQuestions(this.state.difficultySelected)
      .then((questionSet) => {
        var questionSet = questionSet.results
        console.log('questionSet in Game.js', questionSet)
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
        // this.showResultScreen(!this.state.modalVisible);
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
    console.log('answer :', answer)
    let userAnswer = answer
    let isUserAnswerCorrect = this.state.isUserAnswerCorrect;
    let score = this.state.score;
    let questionSet = this.state.questions;
    let questionNumber = this.state.questionNumber;
    let i = questionNumber + 1;

    if (answer == this.state.correctAnswer){
      isUserAnswerCorrect = true;
      score = score + 10;
    }
    else {
      isUserAnswerCorrect = false;
      score = score;
    }

    if (i == questionSet.length){
      this.showResultScreen()
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
    let allShuffledAnswers = this.state.allShuffledAnswers
    console.log('currentQuestion: ', this.state.currentQuestion)
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
          <Text style={styles.score}>Score: {this.state.score}</Text>
          <Text style={styles.timer}>Time: {this.state.timer / 1000}</Text>
        </View>
        <View style={styles.gameScreen}>
          <View style={styles.questionContainer}><Text style={styles.title}><Text style={styles.questionSpan}>Question {this.state.questionNumber + 1}:</Text> {this.state.currentQuestionTitle}</Text></View>
          <View style={styles.answersDeck}>
            {
              this.state.allShuffledAnswers.map((item) => {

                const correctAnswerStyle = (this.state.userAnswer && this.state.correctAnswer === item) ? {backgroundColor:'rgb(39, 243, 177)'} : null;
                const incorrectAnswerStyle = (this.state.isUserAnswerCorrect == false && this.state.correctAnswer != item) && item == this.state.userAnswer ? {backgroundColor:'rgb(243, 85, 39)'} : null;

                return (
                  <TouchableOpacity key={item} style={[styles.button,correctAnswerStyle,incorrectAnswerStyle]} onPress={() => _this.handleAnswer(item)}>
                    <View>
                        <Text style={styles.buttonText}> {item} </Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
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
      flex: 0.75,
      padding: 30,
      marginTop: 65,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'rgba(33, 150, 243, 0.53)'
    },
    innerContainer: {
      borderRadius: 5,
      flex: .5,
      justifyContent: 'space-around'
    },
    modalText: {
      flex: 0.75
    },
    mainModalTitle: {
      fontFamily: 'Satisfy',
      fontSize: 50,
      marginBottom: 50,
      textAlign: 'center',
      color: 'rgba(254, 193, 1, 0.76)'
    },
    modalTitle: {
        marginBottom: 60,
        fontSize: 25,
        color: 'black'
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
    score: {
      fontFamily: 'Roboto-Bold',
    },
    timer: {
      fontFamily: 'Roboto-Bold',
    },
    gameScreen: {
      flex: 1,
      flexDirection: 'column',
    },
    questionSpan: {
      color: '#525152',
      fontFamily: 'Roboto-Bold'
    },
    questionContainer: {
      borderWidth: 5,
      borderRadius: 8,
      borderColor: 'rgba(254, 193, 1, 0.76)',
      backgroundColor: 'white',
      padding: 5,
    },
    title: {
      marginBottom: 20,
      fontSize: 20,
      textAlign: 'left',
      color: '#504b50',
    },
    answersDeck: {
      flex: 1,
      flexDirection: 'column',
    },
    button: {
      flex: 100,
      height: 150,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: 'white',
      borderWidth: 5,
      borderRadius: 8,
      borderColor: 'rgba(87, 85, 86, 0.17)',
    },
    buttonText: {
      fontSize: 20,
      fontFamily: 'Roboto-Regular',
    }
});

module.exports = Game;
