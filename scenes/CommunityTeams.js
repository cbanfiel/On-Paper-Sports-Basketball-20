import React from 'react';
import { Alert, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import Background from '../components/background';
import Button from "../components/Button";
import ListItem from '../components/ListItem';
import { availableFreeAgents, Team, Player, teams, resetFranchise } from '../data/script';


var {height, width} = Dimensions.get('window');

let allPlayers = [];

const URL = 'http://10.0.0.106:3000/roster/teams/'

export default class CommunityTeams extends React.Component {
  search(value){
    fetch(URL+value).then(res => res.json()).then(json => {
        const data = [];
        for(let i=0; i<json.teams.length; i++){
            let team = new Team(json.teams[i]);

            for(let ply of json.teams[i].roster){
                let player = new Player(ply);
                player.calculateRating();
                team.roster.push(player);
            }

            team.reorderLineup();
            team.calculateRating();
            data.push({
              type:'NORMAL',
              item: team
            })
          }

          data.sort((a,b) => {
              if(a.item.rating > b.item.rating){
                  return -1;
              }
              if(a.item.rating < b.item.rating){
                return 1;
            }
            return 0;
          })

          this.setState({
            list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
            order: data
          })
    }).catch(err => console.log(err))
  }

  copyToRoster(team){
      teams.push(team)
      resetFranchise();
      Alert.alert(team.name + ' copied to roster');
  }

  viewRoster(tm){
    Actions.rosterlist({selectedTeam: tm, back: 'communityteams'})
  }


  constructor(props){
    super(props);
    const data = [];
    this.state={
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
      order: data,
      search: ''
    };
  
    this.layoutProvider = new LayoutProvider((i) => {
      return this.state.list.getDataForIndex(i).type
    }, (type, dim) => {
      switch(type){
        case 'NORMAL':
          dim.width = width;
          dim.height = 70;
          break;
        default :
          dim.width=0;
          dim.height=0;
          break
      }
    })
  }

  rowRenderer = (type,data) => {
    return(
            <ListItem 
              title={data.item.name} 
              leftAvatar={data.item.logoSrc} 
              subtitle={'Rating: ' + data.item.rating}
              onPress={() => {this.viewRoster(data.item)}}
              onLongPress={() => {this.copyToRoster(data.item)}}
            >
            </ListItem>
    )
  }




  render() {
    return (
      <Background>

    <Input containerStyle = {{backgroundColor:'rgba(255,255,255,0)', padding: 15}} onChangeText={value => {this.setState({search: value})}} placeholder={'Enter player name'} placeholderTextColor={'rgb(80,80,80)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro', textAlign:'center' }} ></Input>
    <Button
            title={"Search"}
            color={"#333333"}
            style={{marginVertical:10}}
            textColor={"white"}
            onPress={() => {this.search(this.state.search)}}
          ></Button>
<RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false}/>


      </Background>





    )
  }
}