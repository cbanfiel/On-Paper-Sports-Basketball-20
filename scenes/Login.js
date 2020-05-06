import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Input } from "react-native-elements";
import Background from "../components/background";
import Button from "../components/Button";
import { Actions } from "react-native-router-flux";
import isEmail from 'validator/lib/isEmail';
import * as FileSystem from 'expo-file-system';

const VIEW = {
  LOGIN: 0,
  REGISTER: 1,
};
export default class Login extends Component {

  async componentDidMount (){
    await FileSystem.readAsStringAsync(FileSystem.documentDirectory+'settings.json').then((value)=>{
        let data = JSON.parse(value);
        this.setState({email: data.email, password: data.password})
    }).catch(err => {
      console.log(err);
    })

  }

  state = {
    user: null,
    email: "",
    password: "",
    view: VIEW.LOGIN,
    error: null,
  };

  saveUserToFileSystem = async () => {
  await FileSystem.writeAsStringAsync(FileSystem.documentDirectory+'settings.json',JSON.stringify({email: this.state.email, password: this.state.password})).then(() => {
      console.log('saved user to file system');
  }).catch((err) => {
      console.log(err);
  });
  }

  login = () => {
    this.saveUserToFileSystem();

    if(isEmail(this.state.email)){
    fetch("http://10.0.0.106:3000/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.user) {
          //logged in
          Actions.replace('upload', { user: json.user });
        } else {
          this.setState({ error: json.message });
        }
      });
    }else{
      this.setState({error: 'Not a valid email address'})
    }
  };

  register = () => {
    this.saveUserToFileSystem();


    if(isEmail(this.state.email)){
    fetch("http://10.0.0.106:3000/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        user: this.state.user,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.user) {
          //logged in
          Actions.replace('upload', { user: json.user });
        } else {
          this.setState({ error: json.message });
        }
      });
    }else{
      this.setState({error: 'Not a valid email address'})
    }
  };

  render() {
    return (
      <Background>
        <View>
          {
            <View style={{ padding: 20 }}>
              <Image
                style={{
                  resizeMode: "contain",
                  height: 75,
                  alignSelf: "center",
                  margin: 5,
                }}
                source={require("../assets/icon.png")}
              />

              <Text
                style={{
                  fontFamily: "advent-pro",
                  fontSize: 28,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                {"On Paper Sports Account"}
              </Text>

              <Text style={{ fontFamily: "advent-pro", fontSize: 24 }}>
                {this.state.view == VIEW.LOGIN ? "Login" : "Sign Up"}
              </Text>
              <View style={{ margin: 10 }}>
                <Text
                  style={{
                    fontFamily: "advent-pro",
                    fontSize: 18,
                    textTransform: "uppercase",
                    color: "#616161",
                  }}
                >
                  Email Address
                </Text>
                <Input
                  onChangeText={(value) => this.setState({ email: value })}
                  placeholder={"your email address"}
                  placeholderTextColor={"rgb(180,180,180)"}
                  inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                >{this.state.email}</Input>
              </View>

              {this.state.view == VIEW.LOGIN ? null : (
                <View style={{ margin: 10 }}>
                  <Text
                    style={{
                      fontFamily: "advent-pro",
                      fontSize: 18,
                      textTransform: "uppercase",
                      color: "#616161",
                    }}
                  >
                    Username
                  </Text>
                  <Input
                    onChangeText={(value) => this.setState({ user: value })}
                    placeholder={"your username"}
                    placeholderTextColor={"rgb(180,180,180)"}
                    inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                  ></Input>
                </View>
              )}

              <View style={{ margin: 10 }}>
                <Text
                  style={{
                    fontFamily: "advent-pro",
                    fontSize: 18,
                    textTransform: "uppercase",
                    color: "#616161",
                  }}
                >
                  Password
                </Text>
                <Input
                  onChangeText={(value) => this.setState({ password: value })}
                  placeholder={"your password"}
                  secureTextEntry={true}
                  placeholderTextColor={"rgb(180,180,180)"}
                  inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                >{this.state.password}</Input>
              </View>

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    view:
                      this.state.view == VIEW.LOGIN
                        ? VIEW.REGISTER
                        : VIEW.LOGIN,
                  })
                }
              >
                <View style={{ margin: 10 }}>
                  <Text
                    style={{
                      fontFamily: "advent-pro",
                      fontSize: 18,
                      color: "#0288d1",
                    }}
                  >
                    {this.state.view == VIEW.LOGIN
                      ? "Don't have an On Paper Sports acccount? click here to register!"
                      : "Already have an On Paper Sports acccount? click here to login!"}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ margin: 10 }}>
                <Text
                  style={{
                    fontFamily: "advent-pro",
                    fontSize: 16,
                    color: "red",
                    textAlign: "center",
                    padding: 10
                  }}
                >
                  {this.state.error ? this.state.error : ""}
                </Text>

                <Button
                  title={this.state.view == VIEW.LOGIN ? "Login" : "Sign Up"}
                  color={"#333333"}
                  textColor={"white"}
                  onPress={() => {
                    this.state.view == VIEW.LOGIN
                      ? this.login()
                      : this.register();
                  }}
                ></Button>
              </View>
            </View>
          }
        </View>
      </Background>
    );
  }
}
