//const getCities = async () => { axios.get(url + 'cities').then(response => setCities(response.data.data))}

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTable,  useSortBy  } from "react-table";
import styled from 'styled-components'
import {
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableFooter,
    Label,
    Card,
    Select,
    Avatar,
    Badge,
    Pagination,
  } from '@windmill/react-ui'
  
export const CitiesTable = () => { 
    
    const Styles = styled.div`
  padding: 1rem;
  Table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`
    const columns = [
    {
      Header: "Name",
      accessor: "short_city",
    },
   
    {
      Header: "Country",
      accessor: "short_country",
    },
    {
        Header: "hotspots",
        accessor: "hotspot_count",
      },
      {
        Header: "Online Hotspots",
        accessor: "online_count",
      },
  ];
  const url = 'https://api.helium.wtf/v1/'
  const [cities, setCities] = useState([])
  const getCities =  () => { if (!data.length) {  axios.get(url + 'cities').then(response => setCities(response.data.data))} return cities }

  const data = cities
  const {
    getTableProps,
    getTableBodyProps,
    
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    autoResetHiddenColumns: false
  },
  useSortBy
  );


  useEffect(() => {
  const cityData = () => {
       getCities() }
       cityData()
       
   }, []
   );

  return (
      <Card>
    <div className="app">
    <div className="containers">
    <Table {...getTableProps()}>
    <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
    </div>
    </div>
    </Card>
  );    

    }

