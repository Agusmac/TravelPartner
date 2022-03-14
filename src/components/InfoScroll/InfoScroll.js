import * as React from 'react';

import { Box, Typography, Select, FormControl, MenuItem, } from '@mui/material';
import TheCard from '../Card/Card';



export default function InfoScroll({ data, type, setType, isLoading, setStars, stars }) {

    return (
        <>
            <Box sx={{ minWidth: 120, padding: '0 25px' }}>
                <div >
                    <Typography variant="h4" component="h2">
                        Find what you were looking for...
                    </Typography>
                </div>
                <FormControl variant="standard" style={{ margin: "20px", minWidth: "130px", }}>

                    <Select value={type} label={type} onChange={(e) => setType(e.target.value)}>
                        <MenuItem value={"restaurants"}>Restaurants</MenuItem>
                        <MenuItem value={"hotels"}>Hotels</MenuItem>
                        <MenuItem value={"attractions"}>Attractions</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" style={{ margin: "20px auto", minWidth: "130px" }} >

                    <Select value={stars} label="Stars" onChange={(e) => setStars(e.target.value)}>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={3}>3 Stars</MenuItem>
                        <MenuItem value={4}>4 Stars</MenuItem>
                        <MenuItem value={4.5}>5 Stars</MenuItem>
                    </Select>
                </FormControl>

            </Box>
            {isLoading ?

                <div className="loader"></div>
                : (
                    <div container="true" spacing={3} className="lister">
                        {data?.map((place, i) => (
                            <div item="true" key={i} xs={12}>
                                <TheCard
                                    className="theCard"
                                    place={place} />
                            </div>
                        ))}
                    </div>)}
        </>
    )}


