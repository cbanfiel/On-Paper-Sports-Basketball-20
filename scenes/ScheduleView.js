import React from 'react';
import { ScrollView } from 'react-native';
import { selectedTeam } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';

export default class ScheduleView extends React.Component {
  
  render() {
    return (

      <Background>

        <TeamHeader selectedTeam={selectedTeam} season={true}></TeamHeader>

        <ScrollView >

          {selectedTeam.schedule.map((team, i) => (
            <ListItem title={"Game: " + (i + 1) + " " + team.name} key={i} leftAvatar={team.logoSrc } 
            subtitle={selectedTeam.played[i] != null ? selectedTeam.played[i].userScore + '-' + selectedTeam.played[i].oppScore : null} 
            rightTitleStyle={selectedTeam.played[i] != null ? selectedTeam.played[i].won ? {color:'green', fontFamily: 'advent-pro', fontSize:25, textAlign:'center'} : {color:'red', fontFamily: 'advent-pro', fontSize:25, textAlign:'center'} : null}
            rightTitle={selectedTeam.played[i] != null ? selectedTeam.played[i].won ? 'W' : 'L' : null}
            
            ></ListItem>
          ))}
        </ScrollView>
      </Background>





    )
  }
}