import React from 'react';
import { ScrollView } from 'react-native';
import { standings } from '../data/script';
import Background from '../components/background';
import ListItem from '../components/ListItem';

export default class Standings extends React.Component {
  // setTeam = (team) => {
  //   setSelectedTeam(team);
  //   Actions.seasonmenu();
  // }


  render() {
    let standingsArr = standings(this.props.conferenceId);
    return (

      <Background>

        <ScrollView>

          {standingsArr.map((team,i) => (
            <ListItem
             title={i+1 + '. ' + team.name} 
             key={team.name} 
             leftAvatar={team.logoSrc }
             subtitle={'Record: ' + team.wins + '-' + team.losses}></ListItem>
          ))}
        </ScrollView>
      </Background>



    )
  }
}