import { useState, Fragment } from "react";

import { useQuery } from "@apollo/client";
import { GET_USER_FROM_TOKEN_RV } from "./userSessionReactVarQuery";

import { LOGGED_USER } from "./LoggedUserQuery";
import clsx from "clsx";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import MenuIcon from '@mui/icons-material/Menu';
import { withStyles } from "@material-ui/core/styles";
import { 
  IconButton, 
  ListItemText, 
  ListItem, 
  List, 
  Drawer,
  Typography,
  Toolbar,
  AppBar,
  Button
} from '@mui/material';

import {FlightsPage} from "../../pages/flights/FlightsPage";
import FlightCreatePage from "../../pages/flights/FlightCreatePage"
import FlightUpdatePage from "../../pages/flights/FlightUpdate"
import FlightsAndComments from "../../pages/comments/FlightsAndComments"

import UsersPage from "../../pages/users/UsersPage";
import UserCreatePage from "../../pages/users/UserCreatePage";
import UserUpdatePage from "../../pages/users/UserUpdatePage";

import Login from "../../pages/access/Login"
import ChangePassword from "../../pages/access/ChangePasswordPage";
import oxigent_logo from '../../images/oxigent_logo.png';
import { userSessionReactVar, userSessionReactVar_initialvalue } from '../../cache';
import { getUserMenu } from "./userMenu";

const drawerWidth = 240;
const history = createBrowserHistory();

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  }
});

const MyToolbar = withStyles(styles)(({ classes, title, onMenuClick }) => (
  <Fragment>
    <AppBar className={classes.aboveDrawer}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.toolbarMargin} />
  </Fragment>
));
  
function AppBarInteraction({ 
  classes,
  variant,
  user_from_token
}) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("Airline App");

  const userSession = userSessionReactVar()
  const MenuItems = (userSession && userSession.roles) 
    ? getUserMenu(userSession.roles)
    : []
  
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = title => () => {
    setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
  };

  const RequireAuth = ( props ) => {
    const { data: user_from_token_data } = useQuery(
      GET_USER_FROM_TOKEN_RV
    );

    // return <div>aaa</div>
    if (user_from_token_data &&
      user_from_token_data &&
      user_from_token_data.userSessionReactVar &&
      user_from_token_data.userSessionReactVar.email) {
        return < AppCheckPassword toRender={props.children} />
    } 
    return <Navigate to={'/login'} />
  }


  const AppCheckPassword = ( props ) => {
    const { data: loggeduserdata, loading, error } = useQuery(LOGGED_USER,
       {fetchPolicy: "network-only"});

    // return (<div>{JSON.stringify(loggeduserdata)}</div>)

    if (error) return <div style={{ color: "red" }}>{error.message}</div>;
    if (!loggeduserdata) return <p> No hay información sobre la sesión </p>;
    if (loading) return <p>verificando su sesión...</p>;
  
    const loggeduser = loggeduserdata.LoggedUser;
    if (loggeduser.success === false)
      return <div style={{ color: "red" }}>{loggeduser.message}</div>;
  
    if (loggeduser.user.mustChangePassword) 
      return (<Navigate to='/change-password' />)
    return props.toRender
  }

  const MyDrawer = withStyles(styles)(
    ({ classes, variant, open, onClose, onItemClick }) => (
      <Router history={history}>
        <Drawer
          variant={variant}
          open={open}
          onClose={onClose}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div
            className={clsx({
              [classes.toolbarMargin]: variant === "persistent"
            })}
          />
          <List>
            { MenuItems && MenuItems.map((menuItem, index)=> 
              <ListItem key={`menu-item-${index}`}
                button
                component={Link}
                to={menuItem.to}
                onClick={onItemClick(`${menuItem.title}`)}
              >
                <ListItemText>{`${menuItem.optionText}`}</ListItemText>
            </ListItem>
            )
            }
            
          </List>
          
          <img src={oxigent_logo} width="30%" alt="Oxigent logo" />
  
          <Typography variant="h7" >
            Airline App
          </Typography>
          <br/>
          <br/>
          {(userSession && userSession.email)
          ? (userSession.email)
          : (<></>)
          }
          <br />
          {(userSession && userSession.roles && userSession.roles.roles)
          ? (JSON.stringify(userSession.roles.roles))
          : (<></>)
          }
        </Drawer>
  
   
        <main className={classes.content}>
        <Routes>
        <Route path='/' exact element={
            <div>
              <Typography>
              <img src={oxigent_logo} width="200px" alt="Oxigent logo" />
              </Typography>       
            </div>
          }>
          </Route>
          <Route path='/flight-create' exact element={
          <RequireAuth><FlightCreatePage /></RequireAuth>} /> 
          <Route path='/flights' exact element={<RequireAuth><FlightsPage /></RequireAuth>} />
          <Route path='/flights-and-comments' exact element={<RequireAuth><FlightsAndComments /></RequireAuth>} /> dfd
          <Route path='/flight-update/:entityid/:random' element={<RequireAuth><FlightUpdatePage /></RequireAuth>} />

          <Route path='/user-create' exact element={<RequireAuth><UserCreatePage /></RequireAuth>} />
          <Route path='/users' exact element={<RequireAuth><UsersPage /></RequireAuth>} />
          <Route path='/user-update/:entityid/:random' element={<RequireAuth><UserUpdatePage /></RequireAuth>} />

          <Route path='/login' exact element={<Login />} /> 
          <Route path='/change-password' exact element={<ChangePassword />} /> 
          <Route path='/logout' exact element={
            <div>
              <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      userSessionReactVar(userSessionReactVar_initialvalue)
                      localStorage.setItem('token', '');
                      alert('Session ended');
                    }}
                  >
                    Logout
              </Button>      
              <Typography>
              <img src={oxigent_logo} width="200px" alt="Oxigent logo" />
              </Typography>       
            </div>
          }>
          </Route>
        </Routes>
        </main>
      </Router>
    )
  );  
  return ( 
    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />
    </div>
  );
}

export default withStyles(styles)(AppBarInteraction);
