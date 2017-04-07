import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

var Results = require('./Results');
var encoder = require('../Utils/encoder');

class Game extends Component{
  constructor(props){
    super(props);
    this.handleAnswer = this.handleAnswer.bind(this);

    let incorrectAnswers = this.props.questionSet[0].incorrect_answers.map((s) => encoder.htmlDecode(s))

    this.state = {
      questions: this.props.questionSet,
      currentQuestion: this.props.questionSet[0],
      currentQuestionTitle: encoder.htmlDecode(this.props.questionSet[0].question),
      correctAnswer: encoder.htmlDecode(this.props.questionSet[0].correct_answer),
      incorrectAnswers: incorrectAnswers,
      isUserAnswerCorrect: null,
      allShuffledAnswers: [...incorrectAnswers,this.props.questionSet[0].correct_answer],
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
      this.props.navigator.push({
        component: Results,
        passProps: {score: this.state.score}
      })
    }

    for (i ; i < questionSet.length; i++){
      nextQuestion = this.props.questionSet[i];
      nextQuestionTitle = encoder.htmlDecode(nextQuestion.question);
      nextCorrectAnswer = encoder.htmlDecode(nextQuestion.correct_answer);
      nextIncorrectAnswers =   nextQuestion.incorrect_answers.map((s) => encoder.htmlDecode(s));
      allShuffledAnswers = [...nextIncorrectAnswers,nextCorrectAnswer];
      break
    }

    this.shuffle(allShuffledAnswers)

    this.setState({
      isUserAnswerCorrect: isUserAnswerCorrect,
      score: score,
    });

    setTimeout(() => {
      this.setState({
        userAnswer: userAnswer,
        currentQuestion: nextQuestion,
        currentQuestionTitle: nextQuestionTitle,
        correctAnswer: nextCorrectAnswer,
        incorrectAnswers: nextIncorrectAnswers,
        allShuffledAnswers: allShuffledAnswers,
        isUserAnswerCorrect: null,
        questionNumber: questionNumber+1
      });
    }, 1500);
  }
  render(){
    let _this = this;
    console.log('currentQuestion: ', this.state.currentQuestion)

    return (
      <View style={styles.mainContainer}>
        <Text>Score: {this.state.score}</Text>
        <Text style={styles.title}>Question {this.state.questionNumber + 1}: {this.state.currentQuestionTitle}</Text>
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
