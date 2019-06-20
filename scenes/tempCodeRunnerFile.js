import React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, leaugeLeaders, setSelectedTeam2, franchise } from '../data/script';
import Background from '../components/background';


export default class SeasonStatsMenu extends React.Component {


  render() {

      return (
        <Background>

          <ScrollView >

            <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.conferencelist()}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                image={{ uri: "http://images.performgroup.com/di/library/sporting_news/7/b9/damian-lillard-102016-ftr-gettyjpg_ejxi3558tg451asuc598u3bns.jpg?t=-487404609&w=960&quality=70" }}
                imageStyle={{ overflow: 'hidden', borderTopLeftRadius: 25, borderTopRightRadius: 25, }}
              >
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Standings'}</Text>
              </Card>
            </TouchableOpacity>


            <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.statslist({ selectedTeam: selectedTeam, season: true })}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                image={{ uri: "https://s.cdn.turner.com/nba/nba/dam/assets/160510224459-russell-westbrook-nba-playoffs-oklahoma-city-thunder-at-san-antonio-spurs.1280x720.jpeg" }}
                imageStyle={{ overflow: 'hidden', borderTopLeftRadius: 25, borderTopRightRadius: 25, }}
              >
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Stats'}</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.statslist({ selectedTeam: leaugeLeaders(), season: true })}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                image={{ uri: "https://cdn.vox-cdn.com/thumbor/jwXEBZcmMgKRSJCUi3dfh52grik=/0x0:4792x3064/1200x800/filters:focal(2013x1149:2779x1915)/cdn.vox-cdn.com/uploads/chorus_image/image/57174217/530281864.0.jpg" }}
                imageStyle={{ overflow: 'hidden', borderTopLeftRadius: 25, borderTopRightRadius: 25, }}
              >
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'League Leaders'}</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.teamlist({ home: 3, back: 'season' })}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                image={{ uri: "https://cdn.vox-cdn.com/thumbor/JvMfxU3ZGW82Za7PwZa0o0sDeyM=/0x0:3000x2001/1200x800/filters:focal(920x0:1400x480)/cdn.vox-cdn.com/uploads/chorus_image/image/62333265/1061534378.jpg.0.jpg" }}
                imageStyle={{ overflow: 'hidden', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
              >
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Trade'}</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.signplayermenu({ back: 'seasonmenu' }) }}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                image={{ uri: "https://i.ytimg.com/vi/FCvrxvwx-_E/maxresdefault.jpg" }}
                imageStyle={{ overflow: 'hidden', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: 60 }}
              >
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Free Agency'}</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.draftclassmenu({ back: 'seasonmenu' }) }}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                image={{ uri: "https://www.winviewgames.com/wp-content/uploads/2017/06/NBA-Draft.jpg" }}
                imageStyle={{ overflow: 'hidden', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
              >
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'View Draft Class'}</Text>
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
                    image={{ uri: "https://cdn.vox-cdn.com/thumbor/Ej9tkURCEBIEbJYoLH3AoeFgt28=/0x0:4164x2776/1200x800/filters:focal(1838x828:2504x1494)/cdn.vox-cdn.com/uploads/chorus_image/image/59314811/892053270.jpg.0.jpg" }}
                    imageStyle={{ overflow: 'hidden', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Sim To End</Text>
                  </Card>
                </TouchableOpacity>
              )
                : <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.stage = 'playoffs', franchise.simStage(), Actions.playoffmenu() }}>

                  <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25
                    }}
                    image={{ uri: 'https://985thesportshub.com/wp-content/uploads/sites/88/2019/03/USATSI_12292915.jpg?width=512&height=342&anchor=middlecenter&mode=crop' }}
                    imageStyle={{ overflow: 'hidden', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Advance To Playoffs</Text>
                  </Card>
                </TouchableOpacity>
            }
            
                  <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.teamhistory()}}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                image={{ uri: "https://cdn.nba.net/nba-drupal-prod/styles/landscape/s3/2018-05/wilkins_bird_1988.jpg?itok=-oYhyfq8" }}
                imageStyle={{ overflow: 'hidden', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
              >
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'View Team History'}</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.teamhistory({view: 'pastchampions'})}}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25
                }}
                image={{ uri: "https://cdn.abcotvs.com/dip/images/2155506_062717-ap-steph-curry-trophy-img.jpg?w=1280&r=16%3A9" }}
                imageStyle={{ overflow: 'hidden', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
              >
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'View Past Champions'}</Text>
              </Card>
            </TouchableOpacity>


          </ScrollView>
        </Background>
      )

    }
  }
}