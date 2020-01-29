import React from 'react';
import { ScrollView } from 'react-native';
import Background from '../components/background';
import StatListItem from '../components/StatListItem';

export default class PlayerStatsHistory extends React.Component {

  getStats(){
    let history=''
    if (this.props.player.seasonThreePointersAtt > 0) {
      history = "PTS: " + (Math.round((this.props.player.seasonPoints / this.props.player.statsHistory.length) * 10) / 10) + " FG% " + Math.floor((((this.props.player.seasonTwoPointersMade / this.props.player.seasonTwoPointersAtt) + (this.props.player.seasonThreePointersMade / this.props.player.seasonThreePointersAtt)) / 2) * 100)
          + " 3P% " + Math.floor((this.props.player.seasonThreePointersMade / this.props.player.seasonThreePointersAtt) * 100) + " FT% " + Math.floor((this.props.player.seasonFreeThrowsMade / this.props.player.seasonFreeThrowsAttempted) * 100) + ' REB: ' + (Math.round((this.props.player.seasonRebounds / this.props.player.statsHistory.length) * 10) / 10)
  } else {
      history = "PTS: " + (Math.round((this.props.player.seasonPoints / this.props.player.statsHistory.length) * 10) / 10) + " FG% " + Math.floor((this.props.player.seasonTwoPointersMade / this.props.player.seasonTwoPointersAtt) * 100)
          + " 3P% " + Math.floor((this.props.player.seasonThreePointersMade / this.props.player.seasonThreePointersAtt) * 100) + " FT% " + Math.floor((this.props.player.seasonFreeThrowsMade / this.props.player.seasonFreeThrowsAttempted) * 100) + ' REB: ' + (Math.round((this.props.player.seasonRebounds / this.props.player.statsHistory.length) * 10) / 10)
  }
  return history;
  }

  shouldDisplayCurrent(){
    if(this.props.player.previousSeasonsStats.length>0){
      if(this.props.player.previousSeasonsStats[this.props.player.previousSeasonsStats.length-1].data === this.getStats()){
        return false;
      }
    }
    return true;
  }
  
  render() {
    return (
      <Background>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

        {this.props.player.previousSeasonsStats.map((year, i) => (
            <StatListItem 
              teamName={"YEAR #" + (i+1)}
              stats={ year.data}
              key={i}
              teamLogoSrc={year.team}
              playerInfo = {this.props.player.positionString + ' #' + this.props.player.number + ' ' + this.props.player.name}
              faceSrc={this.props.player.faceSrc}
            >
            </StatListItem>



          ))}

          {
            this.shouldDisplayCurrent()?(
<StatListItem 
              stats={this.getStats() }
              teamName={"CURRENT"}
              teamLogoSrc={this.props.player.teamLogoSrc}
              playerInfo = {this.props.player.positionString + ' #' + this.props.player.number + ' ' + this.props.player.name}
              faceSrc={this.props.player.faceSrc}
            >
    </StatListItem>) : null

          }


        </ScrollView>
      </Background>





    )
  }
}