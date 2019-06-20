import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';

export default class EditLineupMenu extends React.Component {

    state={
        selectedPlayer: null,
        selectedPlayer2: null,
        benchWarmers : selectedTeam.generateBenchWarmers(),
        arr : '',
        pos : '',
        arr2 : '',
        pos2 : ''
    }

    selectPlayer(playa, arr , pos){
        if(this.state.selectedPlayer == null){
            this.setState({selectedPlayer: playa, arr : arr, pos : pos});
        }else if(this.state.selectedPlayer2 == null){
            this.setState({selectedPlayer2: playa, arr2: arr, pos2 : pos})
        }
    }

    clearSelections(){
        this.setState({selectedPlayer: null, selectedPlayer2: null});
    }

    swap(){
        this.state.arr[this.state.pos] = this.state.selectedPlayer2;
        this.state.arr2[this.state.pos2] = this.state.selectedPlayer;
        
        this.setState({selectedPlayer: null, selectedPlayer2: null, arr:'', arr2:'', pos:'', pos2:''});
        selectedTeam.manageUsage();
        Actions.refresh();
    }

    autoReorder(){
        selectedTeam.reorderLineup();
        Actions.refresh();
    }

    getPositionString(key) {
        let keyString;
        if (key === 0) {
            keyString = 'PG'
        } else if (key === 1) {
            keyString = 'SG'
        } else if (key === 2) {
            keyString = 'SF'
        } else if (key === 3) {
            keyString = 'PF'
        } else if (key === 4) {
            keyString = 'C'
        }

        return keyString;
    }

    render() {
        return (
            <Background>

                <TeamHeader selectedTeam={selectedTeam}></TeamHeader>

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)'}}>
                <View style={{ padding: 15, borderBottomWidth:1 }}>
                <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20}}>{ this.state.selectedPlayer !=null ? 'Selected Player: ' + this.state.selectedPlayer.name :  'Selected Player: '}</Text>
                </View>
                    <View style={{ padding: 15, borderBottomWidth:1 }}>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20}}>{ this.state.selectedPlayer2 != null ? 'Selected Player: ' + this.state.selectedPlayer2.name: 'Selected Player: '}</Text>
                    </View>
                    <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Auto Reorder Lineup" onPress={() => { this.autoReorder() }}></Button>
                    <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Clear Selections" onPress={() => { this.clearSelections() }}></Button>
                    <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Swap Players" onPress={() => { this.swap() }}></Button>
                </View>



                <ScrollView>
                    {
                    selectedTeam.firstTeam.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                rightSubtitle={'STARTER'}
                                rightTitle={this.getPositionString(i)}
                                onPress={() => this.selectPlayer(player, selectedTeam.firstTeam, i)}
                                ></ListItem>
                    ))}
                    {
                    selectedTeam.secondTeam.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightSubtitle={'BENCH'}
                                rightTitle={this.getPositionString(i)}
                                onPress={() => this.selectPlayer(player, selectedTeam.secondTeam , i)}

                                ></ListItem>
                    ))}
                    {
                    this.state.benchWarmers.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={player.faceSrc }  
                                subtitle={'Rating: ' + player.rating}
                                rightSubtitle={'RESERVES'}
                                onPress={() => this.selectPlayer(player, this.state.benchWarmers, i)}
                                ></ListItem>
                    ))}
                </ScrollView>

                

                


            </Background>





        )
    }
}