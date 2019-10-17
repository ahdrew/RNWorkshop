import React, {Component} from 'react';
import {Curve} from 'victory-native';
import {Marker, G, Defs, Path, Circle} from 'react-native-svg';

export default class CircleMarker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <G>
        <Defs>
          <Marker
            id="circle"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="8"
            markerHeight="8">
            <Circle cx="5" cy="5" r="2" fill="#2AE2A3" />
          </Marker>
        </Defs>
        <Curve
          {...this.props}
          pathComponent={<Path markerEnd="url(#circle)" />}
        />
      </G>
    );
  }
}
