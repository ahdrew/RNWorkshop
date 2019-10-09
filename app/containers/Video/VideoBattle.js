import React, {Component} from 'react';
import {View,Text,StyleSheet,Animated,TouchableOpacity} from 'react-native';
import styles from '../../styles/video';
import Video from 'react-native-video';
import {Button} from 'react-native-elements';
import PropTypes from 'prop-types';

class VideoBattle extends Component {
    static navigationOptions = {
      title: 'Video Battle',
    };
    constructor(props){
        super(props);
        this.state = {playing:false,startBattle: false,paused:true,paused2:true,loaded:false,loaded2:false,chooseOpacity:new Animated.Value(0),videoOpacity:new Animated.Value(0),videoStatus1:'pending',videoStatus2:'pending'}
    }
    componentDidMount(){
    }

    startBattle = ()=>{
      this.setState({...this.state,startBattle:true})
        // this.replayVideo();
    }
    // comp
    componentDidUpdate(){
      if(this.state.loaded && this.state.loaded2 && this.state.startBattle && !this.state.playing){
        this.setState({...this.state,playing:true})
        this.replayVideo();
      }
    }

    replayVideo = ()=>{
        this.setState({paused:false,paused2:false,playing:true,videoStatus1:'pending',videoStatus2:'pending'});
        this.state.videoOpacity.setValue(0)
        this.state.chooseOpacity.setValue(0);
        this.player.seek(0);
        this.player2.seek(0);
    }

    startChoose = ()=>{
      Animated.timing(this.state.chooseOpacity, {
        toValue: 1,
        duration: 250
      }).start();
      Animated.timing(this.state.videoOpacity, {
        toValue: 0.5,
        duration: 250
      }).start();
    }
    onSelectWinner=(index)=>{
      if(index == 1){
        this.setState({...this.state,paused:true,paused2:true,videoStatus1:'win',videoStatus2:'lose'})
      } else if (index == 2) {
        this.setState({...this.state,paused:true,paused2:true,videoStatus1:'lose',videoStatus2:'win'})
      }
      Animated.timing(this.state.videoOpacity, {
        toValue: 0.5,
        duration: 250
      }).start();
      this.props.onEnd();
    }


    render() {
        const replayButton = <Button style={styles.previewButton} title={"Replay"} onPress={this.replayVideo.bind(this)}></Button>
        const videoBg1 = this.state.videoStatus1 == 'pending' ? 'grey' : this.state.videoStatus1 == 'win' ? 'blue' : 'red';
        const videoBg2 = this.state.videoStatus2 == 'pending' ? 'grey' : this.state.videoStatus2 == 'win' ? 'blue' : 'red';
        const videoTxt1 = this.state.videoStatus1 == 'pending' ? 'Select' : this.state.videoStatus1 == 'win' ? 'Win' : 'Lose';
        const videoTxt2 = this.state.videoStatus2 == 'pending' ? 'Select' : this.state.videoStatus2 == 'win' ? 'Win' : 'Lose';
      return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.previewVideo,{}]}
              onPress={()=>{this.onSelectWinner(1)}}
              disabled={this.state.videoStatus1 !='pending'}
            >
              <Video 
              source={{uri:this.props.videoUri1}}
              ref={(ref) => {
                  this.player = ref
                }}  
              style={{flex:1,width:'100%'}}
              paused={this.state.paused}
              muted={true}
              repeat={true}
              resizeMode="cover"
              onReadyForDisplay={()=>{this.setState({...this.state,loaded:true})}}
              onLoad={()=>{}}
              />
              <Animated.View style={[StyleSheet.absoluteFill,{alignItems:'center',justifyContent:'center',opacity:this.state.videoOpacity,backgroundColor:videoBg1}]}>
                <Text style={{fontSize:40,fontWeight:'bold',color:'white'}}>{videoTxt1}</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.previewVideo}
              onPress={()=>{this.onSelectWinner(2)}}
              disabled={this.state.videoStatus2 !='pending'}
            >
                <Video
                source={{uri:this.props.videoUri2}}
                ref={(ref) => {
                    this.player2 = ref
                  }}  
                style={{flex:1,width:'100%'}}
                paused={this.state.paused2}
                repeat={true}
                muted={true}
                resizeMode="cover"
                onReadyForDisplay={()=>{this.setState({...this.state,loaded2:true})}}
                onLoad={()=>{}}
                />
                <Animated.View style={[StyleSheet.absoluteFill,{alignItems:'center',justifyContent:'center',opacity:this.state.videoOpacity,backgroundColor:videoBg2}]}>
                <Text style={{fontSize:40,fontWeight:'bold',color:'white'}}>{videoTxt2}</Text>
                </Animated.View>
            </TouchableOpacity>
            { this.state.videoStatus1 == 'pending' && 
            <Animated.View pointerEvents='none' style={{ position:'absolute',top: 0, left: 0, right: 0, bottom: 0,alignItems:'center',justifyContent:'center',opacity:this.state.chooseOpacity}}>
              <View style={{alignItems:'center',justifyContent:'center',width:100,height:100,backgroundColor:'yellow'}}>
              <Text>Choose</Text>
              </View>
            </Animated.View>
            }

            <View style={styles.previewPanel}>
            {replayButton}
            </View>
        </View>
      );
    }
}

VideoBattle.protoTypes = {
  videoUri1: PropTypes.string,
  videoUri2: PropTypes.string,
  onBattleStart: PropTypes.func,
  onBattleEnd: PropTypes.func
}
  
export default VideoBattle;