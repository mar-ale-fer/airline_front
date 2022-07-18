import { useState, useEffect  } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { FLIGHT_BY_ID } from './operations/FlightByIdQuery';
import { FLIGHT_UPDATE } from './operations/FlightsUpdateMutation';
import { flightsPageNeedsRefresh_RV } from '../../cache';
import { FlightForm } from './FlightForm';

const FlightUpdatePage = () =>  {
  const { entityid, random } = useParams()
  const [flightUpdate, { loading }] = useMutation(FLIGHT_UPDATE);

  const { data:dataflight } = useQuery(
    FLIGHT_BY_ID, 
    {variables: {
      flightByIdId: entityid,
      debug: random  //path for update data
      }
  });

  const [s_initivalvalue, sets_initialvalue] = useState({
    name:'',
    general: ''
  })

  useEffect(() => {
    if(dataflight && dataflight.flightById && dataflight.flightById.flight) {
      const initial_values={
          name: dataflight.flightById.flight.name,
          general:''
      } 
      sets_initialvalue(initial_values);
    }
  },[dataflight])

  return (
    <FlightForm 
      entityId={entityid as string}
      initial_values={s_initivalvalue}
      operation={flightUpdate}
      refresh={flightsPageNeedsRefresh_RV}
      goBack='/flights'
      loading={loading}
      button_label='Update flight'
      apiReturnName='flightUpdate'
    />

)};

export default FlightUpdatePage;
