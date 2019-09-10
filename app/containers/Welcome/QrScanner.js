import React, {Component} from 'react';
import { Text, TouchableOpacity,View,StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common';
import {withNavigationFocus} from 'react-navigation';
import {RNCamera} from 'react-native-camera';


class QrScanner extends Component {
    static navigationOptions = {
      title: 'QrScanner',
    };
    constructor(props){
        super(props);
        this.state = {result:""};
        this.onSuccess = this.onSuccess.bind(this);
    }
    componentDidMount(){
    }
    onSuccess(e){
        this.setState({result:e.data});
    }

    render() {
        const { isFocused } = this.props
      return (
        <View style={localstyles.container}>
        {isFocused && <RNCamera style={localstyles.preview}
            onBarCodeRead={(e)=>{console.log(e.data); this.setState({result:e.data})}}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        ></RNCamera>}
        <View style={{flex:1,justifyContent:'center'}}>
        <Text style={styles.buttonText}>{this.state.result}</Text>
        </View>
        
        </View>
      );
    }
}

const localstyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    preview: {
      flex: 2,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });

function mapStateToProps(state) {
    return {
      app: state.app
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
  }
  
  export default withNavigationFocus(connect(mapStateToProps,mapDispatchToProps)(QrScanner));