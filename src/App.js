import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Grid, Segment, Header } from 'semantic-ui-react'
import axios from 'axios'

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Balance", field: "balance"
      }, {
        headerName: "Address", field: "address"
      }, {
        headerName: "Block", field: "block"
      }],
           rowData: this.getListings()
    }
  }
  
  getListings() {
  
    axios.get('https://api.helium.wtf/v1/accounts/rich?limit=20')
    .then((response) => {
      let rows = []
              for (const data in response) {
          
       rows.push(data)
        }
   
  return rows })
}

  componentDidMount () {
    this.getListings();
  }
  render() {
    
    return (
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={10}>
              <br />
              <Header>Helium$tats</Header>
              <Segment>
                <div 
                  className="ag-theme-balham"
                 
                >
                  <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                  </AgGridReact>
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default App;