import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
// import { Button, FormGroup, FormControl, Grid } from '@material-ui/core';
import { Button, Grid } from '@mui/material';
export type userChangePasswordForm = {
    password:string
    passwordConfirmation: string
    general:string
}
const validation_schema = Yup.object({
    password: Yup.string()
    .min(8, 'Debe tener al menos 8 caracteres')
    .required('Requerido'),
    passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Las claves deben coincidir')
})

const entityVars = (entityId: string, values : any) => (
    (entityId==="") //if insert mode
    ? { name: values.name } 
    : { //if update mode
        userChangePasswordId: entityId,
        password: values.password
    })

interface userChangePasswordFormProps {
    entityId : string
    initial_values: userChangePasswordForm
    operation: Function
    loading: boolean
    button_label: string
    apiReturnName: string
    visibility: Function
}
export const UserChangePasswordForm = ( { 
    entityId,
    initial_values,
    operation,
    loading,
    button_label,
    apiReturnName,
    visibility

} : userChangePasswordFormProps
    ) => { 
 
    const handleSubmit = (values: userChangePasswordForm , actions: FormikHelpers<userChangePasswordForm>) => {
        operation({variables: entityVars(entityId, values)})
        .then((data : any)=>{
            console.log(data.data[apiReturnName])
            const response: any = data.data[apiReturnName]
            if((response.success) as boolean) {
                visibility()
            } else {
                alert(response.message)
                actions.setFieldError('general', response.message)
            }
        })
        .catch((error : any) => {
            actions.setFieldError('general', 'Error al enviar formulario:'+ error.message)
        })
        .finally(()=>{
            actions.setSubmitting(false)
        })
        actions.setSubmitting(false);    
    } 

    return (
        <Formik 
            initialValues={initial_values}
            onSubmit={(values, actions)=> handleSubmit(values,actions)}
            enableReinitialize={true}
            validationSchema={validation_schema}
        >
            {props =>(
                <Form onSubmit={props.handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Field 
                                type="password"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.password}
                                name="password"
                                placeholder="password"
                                component={TextField}
                            />    
                            {props.touched.password && props.errors.password ?
                            (<div>{props.errors.password}</div>) : null}                                                         
                        </Grid>
                        <Grid item xs={12}>
                            <Field 
                                type="password"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.passwordConfirmation}
                                name="passwordConfirmation"
                                placeholder="repita el password"
                                component={TextField}
                            />
                            {props.touched.passwordConfirmation && props.errors.passwordConfirmation ?
                            (<div>{props.errors.passwordConfirmation}</div>) : null}                               
                        </Grid>
                        <Grid item xs ={12}>
                            <Button variant="contained" color="primary" disabled={loading} type="submit">
                                {button_label}
                            </Button>
                        </Grid>
                        <Grid item xs ={12}>
                            <Button variant="contained" color="primary" onClick={()=>visibility()} type="submit">
                                Cancelar
                            </Button>                            
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

