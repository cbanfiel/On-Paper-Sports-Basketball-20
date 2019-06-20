import React from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { conferences } from '../data/script';
import Background from '../components/background';
import PlayerProfile from './PlayerProfile';
import ListItem from '../components/ListItem';

export default class LastPlay extends React.Component {

    render() {
        return (
            <Background>

                <ScrollView>

                    {this.props.game.possResult.map((result, i) => (
                        <ListItem 
                         title={result.shooter.positionString + ' #' + result.shooter.number + ' ' + result.shooter.name} 
                         subtitle={result.result}
                         key={i} 
                         leftAvatar={ result.shooter.faceSrc }
                         rightAvatar={ result.shooter.teamLogoSrc}
                         rightSubtitleStyle={{ fontFamily: 'advent-pro' , width:'130%' , textAlign:'right'}}
                         rightTitle={result.homeScore + '-' + result.awayScore}
                         rightSubtitle={'QTR: ' +  result.quarter + ' TIME: ' + result.time}
                         ></ListItem>
                    ))}
                </ScrollView>
            </Background>
        )
    }
}