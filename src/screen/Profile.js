import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, TextInput} from 'react-native'
import AwesomeIcon from 'react-native-vector-icons/AntDesign'
import { Container, Left, Icon, Header, Right, Button, Thumbnail, Body, Card, CardItem, Row, Col, Content, Grid, Tabs, Tab, TabHeading } from 'native-base';
import { ScrollView, TouchableHighlight} from 'react-native-gesture-handler'
import axios from 'axios'
import Post from '../component/Post';
import AsyncStorage from '@react-native-community/async-storage'
import CONSTANT from '../../Url'

export default class Profile extends Component{
    // static navigationOptions = {
    //     tabBarIcon: ()=>{
    //         return <AwesomeIcon name="user" size={25}/>
    //     }
    // }

    constructor(){
        super()
        this.state = {
            url: "",
            caption:"",
            posts:[]
        }
    }
    componentDidMount(){
        this.fetchAll()
    }

    async fetchAll(){
        const token = await AsyncStorage.getItem('@token')
        console.log(token)
        const config = {
            headers: { 
                Authorization: 'Bearer '+token 
            }
        }
        const rest = await axios.get(CONSTANT.URL+'api/v1/posts',config)
        .then(res => {this.setState({posts: res.data})})
        .catch(err => console.log(err))
        console.log(this.state.posts)
    }
    
    
    render(){
        const image = '../../img/gunung.png'
        return(
            <Container style={{flex:1}}>
                <Header style={{backgroundColor: 'white'}}>
                    <Left style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:16,fontWeight:'bold', marginLeft:10}}>husaeri.ihsan
                        </Text>
                        <Button transparent dark>
                           <AwesomeIcon name='down' size={15}/>
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent dark>
                            <Icon type='FontAwesome' name='bars'/>
                        </Button>
                        <Button transparent dark>
                            <Icon type='FontAwesome' name='history'/>
                        </Button>
                    </Right>
                </Header>
                <Body style={{marginTop:10}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Left>
                            <Grid style={{alignItems:'center', justifyContent:'center'}}>
                                <Row>
                                    <Col style={{width:120, backgroundColor:'white'}}>
                                    <TouchableHighlight style={ styles.imageContainer }>
                                        <Image style={ styles.image } source={require(image)} />
                                    </TouchableHighlight>
                                    </Col>
                                    <Col style={{width:270, backgroundColor:'white'}}>
                                        <Row>
                                            <Col style={styles.columnNumber}>
                                                <Text style={styles.textColumnNumber}>6</Text>
                                            </Col>
                                            <Col style={styles.columnNumber}>
                                                <Text style={styles.textColumnNumber}>430</Text>
                                            </Col>
                                            <Col style={styles.columnNumber}>
                                                <Text style={styles.textColumnNumber}>23</Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={styles.column}>
                                                <Text style={{color:'#bbbcbf'}}>Posts</Text>
                                            </Col>
                                            <Col style={styles.column}>
                                                <Text style={{color:'#bbbcbf'}}>Followers</Text>
                                            </Col>
                                            <Col style={styles.column}>
                                                <Text style={{color:'#bbbcbf'}}>Following</Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button transparent dark block style={styles.buttonEdit}>
                                                    <Text style={{fontWeight:'bold'}}>
                                                        Edit Profile
                                                    </Text>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row style={{marginBottom:10}}>
                                    <Col style={{justifyContent:'center'}}>
                                        <Text style={styles.textName}>
                                            Ihsan Husaeri
                                        </Text>
                                    </Col>
                                </Row>
                                <Row width={400} marginTop={10}>
                                    <Tabs tabBarUnderlineStyle={true} style={styles.tabs}>
                                        <Tab heading={
                                            <TabHeading style={{backgroundColor:'white'}}>
                                                <Icon type='MaterialCommunityIcons' name='grid' style={{color:'black'}}/>
                                            </TabHeading>}>
                                            <Grid>
                                                <Row width={400}>
                                                    <Col width={100}>
                                                        <Image source={require(image)} style={styles.imageGrid}/>
                                                    </Col>
                                                    <Col width={100}>
                                                        <Image source={require(image)} style={styles.imageGrid}/>
                                                    </Col>
                                                    <Col width={100}>
                                                        <Image source={require(image)} style={styles.imageGrid}/>
                                                    </Col>
                                                </Row>
                                                
                                            </Grid>
                                        </Tab>
                                        <Tab heading={<TabHeading style={{backgroundColor:'white'}}>
                                            <Icon type='Ionicons' name='ios-square-outline' style={{color:'black'}}/>
                                        </TabHeading>} activeTabStyle={{borderColor:'blue', backgroundColor:'black'}}>
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                 {this.state.posts.map(post => (
                                                     <Post  url={post.url} caption={post.caption} name={"Ihsan Husaeri"} key={post.id}/>
                                                 ))}
                                                 
                                            </ScrollView>
                                        </Tab>
                                        <Tab heading={<TabHeading style={{backgroundColor:'white'}}>
                                            <Icon type='AntDesign' name='user' style={{color:'black'}}/>
                                        </TabHeading>}>
                                            <Grid>
                                                <Row width={400}>
                                                    <Col width={100}>
                                                        <Image source={require(image)} style={styles.imageGrid}/>
                                                    </Col>
                                                    <Col width={100}>
                                                        <Image source={require(image)} style={styles.imageGrid}/>
                                                    </Col>
                                                    <Col width={100}>
                                                        <Image source={require(image)} style={styles.imageGrid}/>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </Tab>
                                    </Tabs>
                                </Row>
                            </Grid>
                        </Left>
                    </ScrollView>
                </Body>
                {/* {this.state.posts.map((post) =>(
                    <PostComponentProfile key={post.id}
                        id={post.id}
                        delete={()=>this.handleDelete(post.id)}
                        name={post.name}
                        caption={post.caption}
                        url={post.url}/>

                ))} */}
            </Container>
        )
    }
}
let styles = StyleSheet.create({
    image:{
      height: 90,
      width: 90,
      borderRadius:60, 
      margin: 10
    },
    imageContainer2:{
      
    },
    imageGrid:{
        top:5,
        height: 130,
        width:130
    },
    imageSmall:{
        height: 35,
        width: 35,
        borderRadius: 21.8
    },
    column:{
        alignItems:'center',
        justifyContent:'center',
        padding:-25,
        margin:-20
    },
    buttonEdit:{
        width:250,
        height: 30,
        borderWidth:0.5,
        margin:10
    },
    textName:{
        fontWeight:'bold',
        left:20,
        color:'black'
    },
     textColumnNumber:{
        fontWeight:'bold',
        fontSize:16,
        color: 'black'
     },
     columnNumber:{
        alignItems:'center',
        justifyContent:'center',
        padding:-25,
        margin:-20
     },
     tabs:{
        borderBottomColor:'#caccbf',
        borderTopColor:'#caccbf',
        borderBottomWidth:1,
        borderTopWidth:1
     }
  })
  