import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { communityRosters, getDataFromLink } from '../data/script';
import Background from '../components/background';
import CommunityRosterListItem from '../components/CommunityRosterListItem';
import Button from '../components/Button';

const URL = 'http://10.0.0.106:3000/roster/basketball/';

export default class CommunityRosters extends React.Component {


    componentDidMount = () => {
        fetch(URL).then(res => res.json())
        .then(json => {
            this.setState({filteredList : this.filterList(json.rosters)});
        })
    }

    leaveScene = () => {
        //   console.log('called');
          if(this.props.filtered != null){
                Actions.pop();
          }else{
              this.props.update(()=>{
                 Actions.popTo('mainmenu')
              })
          }
      }

    filterList(array){

        if(this.props.filtered != null){
            let filtered = [];
            for(let i=0; i<array.length; i++){
                if(array[i].type === this.props.filtered){
                    filtered.push(array[i]);
                }
            }
            return filtered;
        }else{
            return array;
        }
    }

    state = {
        filteredList: null
    }




    render() {
        return (
            <Background>
       
            

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth:1}}>
                    <Image
                        style={{ resizeMode:'contain', height: 50, alignSelf:'center', margin:5 }}
                        source={require('../assets/icon.png')} />
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20}}>{'Community Rosters'}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:14}}>{'Note: These are free rosters created by the community'}</Text>

                </View>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

                    {
                        this.state.filteredList==null ? null :
                        this.state.filteredList.length > 0 ?
                        
                        this.state.filteredList.map((item, i) => (
                        <CommunityRosterListItem titleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} subtitleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} containerStyle={{ backgroundColor: 'rgba(255,255,255,0)' }} 
                        onPress={() => {getDataFromLink(URL + item._id, item.type, item.sliderType, this.leaveScene)}}
                        title={item.name}
                        subtitle={`Created By: ${item.userName}`} 
                        rightTitleStyle={{fontFamily:'advent-pro'}}
                        rightTitle={`Downloads: ${item.downloads}`}
                        rightSubtitle={`Updates: ${item.updates}`}
                        key={i} 
                        ></CommunityRosterListItem>
                    )): null
                    }
                </ScrollView>
                        <Button title={'Upload A Roster'} color={'rgba(255,0,0,.75)'} textColor={'white'} onPress={()=>{Actions.login()}}></Button>
                    

            </Background>
        )
    }
}