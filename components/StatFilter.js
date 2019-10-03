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
        if(filter === 'points'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonPoints>0){
                    filteredArray.push(ply);
                }
            }
        }

        if(filter === 'rebounds'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonRebounds>0){
                    filteredArray.push(ply);
                }
            }

            filteredArray.sort(function(a,b){
                if(a.seasonRebounds < b.seasonRebounds){
                    return 1;
                }
                if(a.seasonRebounds > b.seasonRebounds){
                    return -1;
                }
                return 0;
            })
        }

        if(filter === 'fg'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonPoints>0){
                    filteredArray.push(ply);
                }
            }

            filteredArray.sort(function(a,b){

                let afg = Math.floor((((a.seasonTwoPointersMade / a.seasonTwoPointersAtt) + (a.seasonThreePointersMade / a.seasonThreePointersAtt)) / 2) * 100);
                let bfg = Math.floor((((b.seasonTwoPointersMade / b.seasonTwoPointersAtt) + (b.seasonThreePointersMade / b.seasonThreePointersAtt)) / 2) * 100);


                if(afg < bfg){
                    return 1;
                }
                if(afg > bfg){
                    return -1;
                }
                return 0;
            })
        }

        if(filter === '3pt'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonPoints>0){
                    filteredArray.push(ply);
                }
            }

            filteredArray.sort(function(a,b){

                let afg = Math.floor((a.seasonThreePointersMade / a.seasonThreePointersAtt) * 100)
                let bfg = Math.floor((b.seasonThreePointersMade / b.seasonThreePointersAtt) * 100)


                if(afg < bfg){
                    return 1;
                }
                if(afg > bfg){
                    return -1;
                }
                return 0;
            })
        }

        if(filter === 'ft'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonPoints>0){
                    filteredArray.push(ply);
                }
            }

            filteredArray.sort(function(a,b){

                let afg = Math.floor((a.seasonFreeThrowsMade / a.seasonFreeThrowsAttempted) * 100);
                let bfg = Math.floor((b.seasonFreeThrowsMade / b.seasonFreeThrowsAttempted) * 100)


                if(afg < bfg){
                    return 1;
                }
                if(afg > bfg){
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
                    <TouchableOpacity  onPress={() => this.setFilter('points')} style={{flex:1}}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Points</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('rebounds')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Rebounds</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('fg')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>FG%</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('3pt')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>3PT%</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('ft')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>FT%</Text>
                        </View>
                    </TouchableOpacity>

                    </View>
               
        )
    }
}

