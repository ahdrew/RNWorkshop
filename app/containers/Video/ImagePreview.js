import React, {Component} from 'react';
import {View,Image,Text, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/video';
import Video from 'react-native-video';
import {Button} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import ViewShot from 'react-native-view-shot';

class ImagePreview extends Component {
    static navigationOptions = {
      title: 'Image Preview',
    };
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }

    

    saveImage= async ()=>{
        let uri = await this.refs.viewShot.capture();
        await CameraRoll.saveToCameraRoll(uri);
        // await CameraRoll.saveToCameraRoll(this.props.navigation.getParam('imgUri'))
    }


    render() {
        const uri = this.props.navigation.getParam('imgUri');
        const saveButton = <Button style={styles.previewButton} title={"Save"} onPress={this.saveImage.bind(this)}></Button>
      return (
        <View style={styles.container}>
            <ViewShot style={{width:'100%',flex:0, aspectRatio:3/4}}
             ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
            <Image
            style={styles.previewVideo}
            source={{uri:uri}}
            />
            <View style={{position:'absolute',justifyContent:'center',alignItems:'center',top:0}}>
                    <Image source={require('../../assets/images/frame.png')}/>
                    </View>
            </ViewShot>
            <View style={styles.previewPanel}>
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(ImagePreview);