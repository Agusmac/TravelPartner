import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';

import Navbar from "./components/Navbar/Navbar"
import InfoScroll from "./components/InfoScroll/InfoScroll"
import GogMap from "./components/GogMap/GogMap"
import getInfo from "./Api/Api"


export default function App({value}) {
    // { bgc: "#1e1e1e", col: "#ececec"}
    // const [theme, setTheme] = useState({ bgc: "white", col: "black" })
        const theme = { bgc: "white", col: "black" }
    // probably will add dark theme someday

    const [isLoading, setIsLoading] = useState(false)

    const [stars, setStars] = useState(0)
    const [type, setType] = useState("restaurants")

    const [data, setData] = useState([])
   

    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
    const [limits, setLimits] = useState({})


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() => {
        setIsLoading(true)
        const delayDebounceFn = setTimeout(() => {
            getInfo(type, limits)
                .then((data) => {
                    // console.log(data)
                    setData(data.filter(item => item.rating >= stars))
                    setIsLoading(false)
                })
        }, 300)

        return () => clearTimeout(delayDebounceFn)

    }, [type, limits,stars])


    

    return (
        <div style={{ backgroundColor: theme.bgc, color: theme.col, height: '100vh' }} >
            <Navbar setCoordinates={setCoordinates}/>
            <Grid container="true" spacing={3} style={{ marginTop: "0" }}>
                <Grid item="true" sm={12} md={4} style={{ background: theme.bgc, color: theme.col, height: '85vh', width: '100%', }}>
                    <InfoScroll 
                    data={data}
                    setType={setType} setStars={setStars} stars={stars}  type={type} isLoading={isLoading} />
                </Grid>
                <Grid item="true" sm={12} md={8} style={{ background: theme.bgc, color: theme.col, height: '85vh', width: '100%', }}>
                    <GogMap setLimits={setLimits} data={data} coordinates={coordinates} setCoordinates={setCoordinates} />
                </Grid>
            </Grid>
        </div>
    )}