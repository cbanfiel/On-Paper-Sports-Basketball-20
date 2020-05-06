import React, { Component } from "react";
import { Text, View } from "react-native";
import { Input } from "react-native-elements";
import Background from "../components/background";
import Button from "../components/Button";
import { Actions } from "react-native-router-flux";

const view = {
  LOGIN: 0,
  REGISTER: 1,
};
export default class Login extends Component {
  state = {
    user: null,
    email: 'email@email.com',
    password: 'password123',
    view: view.LOGIN,
    error: null
  };

  login = () => {
    fetch('http://10.0.0.106:3000/users/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      }).then(res => res.json()).then(json =>{
          if(json.user){
            //logged in
                Actions.upload({user: json.user})
          }else{
                this.setState({error: json.message})
          }
      });
  }

  render() {
    return (
      <Background>
        <View>
          {
            <View style={{ padding: 20 }}>
              <View style={{ margin: 10 }}>
                <Text style={{ fontFamily: "advent-pro", fontSize: 16, textTransform:'uppercase', color:'#616161' }}>
                  Email Address
                </Text>
                <Input
                  onChangeText={(value) => this.setState({ email: value })}
                  placeholder={this.state.email? this.state.email : 'email'}
                  placeholderTextColor={"rgb(180,180,180)"}
                  inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                ></Input>
              </View>

              <View style={{ margin: 10 }}>
                <Text style={{ fontFamily: "advent-pro", fontSize: 16, textTransform:'uppercase', color:'#616161' }}>
                  Password
                </Text>
                <Input
                  onChangeText={(value) => this.setState({ password: value })}
                  placeholder={this.state.password? this.state.password : 'password'}
                  secureTextEntry={true}
                  placeholderTextColor={"rgb(180,180,180)"}
                  inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                ></Input>
              </View>

              <Text>
                Don't have an On Paper Sports account? click here to register
              </Text>
            </View>
          }


                <Text style={{ fontFamily: "advent-pro", fontSize: 16, color:'red', textAlign:'center' }}>
                  {this.state.error ? this.state.error: ''}
                </Text>

          <Button
            title={this.state.view == view.LOGIN ? "Login" : "Sign Up"}
            color={"rgba(255,0,0,.75)"}
            textColor={"white"}
            onPress={() => {this.login()}}
          ></Button>
        </View>
      </Background>
    );
  }
}
