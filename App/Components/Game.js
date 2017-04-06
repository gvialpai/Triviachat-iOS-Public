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
      allAnswers: [],
      isUserAnswerCorrect: '',
    }
  }
  shuffle(array){
    for (let i = array.length-1; i >=0; i--) {
      let randomIndex = Math.floor(Math.random()*(i+1));
        let itemAtIndex = array[randomIndex];
         
        array[randomIndex] = array[i];
        array[i] = itemAtIndex;
    }
    return array;
  }
  handleAnswer(answer){
    console.log('answer :', answer)
    if (answer == this.state.correctAnswer){
      console.log('correct answer')
      this.setState({
        isUserAnswerCorrect: true,},
        () => {
          console.log('this.state', this.state)
      })
    }
    else {
      console.log('incorrect answer')
      this.setState({
        isUserAnswerCorrect: false,},
        () => {
          console.log('this.state', this.state)
      })
    }
  }
  render(){
    let _this = this;
    let allAnswers = [];
    let correctAnswer = this.state.correctAnswer;
    let incorrectAnswers = this.state.incorrectAnswers;

    allAnswers.push(correctAnswer);
    for (i of incorrectAnswers) {
      allAnswers.push(i);
    }
    let allShuffledAnswers = this.shuffle(allAnswers)

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Question: {this.state.currentQuestion.question}</Text>
        <View style={styles.answersDeck}>
          {
            allShuffledAnswers.map(function (item) {
              return (
                <View key={item} style={styles.answer}>
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
