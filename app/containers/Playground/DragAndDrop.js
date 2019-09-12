import React, {Component} from 'react';
import {View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common'
import Draggable from '../../components/Draggable';


class DragAndDrop extends Component {

	static navigationOptions = {
		title: 'Drag And Drop',
	};

	constructor(props){
		super(props);
	}
	componentDidMount(){
	}
	render() {
    return <View style={styles.container}>
    	<Draggable/>
        <Draggable/>
    	</View>
    // return <MapView style={{ flex: 1 }} />;
  }
}

DragAndDrop.propTypes = {
}

mapStateToProps=(state)=> {
  return {
    app: state.app
  };
}

mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(DragAndDrop);