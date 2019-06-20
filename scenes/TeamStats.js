import React from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { sortedRoster, teamStats, franchise } from '../data/script';
import ListItem from '../components/ListItem';

export default class TeamStats extends React.Component {

  render() {
    return (
      <Background>


        <ScrollView>

          {teamStats().map((team, i) => (
            <ListItem
              title={team.name}
              key={i}
              leftAvatar={team.logoSrc }
              subtitle={'PPG: ' + Math.round(team.seasonPoints/franchise.season.day)
               + ', ' + 'PAPG : ' + Math.round(team.seasonPointsAllowed/franchise.season.day) 
               + ', RPG: ' + Math.round(team.seasonRebounds/franchise.season.day)
            + ', FGA ' + Math.round(team.seasonFieldGoalsAttempted/franchise.season.day) 
            + ', FGM ' + Math.round(team.seasonFieldGoalsMade/franchise.season.day) 
            + ', FG% ' + Math.round((team.seasonFieldGoalsMade/team.seasonFieldGoalsAttempted)*100) 
            + ', 3P% ' + Math.round((team.seasonThreesMade/team.seasonThreesAttempted)*100) 
            + ', FTA ' + Math.round((team.seasonFreeThrowsAttempted/franchise.season.day)) 
            + ', FTM ' + Math.round((team.seasonFreeThrowsMade/franchise.season.day)) 
            + ', FT% ' + Math.round((team.seasonFreeThrowsMade/team.seasonFreeThrowsAttempted)*100) 
          
          }
            >
            </ListItem>



          ))}
        </ScrollView>
      </Background>





    )
  }
}