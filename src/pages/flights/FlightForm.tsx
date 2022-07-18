import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core'

//+specific for the entity
type entityForm = {
    name: string
    general: string
}

const validation_schema = Yup.object({
    name: Yup.string()
      .min(2, 'Must be more than 2 characters')
      .required('Required'),
  });

const entityVars = (entityId: string, values : any) => (
    (entityId==="") //if insert mode
    ? { name: values.name } 
    : { //if update mode
        flightUpdateId: entityId,
        name: values.name
    })

//-specific for the entity
interface entityFormProps {
    entityId: string
    initial_values: entityForm
    operation: Function
    refresh: Function
    goBack: string
    loading: boolean
    button_label: string
    apiReturnName: string

}

export const FlightForm = ( {
    entityId,
    initial_values, 
    operation,
    refresh,
    goBack,
    loading,
    button_label,
    apiReturnName
}:entityFormProps )=>{
    let navigate = useNavigate()

    const handleSubmit = (values: entityForm , actions: FormikHelpers<entityForm>) => {
        operation({variables: entityVars(entityId, values)})
        .then((data : any)=>{
            console.log(data.data[apiReturnName])
            const response: any = data.data[apiReturnName]
            if((response.success) as boolean) {
                const randomString= Math.random().toString(36) as string
                refresh( randomString )
                navigate(goBack)
            } else {
                alert(response.message)
                actions.setFieldError('general', response.message)
            }
        })
        .catch((error : any) => {
            actions.setFieldError('general', 'Error submitting form:'+ error.message)
        })
        .finally(()=>{
            actions.setSubmitting(false)
        })
        actions.setSubmitting(false);    
    } 

    const GoBackToEntities = () =>{ 
        navigate(goBack);
      };
    return (
        <Formik
        initialValues={initial_values}
        onSubmit={(values, actions)=> handleSubmit(values,actions)}
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
                placeholder="Name" 
                component={TextField}
            /> 
            {props.touched.name && props.errors.name ? 
            (<div>{props.errors.name}</div>) : null}
  
            <div style={{ color: 'red' }}>{props.errors.general}</div>
            <Button variant="contained" color="primary" disabled={loading} type="submit">
              {button_label}
            </Button>
            <Button variant="contained" color="primary" type="submit"
              onClick={GoBackToEntities}
            >
                Cancel </Button>
          </Form>
        )}
  
      </Formik>
    )
}