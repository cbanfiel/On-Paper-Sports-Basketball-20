import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, leaugeLeaders, sortedRoster, conferences, conferencesOn, teams } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';


export default class SeasonStatsMenu extends React.Component {


    render() {

        return (
            <Background>
                <ScrollView >
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => conferencesOn ? Actions.conferencelist() : Actions.standings({conferenceId : 3})}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25
                            }}
                            >

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{conferencesOn ? conferences[0].teams[0].wins + '-' + conferences[0].teams[0].losses : teams[0].wins + '-' + teams[0].losses}</Text>
                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={conferencesOn ? conferences[0].teams[0].logoSrc : teams[0].logoSrc }/>
                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={conferencesOn ? conferences[1].teams[0].logoSrc : teams[1].logoSrc } />
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{conferencesOn ? conferences[1].teams[0].wins + '-' + conferences[1].teams[0].losses : teams[1].wins +'-' + teams[1].losses}</Text>
                            </View>
                            <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'League Standings'}</Text>
                        </Card>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.statslist({ selectedTeam: selectedTeam, season: true })}>
                    <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ flex: 1, textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{ conferencesOn ? 'Seed #' + selectedTeam.seed : 'Rank #' + selectedTeam.seed}</Text>
                  <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                    <CachedImage style={{ flex:1,  overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={sortedRoster(selectedTeam,'ppg')[0].faceSrc } />
                    <Text style={{ flex:1,  textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{sortedRoster(selectedTeam,'ppg')[0].statsHistory.length > 0 ? (Math.round((sortedRoster(selectedTeam,'ppg')[0].seasonPoints / sortedRoster(selectedTeam,'ppg')[0].statsHistory.length) * 10) / 10) + ' PPG' : null}</Text>
                </View>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'#' + sortedRoster(selectedTeam,'ppg')[0].number + ' ' + sortedRoster(selectedTeam,'ppg')[0].name}</Text>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>

                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Player Stats'}</Text>
              </Card>
            </TouchableOpacity>


                    <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.statslist({ selectedTeam: leaugeLeaders(), season: true })}>
                    <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ flex: 1, textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{leaugeLeaders().roster[0].teamName}</Text>
                  <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={leaugeLeaders().roster[0].teamLogoSrc }/>
                    <CachedImage style={{ flex:1,  overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={leaugeLeaders().roster[0].faceSrc } />
                    <Text style={{ flex:1,  textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{leaugeLeaders().roster[0].statsHistory.length > 0 ? (Math.round((leaugeLeaders().roster[0].seasonPoints / leaugeLeaders().roster[0].statsHistory.length) * 10) / 10) + ' PPG' : null}</Text>
                </View>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'#' + leaugeLeaders().roster[0].number + ' ' + leaugeLeaders().roster[0].name}</Text>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>

                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'League Leaders'}</Text>
              </Card>
            </TouchableOpacity>


            <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.teamstats() }}>
                    <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25
                    }}
                    >

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                    </View>
                    <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Team Stats'}</Text>
                  </Card>
                  </TouchableOpacity>

                    <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.teamhistory() }}>
                    <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25
                    }}
                    >

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                    </View>
                    <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'View Team History'}</Text>
                  </Card>
                </TouchableOpacity>

                    <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.teamhistory({ view: 'pastchampions' }) }}>
                    <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25
                    }}
                    >

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                    </View>
                    <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'View Past Champions'}</Text>
                  </Card>
                </TouchableOpacity>


                </ScrollView>
            </Background>
        )

    }
}