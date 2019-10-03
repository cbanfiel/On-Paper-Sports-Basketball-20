import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CachedImage from './CachedImage';
import { POS_PG, POS_SG, POS_SF, POS_PF, POS_C } from '../data/script';

var {height, width} = Dimensions.get('window');



export default class PositionFilter extends React.Component {

    state={
        roster:this.props.roster,
    }

    setFilter(filter, filter2){
        if(filter2 == null){
            filter2 = filter;
        }

        let filteredArray = [];
        if(filter === 'all'){
            this.props.setPositionFilter(this.props.roster, this.props.team);
            return;
        }

        if(filter === 'picks'){
            this.props.setPositionFilter(this.props.draftPicks, this.props.team);
            return;
        }



            for(let i=0; i<this.props.roster.length; i++){
                let ply = this.props.roster[i];
                if(ply.position >= filter && ply.position<= filter2){
                    filteredArray.push(ply);
                }
            }

      
        
        this.props.setPositionFilter(filteredArray, this.props.team);
    }

    render() {
        return (
                <View style={{ backgroundColor: 'rgba(255,255,255,0)', height:50, width:width, flexDirection:'row', justifyContent:'center', alignItems:'center', display:'flex'}}>
                    <TouchableOpacity  onPress={() => this.setFilter('all')} style={{flex:1}}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>ALL</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => this.setFilter(POS_PG)} style={{flex:1}}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>PG</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter(POS_SG)}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>SG</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter(POS_SF)}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>SF</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter(POS_PF)}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>PF</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter(POS_C)}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>C</Text>
                        </View>
                    </TouchableOpacity>
{
    this.props.draftPicks != null?(

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('picks')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>PICKS</Text>
                        </View>
                    </TouchableOpacity>
    ): null

}

                    </View>
               
        )
    }
}

