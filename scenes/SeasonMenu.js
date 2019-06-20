import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, leaugeLeaders, setSelectedTeam2, franchise, sortedRoster, conferencesOn, collegeMode, refreshOff, setRefreshOff } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';


export default class SeasonMenu extends React.Component {

  componentWillUnmount(){
    if(this.state.timer != null){
      this.stopSim();
    }
  }

  static onEnter(){
    if(refreshOff){
      setRefreshOff(false);
    }else{
      Actions.refresh();
    }
  }

  slowSim = () => {
    let timer = setTimeout(
      function(){
        franchise.simDay();
        Actions.refresh();
        if(franchise.season.day >= franchise.season.games){
          this.stopSim();
        }else{
          this.slowSim();
        }
      }.bind(this),500);
      this.setState({timer : timer});

  }

  stopSim = () => {
    if(this.state.timer != null){
      clearTimeout(this.state.timer);
      this.setState({timer : null});
    }

  }

  state = {
    offseason: franchise.advance,
    stage: franchise.stage,
    timer : null
  }



  refreshSeasonMenu() {
    Actions.refresh();
  }

  simDay = () => {
    franchise.simDay();
    Actions.refresh();
  }

  simToEnd = () => {
    franchise.simToEnd();
    Actions.refresh();
    this.setState({
      offseason: franchise.advance,
      stage: franchise.stage
    })
    
  }

  update = () => {
    this.setState({
      offseason: franchise.advance,
      stage: franchise.stage
    })
    Actions.refresh();
  }


  setOffSeasonStage = (input) => {

    if (input != 'advance') {
      franchise.stage = input;
      franchise.simStage();
      this.setState({
        stage: franchise.stage
      })
    }
    if (input === 'advance') {
      franchise.stage = input;
      franchise.simStage();
      this.setState({
        stage: '',
        offseason: false
      })
    }
  }


