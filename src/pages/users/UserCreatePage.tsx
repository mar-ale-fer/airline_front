import { FormikHelpers } from 'formik';
import { useMutation } from '@apollo/client';
import {USER_CREATE } from './operations/UserCreateMutation';
import {UserForm, userForm} from './UserForm';
import { useNavigate } from 'react-router-dom';
import { usersPageNeedsRefresh_RV } from '../../cache';
import * as log  from 'loglevel';

const initial_values : userForm= {
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    mustChangePassword:true,
    roles:[],
    general:""
}

const UserCreatePage = () => {
    let navigate = useNavigate()
    const [userCreate, {loading}] = useMutation(USER_CREATE);

    const handleSubmit = (values: userForm , actions: FormikHelpers<userForm>) => {
        log.info('create_user_onsubmit')
        userCreate({variables: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            mustChangePassword: values.mustChangePassword,
            roles: values.roles
        }})
        .then((data)=>{
            const response: any = data.data.userCreate
            if((response.success) as boolean) {
                usersPageNeedsRefresh_RV( Math.random().toString(36) as string)
                navigate('/users')
            } else {
                alert(response.message)
                actions.setFieldError('general', response.message)
            }
        })
        .catch(error => {
            actions.setFieldError('general', 'Error al enviar formulario:'+ error.message)
        })
        .finally(()=>{
            actions.setSubmitting(false)
        })
        actions.setSubmitting(false);    
    } 

    return (

        <UserForm initial_values={initial_values}
            handleSubmit={handleSubmit}
            loading={loading}
            button_label='Crear Usuario'
        />

    )
}

export default UserCreatePage