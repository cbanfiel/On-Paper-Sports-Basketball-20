import React from 'react';
import {ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { sortedRoster, availableFreeAgents, collegeMode, displaySalary } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';

export default class OfferContractMenu extends React.Component {

    render() {

        return (
            <Background>
                <TeamHeader selectedTeam={availableFreeAgents} ></TeamHeader>
                <ScrollView>

                    {sortedRoster(availableFreeAgents,'rating').map((player, i) => (
                        <ListItem
                            onPress={() => { Actions.offercontractmenu({selectedPlayer: player, back:this.props.back, playerpool:availableFreeAgents} ) }}
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} 
                            leftAvatar={player.faceSrc }
                            subtitle={'Rating: ' + player.rating}
                            rightTitle = {collegeMode? 'Recruiting: ' + displaySalary(player.salary)  : 'Salary: $' +  displaySalary(player.salary)}
                        />

                    ))}
                </ScrollView>

            </Background>
        )
    }
}

