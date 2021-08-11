import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Geocode from 'react-geocode'
import { Input, HelperText, Card, Text, Label, Select, Textarea } from '@windmill/react-ui'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Button,
    Pagination,
} from '@windmill/react-ui'

import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import {
    doughnutOptions,
    lineOptions,
    barOptions,
    doughnutLegends,
    lineLegends,
    barLegends,
} from '../utils/demo/chartsData'
import InfoCard from '../components/Cards/InfoCard'

function Charts() {

    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [fetched, setFetched] = useState(false)
    const [result, setResult] = useState([])
    const [zone, setZone] = useState([])
    const resultsPerPage = 10
    function goGet() {
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                setLat(response.results[0].geometry.location.latitude)
                setLng(response.results[0].geometry.location.longitude)
            },
            (error) => {
                console.error(error);
            }
        );
    }
    function onPageChangeTable1(p) {
        setPageTable1(p)
    }

    const [pageTable1, setPageTable1] = useState(1)
    const onChange = async (event) => {
        Geocode.setApiKey("AIzaSyAYpI33CT22RGi_jtlMpFiRZ8kCwSSYtBI");

        await Geocode.fromAddress(event.target.value)
            .then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    setResult(response.results[0].geometry.location)
                    setLat(response.results[0].geometry.location.lat)
                    setLng(response.results[0].geometry.location.lng)
                },
                (error) => {
                    console.error(error);
                }
            )
    }
    const totalResults = zone.length
    useEffect(() => {
        setDataTable1(zone.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
    }, [pageTable1])
    const [dataTable1, setDataTable1] = useState([])

    const nearbyHotspots = async (lat, lng) => {
        await axios.get(`https://api.helium.wtf/v1/hotspots/location/distance/?lat=${result.lat}&lon=${result.lng}&distance=3000`)
            .then(response => setZone(response))
        setFetched(true)
        return
    }


    if (!fetched)
        return (

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <p>enter location</p>
                <Input className="mt-1" placeholder="Address" onChange={onChange} />
                <p>{lat},{lng}</p>
                <Button onClick={nearbyHotspots}>Show Hotspots</Button>

            </div>)
    else return (
        <>
            <PageTitle>Locations</PageTitle>
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <Input className="mt-1" placeholder="Address" onChange={onChange} />
                <p>{lat},{lng}</p>
                <Button onClick={nearbyHotspots}>Show Hotspots</Button>


            </div>
            <div className="grid gap-6 mb-8 md:grid-cols-2">
                <TableContainer className="mb-8">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>location</TableCell>
                                <TableCell>status</TableCell>
                                <TableCell>date</TableCell>
                                <TableCell>address</TableCell>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {dataTable1.map((hotspot, i) => (
                                <TableRow key={i}>

                                    <TableCell>
                                        <span className="text-sm">{hotspot.location}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{hotspot.status.online}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{new Date(hotspot.status.timestamp).toLocaleDateString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{hotspot.address}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TableFooter>
                        <Pagination
                            totalResults={totalResults}
                            resultsPerPage={resultsPerPage}
                            onChange={onPageChangeTable1}
                            label="Table navigation"
                        />
                    </TableFooter>
                </TableContainer>
                <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <p>{JSON.stringify(zone.data)}</p>
                </div>
                {/* <ChartCard title="Lines">
                    <Line {...lineOptions} />
                    <ChartLegend legends={lineLegends} />
                </ChartCard>

                <ChartCard title="Bars">
                    <Bar {...barOptions} />
                    <ChartLegend legends={barLegends} />
                </ChartCard> */}
            </div>
        </>
    )
}

export default Charts
