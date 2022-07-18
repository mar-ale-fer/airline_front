import { useMutation } from '@apollo/client';
import { FLIGHT_DELETE } from './operations/FlightDeleteMutation';
import { flightsPageNeedsRefresh_RV } from '../../cache';

import EntityDelete from '../../components/common/EntityDelete';

 const FlightDelete = (props: { flightId: number; }) => {
  const [deleteFlight, { loading: deleting }] = useMutation(FLIGHT_DELETE);
  return <EntityDelete 
    entity="flight"
    entityId={props.flightId}
    deleting={deleting}
    entityDelete={deleteFlight}
    refresh={flightsPageNeedsRefresh_RV}
    goback="/flights"
  />
  }
  export default FlightDelete;