 import React, { useState, useEffect} from 'react'
 import axios from 'axios'
 import { List, Table, Card } from 'semantic-ui-react'


 export default function App() {
  const url = 'https://api.helium.wtf/v1/accounts/rich?limit=20'

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(url).then(response => setData(response.data.data))
  }, [])

  const renderTable = () => {
    return data.map(account => {
      return (
        <Table.Row>
          <Table.Cell>{account.balance}</Table.Cell>
          <Table.Cell>{account.address}</Table.Cell>
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
            <Table.HeaderCell>address</Table.HeaderCell>
         
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderTable()}</Table.Body>
      </Table>
    </Card.Content>
    </Card>
  )
}

