import React, { Component } from "react";
import { Text, View } from "react-native";
import { Input } from "react-native-elements";
import Background from "../components/background";
import Button from "../components/Button";
import { Actions } from "react-native-router-flux";
import {getRosterJSON} from '../data/script.js'

const GAME = 'basketball';

export default class Upload extends Component {

    state={
        rosterName: '',
        college: false,
        message: ''
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
              data: getRosterJSON()
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

            <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>{`Welcome back ${user.user}`}</Text>
            <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>{'Rosters You Have Uploaded'}</Text>



            <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>{'Upload Your Current Roster?'}</Text>

              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: "advent-pro", fontSize: 16, textTransform:'uppercase', color:'#616161' }}>
                  Roster Name
                </Text>
                <Input
                  onChangeText={(value) => this.setState({ rosterName: value })}
                  placeholder={'enter a roster name'}
                  placeholderTextColor={"rgb(180,180,180)"}
                  inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                ></Input>
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
