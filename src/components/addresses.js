import React, { Component } from 'react';

var address1 = ""
var address2 = ""
const GOOGLE_API_KEY = "AIzaSyCHGt6967ispOV3GgP_sG_np-07B9yYtBU"
const GOOGLE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"
var count = 0;
const formatAddress = (address) => {
    let exp = /[\/\\^$*+?()|[\]{}]/g;
    if (exp.test(address)){
      this.setState
    }
    let formattedAddress = address.split(" ").join("+");
    return formattedAddress;

}

class Addresses extends Component{
    constructor(props){
        super(props)
        this.state = {
            coordinate1:'',
            coordinate2: '',
            error : ""
        }
    }
    
    addAddress = (event) => {
        if(this.state.error !== ""){
            this.setState({
                error: ""
            })
        }
        if(event.target.id === "1"){
            address1 = event.target.value
        }else{
            address2 = event.target.value
        }
    }

    handleConfirm = (event) => {
        event.preventDefault()
        if(address1.trim() === "" || address2.trim() === ""){
            this.setState({
                error: "Either addresses cannot be empty"
            })
            return
        }
        this.getCoordinate(address1, 1)
        this.getCoordinate(address2, 2)
    }

    getCoordinate = (address, index) => {
        const formattedAddress = formatAddress(address)
        let url = `${GOOGLE_GEOCODE_URL}?address=${formattedAddress}&key=${GOOGLE_API_KEY}`
        fetch(url, {method: 'GET',})
        .then(response => response.json())
        .then(json => {
            if(json.status === "OK"){
                if(index === 1){
                    this.setState({
                        coordinate1 : json.results[0].geometry.location
                    },() => this.agencyChange())
                }else{
                    this.setState({
                        coordinate2 : json.results[0].geometry.location
                    },() => this.agencyChange())
                }
            }else{
                this.setState({
                    error: `Having trouble requesting coordinates of Address ${index}`
                })
            }
        })
    }

    agencyChange = () => {
        if(count%2 === 1){
            count = 0;
            this.props.agencyChange([this.state.coordinate1, this.state.coordinate2])
        }
        count++;
        //this.props.agencyChange()
    }
    
    render(){
        return(
        <div>
            <form className="form-control" >
                <label> Agency1 address
                    <input id="1" type="text" onChange={event => this.addAddress(event)}/>
                </label>
                <label> Agency2 address
                    <input id="2" type="text" onChange={event => this.addAddress(event)} />
                </label>
                <span><button className="btn btn-primary" onClick={event => this.handleConfirm(event)}>Confirm</button></span>
            </form>
            {this.state.error !== "" && 
                <div className="alert alert-danger">
                    <p>{this.state.error}</p>
                </div>
            }
        </div>

        )
    }
}

export default Addresses
