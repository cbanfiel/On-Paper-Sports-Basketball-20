import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Background from '../components/background';
import { loadRosters, resetFranchise, resetSliders, removeTeams, generateFreeAgents, sliders} from '../data/script';
import DualButton from '../components/DualButton';

export default class OptionsMenu extends React.Component {



  render() {
    return (

      <Background>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

        <TouchableOpacity style={{ width: '100%' }} onPress={() => {Actions.communityrosters({update: this.props.update})}}>

<Card
  containerStyle={{
    width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
  }}
>
  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Community Rosters</Text>
</Card>
</TouchableOpacity>

                    <DualButton  
                    leftTitle={'Search Community Players'}
                    leftOnPress={()=> {Actions.communityplayers()}}
                    rightTitle={'Search Community Team'}
                    rightOnPress={()=> {Actions.communityteams()}}
                    />

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {Actions.slidersmenu()}}>

            <Card
              containerStyle={{
                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Sliders</Text>
            </Card>
          </TouchableOpacity>

          

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {Actions.savesmenu({saveType: 'Roster', updateState: this.props.update})}}>

            <Card
              containerStyle={{
                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Manage Saves</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {resetFranchise(), Actions.popTo('mainmenu')}}>

            <Card
              containerStyle={{
                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>New Franchise</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {removeTeams(), Actions.popTo('mainmenu')}}>

            <Card
              containerStyle={{
                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Remove All Teams</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {generateFreeAgents(150,20), Actions.popTo('mainmenu')}}>

            <Card
              containerStyle={{
                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Generate New Free Agents</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {Actions.importexportmenu()}}>

            <Card
              containerStyle={{
                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Import/Export</Text>
            </Card>
          </TouchableOpacity>


          <TouchableOpacity style={{ width: '100%' }} onPress={() => {loadRosters(), resetFranchise(), resetSliders(), this.props.update(()=>Actions.popTo('mainmenu'))}}>

            <Card
              containerStyle={{
                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Reset</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => {Actions.push('recentupdates')}}>

            <Card
              containerStyle={{
                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Patch Notes</Text>
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
