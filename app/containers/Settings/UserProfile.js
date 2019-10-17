import React, {Component} from 'react';
import { View, TouchableOpacity, Image, Text} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common'
import {Input,Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

import {VictoryLine, VictoryGroup} from 'victory-native';
import CircleMarker from './CircleMarker';


const CURRENT_POINTS = 2500;

const SILVER = 500;
const MID_GOLD = 1500;
const GOLD = 2000;
const MID_PREMIUM = 3000;
const PREMIUM = 3500;

const superPoints = [
  {x: 0, y: 0},
  {x: 10, y: 10},

  {x: 59, y: 59},
  {x: 159, y: 59},
  {x: 209, y: 109},
  {x: 309, y: 109},
  {x: 359, y: 159},
];

const initPoints = [{x: 0, y: 0}, {x: 10, y: 10}];

class UserProfile extends Component {

	static navigationOptions = {
		title: 'User Profile',
	};

	constructor(props){
		super(props);
		this.state = {
			username:this.props.user.username,
			profilePicture: this.props.user.profilePicture,
			chartData: initPoints,
			points: 0,
		};
	}
	componentDidMount(){
		this.loadCoordinates(CURRENT_POINTS);
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


  loadCoordinates = currentPoints => {
    let numberOfCoordinates = currentPoints / 10;
    let coordinates = initPoints;
    let points = 0;
    for (let i = 0; i < numberOfCoordinates; i++) {
      points += 10;
      coordinates = this.addPoints(points, coordinates);
    }
    this.setState({
      chartData: coordinates,
      points: currentPoints,
    });
  };

  addPoints = (newPoints, coordinates) => {
    let newCoordinates = [...coordinates];
    let lastCoordinate = newCoordinates[newCoordinates.length - 1];
    let newX = lastCoordinate.x,
      newY = lastCoordinate.y;

    if (
      // horizontal line
      (newPoints >= SILVER && newPoints < MID_GOLD) ||
      (newPoints >= GOLD && newPoints < MID_PREMIUM)
    ) {
      newX = lastCoordinate.x + 1;
    } else {
      newY = lastCoordinate.y + 1;
      newX = lastCoordinate.x + 1;
    }

    newCoordinates.push({x: newX, y: newY});
    return newCoordinates;
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

		
        <View style={styles.chartContainer}>
		
          <VictoryGroup domainPadding={50}>
            <VictoryLine
              style={{
                data: {
                  stroke: '#3F0F54',
                  strokeWidth: 5,
                },
              }}
              data={superPoints}
            />
            <VictoryLine
              animate={{
                duration: 1000,
                easing: 'exp',
              }}
              style={{
                data: {
                  stroke: '#2AE2A3',
                  // opacity: 0.5,
                  strokeWidth: 5,
                },
              }}
              data={this.state.chartData}
              dataComponent={<CircleMarker />}
            />
          </VictoryGroup>
		  <Text>Current Points: {this.state.points}</Text>
        </View>
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