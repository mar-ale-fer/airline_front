import { Avatar, Grid, ListItem, ListItemAvatar } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';

export function FlightItem( props : any) {
  const {
    flight,
    setFlightId,
    setFlightName
  } = props
  return (
      <ListItem
      key = {`flight_item_${flight.id}`}
      onClick={(e)=> {
        console.log(`flightId:${flight.id}`)
        setFlightId(flight.id)
        setFlightName(flight.name)
      }}
    >
      <ListItemAvatar>
        <Avatar>
          <FlightIcon />
        </Avatar>
      </ListItemAvatar>
      {flight.name}
    </ListItem>
  );
}