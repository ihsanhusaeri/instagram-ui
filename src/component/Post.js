import React, {Component} from 'react'
import {Button, 
  Body, 
  Card, 
  CardItem, 
  Left, 
  Right, 
  Icon, 
  Thumbnail, 
  Col, 
  Grid, 
  Row} from 'native-base'
import {Image, 
  Text, 
  StyleSheet,
  View, 
  Alert} from 'react-native'
import {TextInput } from 'react-native-gesture-handler'
import Dialog, {DialogContent} from 'react-native-popup-dialog'
import {Navigation} from 'react-native-navigation'
import axios from 'axios'
import CONSTANT from '../../Url'
export default class Post extends Component{
    
    
    constructor(){
      super()
      this.state={
        visible:false
      }
    }
    
    handleDelete(id){
      this.confirm(id)
    }
    confirm(id){
      Alert.alert(
        'Delete Post',
        'Do you want to proceed?',
      [
        {text: 'No', onPress:()=> null, style: 'cancel'},
        {text:'Yes', onPress:()=> this.deletePost(id)}
      ]

      )
    }
    async deletePost(id){
      const rest = await axios.delete(CONSTANT.URL+'api/v1/post/'+id)
    }
    handleEdit(){
      this.props.page()
    }
    render(){
      const {url, caption, name, id} = this.props
      const image = '../../img/mask.png'
        return(
          <View>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={require(image)}
                    style={styles.imageSmall} />
                  <Body>
                    <Text style={{fontWeight:'bold'}}>Ihsan Husaeri</Text>
                    <Text note>Purwakarta</Text>
                  </Body>
                </Left>
                <Right>
                  <Button transparent
                  onPress={()=>{
                    this.setState({visible:true})
                  }}>
                    <Icon type="FontAwesome" name="ellipsis-v" style={{color:'black'}}/>
                  </Button>
                </Right>
              </CardItem>
              <CardItem cardBody>
              {/* <Text style={{fontSize: 50}}></Text> */}
              <Image source={{uri:url}} style={styles.imagePosted}/>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent dark>
                    <Icon type='FontAwesome' name='heart-o' size={35}/>
                  </Button>
                  <Button transparent dark>
                    <Icon type='FontAwesome' name='comment-o' size={25}/>
                  </Button>
                  <Button transparent dark>
                    <Icon type='FontAwesome' name='paper-plane-o' size={25}/>
                  </Button>
                </Left>
                <Right>
                  <Button transparent dark>
                    <Icon type='FontAwesome' name='bookmark-o' size={25}/>
                  </Button>
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.boldText}>200 likes</Text>
                  <Text>
                    <Text style={styles.boldText}>{name} </Text> {caption}
                  </Text> 
                  <Text style={{color:'#bbbcbf'}}>View all 99 comments</Text> 
                  <Text>
                    <Text style={styles.boldText}>
                      greenslank
                    </Text>Wiih ikut dong ke LM
                  </Text>
                  <Grid style={{marginTop:5}}>
                    <Row>
                      <Col style={{width:40, backgroundColor: 'white'}}>
                        <Thumbnail source={require(image)}
                          style={styles.imageSmall} />
                      </Col>
                      <Col style={styles.colComment}>
                        <TextInput style={{color: '#bbbcbf'}} placeholder='Add a comment...'>
                        </TextInput>
                      </Col>
                    </Row>
                  </Grid>
                </Body>
              </CardItem>
            </Card>
            <Dialog
              style={{alignItems:'flex-start', justifyContent:'flex-start'}}
              visible={this.state.visible}
              onTouchOutside={()=>{
                this.setState({visible:false})
              }}
            >
              <DialogContent style={{height:100, width:200, alignItems:'flex-start',justifyContent:'flex-start', }}>
                <Button full transparent
                  style={styles.buttonDialog}
                  onPress={()=>{
                    this.setState({visible:false})
                    this.handleEdit()
                  }}
              >
                <Text style={styles.boldText}>Edit</Text>
                </Button>
                <Button full transparent
                  style={styles.buttonDialog}
                  onPress={()=>{
                    this.handleDelete(id)
                    this.setState({visible:false})
                  }}>
                  <Text style={styles.boldText}>Delete</Text>
                </Button>
              </DialogContent>
          </Dialog>
          </View>
          
        )
    }
}
let styles = StyleSheet.create({
    imageSmall:{
      height: 35,
      width: 35,
      borderRadius: 21.8
    },
    boldText:{
      fontWeight: 'bold'
    },
    colComment:{
      width:300, 
      backgroundColor: 'white', 
      bottom:6
    },
    imagePosted:{
      height: 300,
      flex: 1
    },
    buttonDialog:{
      justifyContent:'flex-start',
      alignItems:'flex-start',
      textAlign: 'left',
      backgroundColor:'white'
    }


  })