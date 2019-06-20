import React from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Divider, Slider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam,  signPlayer,  canSign, calculateCapRoom, displaySalary, collegeMode } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';

export default class OfferContractMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            years: 1,
            salary: 1200000,
            signable : true
        }


    }

    componentDidMount(){
        this.setState({
            salary : this.props.selectedPlayer.salary,
            signable : canSign(selectedTeam, this.props.selectedPlayer.salary)
        })
    }


    render() {

        

        return (
            <Background>
                <Card
                    containerStyle={{
                        width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                        borderRadius: 25,
                    }} >

                    <CachedImage style={{ width: 100, height:100, resizeMode:'contain',flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri= {selectedTeam.logoSrc } />
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.name}</Text>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{collegeMode? 'Recruiting Points Available: ' + displaySalary(calculateCapRoom(selectedTeam)) : 'CAP SPACE: $' + displaySalary(calculateCapRoom(selectedTeam)) }</Text>
                    <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>

                    <CachedImage style={{ height: 125, width:125, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri= {this.props.selectedPlayer.faceSrc }/>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.props.selectedPlayer.positionString + ' #' + this.props.selectedPlayer.number + ' ' + this.props.selectedPlayer.name}</Text>
                    <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>

{
        !collegeMode?
        <View>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"CONTRACT YEARS: " + this.state.years}</Text>
                <Slider
                    thumbTintColor={'rgb(180,180,180)'}
                    maximumTrackTintColor={'rgb(180,180,180)'}
                    step={1}
                    minimumValue={1}
                    maximumValue={6}
                    value={this.state.years}
                    onValueChange={value => this.setState({ years: value })}
                />
                </View>
    : null
}

                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{collegeMode? "Recruiting Points: " + displaySalary(this.state.salary) : "SALARY: $" + displaySalary(this.state.salary)}</Text>
                    <Slider
                        thumbTintColor={'rgb(180,180,180)'}
                        maximumTrackTintColor={'rgb(180,180,180)'}
                        step={10000}
                        minimumValue={this.props.selectedPlayer.salary}
                        maximumValue={50000000}
                        value={this.state.salary}
                        onValueChange={value => this.setState({ salary: value, signable:canSign(selectedTeam,value) })}
                    />
{
    this.props.back === 'seasonmenu' ? ( canSign(selectedTeam, this.state.salary) ? (

        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ borderRadius:25, backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, marginBottom:10 }} title={collegeMode? "Offer Scholarship": "Sign Player"} onPress={() => { signPlayer(selectedTeam, this.props.selectedPlayer, this.state.years, this.state.salary, this.props.playerpool)  , Actions.seasonmenu() }}></Button>
    ) :
        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ borderRadius:25, backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, marginBottom:10 }} title={collegeMode? "Not Enough Recruiting Points" : "Not Enough Cap Space"} disabled ></Button>

        ) :
        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ borderRadius:25, backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, marginBottom:10 }} title={collegeMode? "Offer Scholarship": "Sign Player"} onPress={() => { signPlayer(selectedTeam, this.props.selectedPlayer, this.state.years, this.state.salary, this.props.playerpool)  , Actions.replace(this.props.back) }}></Button>
    
    }
       
  {     this.props.back === 'seasonmenu' ? (
       
        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ borderRadius:25, backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1 }} title="Back" onPress={() => { Actions.seasonmenu() }}></Button>

  ):
    
        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ borderRadius:25, backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1 }} title="Back" onPress={() => { Actions.replace(this.props.back) }}></Button>
  }


                </Card>



            </Background>
        )
    }
}

