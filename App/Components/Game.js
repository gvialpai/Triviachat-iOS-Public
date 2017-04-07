import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

class Game extends Component{
  constructor(props){
    super(props);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.state = {
      questions: this.props.questionSet,
      currentQuestion: this.props.questionSet[0],
      correctAnswer: this.props.questionSet[0].correct_answer,
      incorrectAnswers: this.props.questionSet[0].incorrect_answers,
      isUserAnswerCorrect: null,
      allShuffledAnswers: [...this.props.questionSet[0].incorrect_answers,this.props.questionSet[0].correct_answer],
      score: 0,
      questionNumber: 0,
    }
  }

  componentDidMount(){
    let allShuffledAnswers = this.shuffle(this.state.allShuffledAnswers);

    this.setState({
      allShuffledAnswers: allShuffledAnswers
    });
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
    let isUserAnswerCorrect = this.state.isUserAnswerCorrect;
    let score = this.state.score;
    let userAnswer = this.state.userAnswer;
    let questionSet = this.state.questions;
    let questionNumber = this.state.questionNumber;

    if (answer == this.state.correctAnswer){
      isUserAnswerCorrect = true;
      score = score + 10;
    }
    else {
      isUserAnswerCorrect = false;
      score = score;
    }

    for (var i = questionNumber + 1; i < questionSet.length; i++){
      nextQuestion = this.props.questionSet[i];
      nextCorrectAnswer = nextQuestion.correct_answer;
      nextIncorrectAnswers = nextQuestion.incorrect_answers;
      allShuffledAnswers = [...nextIncorrectAnswers,nextCorrectAnswer];
      break
    }

    this.shuffle(allShuffledAnswers)

    this.setState({
      isUserAnswerCorrect: isUserAnswerCorrect,
      score: score,
      userAnswer: userAnswer,
      currentQuestion: nextQuestion,
      correctAnswer: nextCorrectAnswer,
      incorrectAnswers: nextIncorrectAnswers,
      allShuffledAnswers: allShuffledAnswers,
    });
  }
  render(){
    let _this = this;
    console.log('currentQuestion: ', this.state.currentQuestion)

    return (
      <View style={styles.mainContainer}>
        <Text>Score: {this.state.score}</Text>
        <Text style={styles.title}>Question: {this.state.currentQuestion.question}</Text>
        <View style={styles.answersDeck}>
          {
            this.state.allShuffledAnswers.map((item) => {

              const correctAnswerStyle = (this.state.isUserAnswerCorrect == true) && this.state.correctAnswer === item ? {backgroundColor:'green'} : null;
              const incorrectAnswerStyle = (this.state.isUserAnswerCorrect == false) && this.state.correctAnswer != item ? {backgroundColor:'red'} : null;

              return (
                <View key={item} style={[styles.answer,correctAnswerStyle,incorrectAnswerStyle]}>
                  <TouchableHighlight onPress={() => _this.handleAnswer(item)}>
                    <Text style={styles.answerText}> {item} </Text>
                  </TouchableHighlight>
                </View>
              )
            })
          }
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
        backgroundColor: '#98c8f8'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'left',
        color: 'black'
    },
    answersDeck: {
      flex: 1,
      flexDirection: 'column',
    },
    answer: {
      backgroundColor: 'white',
      flex: 100,
      height: 150,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    answerText: {
      fontSize: 20
    }
});

module.exports = Game;
