import React, { Component } from "react";
import { Text, View, Alert, ActivityIndicator } from "react-native";
import { Input } from "react-native-elements";
import Background from "../components/background";
import Button from "../components/Button";
import { Actions } from "react-native-router-flux";
import {getRosterJSON, exportDraftClassJson} from '../data/script.js'
import CommunityRosterListItem from '../components/CommunityRosterListItem';

const GAME = 'basketball';
const URL = 'http://10.0.0.106:3000/roster/user/basketball/'
const DELETE_URL = 'http://10.0.0.106:3000/roster/delete/'

export default class Upload extends Component {

  componentDidMount(){
      this.fetchUsersRosters();
  }

  fetchUsersRosters(){
    fetch(URL+this.props.user._id).then(res => res.json())
    .then(json => {
    let slots = 2-json.rosters.length;
    let emptySlots = [];
    for(let i=0; i<slots; i++){
      emptySlots.push(i);
    }
    this.setState({usersRosters: json.rosters, emptySlots, loading: false, uploadShown: false})
  })
  }

    state={
        rosterName: '',
        college: false,
        message: '',
        usersRosters: [],
        selectedRoster: null,
        uploadShown: false,
        emptySlots: [],
        rosterName: 'New Roster',
        loading: true,
        update: false,
        updateRosterId: ''
    }

    setSelectedRoster = (roster) => {
      this.setState({selectedRoster : roster}, () => Actions.pop());
    }

    manageRosterPress = (roster) =>{
        Alert.alert(roster.name, 'Choose an option', [
          {
            text: 'Cancel',
            onPress: () => {return},
            style: 'cancel',
          },
          {
            text: 'Update',
            onPress: () => {this.update(roster)},
          },        {
            text: 'Delete',
            onPress: () => {this.delete(roster)},
          }
        ])
    }

    update = (roster) => {
      this.setState({rosterName: roster.name, update: true, updateRosterId:roster._id, uploadShown:true})
    }

    delete = (roster) => {
      Alert.alert('Are you sure you want to delete ' + roster.name +'?', 'Choose an option', [
        {
          text: 'Cancel',
          onPress: () => {return},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            this.setState({
              loading: true
            }, () => {
              const url = DELETE_URL + roster._id;
              fetch(url,
                {
                  method: 'DELETE',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId: this.props.user._id
                  })
                }
                ).then(res => res.json())
              .then(json => {
                Alert.alert(json.message)
                this.fetchUsersRosters();
              })
              .catch(err=> console.log(err))
            })
          },
        }
      ])
    }


    upload = () => {
      this.setState({loading: true})

      let data = this.state.selectedRoster ? this.state.selectedRoster.type.toLowerCase() == 'draftclass' ? JSON.parse(exportDraftClassJson()) : getRosterJSON(this.state.selectedRoster.data) : getRosterJSON()

      let url = this.state.update ? 'http://10.0.0.106:3000/roster/update/' + this.state.updateRosterId:
      'http://10.0.0.106:3000/roster/upload/'+GAME;
         fetch(url, {
            method: this.state.update? 'PATCH' : 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.state.rosterName,
              userId: this.props.user._id,
              type: this.state.selectedRoster ? this.state.selectedRoster.type : 'roster',
              data: data
            }),
          }).then(res => res.json()).then(json =>{
            Alert.alert(json.message)
            this.fetchUsersRosters();
          }).catch(err=> console.log(err));
    }

    render() {

        let {user} = this.props;
        return (
            <Background>

              {
                this.state.loading ? <View style={{height: '80%', alignItems:'center', justifyContent:'center'}}>
                  <ActivityIndicator size={"large"}></ActivityIndicator>
                </View>
                :

            <View style={{ padding: 20 }}>

            <Text style={{ fontFamily: 'advent-pro' , fontSize:22, color:'black', textAlign: 'center' }}>{`Welcome back ${user.user},`}</Text>

            <View style={{padding: 20}}>

            <Text style={{ fontFamily: 'advent-pro' , fontSize:18, color:'black', textAlign: 'center' }}>{`Rosters you have uploaded (${this.state.usersRosters.length}/2)`}</Text>
            <Text style={{ fontFamily: 'advent-pro' , fontSize:18, color:'black', textAlign: 'center' }}>{`Select a roster slot`}</Text>


{
                this.state.usersRosters.map((item, i) => (
                  <CommunityRosterListItem titleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} subtitleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} containerStyle={{ backgroundColor: 'rgba(255,255,255,0)' }} 
                  onPress={() => {this.manageRosterPress(item)}}
                  title={item.name}
                  subtitle={`Created By: ${item.userName}`} 
                  rightTitleStyle={{fontFamily:'advent-pro'}}
                  rightTitle={`Downloads: ${item.downloads}`}
                  rightSubtitle={`Updates: ${item.updates}`}
                  key={i} 
                  ></CommunityRosterListItem>
                ))
    }
           {       
                this.state.emptySlots.map((item, i) => (
                  <CommunityRosterListItem titleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} subtitleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} containerStyle={{ backgroundColor: 'rgba(255,255,255,0)' }} 
                  onPress={() => {this.setState({uploadShown: true})}}
                  title={'Empty Roster Slot ' + (i+1)}
                  rightTitleStyle={{fontFamily:'advent-pro'}}
                  key={i} 
                  ></CommunityRosterListItem>
                ))
}

            </View>
            

{this.state.uploadShown ? (
            <View style={{padding: 20}}>

            <Text style={{ fontFamily: 'advent-pro' , fontSize:22, color:'black', textAlign: 'center' }}>{this.state.update? 'Update Roster' :'Upload A Roster'}</Text>

              <View style={{ margin: 10 }}>
                <Text style={{ fontFamily: "advent-pro", fontSize: 18, textTransform:'uppercase', color:'#616161' }}>
                  Roster Name
                </Text>
                <Input
                  onChangeText={(value) => this.setState({ rosterName: value })}
                  placeholder={this.state.update ? this.state.rosterName : 'name your roster'}
                  placeholderTextColor={"rgb(180,180,180)"}
                  inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                ></Input>

                <Text style={{ fontFamily: "advent-pro", fontSize: 18, textTransform:'uppercase', color:'#616161', marginVertical:20 }}>
                  {`Selected Roster: ${this.state.selectedRoster? this.state.selectedRoster.name: 'Current Roster'}`}
                </Text>
            <Button
            title={"Select A Roster"}
            color={"#333333"}
            style={{marginVertical:10}}
            textColor={"white"}
            onPress={() => {Actions.selectroster({setSelectedRoster: this.setSelectedRoster})}}
          ></Button>
              
          <Button
            title={this.state.update? 'Update' :'Upload'}
            color={"#333333"}
            textColor={"white"}
            style={{marginVertical:10}}
            onPress={() => {this.upload()}}
          ></Button>
              </View>

            </View>

):null

}

<Text style={{ fontFamily: "advent-pro", fontSize: 18, textTransform:'uppercase', color:'red' }}>
                  {this.state.message}
                </Text>
            </View>
              }

            </Background>
        )
    }
}
