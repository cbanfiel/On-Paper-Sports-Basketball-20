import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { communityRosters, getDataFromLink } from '../data/script';
import Background from '../components/background';
import ListItem from '../components/ListItem';

export default class CommunityRosters extends React.Component {

    render() {
        return (
            <Background>

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth:1}}>
                    <Image
                        style={{ resizeMode:'contain', height: 50, alignSelf:'center', margin:5 }}
                        source={require('../assets/icon.png')} />
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20}}>{'Community Rosters'}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:14}}>{'Note: These are free rosters created by the community'}</Text>

                </View>
                <ScrollView>

                    {communityRosters.map((item, i) => (
                        <ListItem titleStyle={{ fontFamily: 'advent-pro' }} subtitleStyle={{ fontFamily: 'advent-pro' }} containerStyle={{ backgroundColor: 'rgba(255,255,255,0.75)' }} 
                        onPress={() => {getDataFromLink(item.link, item.type), Actions.popTo('mainmenu')}} 
                        title={item.name} 
                        rightTitleStyle={{fontFamily:'advent-pro'}}
                        rightTitle={item.type}
                        key={i} 
                        ></ListItem>
                    ))}
                </ScrollView>
            </Background>
        )
    }
}