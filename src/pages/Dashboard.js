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
import firebase from '../firestore'
import axios from 'axios'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Select,
  Label,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'

import { CitiesTable, Reacttable } from "../components/CitiesTable";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'

function Dashboard() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [cities, setCities] = useState([])
  const [selected, setSelected] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [cityStrings, setCityStrings] = useState([])  // pagination setup

  const url = 'https://api.helium.wtf/v1/'

  const [richdata, setRichData] = useState([])
  const [hotspots, setHotspots] = useState([])
  const getRichest = async () => { axios.get(url + 'accounts/rich?limit=20').then(response => setRichData(response.data.data))}
  const getCities = async () => { axios.get(url + 'cities').then(response => setCities(response.data.data))
cities.forEach(city => { firebase.firestore().collection('cities').doc(city.short_city).set(city)
  
}); }
  const handleChange = (event) => {
    setSelected(event.target.value)(selected => { axios.get(`https://api.helium.io/v1/cities/${selected}/hotspots`)
    .then(response =>  setSelectedData(response));
    return selectedData

  })}

  // // const [selectedCity, setSelectedCity] = useState('YWJpbGVuZXRleGFzdW5pdGVkIHN0YXRlcw')
  // // const getSelected = () => {const selectedUrl = ('https://api.helium.io/v1/cities/' + selected.key + '/hotspots'); 
  // //     axios.get(selectedUrl).then(response => setSelectedData(response.data.data)); 


  //   }

  useEffect(() => {
    // getRichest()
    getCities()
   
   
  }, []);

  const resultsPerPage = 20
  const totalResults = richdata.length
  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }
  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
     
     

    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])
 
   
      return (
        <div>

{ selected.length?
     <PageTitle>{`Stats for ${JSON.stringify(selectedData)}`}</PageTitle> 
     : 
       <PageTitle>Dashboard</PageTitle>  
}  
  


      {/* <!-- Cards --> **/}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Hotspots" value={selected.length}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Rewards" value={selected.data}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
{/* 
        <InfoCard title="New sales" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending contacts" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard> */}
      </div> 
  <Label className="mt-4">
  <span>Choose City</span>
  <p>{selectedData} </p>
  <div className="mt-3"><span>{selectedData.short_city}</span></div>
   <Select className="mt-1" value={selected} onChange={handleChange}>
   {cities.map((city, i) => (<option key={i} value={city.city_id}>{city.short_city}</option>))}
           
          </Select> 
        </Label>        
<CitiesTable />
      {/* <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>status</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>owner</TableCell>
            
            </tr>
          </TableHeader>
          <TableBody>
            {selectedData.map((hotspot, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    
                    <div>
                      <p className="font-semibold">{hotspot.status}</p>
                      
                    </div>
                  </div>
                </TableCell>
                 <TableCell>
                 <p className="font-semibold">{hotspot.owner}</p>                </TableCell>
                <TableCell>
                <p className="font-semibold">{hotspot.score}</p>
                </TableCell>
               {/* <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
               </TableContainer>*/}
      </div> 

      /* <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div> */    
  
      )}
export default Dashboard
