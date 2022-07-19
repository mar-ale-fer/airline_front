import { useState } from 'react';

import FlightsList from './FlightsList'
import FlightComments from './FlightComments';
import CommentCreatePage from './CommentCreatePage';
import { Grid, Typography } from '@mui/material';
import { GET_FLIGHT_COMMENTS_NEEDS_REFRESH_RV } from '../flights/operations/flightsCommentNeedUpdate_rv_query';
import { useQuery } from '@apollo/client';
const FlightsAndComments = () => {
  const { data:flightCommentsNeedsRefresh_RV } = useQuery(GET_FLIGHT_COMMENTS_NEEDS_REFRESH_RV);

  const [ flightId, setFlightId ] = useState(0)
  const [ flightName, setFlightName ] = useState('')
  const random = (Math.random().toString(36) as string ) + flightCommentsNeedsRefresh_RV.flightCommentsNeedsRefresh_RV

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
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom component="div">
                {flightName} comments 
              </Typography>              
            </Grid>
            <Grid item xs={12}>
              <FlightComments flightId={flightId} random={random}  />              
            </Grid>
            <Grid item xs={12}>
              <CommentCreatePage flightId={flightId} random={random}/>
            </Grid>
          </Grid>


        </Grid>
      </Grid>
    </>

  );
};

export default FlightsAndComments;