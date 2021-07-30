 import React, { useState, useEffect} from 'react'
 import axios from 'axios'

 export default function App() {
  const url = 'https://api.helium.wtf/v1/accounts/rich?limit=20'

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(url).then(response => setData(response.data.data))
  }, [])

  const renderTable = () => {
    return data.map(account => {
      return (
        <tr>
          <td>{account.balance}</td>
          <td>{account.address}</td>
            </tr>
      )
    })
  }

  return (
    <div>
      <h1 id="title">richest accts</h1>
      <table id="richest"> 
        <thead>
          <tr>
            <th>balance</th>
            <th>address</th>
         
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  )
}

