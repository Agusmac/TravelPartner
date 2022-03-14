import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Autocomplete } from "@react-google-maps/api"
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';


const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto"
    }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    }
}));

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
