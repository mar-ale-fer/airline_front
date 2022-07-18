import { useState } from 'react';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useParams } from "react-router-dom";
import { FLIGHT_BY_ID } from '../flights/operations/FlightByIdQuery';

import FlightsList from './FlightsList'
import FlightComments from './FlightComments';
import { Avatar, Grid, ListItem, ListItemAvatar, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const FlightsAndComments = () => {
  const [ flightId, setFlightId ] = useState(0)
  const [ flightName, setFlightName ] = useState('')
  const random = Math.random().toString(36) as string
  return (
    <>
      <Grid container>
        <Grid key='all_flights' item xs={6}>
          <Typography variant="h5" gutterBottom component="div">
          Flights
          </Typography>
          <FlightsList setFlightId = {setFlightId} setFlightName={setFlightName}/>
        </Grid>
        <Grid key='comments_in_flight' item xs={6}>
          <Typography variant="h5" gutterBottom component="div">
            {flightName} comments 
          </Typography>
          <FlightComments flightId={flightId} random={random}  />
        </Grid>
      </Grid>
    </>

  );
};

export default FlightsAndComments;