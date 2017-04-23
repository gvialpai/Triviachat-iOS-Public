'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  Modal,
  StyleSheet,
} from 'react-native';

var Results = require('./Results');

class EntireModal extends Component{
  render() {
    let _this = this;
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.modalVisible}
          supportedOrientations={['portrait']}
        >
          <Results
            difficultySelected={this.props.difficultySelected}
            score={this.props.score}
            questionNumber={this.props.questionNumber}
            topScoresByDifficultyLevel={this.props.topScoresByDifficultyLevel}
            modalVisible={this.props.modalVisible}
            goToHome={(item) => _this.props.goToHome(item)}
            restartGame={(item) => _this.props.restartGame(item)}
          />
        </Modal>
      </View>
    )
  }
}

module.exports = EntireModal;
