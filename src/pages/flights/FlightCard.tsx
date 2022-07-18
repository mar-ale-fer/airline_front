import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import FlightDelete from './FlightDelete'

export function FlightCard( props : any) {
  return (
    <Card >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {props.flight.id}
        </Typography>
        <Typography variant="h6" component="h3">
          {props.flight.name}
        </Typography>
      </CardContent>
      <CardActions>
      <Link
          to={`/flight-update/${props.flight.id}/${Math.random().toString(36).replace(/[^a-z]+/g, '')}`}
          key={'flight_update_'+props.flight.id}
      >
        <Button size="small"><EditIcon /></Button>
      </Link>
      <FlightDelete flightId= {props.flight.id} />
      </CardActions>
    </Card>
  );
}