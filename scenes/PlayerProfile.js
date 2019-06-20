import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';


export default class PlayerProfile extends React.Component {

    refresh = () => {
        Actions.refresh();
    }

    render() {
        return (

            <Background>

                <ScrollView style={{ flex: 1 }} >

                    <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.editplayerinfo({ selectedPlayer: this.props.selectedPlayer, refresh: this.refresh })}>

                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                            }} >

                            <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <CachedImage uri ={ this.props.selectedPlayer.teamLogoSrc} style={{height:30, width:30, maxHeight:30, resizeMode:'contain', marginRight:5}}/>   
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.props.selectedPlayer.teamName}</Text>

                            </View>
                            
                            <Divider style={{ backgroundColor: 'white', margin:10 }}></Divider>


                            <CachedImage style={{ height: 75, width: 75, maxHeight:75, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom:3 }} uri= {this.props.selectedPlayer.faceSrc } />
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.props.selectedPlayer.positionString + ' #' + this.props.selectedPlayer.number + ' ' + this.props.selectedPlayer.name}</Text>
                            <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Age: ' + this.props.selectedPlayer.age}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Height: ' + this.props.selectedPlayer.height}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Contract Years Remaining: ' + this.props.selectedPlayer.years}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Salary: $' + (this.props.selectedPlayer.salary / 1000000).toFixed(1) + " Million"}</Text>



                        </Card>
                    </TouchableOpacity>



                    <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.editplayerratings({ selectedPlayer: this.props.selectedPlayer })}>

                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                            }} >

                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Ratings'}</Text>
                            <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"OVR: " + this.props.selectedPlayer.rating}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"OFF: " + this.props.selectedPlayer.off}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"DEF: " + this.props.selectedPlayer.def}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"REB: " + this.props.selectedPlayer.reb}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"3PT: " + this.props.selectedPlayer.threePoint}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"FT: " + this.props.selectedPlayer.ft}</Text>
                        </Card>
                    </TouchableOpacity>

                    {
                        this.props.view === 'draft' ? (
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => {this.props.franchise.currentDraft.userPick(this.props.selectedPlayer), Actions.reset('draftmenu')}}>

                            <Card
                                containerStyle={{
                                    width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                    borderRadius: 25,
                                }} >
    
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Draft Player'}</Text>
                                <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>
                            </Card>
                        </TouchableOpacity>




                        ) : 



                    <TouchableOpacity style={{ width: '100%' }}>

                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                            }} >

                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Season Stats'}</Text>
                            <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"PPG: " + (Math.round((this.props.selectedPlayer.seasonPoints / this.props.selectedPlayer.statsHistory.length) * 10) / 10)}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"REB: " + this.props.selectedPlayer.seasonRebounds}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"2PA: " + this.props.selectedPlayer.seasonTwoPointersAtt}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"2PM: " + this.props.selectedPlayer.seasonTwoPointersMade}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"3PA: " + this.props.selectedPlayer.seasonThreePointersAtt}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"3PM: " + this.props.selectedPlayer.seasonThreePointersMade}</Text>
                        </Card>
                    </TouchableOpacity>
                    }






                </ScrollView>
            </Background>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
