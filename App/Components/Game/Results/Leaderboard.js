'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class LeaderBoard extends Component{
  render() {
    return (
      <View style={styles.leaderboard}>
        <View style={[styles.leaderboardRow, styles.leaderboardTitle]}>
          <Text style={styles.leaderboardTitleText}>LeaderBoard</Text>
        </View>
        {
          this.props.topScoresByDifficultyLevel[this.props.difficultySelected].topFiveScores.map((item, index) => {
            const tableRowColor = ((index % 2) === 0) ? {backgroundColor:'white'} : {backgroundColor:'rgba(242, 202, 127, 0.7)'};
            return (
              <View key={index} style={[styles.leaderboardRow, tableRowColor]}>
                <Text style={styles.leaderboardText}>#{index +1}</Text>
                <Text style={styles.leaderboardText}>{item}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}

LeaderBoard.propTypes = {
  topScoresByDifficultyLevel: React.PropTypes.object.isRequired,
}

var styles = StyleSheet.create({
  leaderboard: {
    flex: .5,
    flexDirection: 'column',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 2,
    borderColor: '#f1c97f',
    marginBottom: 10,
    marginTop: 10,
  },
  leaderboardRow: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  leaderboardTitle: {
    backgroundColor: '#f1c97f',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  leaderboardTitleText: {
    fontFamily: 'Roboto-Bold',
    color: '#525152',
  },
  leaderboardText: {
    color: '#525152',
    fontFamily: 'Roboto',
  }
})

module.exports = LeaderBoard;
