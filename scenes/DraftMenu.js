import React from 'react';
import { TouchableOpacity, Text, ScrollView, View } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import { teams, draftClass, selectedTeam, franchise } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';

export default class DraftMenu extends React.Component {
    state = {
        onTheClock: teams[franchise.currentDraft.pick],

        draftClass: draftClass,
        drafted: franchise.currentDraft.drafted,
        advance : false,
        pick : franchise.currentDraft.pick,
        round : franchise.currentDraft.round

    }

    update = () => {
        this.setState({
            onTheClock: teams[franchise.currentDraft.pick],
            draftClass: draftClass,
            drafted: franchise.currentDraft.drafted,
            advance : franchise.currentDraft.completed,
            pick : franchise.currentDraft.pick,
            round : franchise.currentDraft.round
        })
    }

    render() {
        return (
            <Background>
                <ScrollView>
                    {
                        this.state.advance === false ? (


                    <TouchableOpacity style={{ width: '100%' }} onPress={() => {Actions.rosterlist({selectedTeam : draftClass, view : 'draft', selectable:true, franchise: franchise, update: this.update}) }}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25
                            }}
                        >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5}} source = {{uri: this.state.onTheClock.logoSrc }} />
                    </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'On The Clock: ' + this.state.onTheClock.name}</Text>
                        </Card>
                    </TouchableOpacity>

                        ) : null
                    }


{
    this.state.pick > 0 || this.state.round > 0 ? (
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => {Actions.rosterlist({selectedTeam : this.state.drafted, view : 'draft'}) }}>
                        <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.drafted.roster[0].teamLogoSrc }} />
                    <Picache style={{ flex:1,  overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.drafted.roster[0].faceSrc }} />
                </View>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.state.drafted.roster[0].positionString + ' ' + this.state.drafted.roster[0].name + ' OVR:' + this.state.drafted.roster[0].rating}</Text>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>

                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Draft Board'}</Text>
              </Card>
            </TouchableOpacity>
    ) : null
                        }


{
    this.state.advance === true ? (
<TouchableOpacity style={{ width: '100%' }} onPress={ () => {franchise.stage='resigning',franchise.simStage(), Actions.reset('seasonmenu')}}>
  
<Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Advance To Free Agency'}</Text>
              </Card>
            </TouchableOpacity>




    ):

                    <TouchableOpacity style={{ width: '100%' }} onPress={() => {franchise.currentDraft.simPick(), this.update()  }}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25
                            }}
                            // image={{ uri: 'https://www.winviewgames.com/wp-content/uploads/2017/06/NBA-Draft.jpg' }}
                            // 
                        >
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Sim Pick'}</Text>
                        </Card>
                    </TouchableOpacity>


}
{
    this.state.advance === false ? (


                    <TouchableOpacity style={{ width: '100%' }} onPress={() => {franchise.currentDraft.simDraft(), this.update()  }}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25
                            }}
                            // image={{ uri: 'https://www.winviewgames.com/wp-content/uploads/2017/06/NBA-Draft.jpg' }}
                            // 
                        >
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Sim To End'}</Text>
                        </Card>
                    </TouchableOpacity>


    ) : null
}
{   this.state.advance === false ? (
    <TouchableOpacity style={{ width: '100%' }} onPress={() => {franchise.currentDraft.simToNextUserPick(), this.update()  }}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25
                            }}
                            // image={{ uri: selectedTeam.logoSrc }}
                            // 
                        >
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Sim To Next User Pick'}</Text>
                        </Card>
                    </TouchableOpacity>
) : null


}






                </ScrollView>

            </Background>





        )
    }
}