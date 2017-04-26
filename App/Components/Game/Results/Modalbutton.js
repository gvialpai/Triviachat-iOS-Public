'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class Modalbutton extends Component{
  render() {
    return (
      <View style={styles.modalColumnButton}>
        <View style={styles.modalRowButton}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {this.props.goToHome(!this.props.modalVisible)}}>
              <Text style={styles.modalButtonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
            this.props.restartGame(!this.props.modalVisible)}}
          >
            <Text style={styles.modalButtonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  modalColumnButton: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalRowButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    height: 50,
    width: 125,    
    borderWidth: 5,
    borderRadius: 8,
    borderColor: 'rgba(87, 85, 86, 0.17)',
    backgroundColor: '#7ff1cf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 15,
    color: '#525152',
    alignSelf: 'center',
    fontFamily: 'Roboto-Bold',
  },
})

module.exports = Modalbutton;
