import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  NavigatorIOS,
  StyleSheet,
  View
} from 'react-native';

var Main = require('./App/Components/Main')

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#98c8f8',
    },
});

class TriviaChatReactNative extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Home',
          component: Main
        }}
      />
    );
  }
}

AppRegistry.registerComponent('TriviaChatReactNative', () => TriviaChatReactNative);
