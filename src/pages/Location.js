import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Geocode from 'react-geocode'
import { Input, HelperText, Card, Text, Label, Button, Select, Textarea } from '@windmill/react-ui'

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
                <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <p>{JSON.stringify(zone)}</p>
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
