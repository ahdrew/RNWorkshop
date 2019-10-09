import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/video';
import { withNavigationFocus } from 'react-navigation';
import { RNCamera } from 'react-native-camera';
import { Header } from 'react-native-elements';


class QrScanner extends Component {
  static navigationOptions = {
    title: 'QrScanner'
  };
  constructor(props) {
    super(props);
    this.state = { result: "" };
    this.onSuccess = this.onSuccess.bind(this);
  }
  componentDidMount() {
  }
  onSuccess = (e) => {
    this.setState({ result: e.data });
  }

  render() {
    const { isFocused } = this.props
    return (
      <View style={styles.container}>
        <Header barStyle="light-content" 
        containerStyle={{backgroundColor:'white'}} 
        leftComponent={{icon:'close',onPress:()=>{this.props.navigation.goBack()}}}
        centerComponent={{text:'QrScanner',style:{fontWeight:'bold'}}}/>
        {isFocused && <RNCamera style={styles.preview}
          onBarCodeRead={(e) => { console.log(e.data); this.setState({ result: e.data }) }}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        ></RNCamera>}
        <View style={styles.previewPanel}>
          <Text >{this.state.result}</Text>
        </View>

      </View>
    );
  }
}

mapStateToProps = (state) => {
  return {
    app: state.app
  };
}

mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(QrScanner));