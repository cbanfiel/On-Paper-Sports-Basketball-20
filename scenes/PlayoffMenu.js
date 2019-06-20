import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { franchise, selectedTeam } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';

export default class PlayoffMenu extends React.Component {
    back(){
        franchise.advance = true;
        franchise.stage = 'retirements';
        franchise.simStage();
        Actions.refresh();
        Actions.seasonmenu();
    }

    static onEnter(){
      Actions.refresh();
    }
   
   
    render (){


        
    return (

      <Background>
        <ScrollView>

          {
            !franchise.playoffs.completed ? (
              !franchise.playoffs.advance ? (
                <View>

                  <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.playoffs.simDay(), Actions.refresh() }}>

                    <Card
                      containerStyle={{
                        width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                        borderRadius: 25
                      }}
                    >
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Sim Game</Text>
                    </Card>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.playoffs.simRound(), Actions.refresh() }}>

                    <Card
                      containerStyle={{
                        width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                        borderRadius: 25
                      }}
                    >
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Sim Round</Text>
                    </Card>
                  </TouchableOpacity>
                </View>


              ) :
                <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.playoffs.simDay(), Actions.refresh() }}>

                  <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25
                    }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Advance To Next Round</Text>
                  </Card>
                </TouchableOpacity>

            ) : null

          }

          {(franchise.playoffs.matchups).map((matchup, key) => (
            <TouchableOpacity style={{ width: '100%' }} key={key} onPress={()=> {matchup.winner==null ? Actions.ingame({game: matchup.manualGame(), playoffs:true, series: matchup, franchise:franchise}): null}}>

              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                
              >
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{matchup.game > 1 ? 'Game : ' + (matchup.game - 1) : null}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ flex: 1, textAlign: 'center', fontSize: 35, color: 'white', fontFamily: 'advent-pro' }}>{matchup.game > 1 ? matchup.results[matchup.game - 2].team1Score : null}</Text>
                  <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri = {matchup.team1.logoSrc } />
                  <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri = {matchup.team2.logoSrc } />
                  <Text style={{ flex: 1, textAlign: 'center', fontSize: 35, color: 'white', fontFamily: 'advent-pro' }}>{matchup.game > 1 ? matchup.results[matchup.game - 2].team2Score : null}</Text>
                </View>

                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{matchup.game > 1 ? matchup.team1Wins > matchup.team2Wins ? matchup.team1.name + ' Leads ' + matchup.team1Wins + '-' + matchup.team2Wins : matchup.team2Wins > matchup.team1Wins ? matchup.team2.name + ' Leads ' + matchup.team2Wins + '-' + matchup.team1Wins : 'Series Tied ' + matchup.team2Wins + '-' + matchup.team1Wins : null}</Text>
              </Card>
            </TouchableOpacity>
          ))}
          {
            franchise.playoffs.completed ? (
              <TouchableOpacity style={{ width: '100%' }} onPress={() => {this.back()}}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri = {selectedTeam.logoSrc }/>
                </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Advance To Offseason'}</Text>
              </Card>
            </TouchableOpacity>
            ) : null
          }



        </ScrollView>
      </Background>


    )
    




  }
}