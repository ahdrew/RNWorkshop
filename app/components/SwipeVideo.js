import React, {Component} from 'react';
import {Animated,View,PanResponder,Dimensions,Text,StyleSheet} from 'react-native';
import styles from '../styles/video';
import Video from 'react-native-video';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.5 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;


class SwipeVideo extends Component {
    constructor(props){
        super(props);
        this.position = new Animated.ValueXY();
        this.panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gesture) => {
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                this.position.setValue({ x: gesture.dx, y: 0});
            },
            onPanResponderRelease: (evt, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                  this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                  this.forceSwipe('left');
                } else {
                  this.resetPosition();
                }
              }
        })

    }

    forceSwipe=(direction)=>{
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.position, {
          toValue: { x, y: 0 },
          duration: SWIPE_OUT_DURATION
        }).start();
      }
    resetPosition=()=>{
        Animated.spring(this.position, {
          toValue: { x: 0, y: 0 }
        }).start();
      }

    getStyle = ()=>{
        const {position} = this;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });
        return {
          ...position.getLayout(),
            transform: [{ rotate }],
            position:'absolute',
            width:'100%',
            height:'100%'
          };
    }

    getTextStyle = ()=>{
        const {position} = this;
        const opacity = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: [1, 0, 1]
        });
        return {
          ...StyleSheet.absoluteFill,opacity:opacity,
          alignItems:'center',
          justifyContent:'center',
          backgroundColor:'yellow'
        }
    }
    seek = (value)=>{
        this.player.seek(value);
    }
    render(){
        return (
            <View style={this.props.style}>
            <Animated.View style={this.getTextStyle()}>
              <Text style={{fontSize:40}}>Win</Text>
            </Animated.View>
            <Animated.View style={this.getStyle()}
            {...this.panResponder.panHandlers}>
            <Video
            ref={(ref) => {
                this.player = ref
              }} 
            source={this.props.source}
            style={{flex:1}}
            paused={this.props.paused}
            repeat={false}
            onEnd={this.props.onEnd}
            resizeMode="cover"
            ></Video>
            </Animated.View>
            </View>
        )
    }
}

SwipeVideo.propTypes = {
    source:PropTypes.object,
    paused: PropTypes.bool,
    onEnd: PropTypes.func,
    style: PropTypes.object
}

export default SwipeVideo