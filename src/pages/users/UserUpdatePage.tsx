import { useState, useEffect } from 'react';
import { FormikHelpers } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { USER_BY_ID } from './operations/UserByIdQuery';
import { USER_UPDATE } from './operations/UserUpdateMutation';

import { UserUpdateForm, userUpdateForm } from './UserUpdateForm';

import { useNavigate } from 'react-router-dom';
import { usersPageNeedsRefresh_RV } from '../../cache';
import * as log  from 'loglevel';

const initial_values : userUpdateForm= {
    firstName:"",
    lastName:"",
    email:"",
    roles:[],
    general:""
}

const UserUpdatePage = () => {
    const [s_initialvalue, sets_initialvalue] = useState<userUpdateForm>(initial_values)
    const { entityid, random } = useParams()
    let navigate = useNavigate()
    const [userUpdate, {loading}] = useMutation(USER_UPDATE);
    const { data:datauser} = useQuery(
        USER_BY_ID,
        {variables:{
            userByIdId:entityid,
            debug: random
        }}
    )

    useEffect(()=> {
        if (datauser && datauser.userById && datauser.userById.user) {
            const user = datauser.userById.user
            
            const initial_values : userUpdateForm = {
                
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roles: user.roles.roles,
                general:""                
            }
            sets_initialvalue(initial_values);
        }
    },[datauser])


    const handleSubmit = (values: userUpdateForm , actions: FormikHelpers<userUpdateForm>) => {
        log.info('update_user_onsubmit')
        userUpdate({variables: {
            userUpdateId: entityid,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            roles: values.roles
        }})
        .then((data)=>{
            const response: any = data.data.userUpdate
            if((response.success) as boolean) {
            
                const randomString= Math.random().toString(36) as string
                usersPageNeedsRefresh_RV( randomString)
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
        <UserUpdateForm initial_values={s_initialvalue}
            handleSubmit={handleSubmit}
            loading={loading}
            button_label='Modificar Usuario'
        />
    )
}

export default UserUpdatePage