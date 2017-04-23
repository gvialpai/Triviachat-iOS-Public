'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

var Score = require('./Score');
var Timer = require('./Timer');

class PlayerInfo extends Component{
  render() {
    return (
      <View style={styles.playerInfo}>
        <Score score={this.props.score} />
        <Timer timer={this.props.timer} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  playerInfo: {
    flex: .1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

module.exports = PlayerInfo;
