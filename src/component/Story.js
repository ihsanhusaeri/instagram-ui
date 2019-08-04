import React, {Component} from 'react'
import {View, Image, TouchableHighlight, StyleSheet, Text} from 'react-native'

export default class StoryComponent extends Component{
  render(){
    const {uri, name} = this.props
    const image = '../../img/triangle.png'
    return(
      <View style={styles.view}>
        <TouchableHighlight style={ styles.imageContainer }>
          <Image style={styles.image} source={require(image)} />
        </TouchableHighlight>
        <Text style={styles.textName}>{name}</Text>
      </View>
    )
  }
}

let styles = StyleSheet.create({
    view:{
      alignItems: 'center',
      justifyContent: 'center'
    },
    image:{
      height: 64,
      width: 64,
      borderRadius: 40,
      padding: 5
    },
    imageContainer:{
      marginLeft: 20,
      height: 73,
      width: 73,
      borderRadius: 42,
      borderColor: '#f230e8',
      borderWidth:3,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent:'center'
    },
    textName:{
      left: 10,
      color: 'black'
    },
    imageContainerPertama:{
      marginLeft: 15
    },
    image:{
      height: 64,
      width: 64,
      borderRadius: 40,
    },
    textYourStory:{
      left:8,
      color:'black'
    },
    iconPlus:{
      backgroundColor:'blue', 
      color: 'white',
      fontSize:15, 
      position: 'absolute', 
      top: 47, 
      left: 67, 
      borderRadius:10
    }
  })
  