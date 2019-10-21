// CameraView.js
import React, { Component } from "react";
import { requireNativeComponent } from 'react-native';


// MyApp.js


export default class CameraView extends Component {
    constructor() {
        super();
        this.state = {

        };
    }
    render() {
        return <CameraView style={{ flex: 1 }} />;
    }
}

// requireNativeComponent automatically resolves 'CameraView' to 'CameraViewManager'
module.exports = requireNativeComponent('CameraView');