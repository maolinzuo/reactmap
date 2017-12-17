import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Addresses from './components/addresses';
import Table from './components/table';
import Map from './components/mapWrapper';
import Header from './components/header'

import Utility from './utils/utility';

const RADIUS = 16093 // 10 miles
const TYPE = "real_estate_agency"
const idSet = new Set();
const URL = "https://fywszb86k8.execute-api.us-east-1.amazonaws.com/test"

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
    Promise.all(
      [this.getNearByAgencies(coordinates[0]), this.getNearByAgencies(coordinates[1])]
    )
    .then((response) => {
        console.log(response)
        let json = [JSON.parse(response[0]) ,JSON.parse(response[1])]
        if(json[0].status !== "OK"){
          alert(`Error of Address1: ${json[0].status}`)
        }else if(json[1].status !== "OK"){
          alert(`Error of Address2: ${json[1].status}`)
        }else{
        let agencies = [];
        let agencies1 = json[0].results.map((agency) => {
                          idSet.add(agency.id)
                          agency["distanceToAgency1"] = Utility.calculateDistance(agency.geometry.location, this.state.coordinate1)
                          agency["distanceToAgency2"] = Utility.calculateDistance(agency.geometry.location, this.state.coordinate2)
                          agency["totalDistance"] = agency.distanceToAgency1 + agency.distanceToAgency2
                          return agency
                          })
        let agencies2 = json[1].results.filter((agency) => {
          if(idSet.has(agency.id)) return;
          agency["distanceToAgency1"] = Utility.calculateDistance(agency.geometry.location, this.state.coordinate1)
          agency["distanceToAgency2"] = Utility.calculateDistance(agency.geometry.location, this.state.coordinate2)
          agency["totalDistance"] = agency.distanceToAgency1 + agency.distanceToAgency2
          return agency
         })
         agencies = agencies1.concat(agencies2);
          agencies.sort(function(a, b){
            return a.totalDistance - b.totalDistance
          })

        this.setState({
          agencies: agencies
        })
    }})
  }

  getNearByAgencies = (coordinate, index) => {
    return fetch(URL
      ,{
        method: 'POST',
        header:{
          "Content-Type":"application/json",
          "Allow-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
          lat: coordinate.lat,
          lng: coordinate.lng,
          radius: RADIUS,
          type: TYPE
        })
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
      icon:"http://reactmap.us-east-1.elasticbeanstalk.com/home_icon.png"
    }
    this.setState({
      selectedAgency: agency,
      markers: markers
    },)
  }
  render() {
    return (
      <div className="App">
        <center>
        <Header/>
          <Addresses agencyChange={this.agencyChange} />
        </center>
        <Grid>
          <Row>
            <Col xs={6} md={6}>
              <Map markers={this.state.markers} />
            </Col>
            <Col xs={6} md={6}>
              <Table agencies={this.state.agencies} agencyClicked={this.agencyClicked}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
