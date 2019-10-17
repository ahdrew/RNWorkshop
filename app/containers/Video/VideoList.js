import React, {Component} from 'react';

import {Text, SafeAreaView, View, Button, TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import Video from 'react-native-video';

import styles from '../../styles/video';

const testVideoAPI =
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';

class VideoList extends Component {
  static navigationOptions = {
    title: 'Video List',
  };

  constructor(props) {
    super(props);
    this.state = {
      downloadProgress: 0,
      tempPath: '',
    };
  }

  componentWillUnmount() {
    console.log('video list unmount');
    this.removeFile(this.state.tempPath);
  }

  render() {
    const loadFromWebButton = (
        <View style={styles.container}>
            <Text style={styles.progressText}>
            {this.state.downloadProgress > 0
                ? 'Loading...(' + this.state.downloadProgress + '%)'
                : ''}
            </Text>
            <TouchableOpacity
                style={{alignItems: 'flex-end', marginRight: 20}}
                onPress={this.loadFromWeb.bind(this)}>
            
                <Icon name="share" type="material-community" />
            </TouchableOpacity>
        </View>

     
    );

    return (
      <SafeAreaView style={styles.container}>
        {this.state.tempPath ? (
          <Video
            source={{uri: this.state.tempPath}}
            ref={ref => {
              this.player = ref;
            }}
            style={styles.backgroundVideo}
            repeat={false}
            resizeMode="stretch"
          />
        ) : <View style={styles.backgroundVideo}><Text>Click "Share button"</Text></View>}
        {/* <Text>{this.state.tempPath}</Text> */}
        {loadFromWebButton}
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{position:'absolute',top:40,right:10,width:100,height:100}}>
            <Icon name='close' size={30}></Icon>
        </TouchableOpacity>
      </SafeAreaView>
       
    );
  }

  loadFromWeb = () => {
    const {config, fs} = RNFetchBlob;
    const cacheDir = fs.dirs.CacheDir;
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      //   appendExt: 'mp4',
      path: cacheDir + '/dummyvideo.mp4',
    })
      .fetch('GET', testVideoAPI, {
        //some headers ..
      })
      .progress((received, total) => {
        console.log('progress', received / total);
        let progress = (received / total) * 100;
        this.setState({downloadProgress: progress.toFixed(2)});
      })
      .then(res => {
        // the temp file path
        console.log('The file saved to ', res.path());
        let shareUrl = res.path();
        if (Platform.OS === 'android') {
            shareUrl = 'file://' + res.path();
        }
        const shareOptions = {
          title: 'Share via',
          message: 'some message',
          url: shareUrl,
          //   social: Share.Social.FACEBOOK,
        };
        this.setState({downloadProgress: 0, tempPath: shareUrl});
        Share.open(shareOptions)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            err && console.log(err);
          });
      });
  };

  removeFile = path => {
    RNFetchBlob.fs
      .exists(path)
      .then(exist => {
        console.log(`file ${exist ? '' : 'not'} exists`);
        if (exist) {
          RNFetchBlob.fs.unlink(path).then(() => {
            console.log('File Removed');
          });
        }
      })
      .catch(error => {
        console.log('remove file error', error);
      });
  };
}

export default VideoList;
