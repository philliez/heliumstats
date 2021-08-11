import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import axios from 'axios'

import { useTable,  useSortBy  } from "react-table";
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
  Pagination
} from '@windmill/react-ui'

const City = ({ match, location }) => {
    // const { params: { cityId } } = match;
    const { cityId } = useParams();

    const [page, setPage] = useState(1)
  const [cities, setCities] = useState([])
  const [selected, setSelected] = useState(['YWJpbGVuZXRleGFzdW5pdGVkIHN0YXRlcw'])
  const [cityStrings, setCityStrings] = useState([])  // pagination setup
  
  const [data, setData] = useState();

  

  const [selectedData, setSelectedData] = useState([]);
  const [cityData, setCityData] = useState([]);
  
  

  useEffect((cityId) => {
      const cityDataArray = []
    async function getD(cityId) {  
    await axios.get(`https://api.helium.io/v1/cities/${cityId}/hotspots`).then(response => cityDataArray.push(response.data));
     setCityData(cityDataArray)} 
  }  , [cityId]
   );


  return (
   
    
    
      <Card>
{cityId}
{JSON.stringify(cityData.data)}      </Card>
      )}
 
export default City
