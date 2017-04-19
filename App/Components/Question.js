'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class Question extends Component{

  render() {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.title}>
          <Text style={styles.questionSpan}>Question {this.props.questionNumber + 1}:</Text> {this.props.currentQuestionTitle}
        </Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  questionContainer: {
    borderWidth: 5,
    borderRadius: 8,
    borderColor: '#f1c97f',
    backgroundColor: 'white',
    padding: 5,
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'left',
    color: '#504b50',
  },
  questionSpan: {
    color: '#525152',
    fontFamily: 'Roboto-Bold'
  },
})

module.exports = Question;
