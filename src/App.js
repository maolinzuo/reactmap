import React, { Component } from 'react';

import Addresses from './components/addresses'

const GOOGLE_PLACES_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
const GOOGLE_API_KEY = "AIzaSyCHGt6967ispOV3GgP_sG_np-07B9yYtBU"
const RADIUS = 16093
const TYPE = "real_estate_agency"
var times = 0;

class App extends Component {
  constructor(){
    super()
    this.state = {
        coordinate1: {
          lat: '',
          lng: ''
        },
        coordinate2: {
          lat: '',
          lng: ''
        },
        agencies1:[],
        agencies2:[]
    }
    this.agencyChange = this.agencyChange.bind(this)
  }
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=YOUR_API_KEY

  agencyChange = (coordinates) => {
    console.log(coordinates)
  }

  getNearByAgencies = (coordinate, index) => {
    console.log(coordinate)
    //let url = `${GOOGLE_PLACES_URL}?location=${coordinate.lat},${coordinate.lng}&radius=${RADIUS}&type=${TYPE}&key=${GOOGLE_API_KEY}`
    let url = "http://localhost:3005/results"
    // fetch(url
    //   ,{
    //     method: 'GET',
    //     headers: {
    //       "Access-Control-Allow-Origin": "http://localhost:3000"
    //     }
    //   })
    // .then(response => response.json())
    // .then(json => console.log(json))
  }


  render() {
    return (
      <div className="App">
        <Addresses agencyChange={this.agencyChange}/>
      </div>
    );
  }
}

export default App;
