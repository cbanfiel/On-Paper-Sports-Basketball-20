import React from 'react';
import { ScrollView, Dimensions, Modal, TouchableOpacity, View } from 'react-native';
import {Icon} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { sortedRoster, allPlayers } from '../data/script';
import ListItem from '../components/ListItem';
import { LayoutProvider, DataProvider, RecyclerListView } from 'recyclerlistview';
import PlayerCardModal from '../components/PlayerCardModal';
import StatFilter from '../components/StatFilter';
import StatListItem from '../components/StatListItem';


var {height, width} = Dimensions.get('window');

export default class StatsList extends React.Component {


  setStatFilter(arr){
    const data = [];
    const empty = [];

    for(let i=0; i<arr.length; i++){
      data.push({
        type:'NORMAL',
        item: arr[i]
      })
    }

    this.setState({
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data)
    });
  }

  statsView(player) {
    let str;
    if (this.props.season) {
      if(player.seasonThreePointersAtt>0){
        return "MIN: " + (Math.round(player.minutesPlayed/player.statsHistory.length*10)/10) + " PTS: " + (Math.round((player.seasonPoints / player.statsHistory.length) * 10) / 10) + " FG% " + Math.floor((((player.seasonTwoPointersMade / player.seasonTwoPointersAtt) + (player.seasonThreePointersMade/player.seasonThreePointersAtt))/2) * 100)
         + " 3P% " + Math.floor((player.seasonThreePointersMade / player.seasonThreePointersAtt) * 100) + " FT% " + Math.floor((player.seasonFreeThrowsMade / player.seasonFreeThrowsAttempted) * 100) + ' REB: ' + (Math.round((player.seasonRebounds / player.statsHistory.length) * 10) / 10) + ' OREB: ' + (Math.round((player.seasonOffRebounds / player.statsHistory.length) * 10) / 10) 
      }else{
        return "MIN: " + (Math.round(player.minutesPlayed/player.statsHistory.length*10)/10) + " PTS: " + (Math.round((player.seasonPoints / player.statsHistory.length) * 10) / 10) + " FG% " + Math.floor((player.seasonTwoPointersMade / player.seasonTwoPointersAtt) * 100)
         + " 3P% " + Math.floor((player.seasonThreePointersMade / player.seasonThreePointersAtt) * 100) + " FT% " + Math.floor((player.seasonFreeThrowsMade / player.seasonFreeThrowsAttempted) * 100) + ' REB: ' + (Math.round((player.seasonRebounds / player.statsHistory.length) * 10) / 10) + ' OREB: ' + (Math.round((player.seasonOffRebounds / player.statsHistory.length) * 10) / 10) 
      }


    }
    else {
      return "PTS: " + player.points + " FG% " + Math.floor((player.twoPointersMade / player.twoPointersAtt) * 100)
         + " 3P% " + Math.floor((player.threePointersMade / player.threePointersAtt) * 100) + " FT% " + Math.floor((player.freeThrowsMade / player.freeThrowsAttempted) * 100) + ' REB: ' + player.rebounds;
    }
  }

  setModalVisible(visible, player) {
    this.setState({ modalVisible: visible, modalPlayer: player });
}


  constructor(props){
    super(props);

    const data = [];

    for(let i=0; i<this.props.selectedTeam.roster.length; i++){
      data.push({
        type:'NORMAL',
        item: sortedRoster(this.props.selectedTeam, 'ppg')[i]
      })
    }

    this.state={
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
      order: data,
      modalPlayer: null,
      modalVisible: false
    };

    this.setStatFilter = this.setStatFilter.bind(this);
  
    this.layoutProvider = new LayoutProvider((i) => {
      return this.state.list.getDataForIndex(i).type
    }, (type, dim) => {
      switch(type){
        case 'NORMAL':
          dim.width = width;
          dim.height = 140;
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
      <StatListItem 
      stats={this.statsView(data.item) }
      teamName={data.item.teamName}
      teamLogoSrc={data.item.teamLogoSrc}
      playerInfo = {data.item.positionString + ' #' + data.item.number + ' ' + data.item.name}
      faceSrc={data.item.faceSrc}
        onPress={() => Actions.playerprofile({selectedPlayer: data.item})}
        onLongPress={() => this.setModalVisible(true, data.item)}
      >
      </StatListItem>
    )
  }




  render() {
    return (
      <Background>

        
{
                    this.state.modalPlayer != null ? (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: '90%',
                                    height: '75%', backgroundColor: 'rgba(255,255,255,.97)', alignSelf: 'center', borderRadius: 25
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                        }}
                                        style={{ alignSelf: 'flex-end', padding: 15 }}>
                                        <Icon name="close" ></Icon>
                                    </TouchableOpacity>
                                    <PlayerCardModal modalPlayer = {this.state.modalPlayer}></PlayerCardModal>
                                   </View>
                            </View>
                        </Modal>
                    ) : null
                }


<StatFilter selectedTeam={this.props.selectedTeam} setStatFilter={this.setStatFilter}></StatFilter>

<RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false}/>


      </Background>





    )
  }
}