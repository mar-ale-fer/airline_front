import { flightsPageNeedsRefresh_RV } from '../../cache';
import {GET_FLIGHTSFILTERS_RV} from '../flights/operations/flightsFilters_rv_query'
import Fab from '@mui/material/Fab';
import { SxProps } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FlightItem } from './FlightItem';
import { FLIGHTS_QUERY } from '../flights/operations/FlightsQuery';
import FlightsFilters from '../flights/FlightsFilters';
import { Grid } from '@mui/material';
const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

const fabStyle_as_SxProps = fabStyle as SxProps;

const FlightsList = (props : any) => {
  const {
    setFlightId,
    setFlightName
  } = props

  let navigate = useNavigate();
  const { data:flightsFiltersData } = useQuery(GET_FLIGHTSFILTERS_RV);

  const { data, loading, error } = useQuery(
    FLIGHTS_QUERY,
    {variables: {
      name: flightsFiltersData.flightsFilters_RV,
      debug: flightsPageNeedsRefresh_RV(),
      },
    // pollInterval: 5000,
    });

  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;

  if (loading) return <p>Loading flights...</p>;

  if ( data && data.flights && data.flights.flights) {
    const FlightItems =  data.flights.flights.map(( flight: any ) => (
      <Grid key={flight.id} item xs={12}>
        <FlightItem flight={flight} setFlightId={setFlightId} setFlightName={setFlightName}/>
      </Grid>
    ));
    return  <div>
      <FlightsFilters />
      <Grid container>
        {FlightItems }      
      </Grid>
    </div>
  }

  return <p> There are no flights</p>;
}

export default FlightsList