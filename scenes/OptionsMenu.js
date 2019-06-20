import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Background from '../components/background';
import { loadRosters, resetFranchise, resetSliders, removeTeams, generateFreeAgents} from '../data/script';


export default class OptionsMenu extends React.Component {

  render() {
    return (

      <Background>
        <ScrollView >

        <TouchableOpacity style={{ width: '100%' }} onPress={() => {Actions.communityrosters()}}>

<Card
  containerStyle={{
    width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 25
  }}
>
  <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Community Rosters</Text>
</Card>
</TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {Actions.slidersmenu()}}>

            <Card
              containerStyle={{
                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 25
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Sliders</Text>
            </Card>
          </TouchableOpacity>

          

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {Actions.savesmenu()}}>

            <Card
              containerStyle={{
                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 25
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Manage Saves</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {resetFranchise(), Actions.popTo('mainmenu')}}>

            <Card
              containerStyle={{
                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 25
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>New Franchise</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {removeTeams(), Actions.popTo('mainmenu')}}>

            <Card
              containerStyle={{
                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 25
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Remove All Teams</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {generateFreeAgents(150,20), Actions.popTo('mainmenu')}}>

            <Card
              containerStyle={{
                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 25
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Generate New Free Agents</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {Actions.importexportmenu()}}>

            <Card
              containerStyle={{
                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 25
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Import/Export</Text>
            </Card>
          </TouchableOpacity>


          <TouchableOpacity style={{ width: '100%' }} onPress={() => {loadRosters(), resetFranchise(), resetSliders(), Actions.popTo('mainmenu')}}>

            <Card
              containerStyle={{
                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 25
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Reset</Text>
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