  render() {
    if (this.state.offseason === false) {

      return (
        <Background>

          <ScrollView >


{
            // <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.sim20(), Actions.refresh() }}>

            //   <Card
            //     containerStyle={{
            //       width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
            //       borderRadius: 25
            //     }}
            //   >
            //     <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Sim 20 Years</Text>
            //   </Card>
            // </TouchableOpacity>
            


}

            {
              franchise.season.day < franchise.season.games ? (
                <View>

                <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.state.timer == null ? this.slowSim() : this.stopSim()}}>
                  <Card containerStyle={{ width: '90%', backgroundColor: 'rgba(0,0,0,0.75)', borderRadius: 25 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    </View>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{ this.state.timer == null ? ('Start Simulation'): 'Stop Simulation'}</Text>
                  </Card>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '100%' }} onPress={() => {this.stopSim(), Actions.ingame({game: franchise.season.manualDay(), season:true, franchise: franchise})}}>
                  <Card containerStyle={{ width: '90%', backgroundColor: 'rgba(0,0,0,0.75)', borderRadius: 25 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.wins + '-' + selectedTeam.losses}</Text>
                      <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} source = {{ uri: selectedTeam.logoSrc }} />
                      <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} source = {{ uri: selectedTeam.schedule[franchise.season.day].logoSrc }}/>
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.schedule[franchise.season.day].wins + '-' + selectedTeam.schedule[franchise.season.day].losses}</Text>
                    </View>
                    <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Play Next Game'}</Text>
                  </Card>
                </TouchableOpacity>
                </View>



              ) : null
            }
            <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.scheduleview({ franchise: franchise, refresh: this.refreshSeasonMenu })}>

              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
              >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ flex:1, textAlign: "center", fontSize: 30, color: 'white', fontFamily: 'advent-pro' }}>{'OVR: ' + selectedTeam.rating}</Text>
                      <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5}} source = {{uri: selectedTeam.logoSrc }} />
                    </View>
              <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.name + ' ' + 'Record: ' + selectedTeam.wins + "-" + selectedTeam.losses}</Text>
              </Card>
            </TouchableOpacity>








            {
              franchise.season.day > 0 ? (

                <TouchableOpacity style={{ width: '100%' }} onPress={() => { setSelectedTeam2(selectedTeam.schedule[franchise.season.day - 1]), Actions.gamestats({ currentGame: (franchise.season.day - 1) }) }}>

                  <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25
                    }}
                    
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.played[franchise.season.day - 1].userScore}</Text>
                      <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} source= {{uri: selectedTeam.logoSrc }} />
                    <Text style={{ textAlign: "center", fontSize: 35, color: selectedTeam.played[franchise.season.day - 1].userScore > selectedTeam.played[franchise.season.day - 1].oppScore ? 'green' : 'red' , fontFamily: 'advent-pro' }}>{selectedTeam.played[franchise.season.day - 1].userScore > selectedTeam.played[franchise.season.day - 1].oppScore ? 'W' : 'L'}</Text>
                      <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} source= {{uri: selectedTeam.schedule[franchise.season.day - 1].logoSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.played[franchise.season.day - 1].oppScore}</Text>

                    </View>
                    <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Previous Game Results'}</Text>
                  </Card>
                </TouchableOpacity>


              ) : null
            }

            <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.seasonstatsmenu()}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ flex: 1, textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{ conferencesOn ? 'Seed #' + selectedTeam.seed : 'Rank #' + selectedTeam.seed}</Text>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }} />
                    <Picache style={{ flex:1,  overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: sortedRoster(selectedTeam,'ppg')[0].faceSrc }} />
                    <Text style={{ flex:1,  textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{sortedRoster(selectedTeam,'ppg')[0].statsHistory.length > 0 ? (Math.round((sortedRoster(selectedTeam,'ppg')[0].seasonPoints / sortedRoster(selectedTeam,'ppg')[0].statsHistory.length) * 10) / 10) + ' PPG' : null}</Text>
                </View>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'#' + sortedRoster(selectedTeam,'ppg')[0].number + ' ' + sortedRoster(selectedTeam,'ppg')[0].name}</Text>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>

                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Stats Menu'}</Text>
              </Card>
            </TouchableOpacity>


            <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.seasonrostermenu()}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <Picache style={{ overflow: 'hidden',  resizeMode: 'contain', height: 35, width: 35, margin: 5 }} source = {{uri: selectedTeam.logoSrc }} />
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.name +' Team Roster'}</Text>
                  </View>
                  <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'column', alignItems: "flex-start"}}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden',  resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source = {{uri: selectedTeam.firstTeam[0].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'white', fontFamily: 'advent-pro' }}>{'PG #' + selectedTeam.firstTeam[0].number + ' ' + selectedTeam.firstTeam[0].name + ' OVR: ' + selectedTeam.firstTeam[0].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden',  resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source = {{uri: selectedTeam.firstTeam[1].faceSrc }}/>
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'white', fontFamily: 'advent-pro' }}>{'SG #' + selectedTeam.firstTeam[1].number + ' ' + selectedTeam.firstTeam[1].name + ' OVR: ' + selectedTeam.firstTeam[1].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden',  resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source = {{ uri: selectedTeam.firstTeam[2].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'white', fontFamily: 'advent-pro' }}>{'SF #' + selectedTeam.firstTeam[2].number + ' ' + selectedTeam.firstTeam[2].name + ' OVR: ' + selectedTeam.firstTeam[2].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden',  resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source = {{ uri: selectedTeam.firstTeam[3].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'white', fontFamily: 'advent-pro' }}>{'PF #' + selectedTeam.firstTeam[3].number + ' ' + selectedTeam.firstTeam[3].name + ' OVR: ' + selectedTeam.firstTeam[3].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden',  resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source = {{ uri: selectedTeam.firstTeam[4].faceSrc }}/>
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'white', fontFamily: 'advent-pro' }}>{'C #' + selectedTeam.firstTeam[4].number + ' ' + selectedTeam.firstTeam[4].name + ' OVR: ' + selectedTeam.firstTeam[4].rating}</Text>
                    </View>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>


            {
              franchise.season.day < franchise.season.games ? (
                <TouchableOpacity style={{ width: '100%' }} onPress={this.simToEnd}>
                  <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25
                    }}
                    >

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{ uri: selectedTeam.logoSrc }} />
                    </View>
                    <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Sim To End Of Season'}</Text>
                  </Card>
                </TouchableOpacity>
              ) :
                <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.advance = true, franchise.stage = 'playoffs', franchise.simStage(), Actions.playoffmenu() }}>
                  <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25
                    }}
                    >

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{ uri: selectedTeam.logoSrc } }/>
                    </View>
                    <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{ collegeMode ? 'Advance To Tournament' : 'Advance To Playoffs'}</Text>
                  </Card>
                </TouchableOpacity>
            }

          </ScrollView>
        </Background>
      )
    } else {

      if (this.state.stage === 'playoffs') {
        return (
          <Background>
            <ScrollView>

              <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.playoffmenu() }}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }} />
                </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Resume Playoffs'}</Text>
              </Card>
            </TouchableOpacity>

            </ScrollView>
          </Background>

        )
      }


      if (this.state.stage === 'draft') {
        return (
          <Background>
            <ScrollView>


              <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.draftmenu({ franchise: franchise, back: 'seasonmenu' }) }}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }} />
                </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Resume Draft'}</Text>
              </Card>
            </TouchableOpacity>

            </ScrollView>
          </Background>

        )
      }




      if (this.state.stage === 'retirements') {
        return (
          <Background>
            <ScrollView>


              <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: franchise.retirements, back: 'seasonmenu', view: 'retirements' }) }}>
               <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }} />
                </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{collegeMode ? 'Graduates' : 'Retirements'}</Text>
              </Card>
            </TouchableOpacity>


              <TouchableOpacity style={{ width: '100%' }} onPress={() => {
              
              
              franchise.stage = collegeMode? 'freeagency' : 'draft', franchise.simStage(), collegeMode ? this.setState({stage : 'freeagency'}) : Actions.draftmenu({ franchise: franchise, back: 'seasonmenu' }) }}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }}/>
                </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{collegeMode? 'Advance To Recruiting' : 'Advance To Draft'}</Text>
              </Card>
            </TouchableOpacity>

            </ScrollView>
          </Background>



        )

      }
      else if (this.state.stage === 'freeagency') {
        return (
          <Background>
            <ScrollView>


              <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.signplayermenu({ back: 'seasonmenu' }) }}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }} />
                </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{collegeMode ? 'Recruiting' : 'Free Agency'}</Text>
              </Card>
            </TouchableOpacity>

              <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: selectedTeam, back: 'seasonmenu' }) }}>

              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{ uri: selectedTeam.logoSrc }}/>
                </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Current Roster'}</Text>
              </Card>
            </TouchableOpacity>


              <TouchableOpacity style={{ width: '100%' }} onPress={() => {this.setOffSeasonStage('advance'), collegeMode?  Actions.reset('seasonmenu') : null}}>

              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{ uri: selectedTeam.logoSrc }} />
                </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Advance To Season'}</Text>
              </Card>
            </TouchableOpacity>

            </ScrollView>
          </Background>
        )


      }
      else if (this.state.stage === 'resigning') {
        return (
          <Background>
            <ScrollView>


              <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: selectedTeam, back: 'seasonmenu', view: 'resigning' }) }}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }} />
                </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Expiring Contracts'}</Text>
              </Card>
            </TouchableOpacity>

              <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: selectedTeam, back: 'seasonmenu' }) }}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }} />
                </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Current Roster'}</Text>
              </Card>
            </TouchableOpacity>


              <TouchableOpacity style={{ width: '100%' }} onPress={() => this.setOffSeasonStage('freeagency')}>

              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{ uri: selectedTeam.logoSrc }} />
                </View>
                <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Sim To Free Agency'}</Text>
              </Card>
            </TouchableOpacity>
            </ScrollView>
          </Background>
        )


      }

    }
  }
}
