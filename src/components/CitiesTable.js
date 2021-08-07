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

    function SubRows({ row, rowProps, visibleColumns, data, loading }) {
        if (loading) {
          return (
            <tr>
              <td/>
              <td colSpan={visibleColumns.length - 1}>
                Loading...
              </td>
            </tr>
          );
        }
      
        // error handling here :)
      
        return (
          <>
            {data.map((x, i) => {
              return (
                <tr
                  {...rowProps}
                  key={`${rowProps.key}-expanded-${i}`}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                      >
                        {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                          value:
                            cell.column.accessor &&
                            cell.column.accessor(x, i),
                          row: { ...row, original: x }
                        })}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </>
        );
      }
      
      
      const SubRowAsync =({ row, rowProps, visibleColumns }) => {
        const [loading, setLoading] = useState(true);
        const [data, setData] = useState([]);
      
        useEffect(() => {
          const timer = setTimeout(() => {
            setData(getCities);
            setLoading(false);
          }, 500);
      
          return () => {
            clearTimeout(timer);
          };
        }, []);
      
        return (
          <SubRows
            row={row}
            rowProps={rowProps}
            visibleColumns={visibleColumns}
            data={data}
            loading={loading}
          />
        );
      }
    
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
const data = cities
 
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

const renderRowSubComponent = React.useCallback(
  ({ row, rowProps, visibleColumns }) => (
    <SubRowAsync
      row={row}
      rowProps={rowProps}
      visibleColumns={visibleColumns}
    />
  ),
  []
);



  return (
      <Styles>
        <Table
          columns={columns}
          data={data}
          // We added this as a prop for our table component
          // Remember, this is not part of the React Table API,
          // it's merely a rendering option we created for
          // ourselves
          renderRowSubComponent={renderRowSubComponent}
        />
      </Styles>
    );
  const url = 'https://api.helium.wtf/v1/'
  const [cities, setCities] = useState([])
  const getCities =  () => { if (!data.length) {  axios.get(url + 'cities').then(response => setCities(response.data.data))} return cities }

  const {
    getTableProps,
    getTableBodyProps,
    
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    renderRowSubComponent,
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
          const rowProps = row.getRowProps();
          return (
            // Use a React.Fragment here so the table markup is still valid
            <React.Fragment key={rowProps.key}>
              <tr {...rowProps}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
              {/* We could pass anything into this */}
              {row.isExpanded &&
                renderRowSubComponent({ row, rowProps })}
            </React.Fragment>
          );
        })}
        </tbody> </Table>
    </div>
    </div>
    </Card>
  );    

      }