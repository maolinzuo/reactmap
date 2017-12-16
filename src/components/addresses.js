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

const inputStyle ={
    padding: "10px"
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
        Promise.all([this.getCoordinate(address1)
            ,this.getCoordinate(address2)])
        .then(json => {
            if(json[0].status !== "OK"){
                this.setState({
                    error: `Having trouble requesting coordinates of Address 1`
                })
            }
            else if(json[1].status !== "OK"){
                this.setState({
                    error: `Having trouble requesting coordinates of Address 2`
                })
            }else{
                this.setState({
                    coordinate1 : json[0].results[0].geometry.location,
                    coordinate2 : json[1].results[0].geometry.location
                })
            }
        })
        .then(() => {
            console.log(this.state.coordinate1);
            console.log(this.state.coordinate2);
            this.props.agencyChange([this.state.coordinate1, this.state.coordinate2])
        })
    }

    getCoordinate = (address) => {
        const formattedAddress = formatAddress(address)
        let url = `${GOOGLE_GEOCODE_URL}?address=${formattedAddress}&key=${GOOGLE_API_KEY}`
        return fetch(url, {method: 'GET',})
            .then(response => response.json())
    }
    
    render(){
        return(
        <div>
            <form className="form-group form-group-lg" >
                <label style={inputStyle}> Address1 &nbsp;
                    <input id="1" type="text" onChange={event => this.addAddress(event)}/>
                </label>
                <label style={inputStyle}> Address2 &nbsp;
                    <input id="2" type="text" onChange={event => this.addAddress(event)}  />
                </label>
                <button className="btn btn-default btn-sm" onClick={event => this.handleConfirm(event)} >Confirm</button>
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
