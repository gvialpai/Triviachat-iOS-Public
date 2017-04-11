import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
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
        fontSize: 50,
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Satisfy'
    },
    subtitle: {
      fontSize: 25,
      fontFamily: 'Roboto-Regular',
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center',
        fontFamily: 'Roboto-Regular',
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
      .then((questionSet) => {
        this.props.navigator.push({
          component: Game,
          passProps: {questionSet: questionSet.results}
        })
      })
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>TriviaChat</Text>
        <Text style={styles.subtitle}>Selecting a level of difficulty</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit('easy')}><Text style={styles.buttonText}>Easy</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit('medium')}><Text style={styles.buttonText}>Medium</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit('hard')}><Text style={styles.buttonText}>Hard</Text></TouchableOpacity>
      </View>
    )
  }
};

module.exports = Main;
