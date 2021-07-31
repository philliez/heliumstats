 import React, { useState, useEffect} from 'react'
 import axios from 'axios'
 import {  Table, Card } from 'semantic-ui-react'


 export default function App() {
  const url = 'https://api.helium.wtf/v1/'

  const [richdata, setRichData] = useState([])
  const getRichest = () => { axios.get(url + 'accounts/rich?limit=20').then(response => setRichData(response.data.data))}

  useEffect(() => {
    getRichest()
   
  }, []);


  const renderTable = () => {
    return richdata.map(account => {
      return (
        <Table.Row>
          <Table.Cell>{account.balance}</Table.Cell>
                    <Table.Cell selectable><a href={ 'https://explorer.helium.com/accounts/' + account.address + '/' }>Account</a></Table.Cell>
            </Table.Row>
      )
    })
  }



  return (
    <Card>
      <Card.Content>
        <Card.Header>Richest Accts</Card.Header>
      
      <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>balance</Table.HeaderCell>
            <Table.HeaderCell>account</Table.HeaderCell>


         
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderTable()}</Table.Body>
      </Table>
    </Card.Content>
    </Card>
  )
}

