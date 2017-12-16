import _ from "lodash";
import React, { Component } from "react";
import MapComponent from './mapComponent';

const URL_GOOGLE_API = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHGt6967ispOV3GgP_sG_np-07B9yYtBU&v=3.exp&libraries=geometry,drawing,places";

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            markers : props.markers
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ markers: nextProps.markers }); 
    }


    render() {
        return (
          <div>
              <MapComponent
              googleMapURL={URL_GOOGLE_API}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ width:'100%', height: `600px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              markers={this.state.markers}
              onMarkerClick={this.handleMarkerClick}
              onMarkerClose={this.handleMarkerClose}/>
          </div>
        )
      }

}

export default Map;