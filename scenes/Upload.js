import React, { Component } from "react";
import { Text, View } from "react-native";
import { Input } from "react-native-elements";
import Background from "../components/background";
import Button from "../components/Button";
import { Actions } from "react-native-router-flux";
import {getRosterJSON} from '../data/script.js'
import CommunityRosterListItem from '../components/CommunityRosterListItem';

const GAME = 'basketball';
const URL = 'http://10.0.0.106:3000/roster/user/basketball/'

export default class Upload extends Component {

  componentDidMount(){
      fetch(URL+this.props.user._id).then(res => res.json())
      .then(json => this.setState({usersRosters: json.rosters}))
  }

    state={
        rosterName: '',
        college: false,
        message: '',
        usersRosters: [],
        selectedRoster: null
    }

    setSelectedRoster = (roster) => {
      this.setState({selectedRoster : roster}, () => Actions.pop());
    }



    upload = () => {
        fetch('http://10.0.0.106:3000/roster/'+GAME, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.state.rosterName,
              userId: this.props.user._id,
              type: 'roster',
              data: getRosterJSON(this.state.selectedRoster.data)
            }),
          }).then(res => res.json()).then(json =>{
                console.log(json.message)
          });
    }

    render() {
        let {user} = this.props;
        return (
            <Background>
            <View style={{ padding: 20 }}>

            <Text style={{ fontFamily: 'advent-pro' , fontSize:22, color:'black', textAlign: 'center' }}>{`Welcome back ${user.user},`}</Text>

            <View style={{padding: 20}}>

            <Text style={{ fontFamily: 'advent-pro' , fontSize:18, color:'black', textAlign: 'center' }}>{`Rosters You Have Uploaded (${this.state.usersRosters.length}/2)`}</Text>

{
                this.state.usersRosters.map((item, i) => (
                  <CommunityRosterListItem titleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} subtitleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} containerStyle={{ backgroundColor: 'rgba(255,255,255,0)' }} 
                  onPress={() => {}}
                  title={item.name}
                  subtitle={`Created By: ${item.userName}`} 
                  rightTitleStyle={{fontFamily:'advent-pro'}}
                  rightTitle={`Downloads: ${item.downloads}`}
                  rightSubtitle={`Updates: ${item.updates}`}
                  key={i} 
                  ></CommunityRosterListItem>
                ))
}

            </View>
            


            <View style={{padding: 20}}>

            <Text style={{ fontFamily: 'advent-pro' , fontSize:18, color:'black', textAlign: 'center' }}>{'Upload A Roster?'}</Text>

              <View style={{ margin: 10 }}>
                <Text style={{ fontFamily: "advent-pro", fontSize: 16, textTransform:'uppercase', color:'#616161' }}>
                  Roster Name
                </Text>
                <Input
                  onChangeText={(value) => this.setState({ rosterName: value })}
                  placeholder={'enter a roster name'}
                  placeholderTextColor={"rgb(180,180,180)"}
                  inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                ></Input>

                <Text style={{ fontFamily: "advent-pro", fontSize: 16, textTransform:'uppercase', color:'#616161' }}>
                  {`Selected Roster: ${this.state.selectedRoster? this.state.selectedRoster.name: 'Current Roster'}`}
                </Text>
            <Button
            title={"Select A Roster"}
            color={"rgba(255,0,0,.75)"}
            textColor={"white"}
            onPress={() => {Actions.selectroster({setSelectedRoster: this.setSelectedRoster})}}
          ></Button>
              </View>

            </View>
              
          <Button
            title={"Upload"}
            color={"rgba(255,0,0,.75)"}
            textColor={"white"}
            onPress={() => {this.upload()}}
          ></Button>



            </View>

            </Background>
        )
    }
}
