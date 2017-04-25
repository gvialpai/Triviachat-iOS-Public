'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class Score extends Component{
  render() {
    return (
      <View>
        <Text style={styles.score}> Score: { this.props.score } </Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  score: {
    fontFamily: 'Roboto-Bold',
    color: '#525152',
  },
})

module.exports = Score;
