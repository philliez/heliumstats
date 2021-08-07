import React, { useState, useEffect } from 'react'

import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import axios from 'axios'

import { useTable,  useSortBy  } from "react-table";
import styled from 'styled-components'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  Card,
  TableRow,
  TableFooter,
  Select,
  Label,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'

import { CitiesTable, Reacttable } from "../components/CitiesTable";

function City(match) {
    const [page, setPage] = useState(1)
  const [cities, setCities] = useState([])
  const [selected, setSelected] = useState(['YWJpbGVuZXRleGFzdW5pdGVkIHN0YXRlcw'])
  const [cityStrings, setCityStrings] = useState([])  // pagination setup
  const columns = [
    {
      Header: "Rewards",
      accessor: "rewards",
    },
   
    {
      Header: "ID",
      accessor: "hotspot_id",
    },
    
  ];
  const [data, setData] = useState();
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

     const {
    params: { cityId },
  } = match;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState([])
  
  

  useEffect((selected, selectedCity) => {
    axios.get('https://api.helium.io/v1/cities/' + cityId + '/hotspots').then(response => selectedCity.push(response.data.data)); setSelectedData(selectedData) 
   }, [cityId]
   );


  return (
    <>
      <PageTitle>Charts</PageTitle>
      {!isLoading && (
      <Card>
     <CitiesTable />

      </Card>
      )}
    </>
  )
}

export default City
