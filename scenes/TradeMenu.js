import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, selectedTeam2, trade, sortedRoster } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import ListItem from '../components/ListItem';

export default class TradeMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedPlayer1: '',
            selectedPlayer2: '',
            declined: ''
        }


    }

    offer(){
        if(!trade(selectedTeam, selectedTeam2, this.state.selectedPlayer1, this.state.selectedPlayer2)){
            this.state.declined = true;
        }else{
            this.setState({selectedPlayer1:'', selectedPlayer2:'', declined:false})
        }
    }

    render() {

        return (
            <Background>

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth:1 }}>
                    <CachedImage
                        style={{ resizeMode:'contain', height: 50 }}
                        uri= {selectedTeam.logoSrc }/>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20 }}>{selectedTeam.name}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20 }}>{'Selected Player: ' + this.state.selectedPlayer1.name}</Text>
                </View>
                {

this.state.declined === true ? (

    <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)'}} title="Offer Declined" disabled disabledTitleStyle={{color:'white'}} disabledStyle={{backgroundColor:'rgba(255,0,0,0.75)'}}></Button>


) :
this.state.declined === false ? (
    <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)'}} title="Offer Accepted" disabled disabledTitleStyle={{color:'white'}} disabledStyle={{backgroundColor:'rgba(10,200,60,0.75)'}}></Button>

) :
<Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)'}} title="Offer Trade" onPress={() => { this.offer(), Actions.refresh() }}></Button>

}


{       //JUST CHECKING WHAT MENU TO GO BACK TO SEASON OR ROSTER
//         this.props.back==='rostermenu' ? (
// <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)'}} title="Back To Rosters" onPress={() => { Actions.rostermenu() }}></Button>
//         ) :
// <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)'}} title="Back To Season" onPress={() => { Actions.seasonmenu() }}></Button>
    
    }
                <ScrollView>

                    {sortedRoster(selectedTeam,'rating').map((player, i) => (
                        <ListItem onPress={() => { this.setState({ selectedPlayer1: player, declined: '' }) }} 
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc } subtitle={'Rating: ' + player.rating}
                            bottomDivider={true}

                        ></ListItem>
                    ))}
                </ScrollView>
 
                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth:1  }}>
                    <CachedImage
                        style={{ resizeMode:'contain', height: 50 }}
                        uri= {selectedTeam2.logoSrc } />
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20}}>{selectedTeam2.name}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20 }}>{'Selected Player: ' + this.state.selectedPlayer2.name}</Text>
                </View>
                <ScrollView>

                    {sortedRoster(selectedTeam2,'rating').map((player, i) => (
                        <ListItem
                            onPress={() => { this.setState({ selectedPlayer2: player, declined: '' }) }}
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={ player.faceSrc }
                            subtitle={'Rating: ' + player.rating}
                            bottomDivider={true}
                        />

                    ))}
                </ScrollView>

            </Background>
        )
    }
}