'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class Answers extends Component{
  render() {
    let _this = this;
    return (
      <View style={styles.answersDeck}>
        {
          this.props.allShuffledAnswers.map((item) => {
            const correctAnswerStyle = (this.props.userAnswer && this.props.correctAnswer === item) ? {backgroundColor:'#7ff1cf'} : null;
            const incorrectAnswerStyle = (this.props.isUserAnswerCorrect == false && this.props.correctAnswer != item) && item == this.props.userAnswer ? {backgroundColor:'#f17f7f'} : null;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.button,correctAnswerStyle,incorrectAnswerStyle]}
                onPress={() => _this.props.handleOnPress(item)}
              >
                <View>
                    <Text style={styles.buttonText}> {item} </Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}

Answers.propTypes = {
  allShuffledAnswers: React.PropTypes.array.isRequired
}

var styles = StyleSheet.create({
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
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    color: '#525152',
  }
})

module.exports = Answers;
