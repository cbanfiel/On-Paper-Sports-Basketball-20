import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { sortedRoster, collegeMode } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';


export default class RosterList extends React.Component {

    render() {
        return (
            <Background>

                <TeamHeader selectedTeam={this.props.selectedTeam}></TeamHeader>

{
    this.props.view === 'draft' ? (
        <ScrollView>
        {sortedRoster(this.props.selectedTeam,'rating').map((player, i) => (
                <ListItem
                    title={player.positionString + ' #' + player.number + ' ' + player.name}
                    key={i} leftAvatar={player.faceSrc} 
                    subtitle={'Rating: ' + player.rating}
                    rightAvatar = {player.teamLogoSrc}
                    onPress={this.props.selectable === true ? () => Actions.playerprofile({selectedPlayer: player, view: 'draft', franchise: this.props.franchise, update: this.props.update}) : null }
                    ></ListItem>
        ))}
    </ScrollView>


    ) : 
    this.props.view === 'resigning' ? (
        <View>
                    <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)'}} title="Release All" onPress={() => { this.props.selectedTeam.releaseExpiring(),Actions.seasonmenu() }}></Button>
                <ScrollView>
                    {sortedRoster(this.props.selectedTeam.expiring,'rating').map((player, i) => (
                            <ListItem
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                onPress={() => {Actions.offercontractmenu({selectedPlayer : player, playerpool : this.props.selectedTeam.expiring, back:'seasonmenu'})}}
                                ></ListItem>
                    ))}
                </ScrollView>
        </View>

    ) :
    this.props.view === 'retirements' ? (
        <ScrollView>
        {sortedRoster(this.props.selectedTeam,'rating').map((player, i) => (
                <ListItem 
                    title={player.positionString + ' #' + player.number + ' ' + player.name}
                    key={i} leftAvatar={ player.faceSrc } 
                    subtitle={'Rating: ' + player.rating}
                    ></ListItem>
        ))}
    </ScrollView>
    
    
        ): 

    <ScrollView>
                    {sortedRoster(this.props.selectedTeam,'rating').map((player, i) => (
                            <ListItem
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={collegeMode?( player.age >= 21? 'SR' : player.age === 20? 'JR' : player.age===19? 'SO' : player.age===18? 'FR' : null ) : null }
                                onPress={() => {Actions.playerprofile({selectedPlayer : player})}}
                                ></ListItem>
                    ))}
                </ScrollView>






}
            </Background>





        )
    }
}