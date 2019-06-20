import React from 'react';
import { ScrollView } from 'react-native';
import { sortedRoster, draftClass } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/ListItem';

export default class DraftClassMenu extends React.Component {

    render() {

        return (
            <Background>
                <TeamHeader selectedTeam={draftClass} ></TeamHeader>
                <ScrollView>

                    {sortedRoster(draftClass,'rating').map((player, i) => (
                        <ListItem
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc }
                            subtitle={'Rating: ' + player.rating}
                            onPress={() => Actions.playerprofile({selectedPlayer : player})}
                        />

                    ))}
                </ScrollView>

            </Background>
        )
    }
}

