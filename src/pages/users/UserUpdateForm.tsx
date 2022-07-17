import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField, CheckboxWithLabel  } from 'formik-material-ui';
import { useNavigate } from 'react-router-dom';
import { usersFiltersType } from './operations/UsersFiltersType';
import { Button, FormGroup, FormControl } from '@material-ui/core';

const options = [
    {label:'Administrador', value:'ADMINISTRATOR'},
    {label:'Instituto', value:'INSTITUTE'},
    {label:'Secretaría', value:'SECRETARY'},
    {label:'Estudiante', value:'STUDENT'},
    {label:'Profesor/a', value:'TEACHER'}
]

type userForm = usersFiltersType &
                {
                    password:string,
                    mustChangePassword: boolean
                    roles: string[],
                    general:string
                }

export type userUpdateForm =  Omit<userForm, "password"|"mustChangePassword"> 
const validation_schema = Yup.object({
    firstName: Yup.string()
    .min(2, 'Debe tener más de 2 caracteres')
    .required('Requerido'),
    lastName: Yup.string()
    .min(2, 'Debe tener más de 2 caracteres')
    .required('Requerido'),
    email: Yup.string()
    .email('Formato de email inválido')
    .required('Requerido'),
    roles: Yup.array()
    .min(1,"Debe asignar al menos un rol")
    .max(3,"No puede asignar más de tres roles")

})

interface UserFormProps {
    initial_values : userUpdateForm, 
    handleSubmit : (values: userUpdateForm , actions: FormikHelpers<userUpdateForm>) => void,
    loading :boolean,
    button_label: string
}
export const UserUpdateForm = ( {
    initial_values,
    handleSubmit,
    loading,
    button_label

} : UserFormProps
    ) => {
    let navigate = useNavigate()
    
    const GoBackToUsers = () => {
        navigate('/users');
    };    

    return (
        <Formik 
            initialValues={initial_values}
            onSubmit={(values, actions)=> handleSubmit(values,actions)}
            enableReinitialize={true}
            validationSchema={validation_schema}
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

                    <FormControl component="fieldset" style={{ display: "flex"}}>
                        <FormGroup>
                            {options.map(opt => (
                                <Field 
                                    type="checkbox"
                                    component={CheckboxWithLabel}
                                    key={opt.value}
                                    name="roles"
                                    value={opt.value}
                                    Label={{label: opt.label}}
                                    
                                />
                            ))}
                        </FormGroup>  
                    </FormControl>
                    {props.touched.roles && props.errors.roles ?
                    (<div>{props.errors.roles}</div>) : null} 

                    <Button variant="contained" color="primary" disabled={loading} type="submit">
                        {button_label}
                    </Button>
                    <Button variant="contained" color="primary" onClick={GoBackToUsers} type="submit">
                        Cancelar
                    </Button>
                    <h3>Values</h3>
                    <pre>{JSON.stringify(props.values)}</pre>
                </Form>
            )}
        </Formik>
    )
}

