import { useQuery } from '@apollo/client';
import { usersFilters_RV, usersFilters_RV_initialvalue } from '../../cache';
import { usersFiltersType } from './operations/UsersFiltersType';
import {GET_USERSFILTERS_RV} from './operations/usersFilters_rv_query'
import { useState, useEffect  } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField,  } from 'formik-material-ui';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import {
  Button, 
} from '@material-ui/core';

const validation_schema = Yup.object({});

type usersFiltersFormik = usersFiltersType & {general:string}
const UsersFilters = () =>  {

  const [s_initialvalue, sets_initialvalue] = useState({
    firstName:'',
    lastName:'',
    email:'',
    general:''
  })

  const { data:usersFiltersData } = useQuery(GET_USERSFILTERS_RV);  
  useEffect(() => {
    if(usersFiltersData && usersFiltersData.usersFilters_RV) {
      const initial_values : usersFiltersFormik ={
          firstName: usersFiltersData.usersFilters_RV.firstName,
          lastName: usersFiltersData.usersFilters_RV.lastName,
          email: usersFiltersData.usersFilters_RV.email,
          general: ''
      } 
      sets_initialvalue(initial_values);
    }
  },[usersFiltersData])
  
  const deleteUsersFilters = () => {
    usersFilters_RV(usersFilters_RV_initialvalue)
  }
  
  const handleSubmit = (values: usersFiltersFormik , actions: FormikHelpers<usersFiltersFormik>) => {
        //update filters in cache
        usersFilters_RV({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email
        })
        actions.setSubmitting(false);    
  }
  return (
    <Formik
      initialValues={s_initialvalue}
      onSubmit={(values, actions) => handleSubmit(values, actions)} 
      enableReinitialize={true}
      validationSchema= {validation_schema}
    >
      {props =>(
        <Form onSubmit={props.handleSubmit}>

          <Field 
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.firstName} 
            name="firstName" 
            placeholder="Nombre" 
            component={TextField}
          /> 
          {props.touched.firstName && props.errors.firstName ? 
          (<div>{props.errors.firstName}</div>) : null}

          <Field 
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.lastName} 
            name="lastName" 
            placeholder="Apellido" 
            component={TextField}
          /> 
          {props.touched.lastName && props.errors.lastName ? 
          (<div>{props.errors.lastName}</div>) : null}  

          <Field 
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.email} 
            name="email" 
            placeholder="Email" 
            component={TextField}
          /> 
          {props.touched.email && props.errors.email ? 
          (<div>{props.errors.email}</div>) : null}  

          <div style={{ color: 'red' }}>{props.errors.general}</div>
          <Button variant="contained" color="primary" type="submit">
            <SearchIcon />
          </Button>
          <Button variant="contained" color="primary"
            onClick={() => deleteUsersFilters()}
          >
            <SearchOffIcon />
          </Button>          
        </Form>
      )}

    </Formik>
)};

export default UsersFilters;