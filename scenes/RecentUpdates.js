import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Background from '../components/background';
import ListItem from '../components/ListItem';


const updateLog = [
    {
        date: '11/12/2019',
        updates: "-Player age now displayed in roster lists\n-player expected salary now displayed in resigning menu\n-New recruiting difficulty slider "
    },
    {
        date: '11/9/2019',
        updates: "-Added generic player faces\n-Added generic team logos\n-You can now use the generic player portraits in the create a player menu\n-You can now use the generic team logos in the create a team menu"
    },
    {
        date: '10/24/2019',
        updates: "-Overhauled player signing interests\n-Simplified sign player menu\n-Added player signing difficulty slider\n-Added team specific franchise autosaves\n-Fixed bug with some sliders not being saved/loaded"
    },
    {
        date: '10/6/2019',
        updates: "-College mode overhaul (redshirting, recruiting, rankings in ui and schedule view, etc) \n-updated the look of the ui \n-in game and previous game stat menus updated \n-various bug fixes"
    },
    {
        date: '8/13/2019',
        updates: "-Added a fantasy draft in the edit roster menu"
    },
    {
        date: '7/31/2019',
        updates: "-Added more efficient list view in draft and roster lists \n-You can now do franchise mode with an uneven number of teams, (In order to keep the team number and season length as customizable as possible the scheduling algorithim gives one team each 'week' a 'bye' week, these result in an automatic win for the team, The 'bye week' system is only implemented when you have an odd number of teams in your league)\n-Testing menu display changing every time you go back to the menu \n-Various bug fixes.."
    },
    {
        date: '7/23/2019',
        updates: "-New offseason training screen \n-New slider presets (college, pro) \n-Community rosters can now be binded to a slider preset (college rosters automatically use college sliders) \n-New rebounding slider \n-Various bug fixes"
    },
    {
        date: '7/22/2019',
        updates: "-You can now save a franchise file at any point during the regular season \n-You can now turn off auto fill roster in the offseason \n-New splash screen"
    },
    {
        date: '7/16/2019',
        updates: "-You can now press and hold players or teams in list views to see a pop up of useful information, this will be useful when trying to quickly view data about a specific team or player \n-Added two new coaching sliders 'Scoring Focus' and 'Rebounding Focus'\n- You can now adjust coaching sliders in game (these are not permanent changes and only affect the current game) this is useful for mid-game adjustments"
    },
    {
        date: '7/14/2019',
        updates: "-offensive rebound overhaul \n-Over the air update notifications"
    },
    {
        date: '7/10/2019',
        updates: "-Can now import draft classes directly from franchise mode in the retirement stage \n-Added a reset sliders button in slider menu"
    },
    {
    date: '7/7/2019',
    updates: "-In college mode players can now graduate early \n-In college mode you can now export draft classes at the graduation stage in the offseason \n-Added a bit more randomness in the draft (busts, breakout players, etc)\n-Added player search menu"
},
{
    date: '7/4/2019',
    updates: "-Revamped save menu and save system \n-You can now name saves and delete them \n-Game autosaves a file called roster_autosave when editing roster files\n-Game autosaves the current franchises roster as franchise_autosave at beginning of each new season\n-You can now directly assign a created player to a team in the create a player menu"
},






]

export default class RecentUpdates extends React.Component {



    render() {
        return (

            <Background>
                <ScrollView style={{backgroundColor:'rgba(255,255,255,0)'}}>
                    {updateLog.map((update, i) => (
                       <View  style={{borderBottomWidth:0.5, padding:10}}>
                           <Text style={{fontSize: 20, color: 'black', fontFamily: 'advent-pro'}} >{update.date}</Text>
                           <Text style={{fontSize: 17, color: 'black', fontFamily: 'advent-pro'}}>{update.updates}</Text>
                       </View>

                    ))
                    }


                </ScrollView>
            </Background>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
