import React, {Component} from 'react';
import { Text, TouchableOpacity,View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/video';
import {withNavigationFocus} from 'react-navigation';
import {RNCamera} from 'react-native-camera';
import {Button,Icon} from 'react-native-elements';
import ZoomView from '../../components/ZoomView';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import Orientation from 'react-native-orientation-locker';

class VideoRecord extends Component {
    static navigationOptions = ({navigation})=>{
      return {
      title: 'Video Record',
      headerLeft:(
        <View style={{marginLeft:10}}><Icon  name="close" type="material-community" onPress={()=>{navigation.navigate('Tab')}}></Icon></View>
      )
    }};
    constructor(props){
        super(props);
        this.state = {recording:false,startTime:null,timeDiff:'00:00',zoom:0,type: 'back',orientation: '',};
    }
    componentDidMount(){
      Orientation.getDeviceOrientation(deviceOrientation => {
        this.setState({orientation: deviceOrientation});
      });
  
      Orientation.lockToPortrait(); // needed for iOS
      Orientation.addDeviceOrientationListener(this._orientationDidChange);
  
    }

    componentWillUnmount() {
      Orientation.unlockAllOrientations();
      Orientation.removeDeviceOrientationListener(this._orientationDidChange);
    }

    _orientationDidChange = orientation => {
      this.setState({orientation: orientation});
    };

    flipCamera = () =>{
    console.log('flipcamera');
    this.setState({
      type:
        this.state.type ===  'back'
          ? 'front'
          : 'back',
    });
    
    }
    loadVideo = () => {
      ImagePicker.openPicker({
        mediaType: 'video',
        includeBase64: true,
      }).then(video => {
        if (video.width > video.height) {
          this.props.navigation.navigate('VideoPreview', {videoUri: video.path});
        } else {
          alert('Please select landscape video');
        }
      }).catch(e => {
        console.log('user cancelled action: ');
      });
    };


    isPortrait = () =>
    this.state.orientation === 'PORTRAIT' ||
    this.state.orientation === 'PORTRAIT-UPSIDEDOWN' ||
    this.state.orientation === 'UNKNOWN'
      ? true
      : false;


    takeVideo = async ()=>{
        this.setState({...this.state,recording:true,startTime:moment()});
        this.timerId = setInterval(()=>{
            let duration = moment.utc(moment().diff(this.state.startTime)).format("mm:ss");
            this.setState({...this.state,timeDiff:duration});
        },1000)
        const { uri, codec = "mp4" } = await this.camera.recordAsync({orientation:'landscapeLeft'});
        this.props.navigation.navigate('VideoPreview',{videoUri:uri});
    }
    stopRecording = ()=>{
        if(this.state.recording){
          this.camera.stopRecording();
          this.setState({...this.state,recording:false,startTime:null,timeDiff:'00:00'});
          clearInterval(this.timerId);
        }
    }

    takeImage = async ()=>{
        const {uri } = await this.camera.takePictureAsync({orientation:'portrait',fixOrientation:true});
        this.props.navigation.navigate('ImagePreview',{imgUri:uri});
    }

    render() {
        const { isFocused } = this.props
        let button = <Button title='Record' onPress={this.takeVideo.bind(this)}></Button>
        if(this.state.recording)
            button = <Button title='Stop' onPress={this.stopRecording.bind(this)}></Button>

      const loadButton = (
        <TouchableOpacity
          onPress={this.loadVideo.bind(this)}
          style={styles.previewButton}>
          <Icon name="insert-photo" size={35} color="grey" />
        </TouchableOpacity>
      );


      const containerStyle = [styles.container];
      if (this.isPortrait()) {
        containerStyle.push(styles.overlay);
      }

      return (
        <View style={containerStyle}>
        {!isFocused && <View style={styles.preview}/>}
       {isFocused && 
       <ZoomView style={styles.preview} 
       onZoomProgress={progress=>{
         this.setState({...this.state,zoom:progress})
       }}
       onZoomStart={()=>{console.log("#####onZoomStart")}}
       onZoomEnd={()=>{console.log("#####onZoomEnd")}}
       >
       <RNCamera 
            ref={ref => {
                this.camera = ref;
            }}
            type={this.state.type}
            style={styles.preview}
            zoom={this.state.zoom}
            defaultVideoQuality={RNCamera.Constants.VideoQuality["480p"]}
        ></RNCamera>
        </ZoomView>
        }
         {this.state.recording && <View style={styles.timerBackground}>
            <Text style={styles.timerText}>{this.state.timeDiff}</Text>
            </View>}
        {this.isPortrait() ? (
          <View style={styles.landscapeContainer}>
            <Text style={styles.landscapeText}>
              Please record video in landscape
            </Text>
          </View>
        ) : null}
        <View style={styles.capture}>
            {loadButton}
            {/* {button} */}
            <TouchableOpacity  disabled={this.isPortrait()} onPress={this.takeImage.bind(this)} onLongPress={this.takeVideo.bind(this)} onPressOut={this.stopRecording.bind(this)}>
              <Icon name='radiobox-marked' color={this.state.recording ? 'red' : 'grey'} type='material-community' size={70}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.isPortrait()}
              onPress={this.flipCamera}
              style={[styles.flipButton, styles.previewButton]}>
              <Icon name="refresh" size={35} color="grey" />
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