import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import Home from './src/screen/Home'
import Profile from './src/screen/Profile'
import Search from './src/screen/Search'
import Add from './src/screen/Add'
import Love from './src/screen/Love'
import Post from './src/component/Post'
import AwesomeIcon from 'react-native-vector-icons/AntDesign'
// import { Icon } from 'native-base';
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const getTabBarIcon = (navigation, focused, tintColor) =>{
  const {routeName} = navigation.state

  let IconComponent = Icon
  let iconName
  if(routeName == 'Home'){
    iconName = 'home'
  }else if(routeName == 'Search'){
    iconName ='search'
  }else if(routeName == 'Add'){
    iconName = 'plus-square'
  }else if(routeName == 'Love'){
    iconName = 'heart'
  }else{
    iconName = 'user'
  }
  return <IconComponent name = {iconName} size = {25} color={tintColor}/>
}
const homeToAdd = createStackNavigator({
  Home: {screen:Home,
    navigationOptions:{
      header:null,
    }
  },
  Add:{screen: Add,
      navigationOptions:{
        header:null,
      }
    }
  },
{
  initialRouteName:'Home'
})
const TabNavigator = createBottomTabNavigator({
  Home: {screen: homeToAdd
    // navigationOptions:{
    //   tabBarIcon : () =>{
    //     return <AwesomeIcon name='home' size={25}/>
    //   }
    // }
  },
  Search: {screen: Search},
  Add: {screen: Add},
  Love: {screen:Love},
  Profile: {screen:Profile}
},{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ({focused, tintColor})=>
      getTabBarIcon(navigation, focused, tintColor)
  }),
    tabBarOptions: {
        activeTintColor: 'blue',
        inactiveTintColor: 'grey',
        showLabel: false
    }
  }
)
export default createAppContainer(TabNavigator)
