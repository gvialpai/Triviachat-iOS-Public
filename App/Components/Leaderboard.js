'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class LeaderBoard extends Component{
  render() {
    return (
      <View style={styles.leaderboard}>
        <View style={styles.leaderboardRow}>
          <Text>LeaderBoard</Text>
        </View>
        {
          this.props.topScoresByDifficultyLevel[this.props.difficultySelected].topFiveScores.map((item, index) => {
            return (
              <View key={index} style={styles.leaderboardRow}>
                <Text>#{index +1}</Text>
                <Text>{item}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}

LeaderBoard.propTypes = {
  topScoresByDifficultyLevel: React.PropTypes.object.isRequired
}

var styles = StyleSheet.create({
  leaderboard: {
    flex: .5,
    flexDirection: 'column',
    backgroundColor: '#e1f5fe',
  },
  leaderboardRow: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})

module.exports = LeaderBoard;
