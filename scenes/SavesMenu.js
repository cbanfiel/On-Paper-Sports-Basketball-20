import React from 'react';
import { StyleSheet, ScrollView, Text, Clipboard, View } from 'react-native';
import { Card, Input, Button, Divider} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Background from '../components/background';
import {saveData, loadData } from '../data/script';


export default class SavesMenu extends React.Component {






  render() {
    return (

      <Background>
        <View style={{flexDirection:'column', backgroundColor:'rgba(0,0,0,0.75)', height:40, padding:10}}>
        <Text style={{ textAlign: "center", fontSize: 14, color: 'white', fontFamily: 'advent-pro' }}>{'Note: Sliders are saved and loaded with rosters'}</Text>
        </View>

        <View style={{ padding: 15, borderBottomWidth:1,backgroundColor:'rgba(255,255,255,0.75)' }}>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:30}}>{'LOAD DATA'}</Text>
        </View>
        <ScrollView style={{backgroundColor:'rgba(255,255,255,0.75)'}}>

        <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Load Roster Slot 1" onPress={() => { loadData('roster'), Actions.popTo('mainmenu') }}></Button>
        <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Load Roster Slot 2" onPress={() => { loadData('roster2'), Actions.popTo('mainmenu') }}></Button>
        <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Load Roster Slot 3" onPress={() => { loadData('roster3'), Actions.popTo('mainmenu') }}></Button>
        <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Load Roster Slot 4" onPress={() => { loadData('roster4'), Actions.popTo('mainmenu') }}></Button>
        <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Load Roster Slot 5" onPress={() => { loadData('roster5'), Actions.popTo('mainmenu') }}></Button>
        </ScrollView>

        <View style={{ padding: 15, borderBottomWidth:1,backgroundColor:'rgba(255,255,255,0.75)' }}>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:30}}>{'SAVE DATA'}</Text>
        </View>
        <ScrollView style={{backgroundColor:'rgba(255,255,255,0.75)'}}>
        <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Save Roster Slot 1" onPress={() => { saveData('roster'), Actions.popTo('mainmenu') }}></Button>
        <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Save Roster Slot 2" onPress={() => { saveData('roster2'), Actions.popTo('mainmenu') }}></Button>
        <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Save Roster Slot 3" onPress={() => { saveData('roster3'), Actions.popTo('mainmenu') }}></Button>
        <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Save Roster Slot 4" onPress={() => { saveData('roster4'), Actions.popTo('mainmenu') }}></Button>
        <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Save Roster Slot 5" onPress={() => { saveData('roster5'), Actions.popTo('mainmenu') }}></Button>
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
