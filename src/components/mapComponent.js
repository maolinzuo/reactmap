import React from "react";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MapComponent = compose(
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={13} defaultCenter={{ lat: 30.2672, lng: -97.7431 }}>
      {props.markers.map((marker, index) => {
        return(
          <div key={index}>
            <Marker
                  {...marker}>
            </Marker>
          </div>
        )
      
      })}
    </GoogleMap>
  
  ));
  
export default MapComponent;