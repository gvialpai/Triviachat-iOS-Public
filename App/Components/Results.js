'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class Results extends Component{
  render() {
    return (
      <View style={styles.modalText}>
        <Text style={styles.mainModalTitle}>Results</Text>
        <Text style={styles.modalTitle}>Difficulty: {this.props.difficultySelected}</Text>
        <Text style={styles.modalTitle}>Final Score: {this.props.score}</Text>
        <Text style={styles.modalTitle}>Total Answers: {this.props.questionNumber}</Text>
        <Text style={styles.modalTitle}>Correct Answers: {this.props.score / 10}</Text>
      </View>
    )
  }
}

// Results.propTypes = {
//   topScoresByDifficultyLevel: React.PropTypes.object.isRequired
// }

var styles = StyleSheet.create({
  modalText: {
    flex: 0.5
  },
  mainModalTitle: {
    fontFamily: 'Satisfy',
    fontSize: 50,
    marginBottom: 25,
    textAlign: 'center',
    color: 'rgba(254, 193, 1, 0.76)'
  },
  modalTitle: {
      marginBottom: 10,
      fontSize: 25,
      color: 'black'
  },
})

module.exports = Results;
