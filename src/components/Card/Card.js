import * as React from 'react';
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card, CardActions, Button, CardContent, CardMedia, Typography, IconButton, Collapse, Rating, Box, Chip, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));


export default function TheCard({ place }) {
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    var el = document.querySelector('.lister');
    el.scrollTop = el.scrollHeight;

    setTimeout(function () {
      el.scrollTop = 0;
    }, 500);
  }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card id={place.location_id} sx={{ margin: "10px auto", width: "95%", minWidth: 120, }}>
      <CardMedia xs={12} md={4}
        component="img"
        height="auto"
        image={place.photo ? place.photo.images.large.url : "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"}
        alt={place.name}
      />
      <CardContent>

        <Typography gutterBottom variant="h5" component="div">{place.name}</Typography>
        {place.description && <Typography variant="body2" color="text.secondary">{place.description}</Typography>}

        {place.rating && place.num_reviews &&
          <Box display="flex" justifyContent="space-between">
            <Rating size="small" value={Number(place.rating)} readOnly />
            <Typography gutterBottom variant="subtitle1">Out of {place.num_reviews} reviews</Typography>
          </Box>}

        {place.ranking && <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
        </Box>}
        <br />

        {place.cuisine && <Stack direction="row" spacing={1}>
          {place.cuisine?.map((kitchen, i) => (
            <Chip key={i} label={kitchen.name} />
          ))}
        </Stack>}
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

          {place.address && <Typography variant="subtitle2" color="textSecondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><LocationOnIcon />{place.address}</Typography>}
          <br />
          {place.phone && <Typography variant="subtitle2" color="textSecondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><PhoneIcon />{place.phone}</Typography>}
        </CardContent>
        <CardActions spacing={1}  >
          {place.web_url && <Button size="small" onClick={() => window.open(place.web_url, '_blank')}>Trip Advisor</Button>}
          {place.website && <Button size="small" onClick={() => window.open(place.website, '_blank')}>website</Button>}
        </CardActions>
        <br />
      </Collapse>
    </Card>
  )}


