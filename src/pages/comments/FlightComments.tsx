import { useState, useEffect  } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { FLIGHT_BY_ID } from '../flights/operations/FlightByIdQuery';
import { CommentItem } from './CommentItem'
import { Grid } from '@mui/material';

const FlightComments = (props: { flightId: any, random: any }) =>  {
  const {
    flightId,
    random
  } = props
 
  const { data:dataflight } = useQuery(
    FLIGHT_BY_ID, 
    {variables: {
      flightByIdId: flightId,
      debug: random 
      }
  });
  if(dataflight && dataflight.flightById && dataflight.flightById.flight && dataflight.flightById.flight.comments
    && dataflight.flightById.flight.comments.length > 0) {
    console.log('comments')
    const Comments =  dataflight.flightById.flight.comments.map(( comment: any ) => (
      <Grid key={comment.id} item xs={12}>
        <CommentItem comment={comment}/>
      </Grid>
    ));
    return  <div>
      <Grid container>
        {Comments }      
      </Grid>
    </div>
  }

  return <div></div>
};

export default FlightComments;
