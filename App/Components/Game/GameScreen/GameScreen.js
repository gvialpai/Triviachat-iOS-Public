'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

var Question = require('./Question');
var Answers = require('./Answers');

class PlayerInfo extends Component{
  render() {
    let _this = this;
    return (
      <View style={styles.gameScreen}>
        <Question
          questionNumber={this.props.questionNumber}
          currentQuestionTitle={this.props.currentQuestionTitle}
        />
        <Answers
          allShuffledAnswers={this.props.allShuffledAnswers}
          userAnswer={this.props.userAnswer}
          correctAnswer={this.props.correctAnswer}
          isUserAnswerCorrect={this.props.isUserAnswerCorrect}
          handleOnPress={(item) => _this.props.handleAnswer(item)}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
    flexDirection: 'column',
  },
})

module.exports = PlayerInfo;
