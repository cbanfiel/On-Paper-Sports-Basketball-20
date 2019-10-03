import React from 'react';
import { TouchableOpacity, Text, ScrollView, View } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import { teams, draftClass, selectedTeam, franchise, setInDraft, fantasyDraft, availableFreeAgents, setTeamSalaries, shuffle, resetFranchise } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';
import CachedImage from '../components/CachedImage';

export default class FantasyDraft extends React.Component {


    componentWillMount() {
        for (let i = 0; i < teams.length; i++) {
            teams[i].roster = [];
        }

    }

    componentWillUnmount() {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].roster.length < 13) {
                this.simToEnd();
            }
        }

        for (let i = 0; i < teams.length; i++) {
            teams[i].reorderLineup();
        }
        availableFreeAgents.roster = this.state.draftClass.roster;
        setTeamSalaries();
        this.props.update();
        resetFranchise();
    }

    state = {
        onTheClock: teams[0],
        draftClass: fantasyDraft(),
        drafted: { roster: [] },
        pick: 1,
        round: 1,
        ended: false
    }

    simToEnd = () => {
        let pick = this.state.pick;
        let team = this.state.onTheClock
        let draftClass = this.state.draftClass;
        let drafted = this.state.drafted;
        let round = this.state.round;
        while (this.state.drafted.roster.length != teams.length * 13) {
            let selection = Math.floor(Math.random() * 4);
            team = teams[pick - 1]
            let ply = draftClass.roster[selection];
            team.roster.push(ply);
            draftClass.roster.splice(draftClass.roster.indexOf(ply), 1);
            drafted.roster.unshift(ply);
            ply.teamLogoSrc = team.logoSrc;
            ply.teamName = team.name;
            pick++;
            if (pick > teams.length) {
                round++;
                pick = 1;
            }
        }

        this.setState({
            draftClass: draftClass,
            drafted: drafted,
            pick: pick,
            round: round,
            onTheClock: teams[0],
            ended: true

        })
    }

    simToNextUserPick = () => {
        let pick = this.state.pick;
        let team = this.state.onTheClock
        let draftClass = this.state.draftClass;
        let drafted = this.state.drafted;
        let round = this.state.round;
        let ended = false;
        while (teams[pick - 1] != selectedTeam) {
            let selection = Math.floor(Math.random() * 4);
            team = teams[pick - 1]
            let ply = draftClass.roster[selection];
            team.roster.push(ply);
            draftClass.roster.splice(draftClass.roster.indexOf(ply), 1);
            drafted.roster.unshift(ply);
            ply.teamLogoSrc = team.logoSrc;
            ply.teamName = team.name;
            pick++;
            if (pick > teams.length) {
                round++;
                pick = 1;
            }
        }

        if (round >= 13) {
            ended = true;
        }



        this.setState({
            draftClass: draftClass,
            drafted: drafted,
            pick: pick,
            round: round,
            onTheClock: teams[pick - 1],
            ended: ended
        })
    }


    update = () => {
        try {

        } catch (err) {

        }
    }

    simPick = () => {
        let pick = Math.floor(Math.random() * 4);
        this.draft(this.state.draftClass.roster[pick])
    }

    draft = (ply) => {
        let ended = false;
        let avail = this.state.draftClass;
        let drafted = this.state.drafted;
        let pick = this.state.pick + 1;
        let round = this.state.round;
        if (pick > teams.length) {
            round++;
            console.log(round);
            pick = 1;
        }
        avail.roster.splice(avail.roster.indexOf(ply), 1);
        drafted.roster.unshift(ply);
        ply.teamLogoSrc = this.state.onTheClock.logoSrc;
        ply.teamName = this.state.onTheClock.name;
        this.state.onTheClock.roster.push(ply);

        this.setState({
            draftClass: avail,
            drafted: drafted,
            pick: pick,
            round: round,
            onTheClock: teams[pick - 1],
            ended: ended
        })
    }

    render() {
        return (
            <Background>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                    {this.state.ended ? (null) :

                        <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: this.state.draftClass, view: 'fantasydraft', selectable: true, franchise: franchise, update: this.update, draft: this.draft }) }}>
                            <Card
                                containerStyle={{
                                    width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                                }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.onTheClock.logoSrc }} />
                                </View>
                                <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'On The Clock: ' + this.state.onTheClock.name}</Text>
                            </Card>
                        </TouchableOpacity>

                    }


                    {
                        this.state.pick > 1 || this.state.round > 1 ? (
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: this.state.drafted, view: 'draft' }) }}>
                                <Card
                                    containerStyle={{
                                        width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.drafted.roster[0].teamLogoSrc }} />
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.drafted.roster[0].faceSrc }} />
                                    </View>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.drafted.roster[0].positionString + ' ' + this.state.drafted.roster[0].name + ' OVR:' + this.state.drafted.roster[0].rating}</Text>
                                    <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>

                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Draft Board'}</Text>
                                </Card>
                            </TouchableOpacity>
                        ) : null
                    }
                    {
                        this.state.ended ? (null) :
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.simPick() }}>
                                <Card
                                    containerStyle={{
                                        width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                                    }}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Sim Pick'}</Text>
                                </Card>
                            </TouchableOpacity>
                    }


                    {


                        this.state.ended ? (null) :



                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.simToEnd(); }}>
                                <Card
                                    containerStyle={{
                                        width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                                    }}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Sim To End'}</Text>
                                </Card>
                            </TouchableOpacity>

                    }
                    {
                        this.state.ended ? (null) :
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.simToNextUserPick() }}>
                                <Card
                                    containerStyle={{
                                        width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                                    }}
                                // image={{ uri: selectedTeam.logoSrc }}
                                // 
                                >
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Sim To Next User Pick'}</Text>
                                </Card>
                            </TouchableOpacity>

                    }
                    {
                        this.state.ended ? (null) :
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: this.state.onTheClock }) }}>
                                <Card
                                    containerStyle={{
                                        width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                                    }}
                                // image={{ uri: selectedTeam.logoSrc }}
                                // 
                                >
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'View Current Roster'}</Text>
                                </Card>
                            </TouchableOpacity>

                    }




                </ScrollView>

            </Background>





        )
    }
}