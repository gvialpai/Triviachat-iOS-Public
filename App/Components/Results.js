import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

var Main = require('./Main');

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#98c8f8'
    },
    resultScreen: {
      backgroundColor: 'white',
      flex: 0.6,
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 15,
      borderWidth: 5,
      borderRadius: 8,
      borderColor: 'rgba(87, 85, 86, 0.17)',
    },
    mainTitle: {
      fontFamily: 'Satisfy',
      fontSize: 50,
      marginBottom: 40,
      color: 'rgba(254, 193, 1, 0.76)'
    },
    title: {
        marginBottom: 60,
        fontSize: 25,
        textAlign: 'center',
        color: 'black'
    },
    buttonRow: {
      flex: .1,
      flexDirection: 'row',
    },
    button: {
      flex: 100,
      height: 45,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: 'white',
      borderWidth: 5,
      borderRadius: 8,
      borderColor: 'rgba(87, 85, 86, 0.17)',
    },
    buttonText: {
      fontSize: 20,
      fontFamily: 'Roboto-Regular',
    },
})

class Results extends Component{
  constructor(props){
    super(props);
    this.state = {
      score: this.props.score,
      questionNumber: this.props.questionNumber,
    }
  }
  render(){
    let _this = this;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.resultScreen}>
          <Text style={styles.mainTitle}>Results</Text>
          <Text style={styles.title}>Final Score: {this.state.score}</Text>
          <Text style={styles.title}>Total Answers: {this.state.questionNumber}</Text>
          <Text style={styles.title}>Correct Answers: {this.state.score / 10}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => _this.goToHome()}>
              <View>
                  <Text style={styles.buttonText}>Home</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

module.exports = Results;
