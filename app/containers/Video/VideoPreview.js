import React, {Component} from 'react';
import {View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/video';
import Video from 'react-native-video';
import {Button} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';

class VideoPreview extends Component {
    static navigationOptions = {
      title: 'Video Preview',
    };
    constructor(props){
        super(props);
        this.state = {paused:false}
    }
    componentDidMount(){
    }

    replayVideo = ()=>{
        this.setState({paused:false});
        this.player.seek(0);
    }

    saveVideo= async ()=>{
        await CameraRoll.saveToCameraRoll(this.props.navigation.getParam('videoUri'));
    }


    render() {
        const uri = this.props.navigation.getParam('videoUri');
        const replayButton = <Button style={styles.previewButton} title={"Replay"} onPress={this.replayVideo.bind(this)}></Button>
        const saveButton = <Button style={styles.previewButton} title={"Save"} onPress={this.saveVideo.bind(this)}></Button>
      return (
        <View style={styles.container}>
            <Video
                source={{uri:uri}}
                ref={(ref) => {
                    this.player = ref
                  }}  
                style={styles.backgroundVideo}
                paused={this.state.paused}
                repeat={false}
                onEnd={()=>{this.setState({paused:true})}}
                resizeMode="stretch"
            />
            <View style={styles.previewPanel}>
            {replayButton}
            {saveButton}
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(VideoPreview);