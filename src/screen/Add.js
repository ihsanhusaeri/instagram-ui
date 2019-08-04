import React, { Component } from 'react'
import AwesomeIcon from 'react-native-vector-icons/AntDesign'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Container, Footer, Button, Header, Body } from 'native-base';
import axios from 'axios'
import CONSTANT from '../../Url'

export default class Add extends Component {

  // static navigationOptions = {
  //   tabBarIcon: () => {
  //     return <AwesomeIcon name="plussquareo" size={25} />
  //   }

  // }
  constructor(){
    super()
    this.state={
      id: null,
      url: "",
      caption: "",
      posts: [],
      postText: "Post",
      editText: "Edit",
      
    }
  }
  
  componentDidMount(){
    const { navigation } = this.props;
    const idHome = navigation.getParam("id")
    const urlHome = navigation.getParam("url")
    const captionHome = navigation.getParam("caption")
    console.log(urlHome)
    this.setState({id:idHome, url:urlHome, caption:captionHome})

  }
  async handlePost() {
    const { url, caption } = this.state

    const rest = await axios.post(CONSTANT.URL+'api/v1/post/', {
      caption,
      url
    })

    if (rest) {
      this.setState({ url: "", caption: "" })
    }
  }
  async handleEdit(){
    const {id, url, caption} = this.state
    const rest = await axios.patch(CONSTANT.URL+'api/v1/post/'+id,{
      caption,
      url
    })
    if(rest){
      this.setState({id:null, url:"", caption:""})
    }
    this.props.navigation.navigate('Home')
  }
  render() {
    return (
      <Container style={styles.container}>

        <Body style={styles.body}>
          <View style={styles.view}>
            <TextInput
              placeholder="URL image"
              style={styles.textInput}
              onChangeText={(url) => this.setState({ url })}
              value={this.state.url} />
            <TextInput
              placeholder="Type caption..."
              style={styles.textInput}
              onChangeText={(caption) => this.setState({ caption })}
              value={this.state.caption} />
            <Button style={styles.buttonPost}
              onPress={this.state.id == null?() => this.handlePost():()=>this.handleEdit()}>
              <Text style={styles.textPost}>{this.state.id == null?this.state.postText:this.state.editText}</Text>
            </Button>
          </View>
        </Body>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {

  },
  header: {
    flex: 9,

    backgroundColor: 'red'
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {

    backgroundColor: 'white'
  },
  textInput: {
    borderWidth: 0.7,
    borderColor: "#73756a",
    backgroundColor: '#f9f9f4',
    width: 350,
    margin: 5,
    fontSize: 18,
    borderRadius: 5
  },
  buttonPost: {
    width: 350,
    margin: 10,
    backgroundColor: "#0f9cbf",
    borderRadius: 5,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textPost: {
    textAlign: 'center',
    color: 'white'
  },
  viewFooter: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})