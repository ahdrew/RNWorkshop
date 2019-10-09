import React, {Component} from 'react';
import {View,Text,StyleSheet,Animated,TouchableOpacity,Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/video';
import Video from 'react-native-video';
import {Button, Icon} from 'react-native-elements';
import VideoBattle from './VideoBattle';
import Carosual from 'react-native-snap-carousel';

const SCREEN_WIDTH = Dimensions.get('window').width;
const vUri = "http://mirrors.standaloneinstaller.com/video-sample/dolbycanyon.mp4";
const vUri2 = "http://mirrors.standaloneinstaller.com/video-sample/grb_2.mp4";
class VideoTest extends Component {
    static navigationOptions = {
      title: 'Video Battle',
    };
    constructor(props){
        super(props);
        
        this.state = {showNext:false,index:0,battles: [{
          uri1:vUri,
          uri2:vUri2
      },{
          uri1:vUri,
          uri2:vUri2
      }]};
        this._items = [];
    }
    componentDidMount(){
      console.log("$$$$$$$$",this._items);
      setTimeout(() => {
        this._items[0].startBattle();  
      }, 500);
    }

    renderItem = ({item,index})=>{
        return (<VideoBattle ref={(v)=>{this._items[index] = v;}} videoUri1={item.uri1} videoUri2={item.uri2} onEnd={()=>{this.setState({...this.state,showNext:true})}}></VideoBattle>);
    }
    render() {
        return (
        <View style={{flex:1}}>
        <Carosual
            ref={(c) => { this._carousel = c; }}
            data={this.state.battles}
            renderItem={this.renderItem}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
            layout={'default'}
            scrollEnabled={false}
            onSnapToItem={(index)=>{this._items[index].startBattle()}}
        />
        {this.state.showNext && <Animated.View style={{ position:'absolute',top: 0, left: 0, right: 0, bottom: 0,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity 
              style={{alignItems:'center',justifyContent:'center',width:100,height:100,backgroundColor:'yellow'}}
              onPress={()=>{this._carousel.snapToNext(); this.setState({...this.state,showNext:false})}}
              >
              <Text>Again</Text>
              </TouchableOpacity>
            </Animated.View>}
            <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{position:'absolute',top:40,right:10,width:100,height:100}}>
              <Icon name='close' size={30}></Icon>
              </TouchableOpacity>
        </View>
        
      );
    }
}

mapStateToProps=(state)=> {
    return {
      app: state.app
    };
  }
  
  mapDispatchToProps=(dispatch)=>{
    return bindActionCreators(ActionCreators, dispatch);
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(VideoTest);