import React, {Component} from 'react';
import { View, TouchableOpacity, Image, Text} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common'
import {Input,Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

class UserProfile extends Component {

	static navigationOptions = {
		title: 'User Profile',
	};

	constructor(props){
		super(props);
		this.state = {
			username:this.props.user.username,
			profilePicture: this.props.user.profilePicture,
		};
	}
	componentDidMount(){
	}
	componentDidUpdate(prevProps){
		if(prevProps.user.username != this.props.user.username)
			this.props.navigation.goBack();
	}

	loadImage = () => {
		ImagePicker.openPicker({
		  width: 100,
		  height: 100,
		  mediaType: 'photo',
		  cropping: true,
		  includeBase64: true,
		  cropperCircleOverlay: true,
		})
		  .then(photo => {
			console.log('user updateProfilePicture: ',photo);
			this.props.updateProfilePicture(photo);
			// this.setState({profilePicture: photo});
		  })
		  .catch(e => {
			console.log('user cancelled action: ', e.code);
		  });
	  };

	render() {
    return <View style={styles.container}>
		 {this.props.user.profilePicture ? (
          <TouchableOpacity onPress={this.loadImage}>
            <Image
              style={styles.profileImage}
              source={{
                uri: `data:${this.props.user.profilePicture.mime};base64,${
                  this.props.user.profilePicture.data
                }`,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.defaultProfileImage}
            onPress={this.loadImage}>
            <Text style={styles.uploadText}>Upload Profile Picture</Text>
          </TouchableOpacity>
        )}
    	<Input placeholder="Username" onChangeText={(text)=>{this.setState({username:text})}} value={this.state.username} ></Input>
		<Button title="Update" onPress={()=>{this.props.updateProfile({username:this.state.username})}}></Button>
    	</View>
    // return <MapView style={{ flex: 1 }} />;
  }
}

UserProfile.propTypes = {
	toggleLang: PropTypes.func,
	updateProfile: PropTypes.func
}

mapStateToProps=(state)=> {
  return {
	app: state.app,
	user: state.user
  };
}

mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);