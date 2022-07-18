import { useState, useEffect  } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { FLIGHT_BY_ID } from '../flights/operations/FlightByIdQuery';
import { ADD_COMMENT_TO_FLIGHT } from '../flights/operations/addCommentToFlight';
import { flightsPageNeedsRefresh_RV } from '../../cache';
import { CommentItem } from './CommentItem'
import { Grid } from '@mui/material';

const FlightComments = (props: { flightId: any, random: any }) =>  {
  const {
    flightId,
    random
  } = props

  const [addCommentToFlight, { loading }] = useMutation(ADD_COMMENT_TO_FLIGHT);

  const { data:dataflight } = useQuery(
    FLIGHT_BY_ID, 
    {variables: {
      flightByIdId: flightId,
      debug: random  //path for update data
      }
  });
  console.log(dataflight)
  if(dataflight && dataflight.flightById && dataflight.flightById.flight && dataflight.flightById.flight.comments
    && dataflight.flightById.flight.comments.length > 0) {
    console.log('comments')
    const Comments =  dataflight.flightById.flight.comments.map(( comment: any ) => (
      <Grid key={comment.id} item xs={12}>
        <CommentItem comment={comment}/>
      </Grid>
    ));
    console.log(Comments)
    return  <div>
      <Grid container>
        {Comments }      
      </Grid>
    </div>
  }

  return <div></div>
};

export default FlightComments;
