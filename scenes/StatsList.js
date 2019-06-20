import React from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { sortedRoster } from '../data/script';
import ListItem from '../components/ListItem';

export default class StatsList extends React.Component {
  statsView(player) {
    let str;
    if (this.props.season) {
      if(player.seasonThreePointersAtt>0){
        return "PPG: " + (Math.round((player.seasonPoints / player.statsHistory.length) * 10) / 10) + " FG% " + Math.floor((((player.seasonTwoPointersMade / player.seasonTwoPointersAtt) + (player.seasonThreePointersMade/player.seasonThreePointersAtt))/2) * 100)
         + " 3P% " + Math.floor((player.seasonThreePointersMade / player.seasonThreePointersAtt) * 100) + " FT% " + Math.floor((player.seasonFreeThrowsMade / player.seasonFreeThrowsAttempted) * 100) + ' RPG: ' + (Math.round((player.seasonRebounds / player.statsHistory.length) * 10) / 10) 
      }else{
        return "PPG: " + (Math.round((player.seasonPoints / player.statsHistory.length) * 10) / 10) + " FG% " + Math.floor((player.seasonTwoPointersMade / player.seasonTwoPointersAtt) * 100)
         + " 3P% " + Math.floor((player.seasonThreePointersMade / player.seasonThreePointersAtt) * 100) + " FT% " + Math.floor((player.seasonFreeThrowsMade / player.seasonFreeThrowsAttempted) * 100) + ' RPG: ' + (Math.round((player.seasonRebounds / player.statsHistory.length) * 10) / 10) 
      }


    }
    else {
      return "PTS: " + player.points + " FG% " + Math.floor((player.twoPointersMade / player.twoPointersAtt) * 100)
         + " 3P% " + Math.floor((player.threePointersMade / player.threePointersAtt) * 100) + " FT% " + Math.floor((player.freeThrowsMade / player.freeThrowsAttempted) * 100) + ' REB: ' + player.rebounds;
    }
  }

  render() {
    return (
      <Background>


        <ScrollView>

          {sortedRoster(this.props.selectedTeam, 'ppg').map((player, i) => (
            <ListItem 
              title={player.positionString + ' #' + player.number + ' ' + player.name}
              key={i}
              leftAvatar={player.faceSrc}
              subtitle={this.statsView(player)}
              rightAvatar={player.teamLogoSrc}
              onPress={() => Actions.playerprofile({selectedPlayer: player})}
            >
            </ListItem>



          ))}
        </ScrollView>
      </Background>





    )
  }
}