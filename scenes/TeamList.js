import React from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { sortedTeams, setHome, setAway, setSelectedTeam, setSelectedTeam2, setRefreshOff } from '../data/script';
import Background from '../components/background';
import ListItem from '../components/ListItem';
export default class TeamList extends React.Component {
    setTeam(team) {
        if (this.props.home === 0) {
            //HOME TEAM =0
            setHome(team);
            Actions.selectteams();
        } else if (this.props.home === 1) {
            //AWAY TEAM =1
            setAway(team);
            Actions.selectteams();
        } else if (this.props.home === 3) {
            setSelectedTeam2(team);
            Actions.trademenu({back: this.props.back});
        }  else if (this.props.home === 4){
            setSelectedTeam(team);
            setRefreshOff(true);
            Actions.seasonmenu();
        }
        else if (this.props.home === 5){
            setSelectedTeam(team);
            Actions.rostermenu();
        }
       
        else {
            //SELECTED TEAM=2
            setSelectedTeam(team);
            Actions.rosterlist();
        }
    }

    render() {
        return (
            <Background>

                <ScrollView>

                    {sortedTeams().map((team, i) => (
                        <ListItem 
                        titleStyle={{ fontFamily: 'advent-pro' }} 
                        subtitleStyle={{ fontFamily: 'advent-pro' }} 
                        onPress={this.setTeam.bind(this, team)} 
                        title={team.name} 
                        key={i} 
                        leftAvatar={team.logoSrc} 
                        subtitle={'Rating: ' + team.rating}
                        ></ListItem>



                    ))}
                </ScrollView>
            </Background>




        )
    }
}