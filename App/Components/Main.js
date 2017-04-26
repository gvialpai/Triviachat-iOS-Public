import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

var api = require('../Utils/api');
var Game = require('./Game/Game');

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
    api.getQuestions(difficulty)
      .then((questionSet) => {
        this.props.navigator.push({
          component: Game,
          passProps: {
            questionSet: questionSet.results,
            difficultySelected: this.state.difficultySelected
          }
        })
      })
  }
  makeBackground(btn){
    var obj = {
      height: 75,
      flexDirection: 'row',
      borderWidth: 5,
      borderRadius: 8,
      borderColor: 'rgba(87, 85, 86, 0.17)',
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
    }
    if (btn === 0){
      obj.backgroundColor = '#7ff1cf'
    } else if (btn === 1 ){
      obj.backgroundColor = '#78d3c1'
    } else{
      obj.backgroundColor = '#518b99'
    }
    return obj
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title}>TriviaChat</Text>
        </View>
        <View style={styles.subtitleView}>
          <Text style={styles.subtitle}>Selecting a level of difficulty</Text>
        </View>
        <View style={styles.difficultyLevels}>
          <TouchableOpacity style={this.makeBackground(0)} onPress={() => this.handleSubmit('easy')}><Text style={styles.buttonText}>Easy</Text></TouchableOpacity>
          <TouchableOpacity style={this.makeBackground(1)} onPress={() => this.handleSubmit('medium')}><Text style={styles.buttonText}>Medium</Text></TouchableOpacity>
          <TouchableOpacity style={this.makeBackground(2)} onPress={() => this.handleSubmit('hard')}><Text style={styles.buttonText}>Hard</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#f9f9f9',
    padding: 30,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    color: '#518b99',
    fontFamily: 'Satisfy',
    paddingTop: 40,
  },
  subtitleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: .1,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    color: '#525152',
  },
  difficultyLevels: {
    flex: 0.5,
  },
  buttonText: {
    fontSize: 25,
    color: '#525152',
    alignSelf: 'center',
    fontFamily: 'Roboto-Bold',
  },
});

module.exports = Main;
