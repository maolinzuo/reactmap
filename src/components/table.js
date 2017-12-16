import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class Table extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            agencies:[],
        }
        this.agencyClicked = this.props.agencyClicked.bind(this)
        this.options = {
                onRowDoubleClick : function(row){
                    this.handleClick(row)
                }.bind(this)
            }
        }
    

    componentWillReceiveProps(nextProps){
        this.setState({
            agencies: nextProps.agencies
        })
    }

    handleClick = (agency) => {
        this.agencyClicked(agency)
    }

    render(){
        return (
        <div>
            <BootstrapTable
                data={ this.state.agencies }
                pagination
                options={this.options }>
                <TableHeaderColumn dataField='name' isKey>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='vicinity'>Address</TableHeaderColumn>
                <TableHeaderColumn dataField='totalDistance'>Total Distance(m)</TableHeaderColumn>
            </BootstrapTable>
      </div>
        )
    }

}

export default Table
