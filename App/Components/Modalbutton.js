'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class Modalbutton extends Component{
  render() {
    return (
      <View style={styles.modalRowButton}>
        <TouchableOpacity style={styles.modalButton} onPress={() => {
          this.props.goToHome(!this.state.modalVisible)
        }}><Text style={styles.modalButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={() => {
          this.props.restartGame(!this.state.modalVisible)
        }}><Text style={styles.modalButtonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  modalRowButton: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalButton: {
    height: 50,
    width: 125,
    borderWidth: 5,
    borderRadius: 8,
    borderColor: 'rgba(87, 85, 86, 0.17)',
    backgroundColor: '#FEC101',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 25,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Roboto-Bold',
  },
})

module.exports = Modalbutton;
