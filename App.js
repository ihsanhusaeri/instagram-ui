/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Navigation from './Navigation'; 
import Login from './src/screen/Login';
 
 const RootStack = createStackNavigator({
  Login: {screen:Login,
  navigationOptions:{
    header:null
  }
  },
  Navigation: {screen:Navigation,
    navigationOptions:{
      header:null
    }
  }
 },
 {
   initialRouteName: 'Login'
 }
 );
 const  AppContainer = createAppContainer(RootStack)

 export default class App extends Component{
   render(){
     return <AppContainer/>
   }
 }
 
 