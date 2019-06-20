import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {selectedTeam} from '../data/script';
import CachedImage from './CachedImage';



class NavigationHeader extends React.Component {

    render() {
        return (
            <Header backgroundColor='rgba(0,0,0,0.75)'
                leftComponent={<TouchableOpacity onPress={() => Actions.reset('mainmenu')}><Icon name="home" color='white' ></Icon></TouchableOpacity>}
                centerComponent={{ text: "On Paper Sports Basketball 2020", style: { color: 'white', fontSize: 18, fontFamily: 'advent-pro' } }} 
                rightComponent={<TouchableOpacity>
                <CachedImage uri={selectedTeam.logoSrc} style={{height:30, width:30, resizeMode:'contain'}} />
                </TouchableOpacity>}/>
                
        )

    }
}

export default NavigationHeader;