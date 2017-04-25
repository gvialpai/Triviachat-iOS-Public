'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class Timer extends Component{
  render() {
    return (
      <View>
        <Text style={styles.timer}>Time: {this.props.timer / 1000}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  timer: {
    fontFamily: 'Roboto-Bold',
    color: '#525152',
  },
})

module.exports = Timer;
