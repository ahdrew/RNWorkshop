import React, {Component} from 'react';
import { Text, TouchableOpacity,View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/video';
import {withNavigationFocus} from 'react-navigation';
import {RNCamera} from 'react-native-camera';
import {Button,Icon} from 'react-native-elements';
import moment from 'moment';

class VideoRecord extends Component {
    static navigationOptions = {
      title: 'Video Record',
    };
    constructor(props){
        super(props);
        this.state = {recording:false,startTime:null,timeDiff:'00:00'};
    }
    componentDidMount(){
    }

    takeVideo = async ()=>{
        this.setState({recording:true,startTime:moment()});
        this.timerId = setInterval(()=>{
            let duration = moment.utc(moment().diff(this.state.startTime)).format("mm:ss");
            this.setState({...this.state,timeDiff:duration});
        },1000)
        const { uri, codec = "mp4" } = await this.camera.recordAsync({quality:RNCamera.Constants.VideoQuality["480p"]});
        this.props.navigation.navigate('VideoPreview',{videoUri:uri});
    }
    stopRecording = ()=>{
        if(this.state.recording){
          this.camera.stopRecording();
          this.setState({recording:false,startTime:null,timeDiff:'00:00'});
          clearInterval(this.timerId);
        }
    }

    render() {
        const { isFocused } = this.props
        let button = <Button title='Record' onPress={this.takeVideo.bind(this)}></Button>
        if(this.state.recording)
            button = <Button title='Stop' onPress={this.stopRecording.bind(this)}></Button>
      return (
        <View style={styles.container}>
        {!isFocused && <View style={styles.preview}/>}
       {isFocused && <RNCamera 
            ref={ref => {
                this.camera = ref;
            }}
            style={styles.preview}
        ></RNCamera>}
         {this.state.recording && <View style={styles.timerBackground}>
            <Text style={styles.timerText}>{this.state.timeDiff}</Text>
            </View>}
        
        <View style={styles.capture}>
            {/* {button} */}
            <TouchableOpacity onLongPress={this.takeVideo.bind(this)} onPressOut={this.stopRecording.bind(this)}>
              <Icon name='radiobox-marked' color={this.state.recording ? 'red' : 'grey'} type='material-community' size={100}></Icon>
            </TouchableOpacity>
        </View>
        
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
  
  export default withNavigationFocus(connect(mapStateToProps,mapDispatchToProps)(VideoRecord));