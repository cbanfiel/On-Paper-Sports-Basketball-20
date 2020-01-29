import React from 'react';
import { TouchableOpacity, Text, ScrollView, View, Image} from 'react-native';
import { Card, Divider, ListItem, Slider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { home, away, Results, seriesWinCount, setHome, setAway, selectedTeam, collegeMode } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';
import CachedImage from '../components/CachedImage';

let poss;
export default class InGame extends React.Component {

  resetCoachingSliders(){
    selectedTeam.offVsDefFocus = this.state.offVsDefFocus;
    selectedTeam.offTwoVsThree = this.state.offTwoVsThree;
    selectedTeam.defTwoVsThree = this.state.defTwoVsThree;
    selectedTeam.tempo = this.state.tempo;
    selectedTeam.frontCourtVsBackCourt = this.state.frontCourtVsBackCourt;
    selectedTeam.reboundVsRunInTransition =  this.state.reboundVsRunInTransition;
  }


  state = {
    homescore: 0,
    awayscore: 0,
    timer:null,
    quarter:1,
    time:12,
    playByPlay: null,
    speed: 100,
    completed: false,
    offVsDefFocus: selectedTeam.offVsDefFocus,
    offTwoVsThree: selectedTeam.offTwoVsThree,
    defTwoVsThree: selectedTeam.defTwoVsThree,
    tempo: selectedTeam.tempo,
    rotationSize: selectedTeam.rotationSize,
    frontCourtVsBackCourt: selectedTeam.frontCourtVsBackCourt,
    reboundVsRunInTransition: selectedTeam.reboundVsRunInTransition
  }

  time = () => {
    let qtr =1;
    let minutes= 12;
    let seconds = 0;
    let time;

    time = (this.props.game.time) -(48*60)  + (12*60);
      minutes = Math.floor(time / 60);
      seconds = Math.round(time - minutes * 60);

    if((this.props.game.time/60)<36){
      qtr =2;
      time = (this.props.game.time)  -(36*60)  + (12*60);
      minutes = Math.floor(time / 60);
      seconds = Math.round(time - minutes * 60);

    }
    if((this.props.game.time/60)<24){
      qtr = 3;
      time = (this.props.game.time)  -(24*60)  + (12*60);
      minutes = Math.floor(time / 60);
      seconds = Math.round(time - minutes * 60);
    }
    if((this.props.game.time/60)<12){
      qtr =4;
      time = (this.props.game.time)  -(12*60)  + (12*60);
      minutes = Math.floor(time / 60);
      seconds = Math.round(time - minutes * 60);
    }
    if(seconds<10){
      seconds = '0'+ seconds;
    }
    time = '' + minutes + ':' + seconds;

    if(minutes<0){
      this.setState({time:'0:00'});
    }else{
      this.setState({quarter : qtr, time: time});
    }


  }


  slowSim = () => {
    if(this.props.game.time === (48*60)){
    this.props.game.clearStats();
    if(this.props.game.jumpBall()){
      poss = home;
    }else{
      poss = away;
    }
        
    }


    if(this.state.timer != null){
      clearInterval(this.state.timer);
      this.setState({timer:null});
      return;
    }
   
    timer = setInterval(function(){
      if(this.props.game.time <= 0 && this.props.game.homescore === this.props.game.awayscore){
        this.props.game.time = (5*60);
        this.time();
        this.setState({quarter: 'OT'})
      }

      if(this.props.game.time <= 0){
          clearInterval(timer);

          
          this.props.game.saveStats();

          //FIX annoying ass gltich
          home.bench = [...home.constantBench];
          away.bench = [...away.constantBench];

          this.setState({completed: true})
      if(this.props.season){
        home.played[this.props.franchise.season.day] = new Results(this.props.game.homescore, this.props.game.awayscore);
        away.played[this.props.franchise.season.day] = new Results(this.props.game.awayscore, this.props.game.homescore);
        if (this.props.game.homescore > this.props.game.awayscore) {
            home.wins++;
            away.losses++;
        } else {
            home.losses++;
            away.wins++;
        }

        let tempH = home;
        let tempA = away;

        this.props.franchise.simDay();

        setHome(tempH);
        setAway(tempA);
        

      }
      if(this.props.playoffs){
        this.props.series.game++;
        this.props.series.results.push({ team1Score: this.state.homescore, team2Score: this.state.awayscore });
        if (this.state.homescore > this.state.awayscore) {
            this.props.series.team1Wins++;
        } else {
            this.props.series.team2Wins++;
        }
        if (this.props.series.team1Wins >= seriesWinCount) {

            this.props.series.winner = this.props.series.team1;
        }
        else if (this.props.series.team2Wins >= seriesWinCount) {
            this.props.series.winner = this.props.series.team2;
        }

        this.props.series.manual = true;
        let tempH = home;
        let tempA = away;

        this.props.franchise.playoffs.simDay();
        setHome(tempH);
        setAway(tempA);
    }
    return;
      }
      this.props.game.possesion(poss);
      if(poss === home){
        poss = away;
      }else{
        poss = home;
      }
      this.time();
      try{
      for(let i=0; i<3; i++){
        if(this.props.game.possResult[i].time == null){
          this.props.game.possResult[i].time = this.state.time;
      this.props.game.possResult[i].quarter = this.state.quarter;
        }
      }
    }catch(err){

    }

      this.setState({homescore:this.props.game.homescore, awayscore:this.props.game.awayscore, playByPlay:this.props.game.possResult[0]});
  }.bind(this),this.state.speed);
    this.setState({timer: timer})
      
    }

componentWillUnmount(){
  if(this.state.timer != null){
    clearInterval(this.state.timer);
    this.setState({timer : null});
  }

  if(this.props.updateSeason != null){
    this.props.updateSeason();
  }

  if(this.props.updateState != null){
    this.props.updateState();
  }

  this.resetCoachingSliders();

}

leavePage(){
  if(this.state.timer != null){
    clearInterval(this.state.timer);
    this.setState({timer : null});
  }
}





  render() {
    return (
      <Background>

        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

          <TouchableOpacity style={{ width: '100%' }} onPress={ this.state.completed ? null : this.slowSim}>

          <Card
                    containerStyle={{
                      width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                    }}
                    >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ flex: 1, textAlign: 'center', fontSize: 35, color: 'black', fontFamily: 'advent-pro' }}>{'QTR: ' + this.state.quarter}</Text>
                  <Text style={{ flex: 1, textAlign: 'center', fontSize: 35, color: 'black', fontFamily: 'advent-pro' }}>{'TIME: ' + this.state.time}</Text>

                    </View>
                    <Divider style={{backgroundColor:'black' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.timer != null ? 'Pause' : 'Sim Game'}</Text>
                  </Card>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.leavePage(), Actions.ingamestats({currentGame : this.props.game})}}>

          <Card
                    containerStyle={{
                      width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                    }}
                    >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ flex: 1, textAlign: 'center', fontSize: 35, color: 'black', fontFamily: 'advent-pro' }}>{this.state.homescore}</Text>
                  {
                                collegeMode? (
                                  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginRight:5 }}>{home.seed <= 25? `#${home.seed}` : '  '}</Text>
                                ):null
                              }
                      <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} source={{uri: home.logoSrc }} />
                      <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} source= {{uri: away.logoSrc }} />
                      {
                                collegeMode? (
                                  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginRight:5 }}>{away.seed <= 25? `#${away.seed}` : '  '}</Text>
                                ):null
                              }
               
                  <Text style={{ flex: 1, textAlign: 'center', fontSize: 35, color: 'black', fontFamily: 'advent-pro' }}>{this.state.awayscore}</Text>

                    </View>
                    <Divider style={{backgroundColor:'black' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Stats'}</Text>
                  </Card>
                </TouchableOpacity>

{
  this.state.playByPlay != null?(
                <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.leavePage(), Actions.lastplay({game : this.props.game})}}>
                <Card
                    containerStyle={{
                      width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                    }}
                    >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} source = {{uri: this.state.playByPlay.shooter.teamLogoSrc }} />

                      <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} source= {{uri: this.state.playByPlay.shooter.faceSrc }} />


                    </View>
                  <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.playByPlay.shooter.positionString + ' #' + this.state.playByPlay.shooter.number + ' ' + this.state.playByPlay.shooter.name + ' ' + this.state.playByPlay.result}</Text>
                    <Divider style={{backgroundColor:'black' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Last Play'}</Text>
                  </Card>
                </TouchableOpacity>



  ) : null
                  }

<Card     

          containerStyle={{
            width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
          }}
          >
          <Slider
                            disabled={this.state.timer != null}
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={100}
                            minimumValue={100}
                            maximumValue={1000}
                            value={1000 - this.state.speed}
                            onValueChange={value => this.setState({ speed: 1000 - value })}
                        />

          <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{(1000 - this.state.speed)/100}</Text>
          <Divider style={{backgroundColor:'black' ,  height:1, margin:5}} ></Divider>
          <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Simulation Speed'}</Text>
        </Card>

{
        //IN GAME ADJUSTMENTS

        this.props.allowAdjustments?(
          selectedTeam === home || selectedTeam === away? (
        <TouchableOpacity style={{ width: '100%' }} onPress={() => {this.leavePage(), Actions.push('coachsettings', {inGame : true})}}>
                        <Card
                            containerStyle={{
                                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                            }}
                            >

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri = { selectedTeam.logoSrc } />
                            </View>
                            <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'In Game Adjustments'}</Text>
                        </Card>
                    </TouchableOpacity>
        ):null):null

}

        </ScrollView>
      </Background>

    )
  }
}