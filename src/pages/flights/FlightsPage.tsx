import { flightsPageNeedsRefresh_RV } from '../../cache';
import {GET_FLIGHTSFILTERS_RV} from './operations/flightsFilters_rv_query'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { SxProps } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FlightCard } from './FlightCard';
import { FLIGHTS_QUERY } from './operations/FlightsQuery';
import FlightsFilters from './FlightsFilters';
import { Grid, Theme,  } from '@mui/material';
import { WithStyles, withStyles } from '@mui/styles';



const FlightsPage_ = (props : FlightsPageProps) => {
  const { classes } = props;
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

  const GoToCreateFlight = () =>{ 
    navigate('/flight-create');
  };

  console.log('-----FlightsPage')
  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data) return <p> There are no flights</p>;
  if (loading) return <p>Loading flights...</p>;
   const Cards =  data.flights.flights.map(( flight: any ) => (
      <Grid key={flight.id} item lg={4} sm={6} xs={12}>
        <FlightCard flight={flight}/>
      </Grid>
  ));
  return <div className={classes.root}>
      <Fab sx= {fabStyle_as_SxProps} 
          size="small" 
          color="secondary" 
          aria-label="add"
          onClick={GoToCreateFlight}
      >
        <AddIcon/>
      </Fab>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid key='flight_filters' item xs={12}>
          <FlightsFilters />
        </Grid>
        <Grid key='flight_cards' item xs={12}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {Cards }
          </Grid>          
        </Grid>
      </Grid>
    </div>
}

const fabStyle = {
  position: "absolute",
  bottom: 20,
  right: 20
};

const fabStyle_as_SxProps = fabStyle as SxProps;

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
});

interface FlightsPageProps extends WithStyles<typeof styles> {
  data? : any
}
export const FlightsPage = withStyles(styles)(FlightsPage_)