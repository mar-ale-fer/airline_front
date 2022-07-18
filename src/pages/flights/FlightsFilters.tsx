import { useQuery } from '@apollo/client';
import { flightsFilters_RV } from '../../cache';
import {GET_FLIGHTSFILTERS_RV} from './operations/flightsFilters_rv_query'
import { useState, useEffect  } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField,  } from 'formik-material-ui';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import {
  Button, 
} from '@material-ui/core';

const validation_schema = Yup.object({});
  
const FlightsFilters = () =>  {

  const [s_initialvalue, sets_initialvalue] = useState({
    name:'',
    general:''
  })

  const { data:flightsFiltersData } = useQuery(GET_FLIGHTSFILTERS_RV);  
  useEffect(() => {
    if(flightsFiltersData && flightsFiltersData.flightsFilters_RV) {
      const initial_values={
          name: flightsFiltersData.flightsFilters_RV,
          general: ''
      } 
      sets_initialvalue(initial_values);
    }
  },[flightsFiltersData])
  
  const deleteFlightsFilters = () => {
    flightsFilters_RV("")
  }
  return (
    <Formik

      initialValues={s_initialvalue}

      onSubmit={(values, actions) => {
        //update filters in cache
        flightsFilters_RV(values.name)
        actions.setSubmitting(false);      
      }}
      enableReinitialize={true}
      validationSchema= {validation_schema}
    >
      {props =>(
        <Form onSubmit={props.handleSubmit}>

          <Field 
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name} 
              name="name" 
              placeholder="Nombre" 
              component={TextField}
          /> 
          {props.touched.name && props.errors.name ? 
          (<div>{props.errors.name}</div>) : null}
    
          <div style={{ color: 'red' }}>{props.errors.general}</div>
          <Button variant="contained" color="primary" type="submit">
            <SearchIcon />
          </Button>
          <Button variant="contained" color="primary"
            onClick={() => deleteFlightsFilters()}
          >
            <SearchOffIcon />
          </Button>          
        </Form>
      )}

    </Formik>
)};

export default FlightsFilters;