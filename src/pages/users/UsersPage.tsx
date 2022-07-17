import { usersPageNeedsRefresh_RV } from '../../cache';
import {GET_USERSFILTERS_RV} from './operations/usersFilters_rv_query'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { SxProps } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { UserCard } from './UserCard';
import { USERS_QUERY } from './operations/UsersQuery';
import UsersFilters from './UsersFilters';
import { Grid } from '@mui/material';
const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

const fabStyle_as_SxProps = fabStyle as SxProps;

const UsersPage = (props : any) => {
  let navigate = useNavigate();
  const { data:usersFiltersData } = useQuery(GET_USERSFILTERS_RV);  
  const { data, loading, error } = useQuery(
    USERS_QUERY,
    {variables: {
      firstName: usersFiltersData.usersFilters_RV.firstName,
      lastName: usersFiltersData.usersFilters_RV.lastName,
      email: usersFiltersData.usersFilters_RV.email,
      debug: usersPageNeedsRefresh_RV(),
      },
    // pollInterval: 5000,
    });

  const GoToCreateUser = () =>{ 
    navigate('/user-create');
  };


  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data) return <p> No hay usuarios</p>;
  if (loading) return <p>Cargando usuarios...</p>;
   const Cards =  data.users.users.map(( user: any ) => (
    <Grid key={user.id} item lg={4} sm={6} xs={12}>
      <UserCard user={user}/>
    </Grid>
  ));
  return  <div>
    <Fab sx= {fabStyle_as_SxProps} 
        size="small" 
        color="secondary" 
        aria-label="add"
        onClick={GoToCreateUser}
    >
      <AddIcon />
    </Fab>
    <UsersFilters />
    <Grid container>
      {Cards }      
    </Grid>

  </div>
}

export default UsersPage