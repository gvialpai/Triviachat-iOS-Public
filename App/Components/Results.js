import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#98c8f8'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: 'black'
    },
})

class Results extends Component{
  constructor(props){
    super(props);
    this.state = {
      score: this.props.score,
    }
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>All Questions finished</Text>
        <Text style={styles.title}>Final Score: {this.state.score}</Text>
      </View>
    )
  }
}

module.exports = Results;
