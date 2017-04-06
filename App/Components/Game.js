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
    this.state = {
      questions: this.props.questionSet,
      currentQuestion: this.props.questionSet[0],
      correctAnswer: this.props.questionSet[0].correct_answer,
      incorrectAnswers: this.props.questionSet[0].incorrect_answers,
      allAnswers: []
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
  render(){
    let allAnswers = [];
    let correctAnswer = this.state.correctAnswer;
    let incorrectAnswers = this.state.incorrectAnswers;

    allAnswers.push(correctAnswer);
    for (i of incorrectAnswers) {
      allAnswers.push(i);
    }
    console.log('allAnswers', allAnswers);
    let allShuffledAnswers = this.shuffle(allAnswers)
    console.log('allShuffledAnswers', allShuffledAnswers);



    return (
      <View style={styles.mainContainer}>
        <Text>Question: {this.state.currentQuestion.question}</Text>
      </View>

      // <button onPress={() => this.nextQuestion()}
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
        textAlign: 'center',
        color: 'black'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});

module.exports = Game;
