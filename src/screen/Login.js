import React, {Component} from 'react'
import {Container, Button, Text, Card, CardItem, Body, Icon, Footer, Picker, Form, Content} from 'native-base'
import {StyleSheet, View, TextInput} from 'react-native'
import AwesomeIcon from 'react-native-vector-icons/AntDesign'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import CONSTANT from '../../Url'
import Navigation from '../../Navigation'


export default class Login extends Component{
    
  state = {
    email: "",
    password: "",
    response: [],
    textWrong:""
  }
  async handleLogin(){
    console.log(CONSTANT.URL + 'api/v1/login')
    const email = this.state.email
    const password = this.state.password
    const rest = await axios.post(CONSTANT.URL+'/api/v1/login', {
      email,
      password
    })
    .then(res => {
      this.setState({response: res.data})
    })
    .catch(err => {console.log(err)})
    
    
    if(this.state.response.token != undefined){
      await AsyncStorage.setItem('@token', this.state.response.token)
      this.navigateToRoute()
    }else{
      this.setState({textWrong: "Wrong email or password"})
      await AsyncStorage.setItem('@token', undefined)
    }
  }
  navigateToRoute(){
    this.props.navigation.navigate('Navigation')
  }

  render(){
    const placeholderEmail = "Phone number, username, or email"
    const placehholderPassword = "Password"
      return(
        <Container style={{flex:1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <Card style={styles.card}>
            <Text style={{color:'#92938d'}}>English (United States)
              <AwesomeIcon name='down' size={15}/>
            </Text>
            <Text style={styles.textLogo}>Instagram</Text>
            <CardItem style={{flex:9}}>
              <Body style={styles.body}>
                <TextInput placeholder={placeholderEmail}
                  style={styles.textInput} 
                  value={this.state.email} 
                  onChangeText = {(email) => this.setState({email})}/>
                <TextInput placeholder={placehholderPassword} 
                  style={styles.textInput}secureTextEntry={true}
                  onChangeText={(password) => this.setState({password})} 
                  value={this.state.password}/>
                <Text style={styles.textWrong}>{this.state.textWrong}</Text>
                <Button block style={styles.buttonLogin}
                  onPress={() => this.handleLogin()}>
                    <Text uppercase={false} style={{fontSize:20}}>Log in</Text>
                </Button>
                <View style={{flexDirection:'row'}}>
                  <View style={styles.lineLeft}/>
                    <Text style={styles.textOR}>
                      OR
                    </Text>
                 <View style={styles.lineRight}/>
                </View>
                
              </Body>
            </CardItem>
            <View style={styles.viewLoginWith}>
              <Icon type='FontAwesome' 
              name='facebook-square' 
              style={styles.iconFacebook}/>
              <Text style={styles.textLogin}>
                Log in with Facebook
              </Text>
            </View>
            <Text style={styles.textForgot}>Forgot password?</Text>
          
          </Card>
          <Footer style={{backgroundColor:'#f7f7f7'}}>
          <Card style={styles.cardFooter}>
            <CardItem cardBody 
              style={styles.cardItem}>
              <Text style={{fontSize:20}}>Don't have an account?
                <Text style={{color:"blue", fontSize:20}}>Sign up</Text>
              </Text>
            </CardItem>
          </Card> 
          </Footer>
        </ScrollView>
      </Container>
    )
  }
}
let styles = StyleSheet.create({
    body:{
      justifyContent:"center", alignItems:"center"
    },
    textLogo:{
      fontFamily:'Billabong',
      fontSize:65,
      marginTop:80
    },
    card:{
      flex:9, 
      justifyContent:"center", 
      alignItems:"center",
      flexDirection:'column'
    },
    cardItem:{
      justifyContent:"center",
      alignItems:"center"
    },
    textInput:{
      borderWidth:0.7, 
      borderColor:"#73756a",
      backgroundColor:'#f9f9f4', 
      width:350, 
      margin:5, 
      fontSize:18, 
      borderRadius:5
    },
    buttonLogin:{
      width:350, 
      margin:10, 
      backgroundColor:"#0f9cbf",
      marginTop:30,
      borderRadius:5
    },
    lineRight:{
        borderBottomWidth: 1.5,
        borderColor: '#bac1c1',
        width:130,
        marginLeft:20,
        bottom:20,
        
    },
    lineLeft:{
      borderBottomWidth: 1.5,
      borderColor: '#bac1c1',
      width:130,
      marginRight:20,
      bottom:20
    },
    iconFacebook:{
      marginRight:10, 
      color:'blue',
      bottom:15

    },
    viewLoginWith:{
      flexDirection:'row',
      marginTop: 30
    },
    textLogin:{
      color:'#1a3f7a',
      fontSize:20,
      bottom:15
    },
    textForgot:{
      fontSize:18,
      color:'#1a3f7a', 
      marginTop:30,
      bottom: 15
    },
    textOR:{
      margin:5, 
      marginTop:20, 
      fontSize:20, color:'grey', 
      fontWeight:'bold'
    },
    cardFooter:{
      flex:1,
      justifyContent:'center', 
      alignItems:'center', 
      marginTop:5,
      bottom:15
    },
    textWrong:{
      color: 'red',
      fontSize: 14,
      right: 90
    }
})