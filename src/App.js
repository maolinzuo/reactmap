import React, { Component } from 'react';
import Addresses from './components/addresses';
import Table from './components/table'
import Map from './components/mapWrapper'
import Utility from './utils/utility'


const GOOGLE_PLACES_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
const GOOGLE_API_KEY = "AIzaSyCHGt6967ispOV3GgP_sG_np-07B9yYtBU"
const RADIUS = 16093 // 10 miles
const TYPE = "real_estate_agency"
const idSet = new Set();

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
        agencies:[],
        selectedAgency:'',
        markers:[{},{},{}]
    }
    this.agencyChange = this.agencyChange.bind(this)
    this.agencyClicked = this.agencyClicked.bind(this)
  }
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=YOUR_API_KEY

  agencyChange = (coordinates) => {
    this.setState({
      coordinate1: coordinates[0],
      coordinate2: coordinates[1],
      markers :
        [{
            position:{
              lat: coordinates[0].lat,
              lng: coordinates[0].lng
            }
          },
          {
            position:{
              lat: coordinates[1].lat,
              lng: coordinates[1].lng
            }
          },
          {}
      ]
    
    })

    idSet.clear()
    Promise.all([this.getNearByAgencies(coordinates[0]), this.getNearByAgencies(coordinates[1])])
    .then((json) => {
      // if(json[0].status !== "OK"){
      //   alert('Error occurred when trying to get nearby agencies of address 1')
      // }else if(json[1].status !== "OK"){
      //   alert('Error occurred when trying to get nearby agencies of address 2')
      // }else{
        let agencies = [];
        agencies = json[0].map((agency) => {
                          idSet.add(agency.id)
                          agency["distanceToAgency1"] = Utility.calculateDistance(agency.geometry.location, this.state.coordinate1)
                          agency["distanceToAgency2"] = Utility.calculateDistance(agency.geometry.location, this.state.coordinate2)
                          agency["totalDistance"] = agency.distanceToAgency1 + agency.distanceToAgency2
                          return agency
                          })
        
        json[1].map((agency) => {
          if(idSet.has(agency.id)) return;
          agency["distanceToAgency1"] = Utility.calculateDistance(agency.geometry.location, this.state.coordinate1)
          agency["distanceToAgency2"] = Utility.calculateDistance(agency.geometry.location, this.state.coordinate2)
          agency["totalDistance"] = agency.distanceToAgency1 + agency.distanceToAgency2
          agencies.push(agency)
        })
        
        agencies = Utility.sort(agencies)
        
        this.setState({
          agencies: agencies
        })
    })
  
  }

  getNearByAgencies = (coordinate, index) => {
    //let url = `${GOOGLE_PLACES_URL}?location=${coordinate.lat},${coordinate.lng}&radius=${RADIUS}&type=${TYPE}&key=${GOOGLE_API_KEY}`
    let url = "http://localhost:3005/results"
    return fetch(url
      ,{
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000"
        }
      })
    .then(response => response.json())
  }


  agencyClicked = (agency) => {
    let markers = this.state.markers
    markers[3] = {
      position :{
        lat:agency.geometry.location.lat,
        lng: agency.geometry.location.lng,
      },
      icon:"http://localhost:3000/home_icon.png"
    }
    this.setState({
      selectedAgency: agency,
      markers: markers
    },)
  }
  render() {
    return (
      <div className="App">
        <Addresses agencyChange={this.agencyChange} />
        <Table agencies={this.state.agencies} agencyClicked={this.agencyClicked}/>
        <Map markers={this.state.markers} />
      </div>
    );
  }
}

export default App;
