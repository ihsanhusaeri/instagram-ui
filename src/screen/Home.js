import React, {Component} from 'react'
import {Container, 
        Button, 
        Header, 
        Body, 
        Left, 
        Right,
        Icon, 
        Content
      } from 'native-base'
import {Image, Text, TouchableHighlight, StyleSheet,View, Dimensions, BackHandler} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import AwesomeIcon from 'react-native-vector-icons/AntDesign'
import Story from '../component/Story'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import CONSTANT from '../../Url'
import Post from'../component/Post'

export default class Home  extends Component{
  // static navigationOptions = {
  //   tabBarIcon : () =>{
  //     return <AwesomeIcon name='home' size={25}/>
  //   }
    
  // }
  constructor(){
    super()
    this.state = {
        url: "",
        caption:"",
        posts:[]
    }
  }  
  componentDidMount() {
    setInterval(() => {
      this.fetchAll()
    }, 500)
  }
  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  // }

  async fetchAll(){
    const token = await AsyncStorage.getItem('@token')
    // console.log(token)
    const config = {
        headers: { 
            Authorization: 'Bearer '+token 
        }
    }
    const rest = await axios.get(CONSTANT.URL+'api/v1/posts',config)
    .then(res => {this.setState({posts: res.data})})
    .catch(err => console.log(err))
    // console.log(this.state.posts)
  } 
  stories = [
    {uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg', name: 'Ilham', borderColor:'#d1cccc'},
    {uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg', name: 'Dedy', borderColor: '#d628cd'},
    {uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg', name: 'Rizal', borderColor: '#d1cccc'},
    {uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg', name: 'Ramadhan', borderColor: '#d628cd'},
    {uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg', name: 'Ridwan', borderColor: '#d1cccc'},
  ]
  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }
  navigateToAdd(post){
    url = post.url
    id = post.id
    caption = post.caption
    console.log(url)
    console.log(id)
    console.log(caption)
    this.props.navigation.navigate('Add', {
      id,url,caption
    })
  }
  render(){
    const uri = 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg'
    const image = '../../img/gunung.png'
        return(
          <Container style={styles.container}>
            <Header style={styles.header}>
              <Left style={{flexDirection: 'row', alignItems:'center'}}>
                <Button transparent dark>
                  <Icon type='SimpleLineIcons' name='camera'/>
                </Button>
                <Text style={{fontFamily:'Billabong', fontSize:20, top:5}}>Instagram</Text>
              </Left>
              <Right style={{flexDirection: 'row'}}>
                <Button transparent dark>
                  <Icon type='MaterialIcons' name='live-tv' size={30}/>
                </Button>
                <Button transparent dark>
                  <Icon type='FontAwesome' name='paper-plane-o' size={30}/>
                </Button>
                
              </Right>
            </Header>
            <Body style={styles.body}>
              <ScrollView showsVerticalScrollIndicator={false} 
              style={styles.verticalScrollView}>
                <ScrollView horizontal 
                  showsHorizontalScrollIndicator={false}>
                  <View style={styles.view}>
                    <TouchableHighlight style={ styles.imageContainerPertama }>
                    <Image style={ styles.image } source={require(image)} />
                      </TouchableHighlight>
                    <Icon type='AntDesign'name='pluscircleo' style={styles.iconPlus}/>
                    <Text style={styles.textYourStory}>Your Story</Text>
                  </View>
                  {this.stories.map((story,index) =>(
                      <Story uri={story.uri} name={story.name} borderColor ={story.borderColor} 
                      key={index}/> 
                  ))}
              </ScrollView>
              {this.state.posts.map(post => (
                <Post  
                  url={post.url} 
                  caption={post.caption} 
                  name={"Ihsan Husaeri"} 
                  key={post.id}
                  id={post.id}
                  page={()=>this.navigateToAdd(post)
                  }/>
                ))}
              </ScrollView>
            </Body>
          </Container>  
        )
    }
}
let styles = StyleSheet.create({
  container:{
    flex: 1,
    width: Dimensions.get('window').width
  },
  header:{
    flexDirection:'row', 
    backgroundColor: 'white', 
    borderBottomWidth:0.02,
    marginBottom:10
  },
  body:{
    flex:9
  },
  verticalScrollView:{
    width: Dimensions.get('window').width
  },
  image:{
    height: 64,
    width: 64,
    borderRadius: 40,
  },
  imageContainerPertama:{
    marginLeft: 15
  },
  view:{
    alignItems:'center', 
    justifyContent:'center'
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
