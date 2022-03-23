import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Autocomplete } from "@react-google-maps/api"
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

import {Search,SearchIconWrapper,StyledInputBase} from "./StyledComp"


export default function Navbar({setCoordinates}) {

    const [autocomplete, setAutocomplete] = React.useState(null);

    const onLoad = (autoBot) => setAutocomplete(autoBot)

    const onPlaceChanged = () => {
        const shorter=autocomplete.getPlace().geometry.location
        const lat = shorter.lat();
        const lng = shorter.lng();
        setCoordinates({lat,lng});
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"  style={{ backgroundColor:"dodgerblue"}}>
                <Toolbar>
                    <Typography variant="h5" noWrap component="div"sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
                        TravelPartner
                        <AirplaneTicketIcon />
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }}/>
                        </Autocomplete>
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
