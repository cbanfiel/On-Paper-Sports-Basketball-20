import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Card, Slider, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { setSliders ,setFranchiseSliders, twoPointPercentageLow, twoPointPercentageHigh, threePointPercentageHigh, defenseHigh, defenseLow, secondsOffClock, threePointPercentageLow, conferences, gamesPerSeason, playoffSeeds, seriesWinCount, conferencesOn, teams, franchise, collegeMode } from '../data/script';

export default class SlidersMenu extends React.Component {

    state = {
        twopl: twoPointPercentageLow,
        twoph: twoPointPercentageHigh,
        threepl : threePointPercentageLow,
        threeph : threePointPercentageHigh,
        defh : defenseHigh,
        defl : defenseLow,
        soc : secondsOffClock,
        games : gamesPerSeason,
        seeds : playoffSeeds,
        gamesToWin : seriesWinCount,
        conferencesOn : conferencesOn,
        maxSeeds : this.getMaxSeeds(),
        seedSelection : this.getMaxSeeds(),
        collegeMode : collegeMode
    }

    playoffSeeds(value){
        if(value===0){
            this.setState({seeds : 1});
        }else if(value ===1){
            this.setState({seeds : 2});
        }
        else if(value ===2){
            this.setState({seeds : 4});
        }
        else if(value ===3){
            this.setState({seeds : 8});
        }else if(value ===4){
            this.setState({seeds : 16});
        }
        else if(value ===5){
            this.setState({seeds : 32});
        }
        else if(value ===6){
            this.setState({seeds : 64});
        }
    }
    updateMaxSeeds(confOn){
        if(confOn === false){
            if(teams.length>=64){
                return 6;
            }else if(teams.length >=32){
                return 5;
            }
            else if(teams.length >=16){
                return 4;
            }else if(teams.length >= 8){
                return 3;
            }
            else if(teams.length >= 4){
                return 2;
            }
            else if(teams.length >= 2){
                return 1;
            }
            else if(teams.length >= 1){
                return 0;
            }
    }else{
        return this.getMaxSeeds();
    }

    }

    getMaxSeeds(){
        if(conferences[0].teams.length >= conferences[1].teams.length){
            if(conferences[0].teams.length>=64){
                return 6;
            }
            else if(conferences[0].teams.length>=32){
                return 5;
            }else if(conferences[0].teams.length >=16){
                return 4;
            }else if(conferences[0].teams.length >= 8){
                return 3;
            }
            else if(conferences[0].teams.length >= 4){
                return 2;
            }
            else if(conferences[0].teams.length >= 2){
                return 1;
            }
            else if(conferences[0].teams.length >= 1){
                return 0;
            }
        }
       else if(conferences[0].teams.length <= conferences[1].teams.length){
        if(conferences[1].teams.length>=64){
            return 6;
        }
        else if(conferences[1].teams.length>=32){
            return 5;
        }else if(conferences[1].teams.length >=16){
            return 4;
        }else if(conferences[1].teams.length >= 8){
            return 3;
        }
        else if(conferences[1].teams.length >= 4){
            return 2;
        }
        else if(conferences[1].teams.length >= 2){
            return 1;
        }
        else if(conferences[1].teams.length >= 1){
            return 0;
        }
        }
    }

    saveChanges(){
        setSliders(this.state.twopl,this.state.twoph,this.state.threepl,this.state.threeph,this.state.defl,this.state.defh,this.state.soc);
        Actions.mainmenu();
    }

    saveFranchiseChanges(){
        setFranchiseSliders(this.state.games, this.state.seeds, this.state.gamesToWin, this.state.conferencesOn, this.state.collegeMode);
        Actions.mainmenu();
    }

    render() {
        return (
            <Background>
                <ScrollView >

                    <Card
                        containerStyle={{
                            width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                            borderRadius: 25,
                        }} >

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Game Sliders'}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Two Point Percentage Low: " + this.state.twopl}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-20}
                            maximumValue={80}
                            value={this.state.twopl}
                            onValueChange={value => this.setState({twopl : value})}
                        />



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Two Point Percentage High: " + this.state.twoph}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-20}
                            maximumValue={80}
                            value={this.state.twoph}
                            onValueChange={value => this.setState({ twoph: value })}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Three Point Percentage Low: " + this.state.threepl}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-20}
                            maximumValue={80}
                            value={this.state.threepl}
                            onValueChange={value => this.setState({ threepl: value })}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Three Point Percentage High: " + this.state.threeph}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-20}
                            maximumValue={80}
                            value={this.state.threeph}
                            onValueChange={value => this.setState({ threeph: value })}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Defense Low: " + this.state.defl}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-20}
                            maximumValue={80}
                            value={this.state.defl}
                            onValueChange={value => this.setState({ defl: value })}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Defense High: " + this.state.defh}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-20}
                            maximumValue={80}
                            value={this.state.defh}
                            onValueChange={value => this.setState({ defh: value })}
                        />
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Seconds Off Clock Per Possesion: " + this.state.soc}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={99}
                            value={this.state.soc}
                            onValueChange={value => this.setState({ soc: value })}
                        />
                <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius:25}} title="Commit Game Slider Changes" onPress={() => {this.saveChanges()}}></Button>

                        </Card>

                        <Card
                        containerStyle={{
                            width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                            borderRadius: 25,
                        }} >

<View style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Franchise Sliders'}</Text>
                            <Text style={{ textAlign: "center", fontSize: 14, color: 'white', fontFamily: 'advent-pro' }}>{'Note: Modyfying these sliders will require a new franchise to be started, The franchise you are currently in will be restarted.'}</Text>

                        </View>
                        <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Season Games: " + this.state.games}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={2}
                            maximumValue={256}
                            value={this.state.games}
                            onValueChange={value => this.setState({ games: value })}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Playoff Seeds: " + this.state.seeds}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={this.state.maxSeeds}
                            value={this.state.seedSelection}
                            onValueChange={value => this.playoffSeeds(value)}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Series Length: Best Of " + (this.state.gamesToWin + this.state.gamesToWin-1)}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={16}
                            value={this.state.gamesToWin}
                            onValueChange={value => this.setState({gamesToWin : value})}
                        />

                <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor:this.state.conferencesOn?  'rgba(10,200,60,0.75)' : 'rgba(255,0,0,0.75)' , borderColor: 'rgba(255,255,255,0.75)', marginBottom:10 , borderWidth: 1, borderRadius:25}} title={this.state.conferencesOn? 'Conferences ON' : 'Conferences OFF'} onPress={() => {this.setState({maxSeeds: this.updateMaxSeeds(!this.state.conferencesOn) , seedSelection: this.updateMaxSeeds(!this.state.conferencesOn) ,  conferencesOn : !this.state.conferencesOn }), this.playoffSeeds(this.updateMaxSeeds(!this.state.conferencesOn)) }}></Button>

                <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius:25, marginBottom:10}} title={this.state.collegeMode? 'Offseason Type: College' : 'Offseason Type: Pro'} onPress={() => {this.setState({collegeMode : !this.state.collegeMode})}}></Button>

                <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius:25}} title="Commit Franchise Slider Changes" onPress={() => {this.saveFranchiseChanges()}}></Button>


                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

