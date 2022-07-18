import { useMutation } from '@apollo/client';
import { FLIGHT_CREATE } from './operations/FlightCreateMutation';
import { flightsPageNeedsRefresh_RV } from '../../cache';
import { FlightForm } from './FlightForm';

const initial_values={
  name : '',
  general : ''
}

const FlightCreatePage = () =>  {
  const [flightCreate, { loading }] = useMutation(FLIGHT_CREATE);

  return (
    <FlightForm 
      entityId=""
      initial_values={initial_values}
      operation={flightCreate}
      refresh={flightsPageNeedsRefresh_RV}
      goBack='/flights'
      loading={loading}
      button_label='Create Flight'
      apiReturnName='flightCreate'
    />
);};

export default FlightCreatePage;
