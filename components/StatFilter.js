import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CachedImage from './CachedImage';

var {height, width} = Dimensions.get('window');



export default class StatFilter extends React.Component {

    state={
        selectedTeam: this.props.selectedTeam,
        roster:this.props.selectedTeam.roster,
    }

    setFilter(filter){
        let filteredArray = [];
        if(filter === 'passing'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonAttempts>0 && ply.position === 0 ){
                    filteredArray.push(ply);
                }
            }
        }

        if(filter === 'rushing'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonRushAttempts>0){
                    filteredArray.push(ply);
                }
            }

            filteredArray.sort(function(a,b){
                if(a.seasonRushYards < b.seasonRushYards){
                    return 1;
                }
                if(a.seasonRushYards > b.seasonRushYards){
                    return -1;
                }
                return 0;
            })
        }

        if(filter === 'receiving'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonReceptions>0){
                    filteredArray.push(ply);
                }
            }

            filteredArray.sort(function(a,b){
                if(a.seasonYards < b.seasonYards){
                    return 1;
                }
                if(a.seasonYards > b.seasonYards){
                    return -1;
                }
                return 0;
            })
        }

        if(filter === 'defense'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonTackles>0){
                    filteredArray.push(ply);
                }
            }

            filteredArray.sort(function(a,b){
                if(a.seasonTackles < b.seasonTackles){
                    return 1;
                }
                if(a.seasonTackles > b.seasonTackles){
                    return -1;
                }
                return 0;
            })
        }

        if(filter === 'kicking'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonKicksAttempted>0 || ply.seasonPunts >0){
                    filteredArray.push(ply);
                }
            }

            filteredArray.sort(function(a,b){
                if(a.seasonKicksMade < b.seasonKicksMade){
                    return 1;
                }
                if(a.seasonKicksMade > b.seasonKicksMade){
                    return -1;
                }
                return 0;
            })
        }

        while(filteredArray.length>=150){
            filteredArray.pop();
        }
        
        this.props.setStatFilter(filteredArray);
    }

    render() {
        return (
                <View style={{ backgroundColor: 'rgba(255,255,255,0)', height:50, width:width, flexDirection:'row', justifyContent:'center', alignItems:'center', display:'flex'}}>
                    <TouchableOpacity  onPress={() => this.setFilter('passing')} style={{flex:1}}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Points</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('rushing')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Rebounds</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('receiving')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Receiving</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('defense')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Defense</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('kicking')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Kicking</Text>
                        </View>
                    </TouchableOpacity>

                    </View>
               
        )
    }
}

