import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_CHANGE_PASSWORD } from './operations/UserChangePasswordMutation';
import { UserChangePasswordForm, userChangePasswordForm } from './UserChangePasswordForm';
import Button from '@mui/material/Button';
import PasswordIcon from '@mui/icons-material/Password';

const initial_values : userChangePasswordForm= {
    password:"",
    passwordConfirmation:"",
    general:""
}

interface userChangePasswordProps {
    entityId : string
}
const UserChangePassword = ({ entityId} : userChangePasswordProps) => {
    const [userChangePassword, {loading}] = useMutation(USER_CHANGE_PASSWORD);
    const [showForm, setShowForm] = useState(false)
    
    return (
        showForm 
        ? <UserChangePasswordForm
            entityId={entityId}
            initial_values={initial_values}
            operation={userChangePassword}
            loading={loading}
            button_label= "Cambiar password"
            apiReturnName='userChangePassword'
            visibility={()=>setShowForm(false)}
        />
        : <Button 
        size="small"
        onClick={()=>setShowForm(true) }    
        >
            <PasswordIcon />
        </Button>


    )
}

export default UserChangePassword