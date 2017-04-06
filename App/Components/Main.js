import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

var api = require('../Utils/api');
var Game = require('./Game');

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
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      difficultySelected: '',
    }
  }
  handleSubmit(difficulty){
    this.setState({
      difficultySelected: difficulty
    })
    api.getQuestions(this.state.difficultySelected)
      .then((res) => {
        this.props.navigator.push({
          component: Game,
          passProps: {questionSet: res.results}
        })
      })
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Selecting a level of difficulty</Text>
        <TouchableHighlight style={styles.button} onPress={() => this.handleSubmit('easy')}><Text>Easy</Text></TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.handleSubmit('medium')}><Text>Medium</Text></TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.handleSubmit('hard')}><Text>Hard</Text></TouchableHighlight>
      </View>
    )
  }
};

module.exports = Main;
