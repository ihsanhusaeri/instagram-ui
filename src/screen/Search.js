import React, {Component} from 'react'
import AwesomeIcon from 'react-native-vector-icons/AntDesign'
import { View, Text } from 'native-base';

export default class Search extends Component{
    // static navigationOptions = {
    //     tabBarIcon: () =>{
    //         return <AwesomeIcon name='search1' size={25}/>
    //     }
    // }
    render(){
        return(
            <View>
                <Text>This is SearchScreen</Text>
            </View>
        )
    }
}