import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Card, Slider, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { selectedTeam, displaySalary } from '../data/script';
import CachedImage from '../components/CachedImage';

export default class CoachSettings extends React.Component {

    update = (_callback, popto) => {
        this.setState({
            offVsDefFocus: selectedTeam.coach.offVsDefFocus,
            offTwoVsThree: selectedTeam.coach.offTwoVsThree,
            defTwoVsThree: selectedTeam.coach.defTwoVsThree,
            tempo: selectedTeam.coach.tempo,
            rotationSize: selectedTeam.coach.rotationSize,
            frontCourtVsBackCourt: selectedTeam.coach.frontCourtVsBackCourt,
            reboundVsRunInTransition: selectedTeam.coach.reboundVsRunInTransition
        }, () => _callback(popto))
    }

    constructor(props){
        super(props);

        if(selectedTeam.coach != null){
            this.state = {
                offVsDefFocus: selectedTeam.coach.offVsDefFocus,
                offTwoVsThree: selectedTeam.coach.offTwoVsThree,
                defTwoVsThree: selectedTeam.coach.defTwoVsThree,
                tempo: selectedTeam.coach.tempo,
                rotationSize: selectedTeam.coach.rotationSize,
                frontCourtVsBackCourt: selectedTeam.coach.frontCourtVsBackCourt,
                reboundVsRunInTransition: selectedTeam.coach.reboundVsRunInTransition
            }
        }
    }



    saveChanges() {
        selectedTeam.coach.offVsDefFocus = this.state.offVsDefFocus;
        selectedTeam.coach.offTwoVsThree = this.state.offTwoVsThree;
        selectedTeam.coach.defTwoVsThree = this.state.defTwoVsThree;
        selectedTeam.coach.tempo = this.state.tempo;
        selectedTeam.coach.frontCourtVsBackCourt = this.state.frontCourtVsBackCourt;
        selectedTeam.coach.reboundVsRunInTransition =  this.state.reboundVsRunInTransition;
        if(this.props.inGame!=true){
            if(this.state.rotationSize != selectedTeam.coach.rotationSize){
                selectedTeam.coach.rotationSize = this.state.rotationSize;
                selectedTeam.reorderLineup();
            }
        }
        Actions.pop();
    }


    getOffVsDefFocusString() {
        if (this.state.offVsDefFocus === 0) {
            return "Focus: Balanced"
        } else if (this.state.offVsDefFocus > 0) {
            return "Focus: Offense"
        } else {
            return "Focus: Defense"
        }
    }

    getOffTwoVsThreeString() {
        if (this.state.offTwoVsThree === 0) {
            return "Offensive Focus: Balanced"
        } else if (this.state.offTwoVsThree > 0) {
            return "Offensive Focus: Three Point"
        } else {
            return "Offensive Focus: Two Point"
        }
    }

    getDefTwoVsThree() {
        if (this.state.defTwoVsThree === 0) {
            return "Defensive Focus: Balanced"
        } else if (this.state.defTwoVsThree > 0) {
            return "Defensive Focus: Limit Three Pointers"
        } else {
            return "Defensive Focus: Protect The Paint"
        }
    }

    getTempo() {
        if (this.state.tempo === 0) {
            return "Tempo: Balanced"
        } else if (this.state.tempo > 0) {
            return "Tempo: Fast Tempo"
        } else {
            return "Tempo: Slow Tempo"
        }
    }

    getFrontCourtVsBackCourt() {
        if (this.state.frontCourtVsBackCourt === 0) {
            return "Scoring Focus: Balanced"
        } else if (this.state.frontCourtVsBackCourt > 0) {
            return "Scoring Focus: Backcourt"
        } else {
            return "Scoring Focus: Frontcourt"
        }
    }

    getReboundVsRunInTransition() {
        if (this.state.reboundVsRunInTransition === 0) {
            return "Rebounding Focus: Balanced"
        } else if (this.state.reboundVsRunInTransition > 0) {
            return "Rebounding Focus: Run In Transition"
        } else {
            return "Rebounding Focus: Crash The Boards"
        }
    }



