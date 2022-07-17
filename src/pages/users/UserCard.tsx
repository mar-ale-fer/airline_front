import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import UserDelete from './UserDelete'
import UserChangePassword from './UserChangePassword';
import { Grid } from '@mui/material';

export function UserCard( props : any) {
  return (
      <Card >
        <Grid container>
          <Grid item xs={12}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {props.user.email}
              </Typography>
              <Typography variant="h6" component="h3">
                {props.user.firstName}
              </Typography>
              <Typography variant="h6" component="h3">
                {props.user.lastName}
              </Typography>
            </CardContent>
          </Grid>
          {/* <CardActions> */}
          <Grid item xs={6}>
            <Link
                to={`/user-update/${props.user.id}/${Math.random().toString(36).replace(/[^a-z]+/g, '')}`}
                key={'user_update_'+props.user.id}
            >
              <Button size="small"><EditIcon /></Button>
            </Link>          
          </Grid>
          <Grid item xs={6}>
              <UserDelete userId= {props.user.id} />        
          </Grid>
          <Grid item xs={12}>
            <UserChangePassword entityId={props.user.id} />
          </Grid>
        </Grid>

        {/* </CardActions> */}
      </Card>
  );
}