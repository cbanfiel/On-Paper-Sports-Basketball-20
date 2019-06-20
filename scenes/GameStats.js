import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { selectedTeam, selectedTeam2, trade, sortedRoster } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import ListItem from '../components/ListItem';

export default class GameStats extends React.Component {

    render() {

        return (
            <Background>

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri ={ selectedTeam.logoSrc } />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 30 }}>{selectedTeam.played[this.props.currentGame].userScore}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{selectedTeam.name}</Text>
                </View>
                <ScrollView>

                    {sortedRoster(selectedTeam, 'position').map((player, i) => (
                        <ListItem titleStyle={{ fontFamily: 'advent-pro' }}
                            subtitleStyle={{ fontFamily: 'advent-pro' }}
                            containerStyle={{ backgroundColor: 'rgba(255,255,255,0.75)', }}
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc } 
                            subtitle={"PTS: " + player.statsHistory[this.props.currentGame].points + " FG% " + Math.floor((player.statsHistory[this.props.currentGame].twoPointersMade / player.statsHistory[this.props.currentGame].twoPointersAtt) * 100)
                                + " 3P% " + Math.floor((player.statsHistory[this.props.currentGame].threePointersMade / player.statsHistory[this.props.currentGame].threePointersAtt) * 100)+ " FT% " + Math.floor((player.statsHistory[this.props.currentGame].freeThrowsMade / player.statsHistory[this.props.currentGame].freeThrowsAttempted) * 100)}

                        ></ListItem>
                    ))}
                </ScrollView>

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri ={ selectedTeam2.logoSrc }/>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 30 }}>{selectedTeam2.played[this.props.currentGame].userScore}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{selectedTeam2.name}</Text>
                </View>
                <ScrollView>

                    {sortedRoster(selectedTeam2, 'position').map((player, i) => (
                        <ListItem
                            titleStyle={{ fontFamily: 'advent-pro' }} subtitleStyle={{ fontFamily: 'advent-pro' }}
                            containerStyle={{ backgroundColor: 'rgba(255,255,255,0.75)' }}
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc }
                            subtitle={"PTS: " + player.statsHistory[this.props.currentGame].points + " FG% " + Math.floor((player.statsHistory[this.props.currentGame].twoPointersMade / player.statsHistory[this.props.currentGame].twoPointersAtt) * 100)
                                + " 3P% " + Math.floor((player.statsHistory[this.props.currentGame].threePointersMade / player.statsHistory[this.props.currentGame].threePointersAtt) * 100)}
                        />

                    ))}
                </ScrollView>

            </Background>
        )
    }
}