    render() {
        return (
            <Background>


                {selectedTeam.coach != null?(

                    


                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

{!this.props.inGame ? (

<Card
                
                containerStyle={{
                    width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'black',
                    alignSelf:'center'
                }} >
                         <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <CachedImage uri={selectedTeam.logoSrc} style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }} />
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.name}</Text>
                </View>
                <Divider style={{ backgroundColor: 'black'}}></Divider>
                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <CachedImage uri={selectedTeam.coach.faceSrc} style={{ height: 100, width: 100, maxHeight: 100, resizeMode: 'contain', marginRight: 5 }} />
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'HC: ' + selectedTeam.coach.name}</Text>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Age: ' + selectedTeam.coach.age}</Text>
                    <Text style={{ textAlign: "center", fontSize: 20, color: selectedTeam.coach.contractExpired? 'red' : 'black', fontFamily: 'advent-pro' }}>{selectedTeam.coach.contractExpired? 'CONTRACT EXPIRED' :selectedTeam.coach.years + ' Years $' + displaySalary(selectedTeam.coach.salary)}</Text>


                </View>
                <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'OFF: ' + selectedTeam.coach.offenseRating}</Text>
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'DEF: ' + selectedTeam.coach.defenseRating}</Text>
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'SIGNING: ' + selectedTeam.coach.signingInterest}</Text>
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'TRAINING: ' + selectedTeam.coach.training}</Text>

                    <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black', marginTop: 5}} title="View Coaches" onPress={() => {Actions.coachlist({update: this.update})}}></Button>
                    <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black', marginTop: 5}} title={selectedTeam.coach.contractExpired?"Resign Coach" : "Coach Menu"} onPress={() => {Actions.coachmenu({coach: selectedTeam.coach, team: selectedTeam, update:this.update})}}></Button>

                    </Card>
                    ):null}


                    <Card
                        containerStyle={{
                            width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                        }} >
{
                this.props.inGame ===  true? (

                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'Note: These changes only affect the current game, to make them permanent make sure to set them in your teams Coach Settings'}</Text>
                        </View>    
                ): null
}

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <CachedImage uri={selectedTeam.logoSrc} style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }} />
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.name}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getOffVsDefFocusString()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.offVsDefFocus}
                            onValueChange={value => { this.setState({ offVsDefFocus: value }) }}
                        />



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getOffTwoVsThreeString()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.offTwoVsThree}
                            onValueChange={value => { this.setState({ offTwoVsThree: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getDefTwoVsThree()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.defTwoVsThree}
                            onValueChange={value => { this.setState({ defTwoVsThree: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getTempo()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.tempo}
                            onValueChange={value => { this.setState({ tempo: value }) }}
                        />

                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getFrontCourtVsBackCourt()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.frontCourtVsBackCourt}
                            onValueChange={value => { this.setState({ frontCourtVsBackCourt: value }) }}
                        />   

                         <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getReboundVsRunInTransition()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.reboundVsRunInTransition}
                            onValueChange={value => { this.setState({ reboundVsRunInTransition: value }) }}
                        />            

                    {
                        this.props.inGame === true ? (null):
                        <View>

                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Rotation Size: " + this.state.rotationSize}</Text>
                            <Slider
                                thumbTintColor={'rgb(180,180,180)'}
                                maximumTrackTintColor={'rgb(180,180,180)'}
                                step={1}
                                minimumValue={8}
                                maximumValue={12}
                                value={this.state.rotationSize}
                                onValueChange={value => { this.setState({ rotationSize: value }) }}
                            />

                        </View>


                    }


                        <Button titleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black', borderWidth: 1, borderRadius: 25 }} title="Commit Changes" onPress={() => { this.saveChanges() }}></Button>


                    </Card>





                </ScrollView>
        ): <Card
        containerStyle={{
            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'black',
            alignSelf:'center'
        }} >
        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black', marginTop: 5}} title="Hire A Coach" onPress={() => {Actions.coachlist({update: this.update})}}></Button>
        </Card>

    }
            </Background>





        )
    }
}

