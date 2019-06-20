import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { home, away, sortedRoster, gamesPerSeason } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import ListItem from '../components/ListItem';

export default class InGameStats extends React.Component {

    render() {

        return (
            <Background>

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri= { home.logoSrc } />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 30 }}>{this.props.currentGame.homescore}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{home.name}</Text>
                </View>
                <ScrollView>

                    {sortedRoster(home, 'position').map((player, i) => (
                        <ListItem 
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc } 
                            subtitle={"PTS: " + player.points + " FG% " + Math.floor((player.twoPointersMade / player.twoPointersAtt) * 100)
                                + " 3P% " + Math.floor((player.threePointersMade / player.threePointersAtt) * 100)+ " FT% " + Math.floor((player.freeThrowsMade / player.freeThrowsAttempted) * 100)}

                        ></ListItem>
                    ))}
                </ScrollView>

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri= { away.logoSrc } />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 30 }}>{this.props.currentGame.awayscore}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{away.name}</Text>
                </View>
                <ScrollView>

                    {sortedRoster(away, 'position').map((player, i) => (
                        <ListItem
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc }
                            subtitle={"PTS: " + player.points + " FG% " + Math.floor((player.twoPointersMade / player.twoPointersAtt) * 100)
                                + " 3P% " + Math.floor((player.threePointersMade / player.threePointersAtt) * 100)}
                        />

                    ))}
                </ScrollView>

            </Background>
        )
    }
}