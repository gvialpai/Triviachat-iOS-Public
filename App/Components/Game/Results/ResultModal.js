'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

var Results = require('./Results');
var Leaderboard = require('./Leaderboard');
var Modalbutton = require('./Modalbutton');

class ResultModal extends Component{
  render() {
    let _this = this;
    let modalBackgroundStyle = { backgroundColor: '#f9f9f9',};
    let innerContainerTransparentStyle = {padding: 20};
    return (
      <View style={[styles.modalContainer, modalBackgroundStyle]}>
       <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
         <Results
           difficultySelected={this.props.difficultySelected}
           score={this.props.score}
           questionNumber={this.props.questionNumber}
          />
         <Leaderboard
           topScoresByDifficultyLevel={this.props.topScoresByDifficultyLevel}
           difficultySelected={this.props.difficultySelected}
          />
         <Modalbutton
           modalVisible={this.props.modalVisible}
           goToHome={(item) => _this.props.goToHome(item)}
           restartGame={(item) => _this.props.restartGame(item)}
         />
       </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  innerContainer: {
    borderRadius: 5,
    flex: 1,
    justifyContent: 'space-around',
  },
})

module.exports = ResultModal;
