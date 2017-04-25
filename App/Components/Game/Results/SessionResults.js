'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class SessionResults extends Component{
  render() {
    return (
      <View style={styles.modalText}>
        <Text style={styles.mainModalTitle}>Results</Text>
        <Text style={styles.modalTitle}>
          <Text style={styles.modalTitleBold}>
            Difficulty:</Text> {this.props.difficultySelected}
        </Text>
        <Text style={styles.modalTitle}>
          <Text style={styles.modalTitleBold}>
            Final Score:</Text> {this.props.score}
        </Text>
        <Text style={styles.modalTitle}>
          <Text style={styles.modalTitleBold}>
            Total Answers:</Text> {this.props.questionNumber}
        </Text>
        <Text style={styles.modalTitle}>
          <Text style={styles.modalTitleBold}>
            Correct Answers:</Text> {this.props.score / 10}
        </Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  modalText: {
    flex: 0.5,
    marginBottom: 20,
  },
  mainModalTitle: {
    fontFamily: 'Satisfy',
    fontSize: 50,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#518b99',
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'Roboto',
    color: '#525152',
  },
  modalTitleBold: {
    fontFamily: 'Roboto-Bold',
  }
})

module.exports = SessionResults;
