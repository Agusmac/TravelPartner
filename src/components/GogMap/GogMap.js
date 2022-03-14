import React from "react";
import GoogleMapReact from "google-map-react";

import { Rating } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';


export default function GogMap({ coordinates, setCoordinates, setLimits, data }) {

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
            center={coordinates}
            defaultZoom={14}
            margin={[50, 50, 50, 50]}
            options={""}
            onChange={(e) => {
                setLimits({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                setCoordinates({ lat: e.center.lat, lng: e.center.lng })
            }}>
            {data?.map((place, i) => (
         
                <div className="InsideDiv"
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}
                >
                    <Paper
                        onClick={() => {
                            document.getElementById(`${place.location_id}`).scrollIntoView({ behavior: "smooth", block: "start" })
                        }}
                        style={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'left', width: '130px' }}
                    >
                        <CardMedia
                            component="img"
                            height="60px"
                            image={place.photo ? place.photo.images.large.url : "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"}
                            alt={place.name}
                        />
                        <Typography gutterBottom variant="subtitle" component="div">{place.name}</Typography>
                        <Rating size="small" value={Number(place.rating)} readOnly />
                    </Paper>
                </div>
            ))}
        </GoogleMapReact>
    )}