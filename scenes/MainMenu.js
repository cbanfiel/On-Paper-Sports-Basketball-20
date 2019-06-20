import React from 'react';
import { StyleSheet, ScrollView, Text, View, Alert, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Background from '../components/background';
import { home, away, selectedTeam, generated1, generated2, generated3, generated4, teams, menuDisplayTeams} from '../data/script';
import CachedImage from '../components/CachedImage';
export default class MainMenu extends React.Component {


  startFranchise(){
    if(teams.length % 2 == 0 ){
      if(teams.length >= 4){
        Actions.teamlist({ home: 4 })
      }else{
        Alert.alert('LESS THAN 4 TEAMS','Currently for franchise mode you must have at least 4 teams' );

      }
    }else{
    Alert.alert('UNEVEN NUMBER OF TEAMS','Currently for franchise mode you must have an even number of teams, create another team or remove a team to start!' );
    }

  }

  render() {
    return (

      <Background>
        <ScrollView>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.selectteams()}>

            <Card
              containerStyle={{
                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 25
              }}
              >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'OVR: ' + home.rating}</Text>
                <CachedImage
                 style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={home.logoSrc } />
                <CachedImage
                 style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={away.logoSrc } />
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'OVR: ' + away.rating}</Text>

              </View>
              <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Play Game'}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => this.startFranchise()}>

            <Card
              containerStyle={{
                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 25
              }}
              >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={selectedTeam.logoSrc } />
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={selectedTeam.roster[0].faceSrc } />

              </View>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.roster[0].positionString + ' #' + selectedTeam.roster[0].number + ' ' + selectedTeam.roster[0].name}</Text>
              <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Franchise Mode'}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.teamlist({ home: 5 })}>

            <Card
              containerStyle={{
                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 25
              }}
              >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={generated1.logoSrc } />
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={generated1.roster[0].faceSrc } />

              </View>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{generated1.roster[0].positionString + ' #' + generated1.roster[0].number + ' ' + generated1.roster[0].name}</Text>
              <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Edit Team Rosters'}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.createteammenu()}>

<Card
  containerStyle={{
    width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 25
  }}
  >
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={generated3.logoSrc } />
    <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={generated3.roster[0].faceSrc } />

  </View>
  <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{generated3.roster[0].positionString + ' #' + generated3.roster[0].number + ' ' + generated3.roster[0].name}</Text>
  <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
  <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Create A Team'}</Text>
</Card>
</TouchableOpacity>

<TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.createaplayermenu()}>

<Card
  containerStyle={{
    width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 25
  }}
  >
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={generated4.logoSrc } />
    <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={generated4.roster[0].faceSrc } />

  </View>
  <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{generated4.roster[0].positionString + ' #' + generated4.roster[0].number + ' ' + generated4.roster[0].name}</Text>
  <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
  <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Create A Player'}</Text>
</Card>
</TouchableOpacity>




          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.optionsmenu()}>
          <Card
              containerStyle={{
                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 25
              }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={generated2.logoSrc } />
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={generated2.roster[0].faceSrc } />

              </View>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{generated2.roster[0].positionString + ' #' + generated2.roster[0].number + ' ' + generated2.roster[0].name}</Text>
              <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Options'}</Text>
            </Card>
          </TouchableOpacity>
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
