import React from 'react';

class Table extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            agencies:[],
            addresses: []
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({
            agencies: nextProps.agencies,
            addresses: nextProps.addresses
        })
    }

    render(){
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Total Distance to both Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.agencies.map((agency,index) => {
                            return(
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{agency.name}</td>
                                    <td>{agency.vicinity}</td>
                                    <td>{agency.totalDistance}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default Table
